const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },

    mobile: {
      type: String,
      required: true,
      unique: true,
      match: [/^[6-9]\d{9}$/, "Mobile number must be exactly 10 digits"],
    },
    budget: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
    status: {
      type: String,
      enum: ["New", "Contacted", "Closed"],
      default: "New",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Lead", leadSchema);
