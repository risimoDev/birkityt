/**
 * Legal details of the operator, shown in the footer and in /privacy.
 * Not editable in admin on purpose — these change only with the company.
 */
export const LEGAL = {
  entity: "ИП Аликина Я. А.",
  inn: "590771847110",
  ogrn: "322595800089572",
} as const;

/** Geo coordinates of the workshop, used by the LocalBusiness markup. */
export const GEO = { lat: 57.997007, lng: 56.204533 } as const;

/** Year the company started production in Perm. */
export const FOUNDING_YEAR = 2017;
