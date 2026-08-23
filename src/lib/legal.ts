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

/**
 * The same address as Setting["site.address"], split into parts because
 * Schema.org needs them separately. Keep the two in sync: editing the address
 * in admin changes what visitors see, this changes what crawlers read.
 */
export const ADDRESS = {
  street: "ул. Кронштадтская, 39А",
  locality: "Пермь",
  region: "Пермский край",
  country: "RU",
} as const;

/** Пн–Пт 10:00–18:00 — mirrors Setting["site.hours"]. */
export const OPENING_HOURS = {
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  opens: "10:00",
  closes: "18:00",
} as const;

/** Year the company started production in Perm. */
export const FOUNDING_YEAR = 2017;
