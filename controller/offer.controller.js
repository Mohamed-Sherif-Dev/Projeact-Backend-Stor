import asyncHandler from "express-async-handler";
import Offer from "../models/offer.model.js";

const getWeekRange = () => {
  const now = new Date();

  const day = now.getDay();
  const diffToMonday = (day + 6) % 7;

  const weekStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - diffToMonday,
    0,
    0,
    0,
    0
  );

  const weekEnd = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - diffToMonday + 7,
    23,
    59,
    59,
    999
  );
  return [weekStart, weekEnd];
};

// POST /api/offers (create offer)
export const createOffer = asyncHandler(async (req, res) => {
  const offer = await Offer.create(req.body);
  res.json({
    success: true,
    message: "Offer created successfully",
    data: offer,
  });
});

// GET /api/offers (get all offers)
export const getAllOffers = asyncHandler(async (req, res) => {
  const offers = await Offer.find().sort({ createdAt: -1 });
  res.json({ success: true, count: offers.length, data: offers });
});

// GET /api/offers/top?limit=5 (get top offers)
export const getTopOffers = asyncHandler(async (req, res) => {
  let { limit = 5 } = req.query;
  limit = Number(limit) || 5;

  const offers = await Offer.find()
    .sort({ isTop: -1, review: -1 })
    .limit(limit);
  res.json({ success: true, count: offers.length, data: offers });
});


// GET /api/offer/week (get week offers)
export const getOffersThisWeek = asyncHandler(async (req, res) => {
    const {weekStart , weekEnd} = getWeekRange();

    const offers = await Offer.find({
        // $and:[
        //     {startDate: {$lte: weekEnd}},
        //     {
        //         $or:[
        //             {endDate: {$gte: weekStart}},
        //             {endDate: null}
        //         ]
        //     }
        // ]createdAt: {
    createdAt: {
      $gte: weekStart,
      $lte: weekEnd,
    },           
    
    }).sort({startDate: -1})
    res.json({success: true, count: offers.length, data: offers})
})



// PUT /api/offers/:id (update offer) - admin only
export const updateOffer = asyncHandler(async (req, res) => {
    const {id} = req.params;

    const offer = await Offer.findByIdAndUpdate(id , req.body,{
        new: true,
        runValidators: true,
    });

    if(!offer){
        return res.status(404).json({success: false, message: "Offer not found"})
    }


    res.json({success: true, message: "Offer updated successfully", data: offer})
})



// DELETE /api/offers/:id (delete offer) - admin only
export const deleteOffer = asyncHandler(async (req, res) => {
    const {id} = req.params;

    const offer = await Offer.findByIdAndDelete(id)

    if(!offer){
        return res.status(404).json({success: false, message: "Offer not found"})
    }


    res.json({success: true, message: "Offer deleted successfully"})
})