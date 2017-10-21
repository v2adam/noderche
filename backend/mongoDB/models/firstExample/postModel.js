const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  text: String,
  tags: [String],
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RegisteredUsers'
  },
  created_ts: { type: Date, default: Date.now }
}, { versionKey: false, runSettersOnQuery: true });

const PostModel = mongoose.model('posts', postSchema);

module.exports = PostModel;
