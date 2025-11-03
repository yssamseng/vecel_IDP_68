import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ListItem, generateMockListItems } from '@/lib/models';
import { formatDate } from '@/lib/utils';

// Mock data - ใน production ควรดึงจาก database
const mockItems: ListItem[] = generateMockListItems(15);

// ฟังก์ชันสำหรับค้นหาข้อมูล
function findItemById(id: string): ListItem | null {
  return mockItems.find(item => item.id === id) || null;
}

// Generate static params สำหรับ ISR (Incremental Static Regeneration)
export async function generateStaticParams() {
  return mockItems.slice(0, 10).map((item) => ({
    id: item.id,
  }));
}

export default function ItemDetailPage({ params }: { params: { id: string } }) {
  const item = findItemById(params.id);

  // ถ้าไม่พบข้อมูล ให้แสดง 404 page
  if (!item) {
    notFound();
  }

  const getStatusColor = (status: string) => {
    return status === 'active'
      ? 'text-green-600 bg-green-100'
      : 'text-red-600 bg-red-100';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-green-600 bg-green-100';
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/example2"
            className="text-primary-600 hover:text-primary-700 text-sm"
          >
            ← กลับไปหน้ารายการ
          </Link>
        </div>

        {/* Item Detail Card */}
        <div className="card mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {item.title}
              </h1>
              <p className="text-gray-500">
                รหัส: {item.id}
              </p>
            </div>
            <div className="flex space-x-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                {item.status === 'active' ? 'Active' : 'Inactive'}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(item.priority)}`}>
                {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)} Priority
              </span>
            </div>
          </div>

          {item.description && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">คำอธิบาย</h2>
              <p className="text-gray-700 leading-relaxed">
                {item.description}
              </p>
            </div>
          )}

          {/* Metadata */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">ข้อมูลทั่วไป</h3>
              <dl className="space-y-2">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <dt className="text-sm font-medium text-gray-600">หมวดหมู่</dt>
                  <dd className="text-sm text-gray-900">{item.category}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <dt className="text-sm font-medium text-gray-600">ระดับความสำคัญ</dt>
                  <dd className="text-sm text-gray-900">{item.priority}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <dt className="text-sm font-medium text-gray-600">สถานะ</dt>
                  <dd className="text-sm text-gray-900">
                    {item.status === 'active' ? 'ใช้งานอยู่' : 'ไม่ใช้งาน'}
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">ข้อมูลเวลา</h3>
              <dl className="space-y-2">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <dt className="text-sm font-medium text-gray-600">สร้างเมื่อ</dt>
                  <dd className="text-sm text-gray-900">
                    {formatDate(item.createdAt)}
                  </dd>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <dt className="text-sm font-medium text-gray-600">อัปเดตล่าสุด</dt>
                  <dd className="text-sm text-gray-900">
                    {formatDate(item.updatedAt)}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Additional Metadata */}
          {item.metadata && Object.keys(item.metadata).length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">ข้อมูลเพิ่มเติม</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm text-gray-700 overflow-x-auto">
                  {JSON.stringify(item.metadata, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex space-x-4 mb-8">
          <button className="btn-primary">
            แก้ไขข้อมูล
          </button>
          <button className="btn-secondary">
            สำเนาข้อมูล
          </button>
          <button className="btn-secondary text-red-600 hover:text-red-700">
            ลบรายการ
          </button>
        </div>

        {/* Related Items */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">รายการที่เกี่ยวข้อง</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {mockItems
              .filter(relatedItem =>
                relatedItem.id !== item.id &&
                relatedItem.category === item.category
              )
              .slice(0, 4)
              .map(relatedItem => (
                <Link
                  key={relatedItem.id}
                  href={`/example2/${relatedItem.id}`}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-medium text-gray-900 mb-1">
                    {relatedItem.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {relatedItem.description}
                  </p>
                </Link>
              ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 card">
          <h2 className="text-xl font-semibold mb-4">📋 คำอธิบาย Dynamic Routing</h2>
          <div className="space-y-4 text-sm text-gray-600">
            <p>
              <strong>Dynamic Route:</strong> /example2/[id] - ใช้สำหรับแสดงรายละเอียดของแต่ละรายการ
            </p>
            <p>
              <strong>notFound():</strong> ฟังก์ชันของ Next.js สำหรับจัดการกรณีที่ไม่พบข้อมูล
            </p>
            <p>
              <strong>generateStaticParams():</strong> สร้าง static pages ล่วงหน้าเพื่อ performance
            </p>
            <p>
              <strong>Type Safety:</strong> ใช้ ListItem type จาก Zod schema เพื่อความปลอดภัย
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}