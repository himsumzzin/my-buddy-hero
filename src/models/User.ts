import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  id: String,
  password: String,
  groupId: String,
});

export default mongoose.models.Users || mongoose.model('Users', UserSchema);
