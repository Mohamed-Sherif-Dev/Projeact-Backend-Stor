import express from "express";
import {
  createOffer,
  getAllOffers,
  getTopOffers,
  getOffersThisWeek,
  updateOffer,
  deleteOffer,
} from "../controller/offer.controller.js";
import { validate } from "../middleware/validation.js";
import {
  createOfferValidation,
  updateOfferValidation,
} from "../servers/offer.validation.js";
import { protect, allowedTo } from "../middleware/auth.middleware.js";


const offerrouter = express.Router();

// create + get all
// POST /apioffers (admin)
// GET /api/ offers (all)
offerrouter.route("/").post(protect, allowedTo("admin"), validate(createOfferValidation), createOffer).get(getAllOffers);

// GET /api/offers/top
offerrouter.route("/top").get(getTopOffers);

// GET /api/offers/week
offerrouter.route("/week").get(getOffersThisWeek);



// GET BY ID / Update / Delete offer
offerrouter.route("/:id").put(protect, allowedTo("admin"), validate(updateOfferValidation), updateOffer).delete(protect, allowedTo("admin"), deleteOffer);


export default offerrouter;
