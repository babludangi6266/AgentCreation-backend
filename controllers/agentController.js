
const Agent = require("../models/Agent");

exports.createAgent = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    const agent = new Agent({ name, email, mobile, password });
    await agent.save();
    res.status(201).json(agent);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllAgents = async (req, res) => {
  try {
    const agents = await Agent.find();
    res.json(agents);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
