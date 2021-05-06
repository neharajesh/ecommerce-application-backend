const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const lodash = require("lodash")
const {extend} = lodash

const { Cart } = require("../models/cart-model")

router.route("/")
.get(async (req, res) => {
    try {
        const cartItems = await Cart.find({})
        res.status(200).send(cartItems)
    } catch (err) {
        res.status(200).json({success: false, message: "could not load cart items", errMessage: err.message})
    }    
})
.post(async (req, res) => {
    try {
        const cartItem = req.body
        const newCartItem = new Cart(cartItem)
        const savedCartItem = await newCartItem.save()
        res.status(200).json({success: true, newCartItem: savedCartItem})
    } catch (err) {
        res.status(200).json({success: false, message: "save cart items failed", errMessage: err.message})
    }
})

router.param("id", async(req, res, next, id) => {
    try{
      const cartItems = await Cart.findById(id);
      if(!cartItems) {
        return res.status(200).json({success: false, message: "could not find cart items"})
      }
      req.cartItems = cartItems;
      next()
    } catch (err) {
      res.status(200).json({success: false, message: "an error occurred while retrieving cart", errMessage: err.message})
    }
})
  

router.route("/:id")
.get((req, res) => {
    let { cartItems } = req;
    cartItems.__v = undefined;
    res.status(200).json({success: true, cartItems})
})
.post(async (req, res) => {
    let {cartItems} = req;
    let cartItemUpdates = req.body;
    cartItems = extend(cartItems, cartItemUpdates)
    try {
        cartItems = await cartItems.save();
        res.status(200).json({success: true, message: "cart updated", cartItems})
    } catch (err) {
      res.status(200).json({success: false, message: "an error occurred", errMessage: err.message})
    }
})
.delete(async (req, res) => {
    const cartItems = req
    try {
        await cartItems.remove()
        res.status(200).json({success: true, message: "cart successfully deleted"})
    } catch (err) {
        res.status(200).json({success: false, message: "cart could not be deleted", errMessage: err.message})
    }
})

router.param("userId", async(req, res, next, userId) => {
    try {
        const cartItems = await Cart.find({user_id: userId});
        if(!cartItems) {
            return res.status(200).json({success: false, message: "could not retrieve cart"})
        }
        req.cartItems = cartItems;
        next()
    } catch (err) {
        res.status(200).json({success: false, message: "an error occurred while retrieving cart", errMessage: err.message})
    }
})

router.route("/user/:userId")
.get((req, res) => {
    let { cartItems } = req
    cartItems.__v = undefined
    res.status(200).json({success: true, cartItems})
})
.post(async(req, res) => {
    let { cartItems } = req
    let cartUpdates = req.body
    cartItems = extend(cartItems, cartUpdates)
    try {
        cartItems = await cartItems.save()
        res.status(200).json({success: true, cartItems})
    } catch (err) {
        res.json({success: false, message: "cart items could not be updated",  errMessage: err.message})
    }
})
.delete(async (req, res) => {
    let { cartItems } = req
    try {
        await cartItems.remove()
        res.status(200).json({success: true, message: "cart successfully deleted"})
    } catch (err) {
        res.json({success: false, message: "cart could not be deleted", errMessage: err.message})
    }
})

module.exports = router;