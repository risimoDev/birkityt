import { prisma } from "@/lib/db";
import { cache } from "react";

/**
 * Manager-editable calculator options (length & fraying surcharges, quantity
 * presets). Stored as JSON in Setting "calc.config". Materials and per-unit
 * prices live in the price groups (edited under /admin/prices).
 */

export type LengthOption = { label: string; surcharge: number };
export type AddonOption = { label: string; surcharge: number };

export type CalcConfig = {
  lengthEnabled: boolean;
  lengthLabel: string;
  lengthOptions: LengthOption[];
  frayingEnabled: boolean;
  frayingLabel: string;
  frayingSurcharge: number;
  /**
   * Multi-select add-ons (e.g. corner rounding, tag holder). Shown only for
   * price groups with `addonsEnabled` — e.g. hanging tags. Several can be
   * chosen at once; their surcharges sum.
   */
  addonsEnabled: boolean;
  addonsLabel: string;
  addons: AddonOption[];
  quantityPresets: number[];
  defaultQuantity: number;
};

export const CALC_CONFIG_KEY = "calc.config";

export const DEFAULT_CALC_CONFIG: CalcConfig = {
  lengthEnabled: true,
  lengthLabel: "Длина изделия",
  lengthOptions: [
    { label: "5см", surcharge: 1 },
    { label: "6см", surcharge: 1 },
    { label: "7см", surcharge: 1 },
    { label: "8см", surcharge: 2 },
  ],
  frayingEnabled: true,
  frayingLabel: "Обработка от осыпания",
  frayingSurcharge: 3,
  addonsEnabled: true,
  addonsLabel: "Дополнения",
  addons: [
    { label: "Скругление углов", surcharge: 2 },
    { label: "Биркодержатель", surcharge: 5 },
  ],
  quantityPresets: [100, 500, 1000, 3000],
  defaultQuantity: 200,
};

/** Coerce arbitrary parsed JSON into a valid CalcConfig, filling gaps. */
export function normalizeCalcConfig(input: unknown): CalcConfig {
  const d = DEFAULT_CALC_CONFIG;
  if (!input || typeof input !== "object") return { ...d };
  const o = input as Record<string, unknown>;

  const lengthOptions = Array.isArray(o.lengthOptions)
    ? o.lengthOptions
        .map((x) => {
          const r = x as Record<string, unknown>;
          return {
            label: String(r?.label ?? "").slice(0, 32),
            surcharge: Math.max(0, Math.floor(Number(r?.surcharge) || 0)),
          };
        })
        .filter((x) => x.label !== "")
    : d.lengthOptions;

  const addons = Array.isArray(o.addons)
    ? o.addons
        .map((x) => {
          const r = x as Record<string, unknown>;
          return {
            label: String(r?.label ?? "").slice(0, 48),
            surcharge: Math.max(0, Math.floor(Number(r?.surcharge) || 0)),
          };
        })
        .filter((x) => x.label !== "")
    : d.addons;

  const quantityPresets = Array.isArray(o.quantityPresets)
    ? o.quantityPresets
        .map((n) => Math.max(1, Math.floor(Number(n) || 0)))
        .filter((n) => n > 0)
        .slice(0, 8)
    : d.quantityPresets;

  return {
    lengthEnabled: typeof o.lengthEnabled === "boolean" ? o.lengthEnabled : d.lengthEnabled,
    lengthLabel: String(o.lengthLabel ?? d.lengthLabel).slice(0, 64) || d.lengthLabel,
    lengthOptions: lengthOptions.length ? lengthOptions : d.lengthOptions,
    frayingEnabled: typeof o.frayingEnabled === "boolean" ? o.frayingEnabled : d.frayingEnabled,
    frayingLabel: String(o.frayingLabel ?? d.frayingLabel).slice(0, 64) || d.frayingLabel,
    frayingSurcharge: Math.max(0, Math.floor(Number(o.frayingSurcharge) || 0)),
    addonsEnabled: typeof o.addonsEnabled === "boolean" ? o.addonsEnabled : d.addonsEnabled,
    addonsLabel: String(o.addonsLabel ?? d.addonsLabel).slice(0, 64) || d.addonsLabel,
    addons,
    quantityPresets: quantityPresets.length ? quantityPresets : d.quantityPresets,
    defaultQuantity: Math.max(1, Math.floor(Number(o.defaultQuantity) || d.defaultQuantity)),
  };
}

export const getCalcConfig = cache(async (): Promise<CalcConfig> => {
  try {
    const row = await prisma.setting.findUnique({ where: { key: CALC_CONFIG_KEY } });
    if (!row) return { ...DEFAULT_CALC_CONFIG };
    return normalizeCalcConfig(JSON.parse(row.value));
  } catch {
    return { ...DEFAULT_CALC_CONFIG };
  }
});

/** Resolve the surcharge for a chosen length label against a config. */
export function lengthSurchargeFor(config: CalcConfig, label: string | null | undefined): number {
  if (!config.lengthEnabled || !label) return 0;
  return config.lengthOptions.find((o) => o.label === label)?.surcharge ?? 0;
}

/**
 * Sum the surcharges of the selected add-on labels against a config.
 * Unknown labels are ignored. When `groupEnabled` is false (the chosen group
 * doesn't offer add-ons) or the feature is off, returns 0.
 */
export function addonsSurchargeFor(
  config: CalcConfig,
  labels: string[] | null | undefined,
  groupEnabled: boolean,
): number {
  if (!config.addonsEnabled || !groupEnabled || !labels?.length) return 0;
  return config.addons
    .filter((a) => labels.includes(a.label))
    .reduce((sum, a) => sum + a.surcharge, 0);
}
