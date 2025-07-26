const TransportUsageStat = require('../models/TransportUsageStat');

const getAllTransportUsageStats = async (req, res) => {
  try {
    const data = await TransportUsageStat.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching transport usage stats", error });
  }
};

module.exports = {
  getAllTransportUsageStats,
};
