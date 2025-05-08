const { model, Schema } = require('mongoose');
const { createHmac, randomBytes } = require('crypto');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phNumber: {
    type: String,
    require: true
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  salt: {
    type: String,
    select: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verifiedUser: {
    type: Boolean,
    default: false,
  },
  VerificationCode: String,
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  if (!this.password) return next(new Error('Password is required'));

  const salt = randomBytes(16).toString('hex');
  const hashPassword = createHmac('sha256', salt)
    .update(this.password)
    .digest('hex');

  this.salt = salt;
  this.password = hashPassword;
  next();
});

// Static login method
userSchema.statics.MatchPasswordAndGenerateToken = async function (email, password) {
  const user = await this.findOne({ email }).select('+password +salt');
  if (!user) {
    throw new Error('User not found in login');
  }

  const userProvidedHash = createHmac('sha256', user.salt)
    .update(password)
    .digest('hex');

  if (user.password !== userProvidedHash) {
    throw new Error('Email or password incorrect!');
  }

  // Generate JWT token
  const token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return token;
};

const user = model('user', userSchema);
module.exports = user;
