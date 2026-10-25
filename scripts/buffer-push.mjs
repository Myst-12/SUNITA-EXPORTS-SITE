// Push a week of social posts into Buffer as DRAFTS (Facebook, Instagram, X).
// Nothing is published: the owner reviews the drafts in Buffer and schedules them.
//
// Usage:
//   node scripts/buffer-push.mjs social/2026-10-28-week/posts.json            # dry run, prints what it would send
//   node scripts/buffer-push.mjs social/2026-10-28-week/posts.json --send     # creates the drafts
//
// posts.json:
// {
//   "imageBase": "https://www.sunitaexports.com/social/2026-10-28-week/",   // images must be public (deployed) first
//   "time": "12:00",                                                        // IST
//   "posts": [
//     { "date": "2026-10-28", "image": "1.jpg", "alt": "...", "fb": "...", "ig": "...", "x": "..." }
//   ]
// }
// "ig" is optional (falls back to "fb"). Leave "fb", "ig" or "x" empty to skip that channel for the day.

import { readFileSync } from 'node:fs';

const API = 'https://api.buffer.com';
const [file, flag] = process.argv.slice(2);
const send = flag === '--send';
if (!file) {
  console.error('Usage: node scripts/buffer-push.mjs <posts.json> [--send]');
  process.exit(1);
}

// Read BUFFER_API_KEY from .env.local without printing it
const env = readFileSync('.env.local', 'utf8');
const key = env.match(/^BUFFER_API_KEY=(.+)$/m)?.[1]?.trim();
if (!key) {
  console.error('BUFFER_API_KEY missing in .env.local');
  process.exit(1);
}

async function gql(query, variables = {}) {
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data;
}

// 12:00 IST on a given date, as UTC ISO string
function dueAt(date, time) {
  return new Date(`${date}T${time}:00+05:30`).toISOString();
}

const week = JSON.parse(readFileSync(file, 'utf8'));
const time = week.time || '12:00';

const { account } = await gql('query { account { organizations { id } } }');
const orgId = account.organizations[0].id;
const { channels } = await gql(
  'query ($id: OrganizationId!) { channels(input: { organizationId: $id }) { id service displayName } }',
  { id: orgId },
);
const channelFor = (service) => channels.find((c) => c.service === service);
const targets = [
  ['facebook', 'fb'],
  ['instagram', 'ig'],
  ['twitter', 'x'],
];

const CREATE = `mutation ($input: CreatePostInput!) {
  createPost(input: $input) {
    ... on PostActionSuccess { post { id dueAt status } }
    ... on MutationError { message }
  }
}`;

for (const p of week.posts) {
  for (const [service, field] of targets) {
    const text = field === 'ig' ? p.ig || p.fb : p[field];
    const channel = channelFor(service);
    if (!text || !channel) continue;
    if (field === 'x' && [...text].length > 280) {
      console.error(`SKIP ${p.date} x: ${[...text].length} chars (max 280)`);
      continue;
    }
    const input = {
      text,
      channelId: channel.id,
      schedulingType: 'automatic',
      mode: 'customScheduled',
      dueAt: dueAt(p.date, time),
      saveToDraft: true,
      ...(service === 'facebook' && { metadata: { facebook: { type: 'post' } } }),
      ...(service === 'instagram' && { metadata: { instagram: { type: 'post', shouldShareToFeed: true } } }),
      ...(p.image && {
        assets: [{ image: { url: week.imageBase + p.image, metadata: { altText: p.alt || '' } } }],
      }),
    };
    if (!send) {
      console.log(`[dry run] ${p.date} ${service}: ${text.slice(0, 60).replace(/\n/g, ' ')}... ${p.image || ''}`);
      continue;
    }
    const data = await gql(CREATE, { input });
    const r = data.createPost;
    console.log(r.post ? `OK   ${p.date} ${service} draft ${r.post.id}` : `FAIL ${p.date} ${service}: ${r.message}`);
  }
}
