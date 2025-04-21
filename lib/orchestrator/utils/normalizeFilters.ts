type RawFilters = Record<string, any>;

export function normalizeCompanyFilters(raw: RawFilters): Record<string, any> {
  const out: Record<string, any> = {};

  for (const key in raw) {
    const value = raw[key];

    // Handle known keys
    if (key === "location" || key === "country") {
      out["hq_country"] = value;
    }

    if (key.toLowerCase() === "sector") {
      out["sector"] = value;
    }

    if (key.toLowerCase() === "sales") {
      const parsed = extractNumber(value);
      if (parsed !== null) out["sales_in_eurm_gt"] = parsed;
    }

    if (key.toLowerCase() === "ebitda") {
      const parsed = extractNumber(value);
      if (parsed !== null) out["ebitda_in_eurm_gt"] = parsed;
    }

    if (key.toLowerCase() === "margin") {
      const parsed = extractNumber(value);
      if (parsed !== null) out["marge_gt"] = parsed;
    }
  }

  return out;
}

// Helper to convert things like "> €50M" → 50
function extractNumber(input: any): number | null {
  if (typeof input === "number") return input;
  if (typeof input === "string") {
    const match = input.match(/([0-9.]+)/);
    if (match) return parseFloat(match[1]);
  }
  return null;
}
