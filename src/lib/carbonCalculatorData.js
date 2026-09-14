// ==============================================================================
// BRICS-CLIMATY: Carbon Offset & Solar ROI Calculation Engine
// Country-specific grid emission factors, solar irradiance, and financial models
// ==============================================================================

export const BRICS_CALCULATOR_COUNTRIES = [
  {
    code: "IN",
    name: "India",
    flag: "🇮🇳",
    currencySymbol: "₹",
    currencyCode: "INR",
    usdRate: 86.5, // INR per USD
    gridEmissionFactorKgPerKwh: 0.71, // 710 g CO2/kWh
    avgTariffPerKwhUsd: 0.10,
    solarSunHoursPerDay: 5.2,
    defaultMonthlyBillUsd: 4000,
    minBillUsd: 500,
    maxBillUsd: 50000,
    stepBillUsd: 500,
    paybackYearsBaseline: 3.4
  },
  {
    code: "CN",
    name: "China",
    flag: "🇨🇳",
    currencySymbol: "¥",
    currencyCode: "CNY",
    usdRate: 7.25, // CNY per USD
    gridEmissionFactorKgPerKwh: 0.55, // 550 g CO2/kWh
    avgTariffPerKwhUsd: 0.09,
    solarSunHoursPerDay: 4.6,
    defaultMonthlyBillUsd: 6000,
    minBillUsd: 1000,
    maxBillUsd: 80000,
    stepBillUsd: 1000,
    paybackYearsBaseline: 3.2
  },
  {
    code: "BR",
    name: "Brazil",
    flag: "🇧🇷",
    currencySymbol: "R$",
    currencyCode: "BRL",
    usdRate: 5.75, // BRL per USD
    gridEmissionFactorKgPerKwh: 0.13, // 130 g CO2/kWh (High hydro/renewable grid)
    avgTariffPerKwhUsd: 0.15,
    solarSunHoursPerDay: 5.4,
    defaultMonthlyBillUsd: 3500,
    minBillUsd: 500,
    maxBillUsd: 40000,
    stepBillUsd: 500,
    paybackYearsBaseline: 3.6
  },
  {
    code: "RU",
    name: "Russia",
    flag: "🇷🇺",
    currencySymbol: "₽",
    currencyCode: "RUB",
    usdRate: 92.0, // RUB per USD
    gridEmissionFactorKgPerKwh: 0.38, // 380 g CO2/kWh
    avgTariffPerKwhUsd: 0.065,
    solarSunHoursPerDay: 3.8,
    defaultMonthlyBillUsd: 3000,
    minBillUsd: 500,
    maxBillUsd: 35000,
    stepBillUsd: 500,
    paybackYearsBaseline: 4.5
  },
  {
    code: "ZA",
    name: "South Africa",
    flag: "🇿🇦",
    currencySymbol: "R",
    currencyCode: "ZAR",
    usdRate: 18.2, // ZAR per USD
    gridEmissionFactorKgPerKwh: 0.89, // 890 g CO2/kWh (Coal-heavy grid = huge solar offset impact)
    avgTariffPerKwhUsd: 0.13,
    solarSunHoursPerDay: 5.6,
    defaultMonthlyBillUsd: 4500,
    minBillUsd: 500,
    maxBillUsd: 45000,
    stepBillUsd: 500,
    paybackYearsBaseline: 3.1
  },
  {
    code: "EG",
    name: "Egypt",
    flag: "🇪🇬",
    currencySymbol: "E£",
    currencyCode: "EGP",
    usdRate: 48.5, // EGP per USD
    gridEmissionFactorKgPerKwh: 0.49, // 490 g CO2/kWh
    avgTariffPerKwhUsd: 0.055,
    solarSunHoursPerDay: 5.8,
    defaultMonthlyBillUsd: 2500,
    minBillUsd: 300,
    maxBillUsd: 30000,
    stepBillUsd: 500,
    paybackYearsBaseline: 3.8
  },
  {
    code: "AE",
    name: "UAE",
    flag: "🇦🇪",
    currencySymbol: "AED",
    currencyCode: "AED",
    usdRate: 3.67, // AED per USD
    gridEmissionFactorKgPerKwh: 0.42, // 420 g CO2/kWh
    avgTariffPerKwhUsd: 0.105,
    solarSunHoursPerDay: 6.1,
    defaultMonthlyBillUsd: 8000,
    minBillUsd: 1000,
    maxBillUsd: 100000,
    stepBillUsd: 1000,
    paybackYearsBaseline: 3.3
  },
  {
    code: "SA",
    name: "Saudi Arabia",
    flag: "🇸🇦",
    currencySymbol: "SAR",
    currencyCode: "SAR",
    usdRate: 3.75, // SAR per USD
    gridEmissionFactorKgPerKwh: 0.52, // 520 g CO2/kWh
    avgTariffPerKwhUsd: 0.085,
    solarSunHoursPerDay: 6.2,
    defaultMonthlyBillUsd: 7000,
    minBillUsd: 1000,
    maxBillUsd: 90000,
    stepBillUsd: 1000,
    paybackYearsBaseline: 3.5
  },
  {
    code: "ET",
    name: "Ethiopia",
    flag: "🇪🇹",
    currencySymbol: "ETB",
    currencyCode: "ETB",
    usdRate: 125.0, // ETB per USD
    gridEmissionFactorKgPerKwh: 0.09, // 90 g CO2/kWh
    avgTariffPerKwhUsd: 0.035,
    solarSunHoursPerDay: 5.5,
    defaultMonthlyBillUsd: 1500,
    minBillUsd: 200,
    maxBillUsd: 20000,
    stepBillUsd: 200,
    paybackYearsBaseline: 4.8
  },
  {
    code: "IR",
    name: "Iran",
    flag: "🇮🇷",
    currencySymbol: "$",
    currencyCode: "USD",
    usdRate: 1.0,
    gridEmissionFactorKgPerKwh: 0.51, // 510 g CO2/kWh
    avgTariffPerKwhUsd: 0.045,
    solarSunHoursPerDay: 5.6,
    defaultMonthlyBillUsd: 2000,
    minBillUsd: 300,
    maxBillUsd: 25000,
    stepBillUsd: 300,
    paybackYearsBaseline: 4.2
  }
];

