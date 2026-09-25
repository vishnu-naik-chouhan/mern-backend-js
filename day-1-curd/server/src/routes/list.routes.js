import express from "express";
import {
  createListController,
  deleteList,
  getAllListController,
  updateList,
} from "../controller/list.controller.js";

const router = express.Router();

// @route   POST /api/list/create
// @desc    Create a new list item
// @access  Public
router.post("/create", createListController);

// @route   POST /api/list/update/:id
// @desc    Update a list item
// @access  Public
router.post("/update/:id", updateList);

// @route   GET /api/list/getAll
// @desc    Get all list items
// @access  Public
router.get("/getAll", getAllListController);

// @route   POST /api/list/delete/:id
// @desc    Delete a list item
// @access  Public
router.post("/delete/:id", deleteList);



export default router;
