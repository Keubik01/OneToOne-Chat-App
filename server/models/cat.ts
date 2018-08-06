import * as mongoose from 'mongoose';

const catSchema = new mongoose.Schema({
  name: String,
  category_type: String,
});

const Cat = mongoose.model('Cat', catSchema);

export default Cat;
