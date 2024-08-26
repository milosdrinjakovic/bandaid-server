const mongoose = require("mongoose");

const textSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 5,
  },
});

textSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  

module.exports = mongoose.model('TextInput',textSchema)
