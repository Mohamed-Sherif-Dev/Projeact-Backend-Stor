import asyncHandler from "express-async-handler";
import Contact from "../models/contact.model.js";



// POST /api/contect (create contact us Message) - public
export const createContactMessagr = asyncHandler(async (req, res) => {
    const contact = await Contact.create(req.body);
    res.json({ success: true, message: "Contact created successfully", data: contact });
})


// GET /api/contect (get all contact us Message) - admin only
export const getAllContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, count: contacts.length, data: contacts });
})



// GET /api /contect/:id (get single contact us Message) - admin only
export const getSingleContact = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const message = await Contact.findById(id);

    if (!message) {
        return res.status(404).json({ success: false, message: "Message not found" });
    }

    res.json({ success: true, data: message });
    
})


// PUT /api/contect/:id (update contact us Message) - admin only
export const updateContact = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const message = await Contact.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!message) {
        return res
            .status(404)
            .json({ success: false, message: "Message not found" });
    }

    res.json({
        success: true,
        message: "Message updated successfully",
        data: message,
    })
})


// DELETE /api/contect/:id (delete contact us Message) - admin only
export const deleteContact = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const message = await Contact.findByIdAndDelete(id);

    if (!message) {
        return res
            .status(404)
            .json({ success: false, message: "Message not found" });
    }

    res.json({
        success: true,
        message: "Message deleted successfully",
    })

})