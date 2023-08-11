const express = require("express");
const router = express.Router();
const {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact,
} = require("../controllers/contactController");

// you kan use in server all routes

// Get all
router.route("/").get(getContacts);

// Create Contact
router.route("/").post(createContact);

// Get one contact
router.route("/:id").get(getContact);

// Update Contact
router.route("/:id").put(updateContact);

// Delete Contact
router.route("/:id").delete(deleteContact);

module.exports = router; // exports all routes