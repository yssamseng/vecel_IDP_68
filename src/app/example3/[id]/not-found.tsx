import Link from 'next/link';
// app/not-found.js
export default function NotFound() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/example3" className="text-primary-600 hover:text-primary-700 text-sm">
          ← กลับไปหน้ารายการ
        </Link>
      </div>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Item Not Found</h1>
        <p className="mb-4">Sorry, we couldn't find data of id</p>
      </div>
    </div>
  );
}
