'use client';

import { useState } from 'react';

interface Slide {
  id: number;
  title: string;
  bullets: string[];
  speakerNotes: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "🚀 สร้างเว็บเร็ว สวย ปลอดภัย ด้วย Next.js + Tailwind + Zod",
    bullets: [
      "Next.js = React Framework สำหรับ web generation",
      "Tailwind CSS = Utility-first CSS",
      "Zod = Type-safe validation ที่ใช้ได้ทั้ง client & server"
    ],
    speakerNotes: "วันนี้เราจะมาดูว่า 3 ตัวนี้ทำงานร่วมกันยังไง ช่วยให้พัฒนาเว็บเร็วขึ้นแค่ไหน และทำ validation ได้ง่ายทั้งฝั่งหน้าเว็บและฝั่งเซิร์ฟเวอร์"
  },
  {
    id: 2,
    title: "⚙️ Why Next.js?",
    bullets: [
      "File-based routing",
      "Server-Side Rendering (SSR), Static Site Generation (SSG)",
      "API routes, Metadata, Image optimization",
      "Deploy ง่ายบน Vercel"
    ],
    speakerNotes: "Next.js คือ React ที่ถูกขยายให้พร้อมใช้งานใน production ตั้งแต่ routing ไปจนถึง deploy โดยไม่ต้องตั้งค่าเองเยอะ"
  },
  {
    id: 3,
    title: "🎨 Why Tailwind CSS?",
    bullets: [
      "Utility classes เช่น flex, text-center, bg-blue-500",
      "Responsive ง่าย แค่เพิ่ม breakpoint เช่น md:text-lg",
      "Custom theme ได้ใน tailwind.config.js",
      "ไม่มีการเขียน CSS ซ้ำซ้อน"
    ],
    speakerNotes: "Tailwind ทำให้เราไม่ต้องคิดชื่อ class เยอะ แค่ใช้ utility class จัด layout และ style ได้เลย ทำงานเร็วขึ้นมากโดยเฉพาะเวลา prototyping"
  },
  {
    id: 4,
    title: "🧱 เริ่มโปรเจกต์ (Setup)",
    bullets: [
      "npx create-next-app my-app",
      "npm install -D tailwindcss postcss autoprefixer",
      "npx tailwindcss init -p",
      "ตั้งค่าไฟล์ tailwind.config.js",
      "import ใน globals.css"
    ],
    speakerNotes: "ใช้เวลาไม่ถึง 2 นาที ก็ได้โปรเจกต์พร้อมใช้งาน Tailwind แล้ว ต่อไปเราจะสร้างหน้า UI เล็ก ๆ กัน"
  },
  {
    id: 5,
    title: "💻 Demo: UI Hero / Card",
    bullets: [
      "ใช้ class Tailwind ตกแต่งได้เร็ว",
      "เช่น flex, p-6, rounded-2xl, shadow-lg",
      "Responsive layout ทันที"
    ],
    speakerNotes: "จุดเด่นของ Tailwind คือเราไม่ต้องสลับไฟล์ CSS กับ JSX ตลอดเวลา — ทำทุกอย่างใน JSX ได้เลย Demo: เปลี่ยนสี background หรือ padding จะเห็นผลทันที"
  },
  {
    id: 6,
    title: "🧩 Zod + Form Validation (Intro)",
    bullets: [
      "ฟอร์มสมัครสมาชิก (name, email, age, terms)",
      "ใช้ Zod สร้าง schema สำหรับ validate",
      "ใช้ร่วมกับ React Hook Form ได้"
    ],
    speakerNotes: "พอเราเริ่มมีฟอร์ม ข้อมูลต้อง validate ทั้งฝั่ง client และ server เพื่อความถูกต้อง และนี่คือที่มาของ Zod"
  },
  {
    id: 7,
    title: "📦 Zod Schema",
    bullets: [
      "const SignupSchema = z.object({",
      "  name: z.string().min(2),",
      "  email: z.string().email(),",
      "  age: z.coerce.number().min(18),",
      "  terms: z.literal(true),",
      "});",
      "Type-safe, มีข้อความ error ชัดเจน, ใช้ได้ทั้ง client/server"
    ],
    speakerNotes: "จุดแข็งของ Zod คือเราเขียน schema ครั้งเดียว แต่ใช้ได้ทุกที่ และ TypeScript จะเข้าใจ type ให้ด้วยอัตโนมัติ"
  },
  {
    id: 8,
    title: "🧠 React Hook Form + Zod",
    bullets: [
      "useForm({ resolver: zodResolver(SignupSchema) })",
      "แสดง error ด้วย Tailwind",
      "ปุ่ม submit มี state loading"
    ],
    speakerNotes: "ฝั่ง client จะใช้ React Hook Form เพื่อจัดการ input, error, และสถานะส่งฟอร์ม demo: ลองพิมพ์ email ผิด → แสดง error แบบเรียลไทม์"
  },
  {
    id: 9,
    title: "🌐 Server Validation",
    bullets: [
      "Validate อีกชั้นด้วย Zod ก่อนเขียน DB",
      "ใช้ใน Server Action หรือ API Route",
      "const parsed = SignupSchema.safeParse(data);",
      "if (!parsed.success) return errorResponse(parsed.error);"
    ],
    speakerNotes: "Validation ฝั่ง server สำคัญมาก ป้องกันข้อมูลไม่ถูกต้องจาก client ใช้สคีมาเดียวกันจาก lib/schemas.ts เพื่อไม่ซ้ำซ้อน"
  },
  {
    id: 10,
    title: "🧭 Best Practices",
    bullets: [
      "แยก schema ไว้ใน lib/schemas.ts",
      "ใช้ z.coerce แปลงชนิด input",
      "แสดง error inline ด้วยสีแดง",
      "ปุ่ม submit disable ตอนกำลังส่ง"
    ],
    speakerNotes: "เน้น UX ที่ดี เช่น ให้ feedback ทันที ไม่ให้ผู้ใช้กรอกผิดซ้ำ และ DRY principle: สคีมาเดียวใช้ได้ทุกเลเยอร์"
  },
  {
    id: 11,
    title: "🧩 Deploy & Next Steps",
    bullets: [
      "Deploy บน Vercel / Netlify ง่าย",
      "เพิ่ม Dark Mode ด้วย Tailwind",
      "รวม Prisma / Supabase / Clerk / Auth.js ได้"
    ],
    speakerNotes: "หลังจากนี้สามารถต่อยอดทำ full-stack app ได้เลย เพราะ Next.js รองรับ server component, DB, และ auth ครบ"
  },
  {
    id: 12,
    title: "🎯 สรุป",
    bullets: [
      "Next.js = โครงสร้างพร้อม deploy",
      "Tailwind = UI เร็วและยืดหยุ่น",
      "Zod = validation ครบวงจร"
    ],
    speakerNotes: "ทั้งสามเครื่องมือนี้ช่วยให้เราเขียนเว็บ modern ได้เร็วขึ้น ปลอดภัยขึ้น และบำรุงรักษาง่ายขึ้นมาก"
  },
  {
    id: 13,
    title: "📚 Resources",
    bullets: [
      "nextjs.org",
      "tailwindcss.com",
      "zod.dev",
      "react-hook-form.com"
    ],
    speakerNotes: "ถ้าอยากต่อยอด เริ่มจากเอกสารเหล่านี้ครับ Next.js มีตัวอย่าง integration เต็มรูปแบบกับ Tailwind และ Zod แล้วใน template ของ Vercel"
  }
];

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNotes, setShowNotes] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const slide = slides[currentSlide];

  return (
    <div className="h-screen bg-gray-900 text-white overflow-hidden">
      <div className="flex h-full">
        {/* Main Slide Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-gray-800 px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">
              Next.js + Tailwind + Zod Presentation
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">
                Slide {currentSlide + 1} of {slides.length}
              </span>
              <button
                onClick={() => setShowNotes(!showNotes)}
                className={`px-3 py-1 rounded text-sm ${
                  showNotes ? 'bg-blue-600' : 'bg-gray-700'
                }`}
              >
                {showNotes ? 'Hide Notes' : 'Show Notes'}
              </button>
            </div>
          </div>

          {/* Slide Content */}
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="max-w-4xl w-full">
              <h2 className="text-4xl font-bold mb-8 text-center">
                {slide.title}
              </h2>

              <div className="space-y-4">
                {slide.bullets.map((bullet, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 text-lg"
                  >
                    <span className="text-green-400 mt-1">•</span>
                    <span dangerouslySetInnerHTML={{ __html: bullet }} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="bg-gray-800 px-6 py-4 flex justify-between items-center">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>

            <div className="flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentSlide ? 'bg-blue-500' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>
        </div>

        {/* Speaker Notes Panel */}
        {showNotes && (
          <div className="w-96 bg-gray-800 border-l border-gray-700 flex flex-col">
            <div className="bg-gray-900 px-6 py-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold">Speaker Notes</h3>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed">
                  {slide.speakerNotes}
                </p>
              </div>
            </div>

            <div className="bg-gray-900 px-6 py-4 border-t border-gray-700">
              <div className="text-sm text-gray-400">
                <p className="mb-2">Tips for this slide:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Speak clearly and confidently</li>
                  <li>• Make eye contact with audience</li>
                  <li>• Use gestures to emphasize points</li>
                  <li>• Allow time for questions if needed</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Keyboard Navigation Info */}
      <div className="fixed bottom-4 left-4 bg-gray-800 px-3 py-2 rounded text-xs text-gray-400">
        Use ← → arrow keys to navigate
      </div>
    </div>
  );
}