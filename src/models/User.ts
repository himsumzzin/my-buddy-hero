import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  id: String,
  password: String,
  groupId: {
    type: String,
    default: '1',
  },
});

export default mongoose.models.Users || mongoose.model('Users', UserSchema);
