'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ListItem, generateMockListItems } from '@/lib/models';
import { searchInList, filterByCategory } from '@/lib/utils';

export default function ListExample() {
  const [items] = useState<ListItem[]>(generateMockListItems(15));
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Derived state - กรองและค้นหาข้อมูล
  const filteredItems = useMemo(() => {
    let result = items;

    if (searchQuery) {
      result = searchInList(result, searchQuery);
    }

    result = filterByCategory(result, selectedCategory);

    return result;
  }, [items, searchQuery, selectedCategory]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ['all', ...Array.from(new Set(items.map(item => item.category)))];
    return cats;
  }, [items]);

  const getStatusBadge = (status: string) => {
    return status === 'active'
      ? <span className="badge badge-success">Active</span>
      : <span className="badge badge-danger">Inactive</span>;
  };

  const getPriorityBadge = (priority: string) => {
    const className = priority === 'high' ? 'badge-danger' :
                     priority === 'medium' ? 'badge-warning' : 'badge-success';
    return <span className={cn('badge', className)}>{priority}</span>;
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Ex 3: List & Dynamic Routing
        </h1>

        {/* Search and Filter Section */}
        <div className="card mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ค้นหา
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหาจากชื่อหรือคำอธิบาย..."
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                หมวดหมู่
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-field"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'ทั้งหมด' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mt-4 flex justify-between items-center">
            <p className="text-sm text-gray-600">
              แสดง {filteredItems.length} จาก {items.length} รายการ
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                ล้างการค้นหา
              </button>
            )}
          </div>
        </div>

        {/* List Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              ไม่พบรายการที่ตรงกับเงื่อนไข
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 btn-primary"
            >
              ล้างตัวกรอง
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Link
                key={item.id}
                href={`/example3/${item.id}`}
                className="card hover:scale-105 transform transition-all duration-200 cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-xs text-gray-500">
                    #{item.id.split('-')[1]}
                  </span>
                </div>

                {item.description && (
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {item.description}
                  </p>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(item.status)}
                    {getPriorityBadge(item.priority)}
                  </div>
                  <span className="text-xs text-gray-500">
                    {item.category}
                  </span>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-400">
                    สร้างเมื่อ: {new Date(item.createdAt).toLocaleDateString('th-TH')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Instructions */}
        <div className="mt-12 card">
          <h2 className="text-xl font-semibold mb-4">📋 คำอธิบายการทำงาน</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Dynamic Routing Concepts:</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• <strong>Dynamic Routes</strong> - /example2/[id]</li>
                <li>• <strong>Link Navigation</strong> - คลิกที่ card เพื่อดูรายละเอียด</li>
                <li>• <strong>notFound</strong> - จัดการกรณีไม่พบข้อมูล</li>
                <li>• <strong>URL Parameters</strong> - รับค่า id จาก URL</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Data Management:</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• <strong>Search Functionality</strong> - ค้นหาแบบ real-time</li>
                <li>• <strong>Category Filter</strong> - กรองตามหมวดหมู่</li>
                <li>• <strong>Derived State</strong> - ใช้ useMemo สำหรับ performance</li>
                <li>• <strong>Type Safety</strong> - ListItem จาก Zod schema</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>ลองคลิกที่รายการใดรายการหนึ่ง</strong> เพื่อไปยังหน้ารายละเอียด (dynamic routing)
              และลองค้นหาหรือกรองข้อมูลเพื่อดูการทำงานของ search/filter functionality
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function for className
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}