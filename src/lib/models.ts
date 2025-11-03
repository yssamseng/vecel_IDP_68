import { z } from 'zod';

// Task Model สำหรับ Example3 (Form Validation)
export const TaskSchema = z.object({
  id: z.string().optional(),
  title: z.string()
    .min(1, 'กรุณากรอกชื่องาน')
    .max(100, 'ชื่องานต้องไม่เกิน 100 ตัวอักษร'),
  description: z.string()
    .max(500, 'คำอธิบายต้องไม่เกิน 500 ตัวอักษร')
    .optional(),
  priority: z.enum(['low', 'medium', 'high'], {
    errorMap: () => ({ message: 'กรุณาเลือกระดับความสำคัญ' })
  }),
  status: z.enum(['pending', 'in_progress', 'completed']).default('pending'),
  dueDate: z.string()
    .optional()
    .refine((date) => {
      if (!date) return true;
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime());
    }, 'กรุณากรอกวันที่ให้ถูกต้อง'),
  tags: z.array(z.string()).default([]),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

// List Item Model สำหรับ Example2 (List & Dynamic Routing)
export const ListItemSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'กรุณากรอกชื่อรายการ'),
  description: z.string().optional(),
  category: z.string().default('general'),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  status: z.enum(['active', 'inactive']).default('active'),
  metadata: z.record(z.any()).optional(),
  createdAt: z.string().default(() => new Date().toISOString()),
  updatedAt: z.string().default(() => new Date().toISOString()),
});

// State Example Model สำหรับ Example1 (State Management)
export const StateExampleSchema = z.object({
  counter: z.number().default(0),
  message: z.string().default(''),
  isVisible: z.boolean().default(true),
  items: z.array(z.string()).default([]),
});

// Export TypeScript types จาก Zod schemas
export type Task = z.infer<typeof TaskSchema>;
export type ListItem = z.infer<typeof ListItemSchema>;
export type StateExample = z.infer<typeof StateExampleSchema>;

// Export form types สำหรับใช้ในฟอร์ม
export type CreateTaskInput = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;
export type CreateListItemInput = Omit<ListItem, 'id' | 'createdAt' | 'updatedAt'>;

// Mock data functions
export const generateMockListItems = (count: number = 10): ListItem[] => {
  const categories = ['work', 'personal', 'shopping', 'health', 'learning'];
  const priorities: Array<'low' | 'medium' | 'high'> = ['low', 'medium', 'high'];

  return Array.from({ length: count }, (_, index) => ({
    id: `item-${index + 1}`,
    title: `รายการที่ ${index + 1}`,
    description: `คำอธิบายสำหรับรายการที่ ${index + 1}`,
    category: categories[index % categories.length],
    priority: priorities[index % priorities.length],
    status: 'active' as const,
    metadata: {
      order: index + 1,
      createdBy: 'system'
    },
    createdAt: new Date(Date.now() - (index * 1000 * 60 * 60)).toISOString(),
    updatedAt: new Date(Date.now() - (index * 1000 * 60 * 30)).toISOString(),
  }));
};

export const generateMockTasks = (count: number = 5): Task[] => {
  const titles = [
    'ทำงานส่งลูกค้า',
    'อ่านหนังสือ',
    'ออกกำลังกาย',
    'เขียนโค้ด',
    'ทำความสะอาดบ้าน'
  ];

  const priorities: Array<'low' | 'medium' | 'high'> = ['low', 'medium', 'high'];
  const statuses: Array<'pending' | 'in_progress' | 'completed'> = ['pending', 'in_progress', 'completed'];

  return Array.from({ length: count }, (_, index) => ({
    id: `task-${index + 1}`,
    title: titles[index % titles.length],
    description: `รายละเอียดสำหรับ${titles[index % titles.length]}`,
    priority: priorities[index % priorities.length],
    status: statuses[index % statuses.length],
    dueDate: new Date(Date.now() + (index * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    tags: ['important', 'work', 'personal'].slice(0, (index % 3) + 1),
    createdAt: new Date(Date.now() - (index * 1000 * 60 * 60)).toISOString(),
    updatedAt: new Date(Date.now() - (index * 1000 * 60 * 30)).toISOString(),
  }));
};