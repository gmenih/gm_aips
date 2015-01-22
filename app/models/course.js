var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourseSchema = new Schema({
  name: {type: String, default: ''},
  shortName: {type: String, default: ''},
  ECTS: {type: Number, default:0},
  holder: {type: Schema.Types.ObjectId, ref: 'User'}
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
  },
  loadAll: function(options, callback){
    this.find(options.where)
    .select(options.selectselect)
    .populate('holder')
    .exec(callback)
  }
}


 mongoose.model('Course', CourseSchema);
