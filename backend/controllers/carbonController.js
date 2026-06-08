const { calculateFootprint } = require('../utils/calculators');

exports.processFootprint = (req, res, next) => {
  try {
    const { electricityKwh, vehicleType, transportKm } = req.body;

    // Input Validation
    if (electricityKwh === undefined || transportKm === undefined || !vehicleType) {
      return res.status(400).json({ error: "Missing required tracking metrics fields." });
    }

    const parsedKwh = parseFloat(electricityKwh);
    const parsedKm = parseFloat(transportKm);

    if (isNaN(parsedKwh) || parsedKwh < 0 || isNaN(parsedKm) || parsedKm < 0) {
      return res.status(400).json({ error: "Metrics fields must be valid positive numbers." });
    }

    const validVehicles = ['petrol', 'diesel', 'electric', 'public'];
    if (!validVehicles.includes(vehicleType)) {
      return res.status(400).json({ error: "Invalid vehicle classification type." });
    }

    const results = calculateFootprint({
      electricityKwh: parsedKwh,
      vehicleType,
      transportKm: parsedKm
    });

    return res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};