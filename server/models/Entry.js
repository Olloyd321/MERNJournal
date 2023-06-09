const { Schema, model } = require('mongoose');

const entrySchema = new Schema({
  
  // _id: {
  //   type: String,
  //   required: true
  // },
  entryTitle: {
    type: String,
    required: 'Your entry needs a title!',
    trim: true,
  },
  entryContent: {
    type: String,
    required: 'Your entry needs some content!',
    trim: true,
  },
  entryAuthor: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Entry = model('Entry', entrySchema);

module.exports = Entry;
