var mongoose = require('mongoose');
var crypto = require('crypto');

var Schema = mongoose.Schema;

/**
 * User model
 * @type {Schema}
 */
var UserSchema = new Schema({
  name: {
    type: String,
    default: ''
  },
  lastname: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: '',
    required: true,
    unique: true
  },
  username: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'student'
  },
  hashed_password: {
    type: String,
    default: ''
  }
});

UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

var validatePresenceOf = function(val) {
  return val && val.length;
}

UserSchema.pre('save', function(next){
  if(!this.isNew) return next();

  if(!validatePresenceOf(this.password))
    next(new Error('Geslo je prazno!'));
  else
    next();
});


UserSchema.methods = {
  authenticate: function() {
    return this.encryptPassword(this.password) === this.hashed_password;
  },
  makeSalt: function() {
    return 'salty';
  },

  encryptPassword: function(password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (e) {
      return '';
    }
  }
}

UserSchema.statics = {
  load: function(options, cb) {
    options.select = options.select || 'name username';
    this.findOne(options.where)
      .select(options.select)
      .exec(cb);
  }
}

mongoose.model('User', UserSchema);
