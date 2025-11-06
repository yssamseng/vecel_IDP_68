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
            href="/example3"
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
        </div>
      </div>
    </div>
  );
}