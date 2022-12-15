import mongoose from 'mongoose';

const MissionSchema = new mongoose.Schema({
  groupId: String,
  authorId: String,
  maxReceiver: Number,
  receivers: {
    type: [String],
    default: [],
  },
  title: String,
  description: String,
  isComplete: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.models.Missions ||
  mongoose.model('Missions', MissionSchema);
