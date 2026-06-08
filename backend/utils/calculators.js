/**
 * Emission Factors (kg CO2 per unit)
 * Electricity: per kWh
 * Transport: per km based on vehicle type
 */
const EMISSION_FACTORS = {
  electricity: 0.475, // Global average kg CO2e per kWh
  transport: {
    petrol: 0.170,
    diesel: 0.171,
    electric: 0.047,
    public: 0.065
  }
};

/**
 * Calculates sustainability score from 0 (Poor) to 100 (Excellent)
 * Based on a target sustainable monthly footprint of ~150kg CO2
 */
const calculateSustainabilityScore = (totalEmissions) => {
  const targetEmissions = 150; 
  if (totalEmissions <= targetEmissions) return 100;
  
  // Degrade score as emissions exceed target
  const penalty = ((totalEmissions - targetEmissions) / 1000) * 50;
  return Math.max(0, Math.min(100, Math.round(100 - penalty)));
};

/**
 * Generates actionable recommendations based on emission distributions
 */
const generateRecommendations = (electricity, transport) => {
  const recommendations = [];
  
  if (electricity > 150) {
    recommendations.push("Consider switching to LED bulbs and energy-efficient (Star-rated) appliances.");
    recommendations.push("Unplug vampire electronics when not in use to reduce standby power consumption.");
  } else {
    recommendations.push("Great job keeping utility footprints minimal! Consider exploring rooftop solar options.");
  }

  if (transport > 150) {
    recommendations.push("Try carpooling, cycling, or utilizing public transport at least twice a week.");
    recommendations.push("Ensure proper tire inflation and regular vehicle maintenance to optimize fuel efficiency.");
  } else {
    recommendations.push("Your transit footprints are highly sustainable. Keep walking and choosing low-emission transit!");
  }

  return recommendations;
};

exports.calculateFootprint = (data) => {
  const { electricityKwh, vehicleType, transportKm } = data;

  // Calculate Breakdowns
  const electricityEmissions = parseFloat((electricityKwh * EMISSION_FACTORS.electricity).toFixed(2));
  
  const transportFactor = EMISSION_FACTORS.transport[vehicleType] || EMISSION_FACTORS.transport.petrol;
  const transportEmissions = parseFloat((transportKm * transportFactor).toFixed(2));
  
  const totalEmissions = parseFloat((electricityEmissions + transportEmissions).toFixed(2));

  // Offset Estimator: 1 mature tree absorbs ~22kg of CO2 per year (~1.83kg per month)
  const treesNeeded = parseFloat((totalEmissions / 1.83).toFixed(1));

  const sustainabilityScore = calculateSustainabilityScore(totalEmissions);
  const recommendations = generateRecommendations(electricityEmissions, transportEmissions);

  return {
    summary: {
      totalEmissions,
      unit: "kg CO2e/month",
      sustainabilityScore,
      treesNeeded
    },
    breakdown: {
      electricity: electricityEmissions,
      transport: transportEmissions
    },
    recommendations
  };
};