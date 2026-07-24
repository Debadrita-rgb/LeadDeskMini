const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jsonwebtoken = require("../middleware/auth")("ADMIN");
const { generateToken, jwtAuthMiddleware } = require("../middleware/jwt");
const axios = require("axios");
const dayjs = require("dayjs");

const User = require("../models/User");
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
      password, // Auto-hashed by the User model
      role: "ADMIN",
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

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({ email: email });
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "Given email is not valid",
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
      role: "ADMIN",
    };
    const token = generateToken(payload);
    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
    });
  } catch (err) {
    console.log("An error occured while admin login =", err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}); 


router.get("/dashboardData", jwtAuthMiddleware, async (req, res) => {
  try {
    const nUser = await User.countDocuments({
      role: { $ne: "admin" }, // Exclude admin users
    });

    const nNewLeads = await Lead.countDocuments({
      status: "New",
    });

    const nContactedLeads = await Lead.countDocuments({
      status: "Contacted",
    });

    const nClosedLeads = await Lead.countDocuments({
      status: "Closed",
    });

    res.status(200).json({
      success: true,
      nUser,
      nNewLeads,
      nContactedLeads,
      nClosedLeads,
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
  router.get(`/get-${path}`, jwtAuthMiddleware, async (req, res) => {
    try {
      const items = await Model.find().sort({ createdAt: -1 });
      res.json(items);
    } catch (error) {
      console.error("Server Error:", error);
      res.status(500).json({ error: "Failed to fetch items" });
    }
  });

  router.get(`/get-single-${path}/:id`, jwtAuthMiddleware, async (req, res) => {
    try {
      const item = await Model.findById(req.params.id);
      if (!item) return res.status(404).json({ error: "Item not found" });
      res.json(item);
    } catch (error) {
      console.error("GET single error:", error);
      res.status(500).json({ error: "Failed to fetch item" });
    }
  });

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

  // PUT update item by ID
  router.put(`/update-${path}/:id`, jwtAuthMiddleware, async (req, res) => {
    try {
      const updatedItem = await Model.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
      );
      if (!updatedItem)
        return res.status(404).json({ error: "Item not found" });
      res.json(updatedItem);
    } catch (error) {
      console.error("PUT error:", error);
      res.status(500).json({ error: "Failed to update item" });
    }
  });

  // DELETE item by ID
  router.delete(`/delete-${path}/:id`, jwtAuthMiddleware, async (req, res) => {
    try {
      const deletedItem = await Model.findByIdAndDelete(req.params.id);
      if (!deletedItem)
        return res.status(404).json({ error: "Item not found" });
      res.json({ message: "Item deleted successfully" });
    } catch (error) {
      console.error("DELETE error:", error);
      res.status(500).json({ error: "Failed to delete item" });
    }
  });

  // Toggle isActive
  router.patch(
    `/toggle-${path}-status/:id`,
    jwtAuthMiddleware,
    async (req, res) => {
      const { isActive } = req.body;
      try {
        const updated = await Model.findByIdAndUpdate(
          req.params.id,
          { isActive },
          { new: true },
        );
        res.json({ message: `${path} status updated`, updated });
      } catch (err) {
        console.error("Toggle Error:", err);
        res.status(500).json({ message: `Failed to toggle ${path} status` });
      }
    },
  );

  // toggle Recommended
  router.patch(
    `/toggle-${path}-recommended/:id`,
    jwtAuthMiddleware,
    async (req, res) => {
      const { isRecommended } = req.body;
      try {
        const updated = await Model.findByIdAndUpdate(
          req.params.id,
          { isRecommended },
          { new: true },
        );
        res.json({ message: `${path} status updated`, updated });
      } catch (err) {
        console.error("Toggle Error:", err);
        res.status(500).json({ message: `Failed to toggle ${path} status` });
      }
    },
  );

  router.get(
    `/get-categorized-${path}`,
    jwtAuthMiddleware,
    async (req, res) => {
      try {
        const { category } = req.query;
        let query = {};

        if (category) {
          query.category = category;
        }

        const items = await Model.find(query);
        res.json(items);
      } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Failed to fetch items" });
      }
    },
  );

  //status change
  router.patch(`/update-${path}-status/:id`, jwtAuthMiddleware, async (req, res) => {
    try {
      const { status } = req.body;

      const lead = await Lead.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true },
      );

      res.json({
        success: true,
        updated: lead,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
  );
};;
generateCRUDRoutes("user", User);
generateCRUDRoutes("lead", Lead);

  router.get(
    `/get-single-lead-by-userdetails/:id`,
    jwtAuthMiddleware,
    async (req, res) => {
      try {
const item = await Lead.findById(req.params.id).populate(
  "userId",
  "name email",
);        if (!item) return res.status(404).json({ error: "Item not found" });
        res.json(item);
      } catch (error) {
        console.error("GET single error:", error);
        res.status(500).json({ error: "Failed to fetch item" });
      }
    },
  );

module.exports = router;
