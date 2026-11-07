// Link to a page in another language: the same page when it is translated, otherwise that language's home page.
// `langPaths` maps English paths to the language codes they exist in (from langPathIndex() in src/lib/i18n.js).
export const hrefFor = (code, path, langPaths) => (langPaths[path]?.includes(code) ? `/${code}${path}` : `/${code}/`);
