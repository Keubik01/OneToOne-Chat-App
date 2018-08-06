// import * as mongoose from 'mongoose';

// const helpdeskSchema = new mongoose.Schema({
//     category: String,
//     subcategory: String,
//     details: String,
//     chat: String,
//     username: String,
//     user_id: String,
//     usern_name: String,
//     email: String,
//     status: String,
//     role: String
// });

// const Helpdesk = mongoose.model('Helpdesk', helpdeskSchema);

// // export default Helpdesk;

import * as mongoose from 'mongoose';

const helpdeskSchema = new mongoose.Schema({
    category: String,
    subcategory: String,
    details: String,
    chat: String,
    username: String,
    email: String,
    user_id: String,
    status: String,
    date:Date,
    read: {
      type: Boolean,
      default: 0
    },
    reslove_date:Date
});

const Helpdesk = mongoose.model('Helpdesk', helpdeskSchema);

export default Helpdesk;
