import mongoose from "mongoose";

const statewiseDocsSchema = new mongoose.Schema({
  state: {
    type: String,
    required: true,
  },
  doctype: {
    type: String,
    required: true,
  },
  arraylist: [{
    type: Array,
    of: Number,
    required: true,
  }],
});

const StatewiseDocs = mongoose.model('StatewiseDocs', statewiseDocsSchema);

module.exports = StatewiseDocs;
