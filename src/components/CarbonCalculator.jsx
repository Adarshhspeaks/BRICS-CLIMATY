import React, { useState, useMemo } from "react";
import {
  BRICS_CALCULATOR_COUNTRIES,
  FACILITY_TYPES,
  calculateCarbonOffset
} from "../lib/carbonCalculatorData";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";
import "./CarbonCalculator.css";

export default function CarbonCalculator() {
  const [selectedCountryCode, setSelectedCountryCode] = useState("IN");
  const [selectedFacilityId, setSelectedFacilityId] = useState("commercial");
  const [monthlyBillUsd, setMonthlyBillUsd] = useState(4000);

  // Modal State for Consultation Request
  const [modalOpen, setModalOpen] = useState(false);
  const [consultForm, setConsultForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    notes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const selectedCountry = useMemo(() => {
    return (
      BRICS_CALCULATOR_COUNTRIES.find((c) => c.code === selectedCountryCode) ||
      BRICS_CALCULATOR_COUNTRIES[0]
    );
  }, [selectedCountryCode]);

  // When country changes, adjust default bill
  const handleCountryChange = (countryCode) => {
    setSelectedCountryCode(countryCode);
    const country = BRICS_CALCULATOR_COUNTRIES.find((c) => c.code === countryCode);
    if (country) {
      setMonthlyBillUsd(country.defaultMonthlyBillUsd);
    }
  };

  const results = useMemo(() => {
    return calculateCarbonOffset({
      countryCode: selectedCountryCode,
      facilityId: selectedFacilityId,
      monthlyBillUsd
    });
  }, [selectedCountryCode, selectedFacilityId, monthlyBillUsd]);

  const handleConsultSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    const auditSummary = `[Carbon Calculator Audit Request]
Country: ${results.country.name} (${results.country.code})
Facility Type: ${results.facility.label}
Monthly Energy Spend: $${results.monthlyBillUsd.toLocaleString()} (${results.country.currencySymbol} ${results.monthlyBillLocal.toLocaleString()})
Recommended Solar Size: ${results.recommendedSolarSystemKw} kWp
Annual CO2 Avoided: ${results.annualCo2AvoidedTons} Metric Tons/yr
Annual Savings: $${results.annualCostSavingsUsd.toLocaleString()} (${results.country.currencySymbol} ${results.annualCostSavingsLocal.toLocaleString()})
Estimated Payback: ${results.paybackPeriodYears} Years
25-Year ROI: ${results.roi25YrPercent}%
Phone: ${consultForm.phone || "N/A"}
Notes: ${consultForm.notes || "None"}`;

    try {
      if (isSupabaseConfigured() && supabase) {
        const { error } = await supabase.from("contact_inquiries").insert([
          {
            name: consultForm.name.trim(),
            email: consultForm.email.trim(),
            company: consultForm.company.trim() || null,
            service: `Solar Carbon Audit - ${results.facility.label}`,
            energy_bill: `$${results.monthlyBillUsd.toLocaleString()} / month (${results.country.currencySymbol} ${results.monthlyBillLocal.toLocaleString()})`,
            message: auditSummary
          }
        ]);

        if (error) {
          console.error("Supabase audit submission error:", error);
          throw new Error(error.message || "Failed to submit audit request.");
        }
      } else {
        await new Promise((resolve) => setTimeout(resolve, 600));
      }

      setSubmitSuccess(true);
    } catch (err) {
      setSubmitError(err.message || "Could not submit your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetModal = () => {
    setModalOpen(false);
    setSubmitSuccess(false);
    setSubmitError("");
    setConsultForm({ name: "", email: "", company: "", phone: "", notes: "" });
  };

  return (
    <section className="carbon-calculator-section" id="carbon-calculator">
      <div className="container">
        <div className="text-center mb-40">
          <div className="badge-pill mb-16">
            <span className="badge-dot pulse-emerald"></span>
            <span>Interactive Clean Energy Engine</span>
          </div>

          <h2 className="section-title">
            BRICS Carbon Offset & Solar ROI Calculator
          </h2>

          <p className="section-subtitle">
            Estimate your organization's annual greenhouse gas reduction ($CO_2$ avoided), tree offset equivalence, electricity cost savings, and investment payback across all 10 BRICS partner nations.
          </p>
        </div>

        <div className="calculator-card">
          {/* STEP 1: COUNTRY SELECTOR */}
          <div className="calculator-step">
            <div className="step-header">
              <span className="step-num">01</span>
              <div>
                <h3 className="step-title">Select BRICS Partner Nation</h3>
                <p className="step-desc">Applies country-specific grid emission factors ($gCO_2/kWh$), solar irradiance, and commercial tariffs.</p>
              </div>
            </div>

            <div className="calc-countries-grid">
              {BRICS_CALCULATOR_COUNTRIES.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  className={`calc-country-pill ${selectedCountryCode === c.code ? "active" : ""}`}
                  onClick={() => handleCountryChange(c.code)}
                >
                  <span className="calc-flag">{c.flag}</span>
                  <span className="calc-country-name">{c.name}</span>
                  <span className="calc-currency-badge">{c.currencySymbol}</span>
                </button>
              ))}
            </div>
          </div>

          {/* STEP 2: FACILITY TYPE */}
          <div className="calculator-step">
            <div className="step-header">
              <span className="step-num">02</span>
              <div>
                <h3 className="step-title">Select Facility / Operations Type</h3>
                <p className="step-desc">Calibrates load profiles, peak operational hours, and available rooftop/ground installation efficiency.</p>
              </div>
            </div>

            <div className="facility-types-grid">
              {FACILITY_TYPES.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className={`facility-card ${selectedFacilityId === f.id ? "active" : ""}`}
                  onClick={() => setSelectedFacilityId(f.id)}
                >
                  <div className="facility-radio-dot"></div>
                  <span className="facility-label">{f.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* STEP 3: MONTHLY ENERGY SPEND SLIDER */}
          <div className="calculator-step">
            <div className="step-header">
              <span className="step-num">03</span>
              <div>
                <h3 className="step-title">Estimated Monthly Electricity Spend</h3>
                <p className="step-desc">Adjust the slider or enter your monthly utility cost in {selectedCountry.currencyCode} / USD.</p>
              </div>
            </div>

            <div className="slider-wrapper-box">
              <div className="slider-values-row">
                <div className="slider-primary-val">
                  <span className="currency-prefix">{selectedCountry.currencySymbol}</span>
                  <span className="val-amount">{results.monthlyBillLocal.toLocaleString()}</span>
                  <span className="val-unit">/ month ({selectedCountry.currencyCode})</span>
                </div>
                <div className="slider-secondary-val">
                  ≈ ${results.monthlyBillUsd.toLocaleString()} USD
                </div>
              </div>

              <input
                type="range"
                className="calc-range-slider"
                min={selectedCountry.minBillUsd}
                max={selectedCountry.maxBillUsd}
                step={selectedCountry.stepBillUsd}
                value={monthlyBillUsd}
                onChange={(e) => setMonthlyBillUsd(Number(e.target.value))}
              />

              <div className="slider-preset-btns">
                {[1000, 3000, 5000, 10000, 25000, 50000].map((preset) => {
                  if (preset < selectedCountry.minBillUsd || preset > selectedCountry.maxBillUsd) return null;
                  return (
                    <button
                      key={preset}
                      type="button"
                      className={`preset-btn ${monthlyBillUsd === preset ? "active" : ""}`}
                      onClick={() => setMonthlyBillUsd(preset)}
                    >
                      ${(preset / 1000).toFixed(0)}k/mo
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* DYNAMIC RESULTS DASHBOARD */}
          <div className="calc-results-dashboard">
            <div className="results-badge-row">
              <span className="results-tag">⚡ VERIFIED AUDIT PROJECTION</span>
              <span className="results-country-tag">
                {selectedCountry.flag} {selectedCountry.name} Grid ({selectedCountry.gridEmissionFactorKgPerKwh * 1000} g CO₂/kWh)
              </span>
            </div>

            {/* TOP 2 HIGHLIGHT CARDS */}
            <div className="calc-highlights-grid">
              {/* CO2 OFFSET */}
              <div className="highlight-card eco-card">
                <div className="highlight-icon-box">🌍</div>
                <div className="highlight-content">
                  <span className="highlight-label">Annual Greenhouse Gas Avoided</span>
                  <div className="highlight-metric-row">
                    <span className="highlight-number text-emerald">
                      {results.annualCo2AvoidedTons.toLocaleString()}
                    </span>
                    <span className="highlight-unit">Metric Tons CO₂ / yr</span>
                  </div>
                  <p className="highlight-sub">
                    25-Year Cumulative Impact: <strong>{results.lifetime25YrCo2Tons.toLocaleString()} Tons CO₂</strong>
                  </p>
                </div>
              </div>

              {/* ANNUAL SAVINGS */}
              <div className="highlight-card finance-card">
                <div className="highlight-icon-box">💰</div>
                <div className="highlight-content">
                  <span className="highlight-label">Annual Electricity Cost Savings</span>
                  <div className="highlight-metric-row">
                    <span className="highlight-number text-gold">
                      {selectedCountry.currencySymbol} {results.annualCostSavingsLocal.toLocaleString()}
                    </span>
                    <span className="highlight-unit">/ year</span>
                  </div>
                  <p className="highlight-sub">
                    25-Year Net Energy Value: <strong>{selectedCountry.currencySymbol} {results.lifetime25YrSavingsLocal.toLocaleString()}</strong> (${results.lifetime25YrSavingsUsd.toLocaleString()} USD)
                  </p>
                </div>
              </div>
            </div>

            {/* SECONDARY 4-STAT GRID */}
            <div className="calc-sub-stats-grid">
              <div className="sub-stat-box">
                <span className="sub-stat-icon">🌳</span>
                <div>
                  <span className="sub-stat-title">Tree Planting Equivalence</span>
                  <strong className="sub-stat-val">{results.treesEquivalent.toLocaleString()} trees / yr</strong>
                </div>
              </div>

              <div className="sub-stat-box">
                <span className="sub-stat-icon">🚗</span>
                <div>
                  <span className="sub-stat-title">Vehicles Offset Annually</span>
                  <strong className="sub-stat-val">{results.carsRemovedEquivalent} passenger cars</strong>
                </div>
              </div>

              <div className="sub-stat-box">
                <span className="sub-stat-icon">⚡</span>
                <div>
                  <span className="sub-stat-title">Recommended Solar Array</span>
                  <strong className="sub-stat-val">{results.recommendedSolarSystemKw} kWp (~{results.requiredAreaSqM} m²)</strong>
                </div>
              </div>

              <div className="sub-stat-box">
                <span className="sub-stat-icon">⏱️</span>
                <div>
                  <span className="sub-stat-title">Payback & Projected ROI</span>
                  <strong className="sub-stat-val text-emerald">
                    {results.paybackPeriodYears} Yrs Payback ({results.roi25YrPercent}% ROI)
                  </strong>
                </div>
              </div>
            </div>

            {/* CALL TO ACTION */}
            <div className="calc-action-bar">
              <div className="action-text">
                <h4>Ready to claim your sustainability & cost reduction roadmap?</h4>
                <p>Request a verified feasibility engineering assessment tailored to your facility's roof orientation and utility billing.</p>
              </div>
              <button
                type="button"
                className="btn btn-primary btn-lg calc-cta-btn"
                onClick={() => setModalOpen(true)}
              >
                Request Free Engineering Audit →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CONSULTATION MODAL */}
      {modalOpen && (
        <div className="calc-modal-backdrop" onClick={handleResetModal}>
          <div className="calc-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={handleResetModal} aria-label="Close modal">
              ✕
            </button>

            {submitSuccess ? (
              <div className="modal-success-content">
                <div className="modal-success-icon">✓</div>
                <h3>Audit Request Received!</h3>
                <p>
                  Thank you, <strong>{consultForm.name}</strong>. A BRICS-CLIMATY senior energy engineer will review your{" "}
                  <strong>{results.recommendedSolarSystemKw} kWp ({results.country.name})</strong> solar audit projection and email your complete feasibility report within 24 business hours.
                </p>
                <div className="audit-recap-box">
                  <div><strong>Annual CO₂ Offset:</strong> {results.annualCo2AvoidedTons} Tons/yr</div>
                  <div><strong>Projected Savings:</strong> {results.country.currencySymbol} {results.annualCostSavingsLocal.toLocaleString()} / year</div>
                  <div><strong>Payback Period:</strong> {results.paybackPeriodYears} Years</div>
                </div>
                <button type="button" className="btn btn-primary w-full mt-16" onClick={handleResetModal}>
                  Close & Continue Exploring
                </button>
              </div>
            ) : (
              <form onSubmit={handleConsultSubmit} className="modal-form">
                <div className="modal-header">
                  <span className="modal-badge">{selectedCountry.flag} {selectedCountry.name} Facility Audit</span>
                  <h3 className="modal-title">Get Full Engineering Proposal</h3>
                  <p className="modal-subtitle">
                    Our accredited engineers will verify your roof viability, local utility incentives, and battery storage options.
                  </p>
                </div>

                {submitError && (
                  <div className="modal-error-alert">⚠️ {submitError}</div>
                )}

                <div className="modal-audit-summary-pill">
                  <span>Projected Array: <strong>{results.recommendedSolarSystemKw} kWp</strong></span>
                  <span>CO₂ Cut: <strong>{results.annualCo2AvoidedTons} Tons/yr</strong></span>
                  <span>Payback: <strong>{results.paybackPeriodYears} Yrs</strong></span>
                </div>

                <div className="modal-form-group">
                  <label className="modal-label">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    className="modal-input"
                    placeholder="e.g. Elena Rostova"
                    value={consultForm.name}
                    onChange={(e) => setConsultForm({ ...consultForm, name: e.target.value })}
                  />
                </div>

                <div className="modal-form-row">
                  <div className="modal-form-group">
                    <label className="modal-label">Work Email *</label>
                    <input
                      type="email"
                      required
                      className="modal-input"
                      placeholder="elena@company.com"
                      value={consultForm.email}
                      onChange={(e) => setConsultForm({ ...consultForm, email: e.target.value })}
                    />
                  </div>

                  <div className="modal-form-group">
                    <label className="modal-label">Company / Institution</label>
                    <input
                      type="text"
                      className="modal-input"
                      placeholder="e.g. Veloce Manufacturing"
                      value={consultForm.company}
                      onChange={(e) => setConsultForm({ ...consultForm, company: e.target.value })}
                    />
                  </div>
                </div>

                <div className="modal-form-group">
                  <label className="modal-label">Phone / WhatsApp Number (Optional)</label>
                  <input
                    type="tel"
                    className="modal-input"
                    placeholder="+91 / +86 / +55 ..."
                    value={consultForm.phone}
                    onChange={(e) => setConsultForm({ ...consultForm, phone: e.target.value })}
                  />
                </div>

                <div className="modal-form-group">
                  <label className="modal-label">Specific Facility Notes (Optional)</label>
                  <textarea
                    rows="2"
                    className="modal-textarea"
                    placeholder="e.g. Concrete flat roof, looking to integrate 200kWh battery storage..."
                    value={consultForm.notes}
                    onChange={(e) => setConsultForm({ ...consultForm, notes: e.target.value })}
                  />
                </div>

                <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-lg w-full mt-12">
                  {isSubmitting ? "Submitting Request..." : "Submit Feasibility Request →"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
