var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourseSchema = new Schema({
  name: {type: String, required: true},
  shortName: {type: String, required: true},
})

CourseSchema.statics = {
  /**
   * Load single ID of a course by it's name
   * @param {String}   course name of course
   */
  loadId: function(course){
    this.findOne({name: course})
    .select("_id")
    .exec(function(err, course){
      console.log(course);
      return course._id;
    });
  }
}


 mongoose.model('Course', CourseSchema);
