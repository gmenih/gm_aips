var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NotificationSchema = new Schema({
  title: String,
  date: Date,
  author: {type: Schema.Types.ObjectId, rel:'User'},
  target: {type: Schema.Types.ObjectId, rel:'User'},
  content: String
});

NotificationSchema.statics = {
  loadForUser: function(options, cb){
    this.find({target: options.id})
    .populate('author')
    .select(options.select || 'title content author')
    .exec(cb);
  }
}

mongoose.model('Notification', NotificationSchema);
