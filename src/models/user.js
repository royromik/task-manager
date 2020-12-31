const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchemas = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("age is invallid");
      }
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('Password cannot contain "password"');
      }
    },
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchemas.methods.toJSON = function(){
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
}

userSchemas.methods.getAuthToken = async function () {
  const user = this;

  const token = jwt.sign({ _id: user._id.toString() }, "thisismynodecourse");

  user.tokens.push({token})

  await user.save()

  return token;
};

userSchemas.statics.findByCredentials = async (email, password) => {
  const user = await Users.findOne({ email });
  if (!user) {
    throw new Error("unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("unable to login");
  }

  return user;
};

// hash plaintext password givem by user
userSchemas.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const Users = mongoose.model("Users", userSchemas);

module.exports = Users;
