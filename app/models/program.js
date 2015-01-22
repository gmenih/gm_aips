var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Course = mongoose.model('Course');

var ProgramSchema = new Schema({
  name: {type: String},
  shortname: {type: String},
  courses: [{type: Schema.Types.ObjectId, ref: 'Course'}]
});

ProgramSchema.methods = {
  addCourse: function(course){
    var id = Course.load(course);
    this.courses.push(id);
    console.log('course added');
  }
}

ProgramSchema.statics = {
  loadAll: function(select, cb){
    this.find({})
    .select(select)
    .exec(cb);
  }
}
mongoose.model('Program', ProgramSchema);
