// Product names in buyers' languages, shown as visible text on each product page (and in the Product
// structured data) so search engines match searches made in those languages — the Google Translate
// widget is not crawlable.
//
// Each entry is one string of names separated by "|", in LANGUAGES order. Leave a slot empty rather
// than inventing a name: obscure herbs often have no established name in some languages.
import { NAMES_A } from './localNames-spices.js';
import { NAMES_B } from './localNames-botanicals.js';
import { NAMES_C } from './localNames-staples.js';
import { NAMES_D } from './localNames-other.js';

export const LANGUAGES = [
  ['hi', 'Hindi'], ['gu', 'Gujarati'], ['ta', 'Tamil'], ['ar', 'Arabic'], ['fa', 'Persian'],
  ['es', 'Spanish'], ['pt', 'Portuguese'], ['fr', 'French'], ['de', 'German'], ['it', 'Italian'],
  ['nl', 'Dutch'], ['ru', 'Russian'], ['tr', 'Turkish'], ['zh', 'Chinese'], ['ja', 'Japanese'],
  ['ko', 'Korean'], ['ms', 'Malay'], ['id', 'Indonesian'],
];

const ALL = { ...NAMES_A, ...NAMES_B, ...NAMES_C, ...NAMES_D };

/** [[language code, language name, product name], ...] for a product, skipping empty slots. */
export function getLocalNames(slug) {
  const row = ALL[slug];
  if (!row) return [];
  return row.split('|').map((name, i) => [LANGUAGES[i][0], LANGUAGES[i][1], name.trim()]).filter(([, , name]) => name);
}
