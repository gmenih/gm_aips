var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Course = mongoose.model('Course');

var ProgramSchema = new Schema({
  name: {type: String, required: true},
  shortName: {type: String, unique: true, required: true},
  courses: [{type: Schema.Types.ObjectId, ref: 'Course'}]
});

ProgramSchema.methods = {
  addCourse: function(course){
    var id = Course.load(course);
    this.courses.push(id);
    console.log('course added');
  }
}

mongoose.model('Program', ProgramSchema);
