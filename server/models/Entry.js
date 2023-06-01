const { Schema, model } = require('mongoose');

const entrySchema = new Schema({
    
  entryTitle: {
    type: String,
    required: 'Your entry needs a title!',
    minlength: 1,
    trim: true,
  },
  entryContent: {
    type: String,
    required: 'Your entry needs some content!',
    minlength: 1,
    trim: true,
  },
  entryAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Entry = model('Entry', entrySchema);

module.exports = Entry;
