import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

// ฟังก์ชันสำหรับรวมคลาส Tailwind และ custom class
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ฟังก์ชันสำหรับจัดรูปแบบข้อความแสดงข้อผิดพลาดจาก Zod
export function formatZodError(error: z.ZodError): Record<string, string> {
  const formattedErrors: Record<string, string> = {};

  if (error.errors) {
    error.errors.forEach((err) => {
      formattedErrors[err.path.join('.')] = err.message;
    });
  }

  return formattedErrors;
}

// ฟังก์ชันสำหรับ delay ใน demo
export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ฟังก์ชันสำหรับ format วันที่
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// ฟังก์ชันสำหรับ generate unique ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

// ฟังก์ชันสำหรับคำนวณ derived state
export function calculateDerivedState(baseState: {
  counter: number;
  items: string[];
}) {
  return {
    isEven: baseState.counter % 2 === 0,
    itemCount: baseState.items.length,
    isPrime: isPrime(baseState.counter),
  };
}

// ฟังก์ชัน helper สำหรับตรวจสอบ prime number
function isPrime(num: number): boolean {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;

  let i = 5;
  while (i * i <= num) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
    i += 6;
  }

  return true;
}

// ฟังก์ชันสำหรับค้นหาข้อมูลใน list
export function searchInList<T extends { title: string; description?: string }>(
  items: T[],
  query: string
): T[] {
  if (!query.trim()) return items;

  const lowercaseQuery = query.toLowerCase();
  return items.filter(item =>
    item.title.toLowerCase().includes(lowercaseQuery) ||
    item.description?.toLowerCase().includes(lowercaseQuery)
  );
}

// ฟังก์ชันสำหรับ filter items by category
export function filterByCategory<T extends { category: string }>(
  items: T[],
  category: string
): T[] {
  if (category === 'all') return items;
  return items.filter(item => item.category === category);
}