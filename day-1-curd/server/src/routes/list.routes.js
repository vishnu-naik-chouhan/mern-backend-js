import express from "express";
import createListController from "../controller/list.controller.js";

const router = express.Router();

// @route   POST /api/list/create
// @desc    Create a new list item
// @access  Public
router.post("/create", createListController);

export default router;
