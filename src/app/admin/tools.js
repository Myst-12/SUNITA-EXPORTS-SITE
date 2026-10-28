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
    slug: 'quotation',
    name: 'Quotation cost calculator',
    short: 'Quotation',
    href: '/admin/quotation/',
    icon: 'tag',
    description: 'Pick a product and get its export cost worked out automatically.',
    soon: true,
  },
];
