'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Home,
  BarChart3,
  List,
  FileText,
  Palette,
  Presentation
} from 'lucide-react';

const navigation = [
  // { name: 'หน้าแรก', href: '/', icon: Home },
  { name: 'Tailwind CSS', href: '/example1', icon: Palette },
  { name: 'State Example', href: '/example2', icon: BarChart3 },
  { name: 'List & Route Example', href: '/example3', icon: List },
  { name: 'Form Example', href: '/example4', icon: FileText },
  // { name: 'Presentation', href: '/presentation', icon: Presentation },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 bg-sidebar-bg border-r border-sidebar-border">
      <div className="flex items-center h-16 px-6 border-b border-sidebar-border">
        <h1 className="text-xl font-bold text-sidebar-text">
          Next.js Demo
        </h1>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'sidebar-item',
                isActive
                  ? 'sidebar-item-active'
                  : 'sidebar-item-inactive'
              )}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="text-xs text-sidebar-text opacity-60">
          <p>Next.js + TypeScript</p>
          <p>Tailwind + Zod Demo</p>
        </div>
      </div>
    </div>
  );
}