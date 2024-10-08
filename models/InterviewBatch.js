// models/interviewBatch.js
import mongoose from 'mongoose';

const interviewBatchSchema = new mongoose.Schema({
  batchId: { type: String, required: true, unique: true },
  companyName: { type: String, required: true },
  totalCandidatesRequired: { type: Number, required: true },
  domains: { type: String, required: true },
  skills: { type: [String], required: true },
  interviewTypes: { type: [String], required: true },
  deadline: { type: Date, required: true },
  csvFile: { type: String, required: true },
  note: { type: String, required: true },
  interviewers: { type: Object, default: {} },
  candidates: [{
    email: { type: String, required: true },
    testScore: { type: Object, default: {}},
    interviewScore: { type: Object, default: {} },
    time: { type: Date, default: null }
  }],
  schedule: { type: Object, default: {} },
  meetingId: { type: String, default: null },
  testDay: { type: Date, default: () => { // Default value is tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  } },
}, {
  timestamps: true,
});

export default mongoose.model('InterviewBatch', interviewBatchSchema);
