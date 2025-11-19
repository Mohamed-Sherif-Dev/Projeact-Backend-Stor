import express from "express";
import {
    createContactMessagr,
    getAllContact,
    getSingleContact,
    updateContact,
    deleteContact
} from "../controller/contact.controller.js";

import { protect, allowedTo } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validation.js";
import { createContactValidation , updateContactValidation } from "../servers/contact.validation.js";


const contactrouter = express.Router();

// Create contact us Message
contactrouter.route("/").post(validate(createContactValidation), createContactMessagr).get(protect, allowedTo("admin"), getAllContact);

// GET BY ID / Update / Delete contact us Message
contactrouter.route("/:id").get(getSingleContact).put(protect, allowedTo("admin"), validate(updateContactValidation), updateContact).delete(protect, allowedTo("admin"), deleteContact);


export default contactrouter;