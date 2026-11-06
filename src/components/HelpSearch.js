'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Icon from './Icon';
import { whatsappLink } from '@/config/site';
import { track } from '@/lib/track';
import styles from './HelpSearch.module.css';

// "Ask a question" helper: searches the site's own FAQs, facts and catalogue (/help-index.json) in the browser.
// No AI and no server — it can only show what the site already says, and nothing typed is stored or sent anywhere.
const SUGGESTIONS = ['How do I order online?', 'Minimum order quantity', 'Payment terms', 'Do you send samples?', 'Mixed container', 'Certificates', 'Contact details'];
const STOP = new Set('a an the is are am be was were do does did can could would should will i we you me my our your us it its this that these those of for to in on at by with from and or but if so as about any some what which who whom whose when where why how please tell know want need have has get give send there here sell sells buy export exports exporter supply supplies offer available'.split(' '));

let indexPromise;
function loadIndex() {
  indexPromise ??= Promise.all([import('minisearch'), fetch('/help-index.json').then((r) => r.json())])
    .then(([{ default: MiniSearch }, { docs }]) => {
      const ms = new MiniSearch({
        fields: ['title', 'text', 'keywords'],
        storeFields: ['type', 'title', 'text', 'url', 'category'],
        processTerm: (t) => {
          const w = t.toLowerCase();
          return STOP.has(w) ? null : w;
        },
        searchOptions: { boost: { title: 3, keywords: 2 }, prefix: (t) => t.length > 2, fuzzy: (t) => (t.length > 4 ? 0.2 : false) },
      });
      ms.addAll(docs);
      return ms;
    })
    .catch((err) => {
      indexPromise = null; // let the next attempt retry
      throw err;
    });
  return indexPromise;
}

const isInfo = (h) => h.type === 'faq' || h.type === 'answer';

// Small talk the search can't answer ("hi", "thanks", "ok"): a friendly reply instead of "not found".
// A greeting in front of a real question ("hi, do you send samples?") is dropped and the rest is searched.
const GREETING = /^(hi+|hii+|hello+|hey+|hlo|helo|hai|namaste|namaskar|namaskaram|salaam|salam|as+alam+u? ?alaikum|marhaba|hola|good (morning|afternoon|evening|day)|greetings|dear( sir| team)?|sir|madam)\b[\s,!.:-]*/i;
const SMALL_TALK = [
  { re: /^(thanks?|thank you|thank u|thx|ty|tnx|shukriya|dhanyavaa?d|shukran|much appreciated)( (so|very) much)?[\s!.]*$/i, reply: 'You’re welcome! Anything else I can help with?' },
  { re: /^(ok+|okay|k|cool|great|nice|good|fine|alright|got it|perfect|sure|hmm+)[\s!.]*$/i, reply: 'Great. Ask me anything else about our products, or message our team on WhatsApp.' },
  { re: /^(bye|goodbye|see you|see ya|take care|tata)[\s!.]*$/i, reply: 'Thank you for visiting Sunita Agri Exports. Our export team is on WhatsApp whenever you need us.' },
  { re: /^(who|what) (are|r) (you|u)\??$|^are you (a )?(bot|robot|human|real|ai)\??$|^what is this\??$/i, reply: 'I’m the website’s question helper: I answer from Sunita Agri Exports’ own website, instantly. For anything I can’t answer, our export team replies on WhatsApp.', chips: true },
  { re: /^(help|menu|options|start|what can you do\??|\?+)$/i, reply: 'I can answer questions about our products, prices, minimum orders, shipping, samples, certificates and ordering online. Try one of these:', chips: true },
];

function smallTalk(q) {
  const rest = q.replace(GREETING, '').trim();
  if (!rest) return { reply: 'Hello! I can help with our products, prices, minimum orders, shipping and samples. What are you looking for?', chips: true, rest: '' };
  const hit = SMALL_TALK.find((s) => s.re.test(rest));
  return hit ? { ...hit, rest: '' } : { rest };
}

