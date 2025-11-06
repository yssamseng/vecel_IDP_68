'use client';

import { useState, useEffect } from 'react';
import TaskForm from '@/components/forms/TaskForm';
import { Task } from '@/lib/models';
import { getTasks, deleteTask } from '@/app/actions/tasks';

export default function FormExample() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  // ดึงข้อมูล tasks เมื่อ component mount และเมื่อ refresh
  useEffect(() => {
    loadTasks();
  }, [refreshKey]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const result = await getTasks();
      setTasks(result);
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการดึงข้อมูล tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (id: string | undefined) => {
    if(!id) return;
    if (!confirm('คุณแน่ใจว่าต้องการลบ task นี้?')) {
      return;
    }

    try {
      const result = await deleteTask(id);
      if (result.success) {
        setRefreshKey(prev => prev + 1); // Trigger refresh
      } else {
        alert(result.message || 'เกิดข้อผิดพลาดในการลบ task');
      }
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการลบ task:', error);
      alert('เกิดข้อผิดพลาดในการลบ task');
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Ex 4: Form Validation (Zod)
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div>
            <TaskForm onSuccess={() => setRefreshKey(prev => prev + 1)} />
          </div>

          {/* Tasks List Section */}
          <div>
            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Tasks ({tasks.length})</h2>
                <button
                  onClick={() => setRefreshKey(prev => prev + 1)}
                  className="btn-secondary"
                  disabled={loading}
                >
                  {loading ? 'กำลังโหลด...' : 'รีเฟรช'}
                </button>
              </div>

              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
                  <p className="mt-4 text-gray-500">กำลังโหลดข้อมูล...</p>
                </div>
              ) : tasks.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-lg mb-4">ยังไม่มี tasks</p>
                  <p className="text-sm">สร้าง task ใหม่โดยใช้ฟอร์มด้านซ้าย</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">
                          {task.title}
                        </h3>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          ลบ
                        </button>
                      </div>

                      {task.description && (
                        <p className="text-gray-600 text-sm mb-3">
                          {task.description}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                          {task.status === 'pending' ? 'รอดำเนินการ' :
                           task.status === 'in_progress' ? 'กำลังดำเนินการ' : 'เสร็จสิ้น'}
                        </span>
                      </div>

                      {task.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {task.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="text-xs text-gray-400">
                        สร้างเมื่อ: {new Date(task.createdAt || 0).toLocaleString('th-TH')}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}