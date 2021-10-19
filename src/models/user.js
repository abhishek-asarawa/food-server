import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

// defining schema
const user = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "email required"],
      validate: {
        validator: function (v) {
          return /\S+@\S+\.\S+/.test(v);
        },
        message: (props) => `${props.value} is not valid email.`,
      },
    },
    password: {
      type: String,
      required: [true, "password required"],
    },
    firstName: {
      type: String,
      required: [true, "first name required"],
    },
    lastName: {
      type: String,
      required: [true, "last name required"],
    },
    img: {
      type: String,
      default:
        "https://res.cloudinary.com/dtyzqbg4a/image/upload/v1600945821/Default/default_image_rjiswa.png",
    },
    dob: {
      type: Date,
      required: [true, "need your D.O.B."],
    },
    createAt: {
      type: Date,
    },
    updateAt: {
      type: Date,
    },
  },
  {
    versionKey: false,
  }
);

// * Adding createAt timestamp
user.pre("save", function (next) {
  this.createAt = new Date();
  this.updateAt = new Date();
  next();
});

// * hashing password and lowercase email
async function userPreSave(next) {
  try {
    this.email = this.email.toLowerCase();
    const salt = await bcrypt.genSalt(12);
    const hashedPass = await bcrypt.hash(this.password, salt);
    this.password = hashedPass;
    next();
  } catch (err) {
    next(err);
  }
}
user.pre("save", userPreSave);

// * Adding updateAt when updating doc
function updateDoc(next) {
  this.updateAt = new Date();
  next();
}
user.pre("updateOne", updateDoc);
user.pre("findOneAndUpdate", updateDoc);

// * creating model
const userModel = mongoose.model("User", user);

export default userModel;
