import listModel from "../models/list.model.js";

export let createListController = async () => {
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

export let getAllListController = async () => {
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

export let updateList = async () => {
  try {
    const { taskId } = req.params;
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

export let deleteList = async () => {
  try {
    const { taskId } = req.params;
    const deletedList = await listModel.findByIdAndDelete(taskId);
    if (!deleteList) {
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
