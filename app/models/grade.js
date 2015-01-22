var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Course = mongoose.model('Course');

var GradeSchema = new Schema({
  userId: {type:Schema.Types.ObjectId, ref:'User'},
  course: {type:Schema.Types.ObjectId, ref:'Course'},
  grade: Number
})

mongoose.model('Grade', GradeSchema);
