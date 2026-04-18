import React from 'react';

const TaskItem = ({ task, onEdit, onDelete, isDarkMode }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'completed';
      case 'partially-completed':
        return 'partially-completed';
      case 'not-completed':
        return 'not-completed';
      default:
        return '';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return '✅ Completed';
      case 'partially-completed':
        return '⏳ Partially Completed';
      case 'not-completed':
        return '❌ Not Completed';
      default:
        return status;
    }
  };

  const getRecurrenceText = (recurrence) => {
    switch (recurrence) {
      case 'daily':
        return '🔄 Repeats Daily';
      case 'weekly':
        return '🔄 Repeats Weekly';
      case 'monthly':
        return '🔄 Repeats Monthly';
      case 'yearly':
        return '🔄 Repeats Yearly';
      default:
        return null;
    }
  };

  const isSharedTask = task.visibility === 'shared';
  const isRecurringTask = task.recurrence && task.recurrence !== 'none';

  return (
    <li className={`task-item ${task.status}`}>
      <div className={`task-title ${task.status === 'completed' ? 'completed' : ''}`}>
        {task.title}
        {isSharedTask && <span style={{ marginLeft: '0.5rem', fontSize: '0.8rem', opacity: 0.7 }}>🌐</span>}
      </div>
      
      {task.description && (
        <div className="task-meta">{task.description}</div>
      )}
      
      <div className="task-meta">
        <span className={`status-badge ${getStatusColor(task.status)}`}>
          {getStatusText(task.status)}
        </span>
        {isRecurringTask && (
          <span style={{ marginLeft: '0.5rem', fontSize: '0.85rem', opacity: 0.8 }}>
            {getRecurrenceText(task.recurrence)}
          </span>
        )}
      </div>

      {task.status === 'partially-completed' && (
        <div>
          <div className="task-meta">Progress: {task.completionPercentage}%</div>
          <div className="progress-bar-container">
            <div 
              className="progress-bar" 
              style={{ width: `${task.completionPercentage}%` }}
            >
              {task.completionPercentage > 10 && `${task.completionPercentage}%`}
            </div>
          </div>
        </div>
      )}

      {task.notes && (
        <div className="task-meta">
          <strong>Notes:</strong> {task.notes}
        </div>
      )}

      {task.assignedTo && task.assignedTo.length > 0 && (
        <div className="task-assigned">
          <strong>Assigned to:</strong> {task.assignedTo.map(u => u.name || u).join(', ')}
        </div>
      )}

      {task.dueDate && (
        <div className="task-meta">
          📅 Due: {new Date(task.dueDate).toLocaleDateString()}
        </div>
      )}

      {isSharedTask && (
        <div className="task-meta" style={{ color: 'var(--accent-color)', fontSize: '0.85rem' }}>
          🌐 Visible to all team members
        </div>
      )}

      <div className="task-actions">
        <button className="edit-btn" onClick={() => onEdit(task)}>
          ✏️ Edit
        </button>
        <button className="delete-btn" onClick={() => onDelete(task.id)}>
          🗑️ Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
