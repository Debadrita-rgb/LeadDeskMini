const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { generateToken, jwtAuthMiddleware } = require("../middleware/jwt");
require("dotenv").config();
const bcrypt = require("bcryptjs");

// Importing User model
const jsonwebtoken = require("../middleware/auth")("USER");
const User = require("../models/User");
const Contact = require("../models/Contact");
const Lead = require("../models/Lead");

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Account already exists" });
    }
    const newAdmin = new User({
      name,
      email: email.toLowerCase(),
      password,
      role: "USER",
    });
    await newAdmin.save();

    res.status(201).json({
      success: true,
      message: "Signup successful",
      adminId: newAdmin._id,
    });
  } catch (err) {
    console.error("Error in signup:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
});
// user Sign In
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({ email, role: "USER" });
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "Given email is not valid",
      });
    }

    if (!userData.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account is deactivated. Please contact admin.",
      });
    }

    if (!(await userData.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: "Password is not valid",
      });
    }

    const payload = {
      id: userData.id,
      role: "USER",
    };
    const token = generateToken(payload);
    const name = userData.name;
    const userId = userData._id;
    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      name,
      userId,
    });
  } catch (err) {
    console.log("An error occured while admin login =", err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});


router.get("/lead-Data", async (req, res) => {
  try {
    const closedLeads = await Lead.countDocuments({
      status: "Closed",
    });

    const allLeads = await Lead.countDocuments();

    res.status(200).json({
      success: true,
      closedLeads,
      allLeads,
    });
  } catch (err) {
    console.error("Dashboard fetch error:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

const generateCRUDRoutes = (path, Model) => {
  // Add
  router.post(`/add-${path}`, jwtAuthMiddleware, async (req, res) => {
    try {
      const item = new Model(req.body);
      await item.save();
      res.json({ message: `${path} added`, item });
    } catch (error) {
      console.error("Server Error:", error);
      res
        .status(500)
        .json({ error: "Internal server error", details: error.message });
    }
  });
  router.get(`/get-${path}`, async (req, res) => {
    try {
      const items = await Model.find({ isActive: true }).sort({
        createdAt: -1,
      });
      res.json(items);
    } catch (error) {
      console.error("Server Error:", error);
      res.status(500).json({ error: "Failed to fetch items" });
    }
  }); 
  router.get(`/get-single-${path}/:id`, async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Model.findById(id);

      if (!item) {
        return res.status(404).json({ error: `${path} not found` });
      }

      res.status(200).json(item);
    } catch (error) {
      console.error("GET single error:", error);
      res.status(500).json({ error: "Failed to fetch item" });
    }
  });
};


generateCRUDRoutes("user", User);
generateCRUDRoutes("lead", Lead);


//Person want to contact
router.post("/submit-contact", async (req, res) => {
  try {
    const { name, email, message, status } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newContact = new Contact({ name, email, message, status });
    await newContact.save();

    let responseMessage = "";

    if (status === "Contact") {
      responseMessage =
        "Message sent successfully to us. We will contact you soon.";
    } else {
      responseMessage = "Your message has been received.";
    }

    res.status(200).json({ success: true, message: responseMessage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/get-lead-by-userId/:userId", jwtAuthMiddleware, async(req, res) => {
try {
  const { userId } = req.params;

  const leads = await Lead.find({ userId });

  res.status(200).json(leads);
} catch (error) {
  res.status(500).json({
    message: "Failed to fetch leads",
    error: error.message,
  });
}
})

//add lead by user
router.post(`/add-lead-by-user`, jwtAuthMiddleware, async (req, res) => {
  try {
    const { email, mobile } = req.body;
    // Validate mobile number
    // if (!/^[6-9]\d{9}$/.test(mobile)) {
    //   return res.status(400).json({
    //     message: "Mobile number must be exactly 10 digits.",
    //   });
    // }

    // Validate email
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({
        message: "Please enter a valid email address.",
      });
    }

    // Check email
    const emailExists = await Lead.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // Check mobile
    const mobileExists = await Lead.findOne({ mobile });
    if (mobileExists) {
      return res.status(400).json({
        message: "Mobile number already exists",
      });
    }

    const item = new Lead(req.body);
    await item.save();

    res.status(201).json({
      message: `${path} added`,
      item,
    });
  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});


module.exports = router;
