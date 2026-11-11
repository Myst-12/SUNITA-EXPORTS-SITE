// Admin tools shown on the dashboard and in the admin bar. To add a tool: add an entry here and a
// page at its `href` that starts with `if (!(await isAdmin())) redirect('/admin/');`.
// `short` is the label in the admin bar; `soon` marks a tool that is not built yet; `external` opens it in a
// new tab with a full page load (the costing app lives on its own server).
export const TOOLS = [
  {
    slug: 'costing',
    name: 'Costing',
    short: 'Costing',
    href: '/admin/costing/',
    external: true,
    icon: 'tag',
    description: 'Export costing: quick price, quotations, daily price lists, suppliers and purchase orders. Opens in a new tab.',
  },
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
];
