// Each "Foodstuff & FMCG" product family on /products/foodstuff-fmcg/ opens the matching part of the
// FMCG product list (/fmcg/catalogue/), where buyers can see every pack and order.
const list = (c, q) => `/fmcg/catalogue/?${new URLSearchParams({ ...(q ? { q } : {}), ...(c ? { c } : {}) })}`;

export const FMCG_FAMILY_LINKS = {
  'packaged-atta-flours': list('atta-flours-and-rava'),
  'packaged-rice-staples': list('rice-and-rice-products'),
  'packaged-pulses-dals': list('dals-pulses-and-beans'),
  'packaged-spices-masalas': list('spices-and-masalas'),
  'biscuits-bakery': list('biscuits-rusks-and-bakery'),
  'snacks-namkeen': list('snacks-and-namkeen'),
  'sweets-confectionery': list('indian-sweets'),
  'ready-to-eat-instant-food': list('instant-foods-and-ready-mixes'),
  'pickles-chutneys': list('pickles-chutneys-and-pastes'),
  'papad-traditional-foods': list('papad-appalam-and-fryums'),
  'tea-instant-beverages': list('tea-and-coffee'),
  'packaged-coffee': list('tea-and-coffee'),
  beverages: list('drinks-juices-and-syrups'),
  'dairy-products': list('dairy-and-milk-products'),
  'sauces-condiments': list('sauces-jams-and-honey'),
  jaggery: list('sugar-jaggery-and-salt'),
  'makhana-healthy-snacks': list('', 'makhana'),
  'personal-care': list('personal-care'),
  'household-home-care': list('household-and-cleaning'),
};
