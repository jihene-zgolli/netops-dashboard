const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['roaming', 'data', 'voix', 'core'], required: true },
  severity: { type: String, enum: ['low', 'medium', 'high', 'critical'], default: 'medium' },
  status: { type: String, enum: ['open', 'in_progress', 'resolved'], default: 'open' },
  kpiImpact: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Incident', incidentSchema);