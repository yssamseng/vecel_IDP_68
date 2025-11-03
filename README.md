# Next.js + TypeScript + Tailwind + Zod Demo

โปรเจกต์นี้สาธิตการใช้งาน Next.js ร่วมกับ TypeScript, Tailwind CSS และ Zod สำหรับการนำเสนอการทำงาน 15-20 นาที พร้อมตัวอย่างโค้ดจริงและสไลด์อธิบาย

## 🚀 Features

- **Next.js 14** พร้อม App Router
- **TypeScript** สำหรับ Type Safety
- **Tailwind CSS** สำหรับ UI Design
- **Zod** สำหรับ Schema & Validation
- **React Hook Form** สำหรับ Form Management
- **Server Actions** สำหรับ Server-side Processing
- **Layout with Sidebar** สำหรับ Navigation

## 📁 โครงสร้างโปรเจกต์

```
src/
├── app/
│   ├── actions/
│   │   └── tasks.ts              # Server Actions สำหรับจัดการ tasks
│   ├── example1/
│   │   └── page.tsx              # State Management Example
│   ├── example2/
│   │   ├── page.tsx              # List Example
│   │   └── [id]/
│   │       └── page.tsx          # Dynamic Route Example
│   ├── example3/
│   │   └── page.tsx              # Form Validation Example
│   ├── presentation/
│   │   └── page.tsx              # สไลด์นำเสนอ
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Root page (redirect to /example1)
├── components/
│   ├── forms/
│   │   └── TaskForm.tsx          # Form component พร้อม Zod validation
│   └── layout/
│       └── Sidebar.tsx           # Sidebar navigation
└── lib/
    ├── models.ts                 # Shared Zod schemas & TypeScript types
    └── utils.ts                  # Utility functions
```

## 🧭 Routing & หน้าต่าง ๆ

| Path | หน้าที่ | รายละเอียด |
|------|----------|-------------|
| `/` | หน้าแรก | Redirect ไป /example1 |
| `/example1` | State Example | จัดการ state, update text, toggle component |
| `/example2` | List Example | แสดง list จาก mock data + dynamic routing /example2/[id] |
| `/example3` | Form Example | ฟอร์มสร้าง Task ใช้ Zod schema จากโมเดล (type-safe ทั้ง client/server) |
| `/presentation` | สไลด์นำเสนอ | ลำดับการพูด, bullets, และ speaker notes |

## 🧩 Concepts สำคัญที่สาธิต

### State Management (Example1)
- `useState` hook สำหรับจัดการ state
- Derived state คำนวณจาก state หลัก
- Conditional rendering สำหรับแสดง/ซ่อน component
- Array operations สำหรับจัดการ list

### Routing & Dynamic Params (Example2)
- List/detail pattern
- Dynamic routes `[id]`
- `notFound` handling
- Search & filter functionality

### Form Validation (Example3)
- React Hook Form + Zod integration
- Client-side validation (real-time)
- Server-side validation (Server Actions)
- Error handling และ user feedback

### Shared Schema
- โมเดลเดียวใช้ได้ทั้ง client/server
- TypeScript types จาก Zod schemas
- DRY principle สำหรับ validation

### UI with Tailwind
- Component-based design
- Utility classes สำหรับ rapid development
- Responsive design
- Custom theme & animations

### Layout Design
- Sidebar navigation
- Responsive layout
- Active state indicators
- Clean navigation flow

## 🎓 จุดประสงค์การนำเสนอ

1. **สาธิต workflow เต็มวงจรของ Next.js app**
2. **แสดงการใช้ TypeScript + Zod เพื่อความปลอดภัยของข้อมูล**
3. **สื่อแนวคิด "DRY & Type-safe" ผ่าน shared schema**
4. **ใช้ Tailwind เพื่อเร่งการพัฒนา UI อย่างเป็นระบบ**
5. **เหมาะสำหรับพูดนำเสนอ 15–20 นาที พร้อมเดโมสด**

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

เปิด http://localhost:3000 ใน browser เพื่อดูผลลัพธ์

## 📋 การใช้งานแต่ละหน้า

### Example 1: State Management
- ทดลองคลิกปุ่ม + / - เพื่อดู counter
- พิมพ์ข้อความใน input field
- คลิกปุ่ม Toggle เพื่อแสดง/ซ่อน component
- เพิ่ม/ลบรายการใน dynamic list

### Example 2: List & Dynamic Routing
- ค้นหาและกรองข้อมูลแบบ real-time
- คลิกที่รายการเพื่อไปหน้ารายละเอียด (dynamic routing)
- ลอง URL ที่ไม่ถูกต้องเพื่อดู 404 page

### Example 3: Form Validation
- กรอกข้อมูลในฟอร์มเพื่อดู real-time validation
- ลองกรอกข้อมูลผิดรูปแบบเพื่อดู error messages
- ส่งฟอร์มเพื่อดู server-side validation
- ดูรายการ tasks ที่ถูกสร้าง

### Presentation
- ใช้ปุ่มลูกศรหรือคลิก navigation
- เปิด/ปิด speaker notes
- เหมาะสำหรับใช้ในการนำเสนอจริง

## 🎯 Best Practices ที่สาธิต

- **Type Safety**: ใช้ TypeScript ทั้งโปรเจกต์
- **Schema Validation**: Zod schemas ใช้ได้ทั้ง client/server
- **Component Architecture**: Reusable components พร้อม TypeScript
- **State Management**: เลือกใช้ state management ที่เหมาะสม
- **Performance**: ใช้ `useMemo` สำหรับ derived state
- **UX**: Real-time validation และ clear error messages
- **Code Organization**: แยก logic ตามหน้าที่การใช้งาน

## 🚀 Deploy

โปรเจกต์นี้พร้อม deploy บน:

- **Vercel** (แนะนำ) - Zero-config deployment
- **Netlify** - Static hosting พร้อม serverless functions
- **Railway** - Full-stack hosting

---

**พัฒนาด้วย ❤️ โดยใช้ Next.js + TypeScript + Tailwind CSS + Zod**