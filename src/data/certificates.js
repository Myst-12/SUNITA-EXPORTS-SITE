// Scanned certificates shown on /certifications/ (preview image + full PDF in /public/certificates/).
// Validity is copied from each document; update the entry and replace the PDF when a certificate is renewed.
export const certificates = [
  { key: 'iso-22000', name: 'ISO 22000:2018', what: 'Food Safety Management System', issuer: 'SP Certification Ltd (UK), AFIST accredited', valid: 'Recertification 16 Apr 2028' },
  { key: 'iso-9001', name: 'ISO 9001:2015', what: 'Quality Management System', issuer: 'Royal Assessments Pvt. Ltd., EGAC / IAF', valid: 'Subject to annual surveillance' },
  { key: 'kosher', name: 'Kosher', what: 'Kosher compliance for rice, herbs and spices', issuer: 'SP Certification Ltd (UK)', valid: 'Recertification 16 Apr 2028' },
  { key: 'fssai', name: 'FSSAI Central Licence', what: 'Food Safety and Standards Authority of India', issuer: 'Licence no. 11524997000625', valid: 'Valid to 11 Nov 2026' },
  { key: 'spices-board', name: 'Spices Board Registration', what: 'Registered exporter of spices (CRES)', issuer: 'Spices Board, Govt. of India', valid: 'Valid to 23 Oct 2027' },
  { key: 'star-export-house', name: 'One Star Export House', what: 'Status holder under Foreign Trade Policy 2023', issuer: 'DGFT, Ministry of Commerce, Govt. of India', valid: 'Valid to 31 Mar 2028' },
  { key: 'iec', name: 'Importer-Exporter Code (IEC)', what: 'Registered importer-exporter', issuer: 'DGFT, Govt. of India', valid: 'Issued 10 Apr 2019' },
].map((c) => ({ ...c, image: `/images/certificates/${c.key}.webp`, pdf: `/certificates/sunita-agri-exports-${c.key}.pdf` }));
