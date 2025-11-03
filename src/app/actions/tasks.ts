'use server';

import { revalidatePath } from 'next/cache';
import { TaskSchema, CreateTaskInput, Task } from '@/lib/models';
import { z } from 'zod';
import { generateId } from '@/lib/utils';

// Mock database - ใน production ควรใช้ database จริง
let tasks: Task[] = [];

export async function createTask(formData: FormData): Promise<{
  success: boolean;
  data?: Task;
  errors?: Record<string, string>;
  message?: string;
}> {
  try {
    // แปลง FormData เป็น object
    const rawData = {
      title: formData.get('title'),
      description: formData.get('description'),
      priority: formData.get('priority'),
      status: formData.get('status') || 'pending',
      dueDate: formData.get('dueDate'),
      tags: formData.get('tags') ? (formData.get('tags') as string).split(',').map(tag => tag.trim()) : [],
    };

    // Server-side validation ด้วย Zod
    const parsed = TaskSchema.omit({ id: true, createdAt: true, updatedAt: true }).safeParse(rawData);

    if (!parsed.success) {
      // แปลง Zod errors เป็นรูปแบบที่ใช้งานง่าย
      const errors: Record<string, string> = {};
      parsed.error.errors.forEach((error: z.ZodIssue) => {
        errors[error.path.join('.')] = error.message;
      });

      return {
        success: false,
        errors,
        message: 'ข้อมูลไม่ถูกต้อง'
      };
    }

    // สร้าง task ใหม่
    const newTask: Task = {
      id: generateId(),
      ...parsed.data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // บันทึกลง "database"
    tasks.push(newTask);

    // Revalidate cache สำหรับหน้า tasks
    revalidatePath('/example3');

    console.log('สร้าง task ใหม่สำเร็จ:', newTask);

    return {
      success: true,
      data: newTask,
      message: 'สร้าง task สำเร็จแล้ว'
    };

  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการสร้าง task:', error);

    return {
      success: false,
      message: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์'
    };
  }
}

export async function getTasks(): Promise<Task[]> {
  // จำลองการดึงข้อมูลจาก database
  return tasks;
}

export async function updateTask(id: string, data: Partial<CreateTaskInput>): Promise<{
  success: boolean;
  data?: Task;
  message?: string;
}> {
  try {
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
      return {
        success: false,
        message: 'ไม่พบ task ที่ต้องการแก้ไข'
      };
    }

    // อัปเดต task
    const updatedTask: Task = {
      ...tasks[taskIndex],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    tasks[taskIndex] = updatedTask;

    // Revalidate cache
    revalidatePath('/example3');

    return {
      success: true,
      data: updatedTask,
      message: 'อัปเดต task สำเร็จ'
    };

  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการอัปเดต task:', error);

    return {
      success: false,
      message: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์'
    };
  }
}

export async function deleteTask(id: string): Promise<{
  success: boolean;
  message?: string;
}> {
  try {
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
      return {
        success: false,
        message: 'ไม่พบ task ที่ต้องการลบ'
      };
    }

    // ลบ task
    tasks.splice(taskIndex, 1);

    // Revalidate cache
    revalidatePath('/example3');

    return {
      success: true,
      message: 'ลบ task สำเร็จ'
    };

  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการลบ task:', error);

    return {
      success: false,
      message: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์'
    };
  }
}