import * as mongoose from 'mongoose';

const subcatSchema = new mongoose.Schema({
  category_type: String,
  category_id: String,
  subcategoryname: String
});

const Subcat = mongoose.model('Subcat', subcatSchema);

export default Subcat;
