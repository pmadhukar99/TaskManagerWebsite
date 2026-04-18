const Task = require('../models/Task');
const User = require('../models/User');

// Create Task
exports.createTask = async (req, res) => {
  try {
    const { title, description, category, priority, dueDate, assignedTo } = req.body;

    if (!title || !category) {
      return res.status(400).json({ message: 'Please provide title and category' });
    }

    const task = new Task({
      title,
      description,
      category,
      priority: priority || 'medium',
      dueDate,
      assignedTo: assignedTo || [],
      createdBy: req.userId || req.body.createdBy
    });

    await task.save();
    await task.populate('assignedTo', '-password');
    await task.populate('createdBy', '-password');

    res.status(201).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Tasks
exports.getAllTasks = async (req, res) => {
  try {
    const { category, status } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (status) filter.status = status;

    const tasks = await Task.find(filter)
      .populate('assignedTo', '-password')
      .populate('createdBy', '-password')
      .sort({ createdAt: -1 });

    res.json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('assignedTo', '-password')
      .populate('createdBy', '-password');

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ success: true, task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Tasks assigned to a specific user
exports.getUserTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.params.userId })
      .populate('assignedTo', '-password')
      .populate('createdBy', '-password')
      .sort({ createdAt: -1 });

    res.json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Incomplete Tasks (for alert section)
exports.getIncompleteTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ status: { $ne: 'completed' } })
      .populate('assignedTo', '-password')
      .populate('createdBy', '-password')
      .sort({ dueDate: 1 });

    res.json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  try {
    const { title, description, category, priority, status, completionPercentage, notes, assignedTo, dueDate } = req.body;

    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (category) task.category = category;
    if (priority) task.priority = priority;
    if (status) task.status = status;
    if (completionPercentage !== undefined) task.completionPercentage = completionPercentage;
    if (notes) task.notes = notes;
    if (assignedTo) task.assignedTo = assignedTo;
    if (dueDate) task.dueDate = dueDate;
    task.updatedAt = Date.now();

    await task.save();
    await task.populate('assignedTo', '-password');
    await task.populate('createdBy', '-password');

    res.json({ success: true, task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Assign task to users
exports.assignTaskToUsers = async (req, res) => {
  try {
    const { userIds } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.assignedTo = userIds;
    await task.save();
    await task.populate('assignedTo', '-password');

    res.json({ success: true, task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
