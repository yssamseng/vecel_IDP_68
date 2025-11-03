'use client';

import { useState, useMemo } from 'react';
import type { StateExample } from '@/lib/models';
import { calculateDerivedState } from '@/lib/utils';
import { cn } from '@/lib/utils';

export default function StateExample() {
  const [state, setState] = useState<StateExample>({
    counter: 0,
    message: '',
    isVisible: true,
    items: []
  });

  // Derived state คำนวณจาก state หลัก
  const derivedState = useMemo(() => {
    return calculateDerivedState(state);
  }, [state]);

  // ฟังก์ชันสำหรับอัปเดต state
  const increment = () => {
    setState(prev => ({
      ...prev,
      counter: prev.counter + 1
    }));
  };

  const decrement = () => {
    setState(prev => ({
      ...prev,
      counter: Math.max(0, prev.counter - 1)
    }));
  };

  const reset = () => {
    setState({
      counter: 0,
      message: '',
      isVisible: true,
      items: []
    });
  };

  const updateMessage = (message: string) => {
    setState(prev => ({ ...prev, message }));
  };

  const toggleVisibility = () => {
    setState(prev => ({ ...prev, isVisible: !prev.isVisible }));
  };

  const addItem = () => {
    const newItem = `รายการที่ ${state.items.length + 1}`;
    setState(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  const removeItem = (index: number) => {
    setState(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const clearItems = () => {
    setState(prev => ({ ...prev, items: [] }));
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Ex 2: State Management
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* State Controls */}
          <div className="space-y-6">
            {/* Counter Section */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Counter</h2>
              <div className="flex items-center space-x-4 mb-4">
                <button
                  onClick={decrement}
                  className="btn-secondary"
                  disabled={state.counter === 0}
                >
                  -
                </button>
                <span className="text-2xl font-bold w-16 text-center">
                  {state.counter}
                </span>
                <button
                  onClick={increment}
                  className="btn-secondary"
                >
                  +
                </button>
                <button
                  onClick={reset}
                  className="btn-secondary ml-4"
                >
                  Reset
                </button>
              </div>

              {/* Derived State Display */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Derived State:</h3>
                <div className="space-y-1 text-sm">
                  <p>เป็นเลขคู่: <span className={cn(
                    derivedState.isEven ? 'text-green-600' : 'text-red-600'
                  )}>{derivedState.isEven ? 'ใช่' : 'ไม่ใช่'}</span></p>
                  <p>เป็นจำนวนเฉพาะ: <span className={cn(
                    derivedState.isPrime ? 'text-green-600' : 'text-red-600'
                  )}>{derivedState.isPrime ? 'ใช่' : 'ไม่ใช่'}</span></p>
                  <p>จำนวนรายการ: {derivedState.itemCount}</p>
                </div>
              </div>
            </div>

            {/* Message Section */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Message Input</h2>
              <input
                type="text"
                value={state.message}
                onChange={(e) => updateMessage(e.target.value)}
                placeholder="พิมพ์ข้อความที่นี่..."
                className="input-field"
              />
              {state.message && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    ข้อความปัจจุบัน: <strong>{state.message}</strong>
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    ความยาว: {state.message.length} ตัวอักษร
                  </p>
                </div>
              )}
            </div>

            {/* Toggle Section */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Toggle Component</h2>
              <button
                onClick={toggleVisibility}
                className={cn(
                  'btn-primary',
                  state.isVisible ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                )}
              >
                {state.isVisible ? 'ซ่อน' : 'แสดง'} เนื้อหา
              </button>

              {state.isVisible && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg animate-slide-up">
                  <h3 className="font-semibold text-green-800 mb-2">
                    ✨ เนื้อหาที่สามารถแสดง/ซ่อนได้
                  </h3>
                  <p className="text-green-700">
                    นี่คือตัวอย่างของ conditional rendering โดยใช้ state
                    ในการควบคุมการแสดงผลของ component
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Dynamic List Section */}
          <div className="space-y-6">
            <div className="card">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Dynamic List</h2>
                <div className="space-x-2">
                  <button
                    onClick={addItem}
                    className="btn-primary"
                  >
                    เพิ่มรายการ
                  </button>
                  <button
                    onClick={clearItems}
                    className="btn-secondary"
                    disabled={state.items.length === 0}
                  >
                    ล้างทั้งหมด
                  </button>
                </div>
              </div>

              {state.items.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  ยังไม่มีรายการ ลองเพิ่มรายการใหม่!
                </div>
              ) : (
                <div className="space-y-2">
                  {state.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <span className="font-medium">{item}</span>
                      <button
                        onClick={() => removeItem(index)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        ลบ
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {state.items.length > 0 && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    จำนวนรายการทั้งหมด: <strong>{state.items.length}</strong>
                  </p>
                </div>
              )}
            </div>

            {/* Current State Display */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Current State (JSON)</h2>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                {JSON.stringify(state, null, 2)}
              </pre>
            </div>

            {/* Code Snippets */}
            {/* <div className="card">
              <h2 className="text-xl font-semibold mb-4">Code create useState</h2>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                {"const [state, setState] = useState<StateExample>({counter: 0,message: '',isVisible: true,items: []});"}
              </pre>
            </div> */}

            {/* Derived State Display */}
            {/* <div className="card">
              <h2 className="text-xl font-semibold mb-4">Current State (JSON)</h2>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                {
                  `const derivedState = useMemo(() => {
  return calculateDerivedState(state);
}, [state]);`
                }
              </pre>
            </div> */}
            
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 card">
          <h2 className="text-xl font-semibold mb-4">📋 คำอธิบายการทำงาน</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">State Management Concepts:</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• <strong>useState</strong> - จัดการ state ใน component</li>
                <li>• <strong>Derived State</strong> - ค่าที่คำนวณจาก state อื่น</li>
                <li>• <strong>Conditional Rendering</strong> - แสดง/ซ่อน component</li>
                <li>• <strong>Array Operations</strong> - เพิ่ม/ลบ items ใน array</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Best Practices:</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• ใช้ <strong>useMemo</strong> สำหรับ derived state</li>
                <li>• อัปเดต state แบบ immutable</li>
                <li>• แยก state ตามความเกี่ยวข้อง</li>
                <li>• ใช้ TypeScript เพื่อ type safety</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}