const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const lodash = require("lodash")
const {extend} = lodash

const { Category } = require("../models/category-model")

router.route("/")
.get(async (req, res) => {
    try {
        const categories = await Category.find({})
        res.status(200).send(categories)
    } catch (err) {
        res.status(404).json({success: false, message: "could not load categories", errMessage: err.message})
    }
    
})
.post(async (req, res) => {
    try {
        const category = req.body
        const newCategory = new Category(category)
        const savedCategory = await newCategory.save()
        res.status(200).json({success: true, newCategory: savedCategory})
    } catch (err) {
        res.status(404).json({success: false, message: "save product failed", errMessage: err.message})
    }
})

router.param("id", async(req, res, next, id) => {
    try{
      const category = await Category.findById(id);
      if(!category) {
        return res.status(404).json({success: false, message: "could not find category"})
      }
      req.category = category;
      next()
    } catch (err) {
      res.status(400).json({success: false, message: "an error occurred while retrieving categories", errMessage: err.message})
    }
  })
  
  router.route("/:id")
  .get((req, res) => {
    let {category} = req;
    category.__v = undefined;
    res.status(200).json({success: true, category})
  })
  .post(async (req, res) => {
    let {category} = req;
    let categoryUpdates = req.body;
    category = extend(category, categoryUpdates)
    try {
        category = await category.save();
        res.status(200).json({success: true, message: "category updated", category})
    } catch (err) {
      res.status(500).json({success: false, message: "an error occurred", errMessage: err.message})
    }
  })
  .delete(async(req, res) => {
    let {category} = req
    try {
      await category.remove()
      res.json({success: true, message: "category successfully removed"})
    } catch (err) {
      res.json({success: false, message: "category could not be removed"})
    }
  })
  
  module.exports = router;