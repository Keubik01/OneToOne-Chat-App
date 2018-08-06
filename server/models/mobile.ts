import * as mongoose from 'mongoose';

const mobileSchema = new mongoose.Schema({
  user_id: String,
  email: String,
  username: String,
  token: String,
  device_id: String,
  device_type: String,
  push_token: String,
  current_timestamp: Date
});

const Mobile = mongoose.model('Mobile', mobileSchema);

export default Mobile;
 
