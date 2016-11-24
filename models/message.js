module.exports = function(mongoose){
  var messageSchema = mongoose.Schema({
    to: String,
    from: String,
    text: String,
    date: Date
  });
  return mongoose.model("Message",messageSchema);
};