import mongoose from 'mongoose';

const HeroSchema = new mongoose.Schema({
  groupId: String,
  name: String,
  title: String,
  description: String,
  code: String,
  profileImage: String,
  completeNumber: {
    type: Number,
    default: 0,
  },
});

export default mongoose.models.Heroes || mongoose.model('Heroes', HeroSchema);
