import mongoose from "mongoose";
import listModel from "../models/list.model.js";

export let createListController = async (req, res) => {
  try {
    const { taskName, description } = req.body;
    if (!taskName || !description) {
      return res.status(400).json({
        success: false,
        message: "taskName and description are required",
      });
    }

    const newList = await listModel.create({
      taskName,
      description,
    });

    return res.status(200).json({
      success: true,
      message: "List created successfully",
      data: newList,
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export let getAllListController = async (req, res) => {
  try {
    const allList = await listModel.find();

    if (!allList.length) {
      return res.status(204).json({
        success: true,
        message: "List fetched successfully and Empty List",
        data: allList,
      });
    }

    return res.status(200).json({
      success: true,
      message: "List fetched successfully",
      data: allList,
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export let getOneListController = async (req, res) => {
  try {
    const { taskId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Task ID format",
      });
    }

    const oneList = await listModel.findById(taskId);
    if (!oneList) {
      return res.status(404).json({
        success: false,
        message: "List not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "List fetched successfully",
      data: oneList,
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export let updateList = async (req, res) => {
  try {
    const { taskId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Task ID format",
      });
    }

    const { taskName, description, isCompleted } = req.body;
    const updatedList = await listModel.findByIdAndUpdate(
      taskId,
      { taskName, description, isCompleted },
      { new: true },
    );
    return res.status(200).json({
      success: true,
      message: "List updated successfully",
      data: updatedList,
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export let deleteList = async (req, res) => {
  try {
    const { taskId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Task ID format",
      });
    }

    const deletedList = await listModel.findByIdAndDelete(taskId);
    if (!deletedList) {
      return res.status(400).json({
        success: false,
        message: "List not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "List deleted successfully",
      data: deletedList,
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};