const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const lodash = require("lodash")
const {extend} = lodash

const { Product } = require("../models/product-model")

router.route("/")
.get(async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).send(products)
    } catch (err) {
        res.status(404).json({success: false, message: "could not load products", errMessage: err.message})
    }
    
})
.post(async (req, res) => {
    try {
        const product = req.body
        const newProduct = new Product(product)
        const savedProduct = await newProduct.save()
        res.status(200).json({success: true, newProduct: savedProduct})
    } catch (err) {
        res.status(404).json({success: false, message: "save product failed", errMessage: err.message})
    }
})

router.param("id", async(req, res, next, id) => {
  try{
    const product = await Product.findById(id);
    if(!product) {
      return res.status(404).json({success: false, message: "could not find product"})
    }
    req.product = product;
    next()
  } catch (err) {
    res.status(400).json({success: false, message: "an error occurred while retrieving products", errMessage: err.message})
  }
})

router.route("/:id")
.get((req, res) => {
  let {product} = req;
  product.__v = undefined;
  res.status(200).json({success: true, product})
})
.post(async (req, res) => {
  let {product} = req;
  let productUpdates = req.body;
  product = extend(product, productUpdates)
  try {
    product = await product.save();
    res.status(200).json({success: true, message: "product updated", product})
  } catch (err) {
    res.status(500).json({success: false, message: "an error occurred", errMessage: err.message})
  }
})
.delete(async(req, res) => {
  let {product} = req
  try {
    await product.remove()
    res.json({success: true, message: "product successfully removed"})
  } catch (err) {
    res.json({success: false, message: "product could not be removed"})
  }
})

module.exports = router;