export const FACILITY_TYPES = [
  { id: "commercial", label: "Commercial Office / Mall", solarFactor: 0.70, spacePerKwSqM: 6.5 },
  { id: "industrial", label: "Manufacturing & Factory", solarFactor: 0.78, spacePerKwSqM: 6.0 },
  { id: "residential", label: "Residential Complex", solarFactor: 0.65, spacePerKwSqM: 7.0 },
  { id: "campus", label: "University / Hospital Campus", solarFactor: 0.75, spacePerKwSqM: 6.2 }
];

/**
 * Calculates environmental and financial returns
 * @param {Object} params
 * @param {string} params.countryCode
 * @param {string} params.facilityId
 * @param {number} params.monthlyBillUsd
 */
export function calculateCarbonOffset({ countryCode, facilityId, monthlyBillUsd }) {
  const country = BRICS_CALCULATOR_COUNTRIES.find((c) => c.code === countryCode) || BRICS_CALCULATOR_COUNTRIES[0];
  const facility = FACILITY_TYPES.find((f) => f.id === facilityId) || FACILITY_TYPES[0];

  const annualBillUsd = monthlyBillUsd * 12;
  const annualElectricityKwh = annualBillUsd / country.avgTariffPerKwhUsd;

  // Recommended Solar System Size (kWp) to offset facility target %
  const targetKwhOffset = annualElectricityKwh * facility.solarFactor;
  const annualKwhPerKwInstalled = country.solarSunHoursPerDay * 365 * 0.82; // System performance ratio ~82%
  const recommendedSolarSystemKw = Math.round((targetKwhOffset / annualKwhPerKwInstalled) * 10) / 10;

  // Space Required
  const requiredAreaSqM = Math.round(recommendedSolarSystemKw * facility.spacePerKwSqM);
  const requiredAreaSqFt = Math.round(requiredAreaSqM * 10.764);

  // Environmental Impact
  const annualKwhGenerated = recommendedSolarSystemKw * annualKwhPerKwInstalled;
  const annualCo2AvoidedKg = annualKwhGenerated * country.gridEmissionFactorKgPerKwh;
  const annualCo2AvoidedTons = Math.round((annualCo2AvoidedKg / 1000) * 10) / 10;
  const lifetime25YrCo2Tons = Math.round(annualCo2AvoidedTons * 25 * 0.93); // accounting for panel degradation

  // Tree & Vehicle Equivalence
  // 1 tree absorbs ~22 kg CO2 / year
  const treesEquivalent = Math.round(annualCo2AvoidedKg / 22);
  // Average passenger car ~4,600 kg CO2 / year
  const carsRemovedEquivalent = Math.round((annualCo2AvoidedKg / 4600) * 10) / 10;

  // Financial Returns
  const annualCostSavingsUsd = Math.round(annualKwhGenerated * country.avgTariffPerKwhUsd);
  const annualCostSavingsLocal = Math.round(annualCostSavingsUsd * country.usdRate);

  const lifetime25YrSavingsUsd = Math.round(annualCostSavingsUsd * 23.5); // 25 years with slight degradation & inflation
  const lifetime25YrSavingsLocal = Math.round(lifetime25YrSavingsUsd * country.usdRate);

  // Estimated Turnkey Capital Investment ($750 - $950 per kW installed for commercial solar)
  const estimatedCapexUsd = Math.round(recommendedSolarSystemKw * 850);
  const estimatedCapexLocal = Math.round(estimatedCapexUsd * country.usdRate);

  const paybackPeriodYears = Math.max(2.1, Math.round((estimatedCapexUsd / annualCostSavingsUsd) * 10) / 10);
  const roi25YrPercent = Math.round(((lifetime25YrSavingsUsd - estimatedCapexUsd) / estimatedCapexUsd) * 100);

  return {
    country,
    facility,
    monthlyBillUsd,
    monthlyBillLocal: Math.round(monthlyBillUsd * country.usdRate),
    annualElectricityKwh: Math.round(annualElectricityKwh),
    recommendedSolarSystemKw,
    requiredAreaSqM,
    requiredAreaSqFt,
    annualCo2AvoidedTons,
    lifetime25YrCo2Tons,
    treesEquivalent,
    carsRemovedEquivalent,
    annualCostSavingsUsd,
    annualCostSavingsLocal,
    lifetime25YrSavingsUsd,
    lifetime25YrSavingsLocal,
    estimatedCapexUsd,
    estimatedCapexLocal,
    paybackPeriodYears,
    roi25YrPercent
  };
}
