import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const TaskItem = ({ task, onEdit, onDelete, isDarkMode, currentUser, onUpdateUserStatus }) => {
  const [updatingStatus, setUpdatingStatus] = useState(false);

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

  // Handle per-user completion status update
  const handleUserStatusUpdate = async (userId, newStatus) => {
    if (!currentUser || updatingStatus) return;
    
    // Only allow user to update their own status
    if (userId !== currentUser.id && currentUser.id !== task.createdBy) return;

    setUpdatingStatus(true);
    try {
      const userCompletionStatus = task.userCompletionStatus || {};
      userCompletionStatus[userId] = newStatus;
      
      await updateDoc(doc(db, 'tasks', task.id), {
        userCompletionStatus
      });
      
      if (onUpdateUserStatus) {
        onUpdateUserStatus();
      }
    } catch (err) {
      console.error('Failed to update user status:', err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const isSharedTask = task.visibility === 'shared';
  const isRecurringTask = task.recurrence && task.recurrence !== 'none';
  const isAssignedUser = task.assignedUsers && task.assignedUsers.includes(currentUser?.id);
  const userStatus = task.userCompletionStatus && task.userCompletionStatus[currentUser?.id];

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

      {/* Assigned Users Section */}
      {task.assignedUsers && task.assignedUsers.length > 0 && (
        <div className="task-meta" style={{ marginTop: '0.5rem', padding: '0.5rem', backgroundColor: 'var(--input-bg)', borderRadius: '4px' }}>
          <strong>👥 Assigned Users:</strong>
          <div style={{ marginTop: '0.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {task.assignedUsers.map(userId => {
              const userStatus = (task.userCompletionStatus && task.userCompletionStatus[userId]) || 'not-started';
              const isCurrentUser = currentUser && userId === currentUser.id;
              const statusEmoji = userStatus === 'completed' ? '✅' : userStatus === 'not-completed' ? '❌' : '⏳';
              
              return (
                <div key={userId} style={{
                  padding: '0.5rem',
                  backgroundColor: 'var(--card-bg)',
                  borderRadius: '4px',
                  border: isCurrentUser ? '2px solid var(--accent-color)' : '1px solid var(--border-color)',
                  fontSize: '0.85rem'
                }}>
                  <div>{statusEmoji} User {userId.substring(0, 6)}</div>
                  {isCurrentUser && (
                    <div style={{ display: 'flex', gap: '0.25rem', marginTop: '0.25rem' }}>
                      <button
                        onClick={() => handleUserStatusUpdate(userId, 'not-completed')}
                        disabled={updatingStatus}
                        style={{
                          padding: '0.25rem 0.5rem',
                          fontSize: '0.75rem',
                          backgroundColor: userStatus === 'not-completed' ? 'var(--accent-color)' : 'var(--input-bg)',
                          border: 'none',
                          borderRadius: '3px',
                          cursor: updatingStatus ? 'not-allowed' : 'pointer',
                          color: 'var(--text-color)'
                        }}
                      >
                        ❌
                      </button>
                      <button
                        onClick={() => handleUserStatusUpdate(userId, 'completed')}
                        disabled={updatingStatus}
                        style={{
                          padding: '0.25rem 0.5rem',
                          fontSize: '0.75rem',
                          backgroundColor: userStatus === 'completed' ? 'var(--accent-color)' : 'var(--input-bg)',
                          border: 'none',
                          borderRadius: '3px',
                          cursor: updatingStatus ? 'not-allowed' : 'pointer',
                          color: 'var(--text-color)'
                        }}
                      >
                        ✅
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {isAssignedUser && (
            <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', opacity: 0.8 }}>
              💡 You are assigned. Click the buttons above to mark your completion status.
            </div>
          )}
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
