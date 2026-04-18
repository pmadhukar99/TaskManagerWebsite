import React, { useState, useEffect } from 'react';

const TaskModal = ({ task, onClose, onSave, isDarkMode }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'daily',
    priority: 'medium',
    status: 'not-completed',
    completionPercentage: 0,
    notes: '',
    assignedTo: [],
    dueDate: '',
    startDate: '',
    endDate: '',
    recurrence: 'none',
    visibility: 'private',
    isHistory: false
  });

  useEffect(() => {
    if (task) {
      setFormData(task);
    }
  }, [task]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'completionPercentage' ? parseInt(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please enter a task title');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="modal show">
      <div className="modal-content">
        <span className="modal-close" onClick={onClose}>&times;</span>
        <h2>{task ? 'Edit Task' : 'Create New Task'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Task Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter task title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter task description"
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="daily">📅 Daily</option>
              <option value="weekly">📆 Weekly</option>
              <option value="monthly">📊 Monthly</option>
              <option value="quarterly">📈 Quarterly</option>
              <option value="half-yearly">🗓️ Half-Yearly</option>
              <option value="yearly">📋 Yearly</option>
              <option value="normal">✅ Normal Task (Adhoc)</option>
              <option value="history">📜 History</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            >
              <option value="not-completed">Not Completed</option>
              <option value="partially-completed">Partially Completed</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {formData.status === 'partially-completed' && (
            <div className="form-group">
              <label htmlFor="completionPercentage">Completion Percentage</label>
              <input
                type="number"
                id="completionPercentage"
                name="completionPercentage"
                value={formData.completionPercentage}
                onChange={handleInputChange}
                min="0"
                max="100"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Add any additional notes"
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate ? (typeof formData.dueDate === 'string' ? formData.dueDate.split('T')[0] : '') : ''}
              onChange={handleInputChange}
            />
          </div>

          {formData.category === 'normal' && (
            <>
              <div className="form-group">
                <label htmlFor="startDate">Start Date (For Adhoc Tasks)</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate ? (typeof formData.startDate === 'string' ? formData.startDate.split('T')[0] : '') : ''}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="endDate">End Date (For Adhoc Tasks)</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate ? (typeof formData.endDate === 'string' ? formData.endDate.split('T')[0] : '') : ''}
                  onChange={handleInputChange}
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label htmlFor="recurrence">🔄 Repeat Task</label>
            <select
              id="recurrence"
              name="recurrence"
              value={formData.recurrence}
              onChange={handleInputChange}
            >
              <option value="none">None (One-time task)</option>
              <option value="daily">Daily - Auto-creates after date changes or on completion</option>
              <option value="weekly">Weekly - Auto-creates on Sunday or on completion</option>
              <option value="monthly">Monthly - Auto-creates on 1st of month or on completion</option>
              <option value="quarterly">Quarterly - Auto-creates on Jan 1, Apr 1, Jul 1, Oct 1 or on completion</option>
              <option value="half-yearly">Half-Yearly - Auto-creates on Jan 1 or Jul 1 or on completion</option>
              <option value="yearly">Yearly - Auto-creates on Jan 1 or on completion</option>
            </select>
            {formData.recurrence !== 'none' && (
              <small style={{ display: 'block', marginTop: '0.5rem', opacity: 0.7 }}>
                ✓ Task auto-creates after due date passes (you must complete it manually)
              </small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="visibility">👁️ Task Visibility</label>
            <select
              id="visibility"
              name="visibility"
              value={formData.visibility}
              onChange={handleInputChange}
            >
              <option value="private">🔒 Private (Only you can see)</option>
              <option value="shared">🌐 Shared (Team can see)</option>
            </select>
            {formData.visibility === 'shared' && (
              <small style={{ display: 'block', marginTop: '0.5rem', opacity: 0.7 }}>
                ✓ All team members can view this task and its progress
              </small>
            )}
          </div>

          <div className="button-group">
            <button type="submit" className="btn btn-primary">
              Save Task
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
