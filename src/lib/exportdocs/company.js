// Fixed exporter details printed on every export document. Change them here once.
export const EXPORTER = {
  name: 'Sunita Agri Exports Pvt Ltd',
  stampName: 'SUNITA AGRI EXPORTS PVT. LTD.',
  address: ['1014, Ghanshyam Enclave, Link Road,', 'Lalji Pada, Kandivali west, Mumbai - 400067.', 'Maharashtra, India.'],
  phone: '+91 81692 82942',
  email: 'sunitaexportsindia@gmail.com',
  iec: 'ABACS5343Q',
  gst: '27ABACS5343Q1ZT',
  adCode: '03000J4',
  fssai: '11524997000625',
  rex: 'INREXABACS5343QSB016',
  web: 'www.sunitaexports.com',
  cityCode: 'INBOM',
  contactName: 'Alok Dhanuka',
  bank: {
    accName: 'Sunita Agri Exports Pvt Ltd',
    accNo: '3739008700002670',
    name: 'Punjab National Bank',
    branch: 'Malad West, Mumbai',
    address: 'Vikash Chambers, Ground Flr., Malad(w), Mumbai 400064',
    swift: 'PUNBINBBDIB',
    ifsc: 'PUNB0040510',
  },
  selfSealing: {
    circular: 'Board circular no.: 736/52/2003C. Ex. Dated 30.08.2010 issued under F.No. 201/01/2003-Cx.- 6 and P.N.No. 05/2007 and P.N.NO.159/2016',
    permission: 'Under Self – Sealing Permission No.:F. No. S/13-108/EPC/SS/2021-22, DIN – 2021097ML 000062146D , 07/09/2021',
  },
};

export const DEFAULT_TERMS = [
  'Included Documents will be 1) Commercial Invoice, 2) Packing List, 3) Bill of Lading, 4) Certificate of Origin 5) Certificate of Fumigation 6) Phytosanitary Certificate',
  'Any Additional Document required other than mentioned above in point 1 will cost additional',
  'Buyer Should Remit the Exact Invoice Value and All Bank Charges will be borne by the Buyer.',
  'Payment must be done within 48 hours from the date of Proforma Invoice / Sales Contract to avoid any fluctuation in the price',
  'If the payment is not done on time and there is any increase in the price due to market fluctuation, it will be borne completely by the buyer.',
  'Supplier has the right to cancel the invoice /sales contract anytime if the payment is not done on time.',
  'Shipment will be done within 30 - 45 days subject to receipt of advance payment, artwork confirmation, vessel availability at load port.',
  'Subject to Indian jurisdiction/Government Rules & Regulation',
  "Merchandise will remain seller's property until full invoice amount has been received. If there is any delay or non-fulfilment of payment term from the buyer, then seller has the right to stop/hold/call back the shipment in due time or resell / transfer goods to other buyer. Under such a scenario, the acceptance of this offer will be treated as 'no objection certificate' that may be required for reimport",
  'Buyer is responsible for clearing (including all charges like detention, demurrage, custom charges, shipping line charges, etc. if any) at destination port.',
  'In case buyer does not accept their shipment within 5 days from the date of arrival of cargo at destination port, then shipper has the right to transfer the said cargo with the same brand name in that country & the buyer shall not have any objection on the same',
  'Contract based on G.A.F.T.A no. 88, in case any dispute arise arbitration will be done as per G.A.F.T.A no.125. This confirmation is final and binding for the above mentioned transaction.',
  'Any delay in shipment due to shutout of vessel/ container or due to delay in their normal schedule, buyer to provide necessary extension of shipment but the same should not be exceed more than 2 weeks. Seller is not responsible for any cost & consequences due to delay in vessel arrival at destinations for whatever reasons.',
  'If in any case the buyer fails to clear the cargo at port and full payment of invoice value to us, all the cost including return ocean freight, destination port charges, line demurrage & Taxes, or any other losses will be recovered from buyer.',
  'If buyer does not pay an invoiced amount within 3 working days period, Buyer will pay finance charges of five percent (5%) per month on the late balance in addition to agreed invoice price and seller reserve the right to withhold/cancel shipment (either in whole or partial) of the goods until full payment is made.',
  'Due to any reason, if goods are damaged / stolen then buyer will appoint the insurance agent for further inspection.',
  'In case POL /POD or Final Destination country is suffering from any kind of war / strike / New port rule / Natural Disaster/ Or due to any other reason goods get stuck / trapped on port or road, supplier will not be responsible for any kind of losses incurred in any form. If the buyer cancels the deal due to this, all the charges related to diversion or call back will be borne by the buyer',
  'Any kind of Dispute or discrepancy in quality of merchandise must be informed within 24 hours from the date of receipt of goods, no claim will be accepted later. Seller is not responsible for any cost & consequences for whatever reasons thereafter.',
  'Any kind of additional charges or surcharges levied by the shipping line during the time of shipment or while the goods are in transit, due to war or any other reason it will be buyer responsibility and will be fully borne by the buyer',
  'Any GRI implemented by shipping line at the time of shipment, buyer will be liable to pay the difference in the freight',
];