// Best FAQ/fact as the answer, plus matching products and categories, all relative to the top score.
function answer(ms, q) {
  const hits = ms.search(q);
  if (!hits.length) return { q, none: true, items: [], related: [] };
  const top = hits[0].score;
  const info = hits.filter(isInfo);
  const main = info[0] && info[0].score >= top * 0.5 ? info[0] : null;
  const items = hits.filter((h) => !isInfo(h) && h.score >= top * 0.2).slice(0, 5);
  const related = info.filter((h) => h !== main && h.score >= top * 0.45).slice(0, 2);
  return { q, main, items, related };
}

const askOnWhatsApp = (q) => whatsappLink(`Hello Sunita Agri Exports, I have a question: ${q}`);

export default function HelpSearch() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false); // panel stays mounted while its exit animation plays
  const [state, setState] = useState('idle'); // idle | loading | ready | error
  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState('');
  const ms = useRef(null);
  const inputRef = useRef(null);
  const buttonRef = useRef(null);
  const logRef = useRef(null);
  const panelId = useId();

  const prepare = () => {
    if (ms.current || state === 'loading') return;
    setState('loading');
    loadIndex().then(
      (index) => { ms.current = index; setState('ready'); },
      () => setState('error'),
    );
  };

  const toggle = () => {
    if (open && !closing) { setClosing(true); return; }
    prepare(); track('help_open');
    setClosing(false);
    setOpen(true);
  };

  const close = () => { setClosing(true); buttonRef.current?.focus(); };
  // Only one floating panel at a time: the WhatsApp enquiry closes this one and the other way round.
  useEffect(() => {
    if (!open || closing) return;
    window.dispatchEvent(new CustomEvent('sx:panel', { detail: 'help' }));
    const onOther = (e) => e.detail !== 'help' && setClosing(true);
    window.addEventListener('sx:panel', onOther);
    return () => window.removeEventListener('sx:panel', onOther);
  }, [open, closing]);
  const onPanelAnimationEnd = (e) => {
    if (e.target === e.currentTarget && closing) { setOpen(false); setClosing(false); }
  };

  const ask = (text, picked) => {
    const q = text.trim();
    if (!q || !ms.current) return;
    const talk = picked ? { rest: q } : smallTalk(q);
    const result = talk.reply
      ? { q, reply: talk.reply, chips: talk.chips, items: [], related: [] }
      : picked ? { q, main: picked, items: [], related: [] } : answer(ms.current, talk.rest);
    result.q = q;
    track('help_search', { found: !result.none, smallTalk: Boolean(talk.reply) });
    setMessages((m) => [...m, result]);
    setQuery('');
    // Product-like questions also get a count from the FMCG product list (10,000+ packs the index doesn't hold).
    const words = talk.rest.split(/\s+/).filter(Boolean);
    if (!talk.reply && !picked && words.length && words.length <= 6) {
      fetch(`/fmcg/catalogue/count/?q=${encodeURIComponent(talk.rest)}`)
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => d?.total && setMessages((m) => m.map((x) => (x === result ? { ...x, fmcg: { q: talk.rest, total: d.total } } : x))))
        .catch(() => {});
    }
  };

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Unmount after the exit animation; the timer covers browsers that skip animationend.
  useEffect(() => {
    if (!closing) return;
    const t = setTimeout(() => { setOpen(false); setClosing(false); }, 400);
    return () => clearTimeout(t);
  }, [closing]);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [messages]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className={styles.fab}
        data-fab
        aria-expanded={open && !closing}
        aria-controls={panelId}
        onClick={toggle}
        onPointerEnter={prepare}
        onFocus={prepare}
      >
        <span className={styles.fabIcons} data-open={open && !closing ? '' : undefined}>
          <Icon name="chat-dots" size={24} className={styles.iconChat} />
          <Icon name="close" size={22} className={styles.iconClose} />
        </span>
        <span className={styles.fabLabel}>Ask a question</span>
      </button>

      {open && (
        <div id={panelId} className={`${styles.panel} ${closing ? styles.panelOut : ''}`} role="dialog" aria-label="Ask a question" onAnimationEnd={onPanelAnimationEnd}>
          <div className={styles.head}>
            <div>
              <p className={styles.title}>Ask a question</p>
              <p className={styles.sub}>Instant answers from our website</p>
            </div>
            <button type="button" className={styles.close} onClick={close} aria-label="Close">
              <Icon name="close" size={20} />
            </button>
          </div>

          <div className={styles.log} ref={logRef} aria-live="polite">
            <div className={styles.bot}>
              <p>Hi! Ask about our products, prices, minimum orders, shipping, samples, certificates or ordering online.</p>
              {!messages.length && (
                <div className={styles.chips}>
                  {SUGGESTIONS.map((s) => (
                    <button key={s} type="button" className={styles.chip} onClick={() => ask(s)} disabled={state !== 'ready'}>{s}</button>
                  ))}
                </div>
              )}
            </div>

            {messages.map((m, i) => (
              <div key={i} className={styles.turn}>
                <p className={styles.user}>{m.q}</p>
                <div className={styles.bot}>
                  {m.reply && <p>{m.reply}</p>}
                  {m.reply && m.chips && (
                    <div className={styles.chips}>
                      {SUGGESTIONS.map((s) => (
                        <button key={s} type="button" className={styles.chip} onClick={() => ask(s)}>{s}</button>
                      ))}
                    </div>
                  )}
                  {m.none && !m.fmcg && <p>I couldn’t find an answer to that on our website. Try different words, pick a topic below, or ask our team directly.</p>}
                  {m.none && !m.fmcg && (
                    <div className={styles.chips}>
                      {SUGGESTIONS.slice(0, 4).map((s) => (
                        <button key={s} type="button" className={styles.chip} onClick={() => ask(s)}>{s}</button>
                      ))}
                    </div>
                  )}
                  {m.fmcg && (
                    <a href={`/fmcg/catalogue/?q=${encodeURIComponent(m.fmcg.q)}`} className={styles.fmcg}>
                      <span><b>{m.fmcg.total.toLocaleString('en-IN')}</b> matching product{m.fmcg.total === 1 ? '' : 's'} in our FMCG list</span>
                      <small>See packing and order online <Icon name="arrow-right" size={14} /></small>
                    </a>
                  )}
                  {m.main && (
                    <div className={styles.answer}>
                      {m.main.title !== m.q && <p className={styles.answerTitle}>{m.main.title}</p>}
                      <p>{m.main.text}</p>
                      <a href={m.main.url} className={styles.more}>Read more <Icon name="arrow-right" size={14} /></a>
                    </div>
                  )}
                  {m.items.length > 0 && (
                    <>
                      {m.main && <p className={styles.label}>Related products</p>}
                      <ul className={styles.items}>
                        {m.items.map((h) => (
                          <li key={h.id}>
                            <a href={h.url}>
                              <span>{h.title}</span>
                              <small>{h.type === 'category' ? 'Product range' : h.category}</small>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  {m.related.length > 0 && (
                    <div className={styles.chips}>
                      {m.related.map((h) => (
                        <button key={h.id} type="button" className={styles.chip} onClick={() => ask(h.title, h)}>{h.title}</button>
                      ))}
                    </div>
                  )}
                  {!m.reply && (
                    <a href={askOnWhatsApp(m.q)} target="_blank" rel="noopener noreferrer" className={m.none && !m.fmcg ? styles.waBig : styles.wa}>
                      <Icon name="whatsapp" size={m.none && !m.fmcg ? 18 : 14} /> {m.none && !m.fmcg ? 'Ask on WhatsApp' : 'Not what you needed? Ask us on WhatsApp'}
                    </a>
                  )}
                </div>
              </div>
            ))}

            {state === 'loading' && <p className={styles.status}>Loading answers…</p>}
            {state === 'error' && (
              <p className={styles.status}>
                Couldn’t load answers. <button type="button" onClick={prepare}>Try again</button>
              </p>
            )}
          </div>

          <form className={styles.form} onSubmit={(e) => { e.preventDefault(); ask(query); }}>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Do you ship to the UK?"
              aria-label="Your question"
              enterKeyHint="send"
              maxLength={200}
            />
            <button type="submit" aria-label="Ask" disabled={state !== 'ready' || !query.trim()}>
              <Icon name="send" size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
