// Google shows about 60 characters of a title. The layout adds " | Sunita Agri Exports" to every page title;
// when that would push a title past 60, the title is used on its own so the words that matter stay visible.
const SUFFIX = ' | Sunita Agri Exports';
export const seoTitle = (t) => (t.length + SUFFIX.length <= 60 ? t : { absolute: t });
