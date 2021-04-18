const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const lodash = require("lodash")
const {extend} = lodash

const { Offer } = require("../models/offers-model")

router.route("/")
.get(async (req, res) => {
    try {
        const offers = await Offer.find({})
        res.status(200).send(offers)
    } catch (err) {
        res.status(404).json({success: false, message: "could not load offers", errMessage: err.message})
    }
    
})
.post(async (req, res) => {
    try {
        const offers = req.body
        const newOffer = new Offer(offers)
        const savedOffer = await newOffer.save()
        res.status(200).json({success: true, newProduct: savedOffer})
    } catch (err) {
        res.status(404).json({success: false, message: "save offers failed", errMessage: err.message})
    }
})

router.param("id", async(req, res, next, id) => {
    try{
      const offers = await Offer.findById(id);
      if(!offers) {
        return res.status(404).json({success: false, message: "could not find offers"})
      }
      req.offers = offers;
      next()
    } catch (err) {
      res.status(400).json({success: false, message: "an error occurred while retrieving offers", errMessage: err.message})
    }
})

router.route("/:id")
.get((req, res) => {
  let { offers } = req;
  offers.__v = undefined;
  res.status(200).json({success: true, offers})
})
.post(async (req, res) => {
  let { offers } = req;
  let offerUpdates = req.body;
  offers = extend(offer, offerUpdates)
  try {
    offers = await offers.save();
    res.status(200).json({success: true, message: "offers updated", offers})
  } catch (err) {
    res.status(500).json({success: false, message: "an error occurred", errMessage: err.message})
  }
})
.delete(async(req, res) => {
  let { offers } = req
  try {
    await offers.remove()
    res.json({success: true, message: "offers successfully removed"})
  } catch (err) {
    res.json({success: false, message: "offers could not be removed"})
  }
})

module.exports = router;