export const BANK_DOCS = [
  ['COMMERCIAL INVOICE', 'inv', '3+1'],
  ['PACKING LIST', 'inv', '1+1'],
  ['MARINE INSURANCE POLICY', '', '1+1'],
  ['CERTIFICATE OF ORIGIN', '', '1+1'],
  ['PHYTOSANITARY CERTIFICATE', '', '1+1'],
  ['FUMIGATION CERTIFICATE', '', '1+1'],
  ['BILL OF LADING NUMBER', 'bl', '3+1'],
  ['CERTIFICATE OF ANALYSIS', '', '0'],
];

export const DEFAULT_QUOTE_TERMS = [
  'Prices are valid until the date shown above and subject to confirmation at the time of order.',
  'Quantities, packing and specifications as listed; samples available on request.',
  'Shipment within 30 - 45 days from receipt of advance payment and confirmed artwork / packing.',
  'All bank charges outside India are on the buyer\'s account.',
  'Prices are subject to change with market fluctuation, freight rates and government regulations.',
];

/** A new, empty document snapshot with sensible defaults. */
export function blankShipment() {
  return {
    enqNo: '', enqDate: '', source: 'WhatsApp', contact: '', requiredBy: '', notes: '', rawMessage: '',
    quoteNo: '', quoteDate: '', validTill: '', quoteTerms: [...DEFAULT_QUOTE_TERMS],
    piNo: '', piDate: '', invNo: '', invDate: '', buyerOrder: '', otherRef: '',
    consignee: '', toOrder: true, buyer: '', notify1: '', notify2: '',
    origin: 'INDIA', destCountry: '',
    preCarriage: 'BY ROAD', placeReceipt: '', vessel: '', pol: 'JNPT, NHAVA SHEVA', pod: '', finalDest: '',
    incoterm: 'FOB', incotermPlace: 'JNPT, NHAVA SHEVA', payment: '', currency: 'USD',
    sbNo: '', sbDate: '', blNo: '', blDate: '', bookingNo: '', shippingLine: '', freightAt: '', originalBls: '3',
    marks: '', freight: '', insurance: '', advance: '', insurancePolicy: '', rodtep: true, drawback: true,
    containers: [{ no: '', size: '20 Ft', lineSeal: '', exporterSeal: '', vehicle: '', tare: '', pkgs: '', gross: '', net: '' }],
    lines: [],
    consolidate: false,
    terms: [...DEFAULT_TERMS],
    bankTo: 'Punjab National Bank\nMalad West, Mumbai', bankSubject: 'Export Bill for Collection at Sight', bankDate: '', lcNo: '',
    consigneeBank: '', receipts: [],
    boeTenor: '100% CAD', drawee: '', negotiatingBank: '',
    vgm: { name: 'ALOK DHANUKA', designation: 'DIRECTOR', mobile: '+91 81692 82942', cscMax: '', weighbridge: '', weighTime: '', slipNo: '', type: 'NORMAL', hazard: 'GEN', date: '' },
    seal: { place: '', at: '', date: '' },
    disposal: { date: '', amount: '', received: '', remitter: '', purpose: '', isb: 'ISB New Delhi' },
    cargox: { contact: '', email: '', phone: '', taxCode: '', acid: '', polCode: 'INNSA', podCode: '', brand: 'SUNITA' },
  };
}
