import mongoose from 'mongoose';

const HeroSchema = new mongoose.Schema({
  groupId: String,
  name: String,
  title: String,
  description: String,
  heorPassword: String,
  completeNumber: Number,
});

export default mongoose.models.Heroes || mongoose.model('Heroes', HeroSchema);
