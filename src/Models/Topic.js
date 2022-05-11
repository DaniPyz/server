const mongoose = require('mongoose');

const { Schema } = mongoose;

const TopicSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});

const Topic = mongoose.model('Topic', TopicSchema);

module.exports = Topic;
