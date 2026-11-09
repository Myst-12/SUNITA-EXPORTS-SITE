// Admin tools shown on the dashboard and in the admin bar. To add a tool: add an entry here and a
// page at its `href` that starts with `if (!(await isAdmin())) redirect('/admin/');`.
// `short` is the label in the admin bar; `soon` marks a tool that is not built yet.
export const TOOLS = [
  {
    slug: 'forms',
    name: 'Event forms',
    short: 'Forms',
    href: '/admin/forms/',
    icon: 'file',
    description: 'Make a lead form for an exhibition, show its QR code, and get the responses in Excel.',
  },
  {
    slug: 'orders',
    name: 'Orders',
    short: 'Orders',
    href: '/admin/orders/',
    icon: 'package',
    description: 'FMCG orders placed by buyers on the website, with their details and an Excel download.',
  },
  {
    slug: 'reviews',
    name: 'Reviews',
    short: 'Reviews',
    href: '/admin/reviews/',
    icon: 'star',
    description: 'Reviews written by buyers after ordering. Publish them to show them on the homepage.',
  },
  {
    slug: 'quotation',
    name: 'Quotation cost calculator',
    short: 'Quotation',
    href: '/admin/quotation/',
    icon: 'tag',
    description: 'Search a product, fill the cost boxes from your saved options, and get FOB, CFR and CIF prices.',
  },
];
