
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  phone: { type: String, required: true },
  notes: { type: String, default: "" },
});

const distributedListSchema = new mongoose.Schema({
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: "Agent", required: true },
  items: [itemSchema],
});

module.exports = mongoose.model("DistributedList", distributedListSchema);
