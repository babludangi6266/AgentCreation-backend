
const DistributedList = require("../models/DistributedList");
const Agent = require("../models/Agent");
const multer = require("multer");
const csvParser = require("csv-parser");
const fs = require("fs");

const upload = multer({ dest: "uploads/" });

exports.uploadCSV = [
  upload.single("file"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    if (!req.file.mimetype.includes("csv")) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ message: "Invalid file type. Please upload a CSV file." });
    }

    try {
      const agents = await Agent.find();
      if (!agents || agents.length === 0) {
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ message: "No agents available" });
      }

      const items = [];
      fs.createReadStream(req.file.path)
        .pipe(csvParser())
        .on("data", (data) => {
          if (data.FirstName && data.Phone) {
            items.push({
              firstName: data.FirstName.trim(),
              phone: data.Phone.trim(),
              notes: data.Notes ? data.Notes.trim() : "",
            });
          }
        })
        .on("end", async () => {
          fs.unlinkSync(req.file.path); // Cleanup the file after parsing

          if (items.length === 0) {
            return res.status(400).json({ message: "No valid data to distribute" });
          }

          const chunkSize = 5; // Assign 5 items to each agent
          let itemIndex = 0;

          for (let i = 0; i < agents.length; i++) {
            const agentItems = items.slice(itemIndex, itemIndex + chunkSize);
            itemIndex += chunkSize;

            if (agentItems.length > 0) {
              try {
                const list = new DistributedList({
                  agentId: agents[i]._id,
                  items: agentItems,
                });
                await list.save();
              } catch (err) {
                console.error(`Error saving list for agent ${agents[i]._id}:`, err.message);
              }
            }
          }

          res.json({ message: "CSV processed and distributed Successfully!!" });
        });
    } catch (err) {
      fs.unlinkSync(req.file.path); // Cleanup the file in case of server error
      res.status(500).json({ message: "Server error", error: err.message });
    }
  },
];


exports.getLists = async (req, res) => {
  try {
    const lists = await DistributedList.find().populate("agentId", "name email");
    res.json(lists);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
