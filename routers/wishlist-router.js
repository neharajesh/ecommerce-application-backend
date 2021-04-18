const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const lodash = require("lodash")
const {extend} = lodash

const { Wishlist } = require("../models/wishlist-model")

router.route("/")
.get(async (req, res) => {
    try {
        const wishlist = await Wishlist.find({})
        res.status(200).send(wishlist)
    } catch (err) {
        res.status(404).json({success: false, message: "could not load wishlist", errMessage: err.message})
    }    
})
.post(async (req, res) => {
    try {
        const wishlist = req.body
        const newWishlist = new Wishlist(wishlist)
        const savedWishlist = await newWishlist.save()
        res.status(200).json({success: true, newWishlist: savedWishlist})
    } catch (err) {
        res.status(404).json({success: false, message: "save wishlist failed", errMessage: err.message})
    }
})

router.param("id", async (req, res, next, id) => {
    try {
        const wishlist = await Wishlist.findById(id);
        if(!wishlist) {
            return res.status(404).json({success: false, message: "wishlist not found"})
        }
        req.wishlist = wishlist;
        next()
    } catch (err) {
        res.status(404).json({success: false, message: "error retriving wishlist", errMessage: err.message})
    }
})

router.route("/:id")
.get((req, res) => {
    let { wishlist } = req
    wishlist.__v = undefined
    res.status(200).json({success: false, wishlist})
})
.post(async(req, res) => {
    let { wishlist } = req
    let wishlistUpdates = req.body
    wishlist = extend(wishlist, wishlistUpdates)
    try {
        wishlist = await wishlist.save()
        res.status(200).json({success: true, wishlist})
    } catch (err) {
        res.status(404).json({success: false, message: "wishlist could not be updated", errMessage: err.message})
    }
})
.delete(async (req, res) => {
    const wishlist = req
    try {
        await wishlist.remove()
        res.status(200).json({success: true, message: "wishlist successfully deleted"})
    } catch (err) {
        res.status(404).json({success: false, message: "wishlist could not be deleted", errMessage: err.message})
    }
})

router.param("userId", async(req, res, next, userId) => {
    try {
        const wishlist = await Wishlist.find({user_id: userId}) 
        if(!wishlist) {
            return res.status(404).json({success: false, message: "wishlist not found"})
        }
        req.wishlist = wishlist
        next()
    } catch (err) {
        res.status(404).json({success: false, message: "wishlist could not be retrieved"})
    }
})

router.route("/user/:userId")
.get((req, res) => {
    let { wishlist } = req
    wishlist.__v = undefined
    res.status(200).json({success: true, wishlist})
})
.post(async(req, res) => {
    const { wishlist } = req
    const wishlistUpdates = req.body
    wishlist = extend(wishlist, wishlistUpdates)
    try {
        wishlist = await wishlist.save()
        res.status(200).json({success: true, wishlist})
    } catch (err) {
        res.status(404).json({success: false, message: "wishlist could not be updated", errMessage: err.message})
    }
})
.delete(async (req, res) => {
    const wishlist = req
    try {
        await wishlist.remove()
        res.status(200).json({success: true, message: "wishlist successfully deleted"})
    } catch (err) {
        res.status(404).json({success: false, message: "wishlist could not be deleted", errMessage: err.message})
    }
})

module.exports = router;