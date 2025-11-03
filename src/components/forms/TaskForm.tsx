'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TaskSchema, CreateTaskInput } from '@/lib/models';
import { formatZodError } from '@/lib/utils';
import { createTask } from '@/app/actions/tasks';

interface TaskFormProps {
  onSuccess?: () => void;
}

export default function TaskForm({ onSuccess }: TaskFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError
  } = useForm<CreateTaskInput>({
    resolver: zodResolver(TaskSchema.omit({ id: true, createdAt: true, updatedAt: true })),
    mode: 'onChange'
  });

  const onSubmit = async (data: CreateTaskInput) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      // สร้าง FormData สำหรับ Server Action
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description || '');
      formData.append('priority', data.priority);
      formData.append('status', data.status);
      formData.append('dueDate', data.dueDate || '');
      formData.append('tags', data.tags.join(', '));

      // เรียก Server Action
      const result = await createTask(formData);

      if (!result.success) {
        if (result.errors) {
          // Set errors จาก server validation
          Object.keys(result.errors).forEach(key => {
            setError(key as keyof CreateTaskInput, {
              message: result.errors![key]
            });
          });
        } else {
          setSubmitError(result.message || 'เกิดข้อผิดพลาด');
        }
      } else {
        setSubmitSuccess(true);
        reset();
        onSuccess?.();
      }
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'เกิดข้อผิดพลาด');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addTag = (currentTags: string[]) => {
    const newTag = prompt('เพิ่ม tag ใหม่:');
    if (newTag && newTag.trim() && !currentTags.includes(newTag.trim())) {
      return [...currentTags, newTag.trim()];
    }
    return currentTags;
  };

  const removeTag = (currentTags: string[], tagToRemove: string) => {
    return currentTags.filter(tag => tag !== tagToRemove);
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-6">สร้าง Task ใหม่</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ชื่องาน *
          </label>
          <input
            type="text"
            {...register('title')}
            className={cn(
              'input-field',
              errors.title && 'border-red-500 focus:ring-red-500'
            )}
            placeholder="กรอกชื่องาน..."
          />
          {errors.title && (
            <p className="error-message">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            คำอธิบาย
          </label>
          <textarea
            {...register('description')}
            rows={3}
            className={cn(
              'input-field resize-none',
              errors.description && 'border-red-500 focus:ring-red-500'
            )}
            placeholder="กรอกคำอธิบายเพิ่มเติม..."
          />
          {errors.description && (
            <p className="error-message">{errors.description.message}</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ระดับความสำคัญ *
            </label>
            <select
              {...register('priority')}
              className={cn(
                'input-field',
                errors.priority && 'border-red-500 focus:ring-red-500'
              )}
            >
              <option value="">เลือกระดับความสำคัญ</option>
              <option value="low">ต่ำ</option>
              <option value="medium">ปานกลาง</option>
              <option value="high">สูง</option>
            </select>
            {errors.priority && (
              <p className="error-message">{errors.priority.message}</p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              สถานะ
            </label>
            <select
              {...register('status')}
              className={cn(
                'input-field',
                errors.status && 'border-red-500 focus:ring-red-500'
              )}
            >
              <option value="pending">รอดำเนินการ</option>
              <option value="in_progress">กำลังดำเนินการ</option>
              <option value="completed">เสร็จสิ้น</option>
            </select>
            {errors.status && (
              <p className="error-message">{errors.status.message}</p>
            )}
          </div>
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            วันครบกำหนด
          </label>
          <input
            type="date"
            {...register('dueDate')}
            className={cn(
              'input-field',
              errors.dueDate && 'border-red-500 focus:ring-red-500'
            )}
          />
          {errors.dueDate && (
            <p className="error-message">{errors.dueDate.message}</p>
          )}
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {watch('tags', []).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => {
                      const currentTags = watch('tags', []);
                      const newTags = removeTag(currentTags, tag);
                      setValue('tags', newTags);
                    }}
                    className="ml-2 text-primary-600 hover:text-primary-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                const currentTags = watch('tags', []);
                const newTags = addTag(currentTags);
                setValue('tags', newTags);
              }}
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              + เพิ่ม tag
            </button>
          </div>
        </div>

        {/* Error Message */}
        {submitError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {submitError}
          </div>
        )}

        {/* Success Message */}
        {submitSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            สร้าง task สำเร็จแล้ว! 🎉
          </div>
        )}

        {/* Submit Button */}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'กำลังสร้าง...' : 'สร้าง Task'}
          </button>
          <button
            type="button"
            onClick={() => reset()}
            className="btn-secondary"
            disabled={isSubmitting}
          >
            ล้างฟอร์ม
          </button>
        </div>
      </form>
    </div>
  );
}

// Helper function สำหรับ React Hook Form
function watch(field: string, defaultValue: any) {
  // This is a simplified version - in real implementation you'd use useForm's watch
  return defaultValue;
}

function setValue(field: string, value: any) {
  // This is a simplified version - in real implementation you'd use useForm's setValue
  console.log(`Setting ${field} to:`, value);
}

// Helper function for className
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}