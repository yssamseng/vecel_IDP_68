🎯 สรุป Prompt / โจทย์

หัวข้อ:
สร้างโปรเจกต์ Next.js + TypeScript + Tailwind CSS + Zod
เพื่อใช้ นำเสนอการทำงาน 15–20 นาที พร้อม ตัวอย่างโค้ดจริงและสไลด์อธิบาย

🧱 โครงสร้างโปรเจกต์

ใช้ Next.js (App Router)

มี Layout Sidebar เป็น default

ใช้ TypeScript ทุกไฟล์

ใช้ Tailwind CSS สำหรับ UI

ใช้ Zod สำหรับ Schema & Validation

ใช้ React Hook Form สำหรับการจัดการฟอร์ม

📁 Routing & หน้าต่าง ๆ
Path	หน้าที่	รายละเอียด
/	หน้าแรก	Redirect ไป /example1
/example1	State Example	จัดการ state, update text, toggle component
/example2	List Example	แสดง list จาก mock data + dynamic routing /example2/[id]
/example3	Form Example (Zod)	ฟอร์มสร้าง Task ใช้ Zod schema จากโมเดล (type-safe ทั้ง client/server)
/presentation	สไลด์นำเสนอ	ลำดับการพูด, bullets, และ speaker notes
🧩 Concepts สำคัญที่สาธิต

State management (Example1) – useState, derived state, conditional render

Routing & Dynamic Params (Example2) – list/detail pattern, notFound handling

Form Validation (Example3) – React Hook Form + Zod + Server Action

Shared Schema – โมเดลเดียว (lib/models.ts) ใช้ได้ทั้ง client/server

UI with Tailwind – สร้าง component เร็ว, ใช้ class utility

Layout Design – Sidebar navigation, responsive layout

Presentation Page – bullet + speaker notes พร้อมสำหรับพูดจริง

🎓 จุดประสงค์การนำเสนอ

สาธิต workflow เต็มวงจรของ Next.js app

แสดงการใช้ TypeScript + Zod เพื่อความปลอดภัยของข้อมูล

สื่อแนวคิด "DRY & Type-safe" ผ่าน shared schema

ใช้ Tailwind เพื่อเร่งการพัฒนา UI อย่างเป็นระบบ

เหมาะสำหรับพูดนำเสนอ 15–20 นาที พร้อมเดโมสด