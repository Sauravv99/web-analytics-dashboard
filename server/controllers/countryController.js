const Country = require('../models/Country');

const getCountries = async (req, res) => {
  try {
    const countries = await Country.find();
    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const addCountry = async (req, res) => {
  try {
    const { id, value } = req.body;
    const country = new Country({ id, value });
    await country.save();
    res.status(201).json(country);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { getCountries, addCountry };
