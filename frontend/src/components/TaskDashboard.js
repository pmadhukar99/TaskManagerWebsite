import React, { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase';
import TaskItem from './TaskItem';
import TaskModal from './TaskModal';

const TaskDashboard = ({ isDarkMode, currentUser }) => {
  const [tasks, setTasks] = useState({
    daily: [],
    weekly: [],
    monthly: [],
    quarterly: [],
    'half-yearly': [],
    yearly: [],
    normal: [],
    history: []
  });
  const [allUsers, setAllUsers] = useState([]);
  const [incompleteTasks, setIncompleteTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [filterTaskName, setFilterTaskName] = useState('');
  const [filterUser, setFilterUser] = useState('');
  const [saveInProgress, setSaveInProgress] = useState(false);

  // Memoize fetchTasks to avoid dependency issues
  const fetchTasks = React.useCallback(async () => {
    try {
      setLoading(true);
      
      // Fetch user's own tasks
      const userTasksQuery = query(
        collection(db, 'tasks'),
        where('createdBy', '==', currentUser.id),
        orderBy('createdAt', 'desc')
      );
      
      // Fetch shared tasks from other users
      const sharedTasksQuery = query(
        collection(db, 'tasks'),
        where('visibility', '==', 'shared'),
        orderBy('createdAt', 'desc')
      );

      const [userSnapshot, sharedSnapshot] = await Promise.all([
        getDocs(userTasksQuery),
        getDocs(sharedTasksQuery)
      ]);

      const allTasksList = [
        ...userSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })),
        ...sharedSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      ];

      const grouped = {
        daily: [],
        weekly: [],
        monthly: [],
        quarterly: [],
        'half-yearly': [],
        yearly: [],
        normal: [],
        history: []
      };

      allTasksList.forEach(task => {
        if (task.category === 'history') {
          grouped.history.push(task);
        } else if (grouped[task.category]) {
          grouped[task.category].push(task);
        }
      });

      setTasks(grouped);

      const incomplete = allTasksList.filter(t => t.status !== 'completed');
      setIncompleteTasks(incomplete);
      setError('');
    } catch (err) {
      setError('Failed to fetch tasks: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [currentUser.id]);

  const fetchAllUsers = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'users'));
      const users = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAllUsers(users);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  // Calculate next due date for recurring tasks based on recurrence type
  const getNextDueDate = (originalDueDate, recurrenceType) => {
    const nextDate = new Date(originalDueDate || new Date());
    
    switch (recurrenceType) {
      case 'daily':
        nextDate.setDate(nextDate.getDate() + 1);
        break;
      case 'weekly':
        // Next Sunday
        const day = nextDate.getDay();
        const daysUntilSunday = (7 - day) % 7 || 7;
        nextDate.setDate(nextDate.getDate() + daysUntilSunday);
        break;
      case 'monthly':
        // First of next month
        nextDate.setMonth(nextDate.getMonth() + 1);
        nextDate.setDate(1);
        break;
      case 'quarterly':
        // First of next quarter (Jan, Apr, Jul, Oct)
        const currentMonth = nextDate.getMonth();
        let targetMonth;
        if (currentMonth < 3) targetMonth = 3; // Apr
        else if (currentMonth < 6) targetMonth = 6; // Jul
        else if (currentMonth < 9) targetMonth = 9; // Oct
        else targetMonth = 0; // Jan (next year)
        
        if (targetMonth === 0) {
          nextDate.setFullYear(nextDate.getFullYear() + 1);
        }
        nextDate.setMonth(targetMonth);
        nextDate.setDate(1);
        break;
      case 'half-yearly':
        // First of next half year (Jan or Jul)
        const month = nextDate.getMonth();
        if (month < 6) {
          nextDate.setMonth(6); // Jul
        } else {
          nextDate.setFullYear(nextDate.getFullYear() + 1);
          nextDate.setMonth(0); // Jan
        }
        nextDate.setDate(1);
        break;
      case 'yearly':
        // Next Jan 1
        nextDate.setFullYear(nextDate.getFullYear() + 1);
        nextDate.setMonth(0);
        nextDate.setDate(1);
        break;
      default:
        return null;
    }
    
    return nextDate.toISOString().split('T')[0];
  };

  // Check and create recurring tasks based on calendar dates
  const checkAndCreateRecurringTasks = React.useCallback(async () => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      // Fetch all recurring tasks that are not completed
      const recurringQuery = query(
        collection(db, 'tasks'),
        where('recurrence', '!=', 'none'),
        where('status', '!=', 'completed'),
        orderBy('recurrence'),
        orderBy('dueDate')
      );
      
      const snapshot = await getDocs(recurringQuery);
      
      for (const docSnap of snapshot.docs) {
        const task = { id: docSnap.id, ...docSnap.data() };
        const dueDate = new Date(task.dueDate || new Date());
        dueDate.setHours(0, 0, 0, 0);
        
        // Check if due date has passed
        if (dueDate < today) {
          // Check if we should auto-create based on recurrence type
          let shouldCreate = false;
          
          switch (task.recurrence) {
            case 'daily':
              // Create if due date is before today
              shouldCreate = true;
              break;
            case 'weekly':
              // Create if due date was before today
              shouldCreate = true;
              break;
            case 'monthly':
              // Create if we're past the due date and haven't created one for this month
              shouldCreate = today.getDate() >= 1;
              break;
            case 'quarterly':
              // Create on quarter start months
              shouldCreate = today.getDate() === 1 && [0, 3, 6, 9].includes(today.getMonth());
              break;
            case 'half-yearly':
              // Create on Jan 1 or Jul 1
              shouldCreate = today.getDate() === 1 && [0, 6].includes(today.getMonth());
              break;
            case 'yearly':
              // Create on Jan 1
              shouldCreate = today.getDate() === 1 && today.getMonth() === 0;
              break;
            default:
              shouldCreate = false;
          }
          
          if (shouldCreate) {
            // Check if next recurring task already exists
            const nextDueDate = getNextDueDate(task.dueDate, task.recurrence);
            const existingQuery = query(
              collection(db, 'tasks'),
              where('title', '==', task.title),
              where('createdBy', '==', task.createdBy),
              where('dueDate', '==', nextDueDate)
            );
            
            const existing = await getDocs(existingQuery);
            if (existing.empty) {
              // Create the recurring task
              await addDoc(collection(db, 'tasks'), {
                title: task.title,
                description: task.description,
                category: task.category,
                priority: task.priority,
                status: 'not-completed',
                completionPercentage: 0,
                notes: `[Auto-generated] ${task.notes || ''}`,
                recurrence: task.recurrence,
                visibility: task.visibility,
                createdBy: task.createdBy,
                dueDate: nextDueDate,
                createdAt: new Date(),
                updatedAt: new Date()
              });
            }
          }
        }
      }
    } catch (err) {
      console.error('Error checking recurring tasks:', err);
    }
  }, []);

  useEffect(() => {
    if (currentUser?.id) {
      fetchTasks();
      fetchAllUsers();
      checkAndCreateRecurringTasks();
    }
  }, [currentUser, fetchTasks, checkAndCreateRecurringTasks]);

  const handleAddTask = () => {
    setEditingTask(null);
    setShowModal(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Delete this task?')) return;

    try {
      await deleteDoc(doc(db, 'tasks', taskId));
      setSuccessMessage('Task deleted');
      fetchTasks();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to delete: ' + err.message);
    }
  };

  // Filter tasks based on search criteria
  const filterTasks = (tasksList) => {
    return tasksList.filter(task => {
      const matchesName = !filterTaskName || task.title.toLowerCase().includes(filterTaskName);
      const matchesUser = !filterUser || (task.assignedUsers && task.assignedUsers.includes(filterUser));
      return matchesName && matchesUser;
    });
  };

  const handleSaveTask = async (taskData) => {
    // Prevent duplicate saves (React.StrictMode fix)
    if (saveInProgress) return;
    setSaveInProgress(true);

    try {
      if (editingTask?.id) {
        // Update
        await updateDoc(doc(db, 'tasks', editingTask.id), {
          ...taskData,
          updatedAt: new Date()
        });
        
        // If marking as completed, optionally move to history
        if (taskData.status === 'completed' && editingTask.status !== 'completed') {
          // Auto-generate next recurring task if needed
          if (editingTask.recurrence !== 'none') {
            await checkAndCreateRecurringTasks();
          }
        }
        
        setSuccessMessage('Task updated');
      } else {
        // Create - only create once
        await addDoc(collection(db, 'tasks'), {
          ...taskData,
          createdBy: currentUser.id,
          assignedUsers: taskData.assignedUsers || [],
          userCompletionStatus: {},
          createdAt: new Date(),
          updatedAt: new Date()
        });
        setSuccessMessage('Task created');
      }
      await new Promise(resolve => setTimeout(resolve, 500)); // Small delay to prevent double calls
      await fetchTasks();
      setShowModal(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to save: ' + err.message);
    } finally {
      setSaveInProgress(false);
    }
  };

  if (loading) {
    return <div className="container"><div className="loading">Loading tasks...</div></div>;
  }

  return (
    <div className="container">
      {error && <div className="error">{error}</div>}
      {successMessage && <div className="success">{successMessage}</div>}

      {/* Team Users Section */}
      {allUsers.length > 0 && (
        <div className="card" style={{ marginBottom: '2rem', backgroundColor: 'var(--card-bg)' }}>
          <h3 style={{ marginBottom: '1rem' }}>👥 Team Members ({allUsers.length})</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
            {allUsers.map(user => (
              <div 
                key={user.id} 
                style={{
                  padding: '1rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  textAlign: 'center',
                  backgroundColor: 'var(--input-bg)'
                }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>👤</div>
                <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>{user.email?.split('@')[0]}</div>
                <small style={{ opacity: 0.7 }}>{user.email}</small>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Alert Section */}
      {incompleteTasks.length > 0 && (
        <div className="card alert-section">
          <div className="alert-title">
            ⚠️ Tasks Pending ({incompleteTasks.length})
          </div>
          <div className="alert-content">
            {incompleteTasks.map(task => (
              <div key={task.id} className="alert-item">
                <span className={task.status === 'not-completed' ? 'alert-item-urgent' : ''}>
                  {task.title} - {task.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Task Button */}
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <button className="btn btn-success" onClick={handleAddTask}>
          ➕ Add New Task
        </button>
      </div>

      {/* Filters Section */}
      <div className="card" style={{ marginBottom: '2rem', backgroundColor: 'var(--card-bg)' }}>
        <h3 style={{ marginBottom: '1rem' }}>🔍 Filters</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div className="form-group">
            <label htmlFor="filterTaskName">Filter by Task Name:</label>
            <input
              type="text"
              id="filterTaskName"
              placeholder="Search task..."
              value={filterTaskName}
              onChange={(e) => setFilterTaskName(e.target.value.toLowerCase())}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--input-bg)', color: 'var(--text-color)' }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="filterUser">Filter by Assigned User:</label>
            <select
              id="filterUser"
              value={filterUser}
              onChange={(e) => setFilterUser(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--input-bg)', color: 'var(--text-color)' }}
            >
              <option value="">All Users</option>
              {allUsers.map(user => (
                <option key={user.id} value={user.id}>{user.email?.split('@')[0]}</option>
              ))}
            </select>
          </div>
          {(filterTaskName || filterUser) && (
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button 
                className="btn" 
                onClick={() => { setFilterTaskName(''); setFilterUser(''); }}
                style={{ width: '100%' }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Task Sections */}
      <div className="task-sections">
        {['daily', 'weekly', 'monthly', 'quarterly', 'half-yearly', 'yearly', 'normal'].map(category => {
          const filteredTasks = filterTasks(tasks[category]);
          return (
            <div key={category} className="card task-section">
              <div className={`task-section-header ${category}`}>
                {category === 'half-yearly' ? '🗓️ HALF-YEARLY' : 
                 category === 'quarterly' ? '📈 QUARTERLY' :
                 category === 'normal' ? '✅ NORMAL TASKS' :
                 category.toUpperCase()} TASKS ({filteredTasks.length})
              </div>
              <ul className="task-list">
                {filteredTasks.length === 0 ? (
                  <li style={{ padding: '1rem', textAlign: 'center', opacity: 0.6 }}>
                    No {category} tasks
                  </li>
                ) : (
                  filteredTasks.map(task => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onEdit={handleEditTask}
                      onDelete={handleDeleteTask}
                      isDarkMode={isDarkMode}
                      currentUser={currentUser}
                      onUpdateUserStatus={fetchTasks}
                    />
                  ))
                )}
              </ul>
            </div>
          );
        })}
      </div>

      {/* History Section */}
      {tasks.history && tasks.history.length > 0 && (
        <div className="card task-section">
          <div className="task-section-header history">
            📜 HISTORY - COMPLETED TASKS ({filterTasks(tasks.history).length})
          </div>
          <ul className="task-list">
            {filterTasks(tasks.history).map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                isDarkMode={isDarkMode}
                currentUser={currentUser}
                onUpdateUserStatus={fetchTasks}
              />
            ))}
          </ul>
        </div>
      )}

      {/* Task Modal */}
      {showModal && (
        <TaskModal
          task={editingTask}
          onClose={() => setShowModal(false)}
          onSave={handleSaveTask}
          isDarkMode={isDarkMode}
          allUsers={allUsers}
        />
      )}
    </div>
  );
};

export default TaskDashboard;
