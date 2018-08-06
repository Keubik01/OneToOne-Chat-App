import * as mongoose from 'mongoose';
const chatSchema = new mongoose.Schema({
    user_id: String,
    chat: [{
      admin_id: String,
      from_user: String,
      from_admin: String,
      date: { type: Date, default: Date.now }
    }]
});

const Chat = mongoose.model('Chat', chatSchema);
export default Chat;
