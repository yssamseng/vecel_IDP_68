'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function TailwindExample() {
  const [selectedDemo, setSelectedDemo] = useState('layout');
  const [isDark, setIsDark] = useState(false);

  const demos = [
    { id: 'layout', name: 'Layout & Flexbox', icon: 'Layout' },
    { id: 'typography', name: 'Typography', icon: 'Text' },
    { id: 'colors', name: 'Colors & Themes', icon: 'Palette' },
    { id: 'components', name: 'Components', icon: 'Box' },
    { id: 'animations', name: 'Animations', icon: 'Play' },
    { id: 'responsive', name: 'Responsive', icon: 'Smartphone' }
  ];

  const renderDemo = () => {
    switch (selectedDemo) {
      case 'layout':
        return <LayoutDemo />;
      case 'typography':
        return <TypographyDemo />;
      case 'colors':
        return <ColorsDemo isDark={isDark} setIsDark={setIsDark} />;
      case 'components':
        return <ComponentsDemo />;
      case 'animations':
        return <AnimationsDemo />;
      case 'responsive':
        return <ResponsiveDemo />;
      default:
        return <LayoutDemo />;
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Ex 1: Tailwind CSS Showcase
        </h1>

        {/* Demo Selector */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {demos.map((demo) => (
              <button
                key={demo.id}
                onClick={() => setSelectedDemo(demo.id)}
                className={cn(
                  'px-4 py-2 rounded-lg font-medium transition-colors',
                  selectedDemo === demo.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                )}
              >
                {demo.name}
              </button>
            ))}
          </div>
        </div>

        {/* Demo Content */}
        {renderDemo()}
      </div>
    </div>
  );
}

function LayoutDemo() {
  return (
    <div className="space-y-8">
      {/* Flexbox Examples */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Flexbox Layouts</h2>

        <div className="space-y-6">
          {/* Basic Flex */}
          <div>
            <h3 className="text-lg font-medium mb-2">Basic Flex (flex justify-between items-center)</h3>
            <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg">
              <span className="font-medium">Left Item</span>
              <span className="font-medium">Center Item</span>
              <span className="font-medium">Right Item</span>
            </div>
            <code className="block mt-2 text-sm bg-gray-900 text-green-400 p-2 rounded">
              {`className="flex justify-between items-center"`}
            </code>
          </div>

          {/* Flex Column */}
          <div>
            <h3 className="text-lg font-medium mb-2">Flex Column (flex flex-col gap-4)</h3>
            <div className="flex flex-col gap-4 p-4 bg-gray-100 rounded-lg">
              <div className="p-3 bg-blue-500 text-white rounded">Item 1</div>
              <div className="p-3 bg-blue-600 text-white rounded">Item 2</div>
              <div className="p-3 bg-blue-700 text-white rounded">Item 3</div>
            </div>
            <code className="block mt-2 text-sm bg-gray-900 text-green-400 p-2 rounded">
              {`className="flex flex-col gap-4"`}
            </code>
          </div>

          {/* Flex Wrap */}
          <div>
            <h3 className="text-lg font-medium mb-2">Flex Wrap (flex flex-wrap gap-2)</h3>
            <div className="flex flex-wrap gap-2 p-4 bg-gray-100 rounded-lg">
              {['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'].map((item, i) => (
                <div key={i} className="px-3 py-2 bg-purple-500 text-white rounded text-sm">
                  {item}
                </div>
              ))}
            </div>
            <code className="block mt-2 text-sm bg-gray-900 text-green-400 p-2 rounded">
              {`className="flex flex-wrap gap-2"`}
            </code>
          </div>
        </div>
      </div>

      {/* Grid Examples */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Grid Layouts</h2>

        <div className="space-y-6">
          {/* Basic Grid */}
          <div>
            <h3 className="text-lg font-medium mb-2">Grid (grid grid-cols-3 gap-4)</h3>
            <div className="grid grid-cols-3 gap-4 p-4 bg-gray-100 rounded-lg">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="p-4 bg-green-500 text-white rounded text-center font-medium">
                  {i}
                </div>
              ))}
            </div>
            <code className="block mt-2 text-sm bg-gray-900 text-green-400 p-2 rounded">
              {`className="grid grid-cols-3 gap-4"`}
            </code>
          </div>

          {/* Responsive Grid */}
          <div>
            <h3 className="text-lg font-medium mb-2">Responsive Grid (grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-100 rounded-lg">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="p-4 bg-orange-500 text-white rounded text-center font-medium">
                  {i}
                </div>
              ))}
            </div>
            <code className="block mt-2 text-sm bg-gray-900 text-green-400 p-2 rounded">
              {`className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"`}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}

function TypographyDemo() {
  return (
    <div className="space-y-8">
      {/* Headings */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Typography Hierarchy</h2>

        <div className="space-y-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Heading 1 (text-4xl font-bold)</h1>
            <code className="text-sm bg-gray-900 text-green-400 p-1 rounded">text-4xl font-bold</code>
          </div>

          <div>
            <h2 className="text-3xl font-semibold text-gray-800">Heading 2 (text-3xl font-semibold)</h2>
            <code className="text-sm bg-gray-900 text-green-400 p-1 rounded">text-3xl font-semibold</code>
          </div>

          <div>
            <h3 className="text-2xl font-medium text-gray-700">Heading 3 (text-2xl font-medium)</h3>
            <code className="text-sm bg-gray-900 text-green-400 p-1 rounded">text-2xl font-medium</code>
          </div>

          <div>
            <p className="text-lg text-gray-600">Large Text (text-lg)</p>
            <code className="text-sm bg-gray-900 text-green-400 p-1 rounded">text-lg</code>
          </div>

          <div>
            <p className="text-base text-gray-600">Base Text (text-base)</p>
            <code className="text-sm bg-gray-900 text-green-400 p-1 rounded">text-base</code>
          </div>

          <div>
            <p className="text-sm text-gray-500">Small Text (text-sm)</p>
            <code className="text-sm bg-gray-900 text-green-400 p-1 rounded">text-sm</code>
          </div>
        </div>
      </div>

      {/* Text Styles */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Text Styles & Decoration</h2>

        <div className="space-y-4">
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="underline text-blue-600 mb-2">Underlined Text (underline)</p>
            <p className="line-through text-gray-500 mb-2">Strikethrough Text (line-through)</p>
            <p className="italic text-purple-600 mb-2">Italic Text (italic)</p>
            <p className="font-bold text-red-600 mb-2">Bold Text (font-bold)</p>
            <p className="uppercase text-green-600 mb-2">UPPERCASE TEXT (uppercase)</p>
            <p className="lowercase text-orange-600 mb-2">lowercase text (lowercase)</p>
            <p className="capitalize text-pink-600">Capitalized Text (capitalize)</p>
          </div>
        </div>
      </div>

      {/* Text Alignment & Spacing */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Text Alignment & Spacing</h2>

        <div className="space-y-4">
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="text-left text-sm mb-2">Left aligned text (text-left)</p>
            <p className="text-center text-sm mb-2">Center aligned text (text-center)</p>
            <p className="text-right text-sm mb-2">Right aligned text (text-right)</p>
            <p className="text-justify text-sm mb-4">Justified text with more content to demonstrate how it fills the available space by adjusting word spacing. (text-justify)</p>

            <p className="tracking-wider text-sm mb-2">Wide letter spacing (tracking-wider)</p>
            <p className="tracking-tight text-sm mb-2">Tight letter spacing (tracking-tight)</p>
            <p className="leading-loose text-sm mb-2">Loose line height (leading-loose)</p>
            <p className="leading-tight text-sm">Tight line height (leading-tight)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ColorsDemo({ isDark, setIsDark }: { isDark: boolean; setIsDark: (dark: boolean) => void }) {
  return (
    <div className="space-y-8">
      {/* Color Palette */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Color Palette</h2>

        <div className="space-y-6">
          {/* Primary Colors */}
          <div>
            <h3 className="text-lg font-medium mb-3">Primary Colors</h3>
            <div className="grid grid-cols-5 gap-2">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                <div key={shade} className="text-center">
                  <div className={`h-16 bg-primary-${shade} rounded border border-gray-300`}></div>
                  <p className="text-xs mt-1">{shade}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Semantic Colors */}
          <div>
            <h3 className="text-lg font-medium mb-3">Semantic Colors</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="h-16 bg-green-500 rounded mb-2"></div>
                <p className="text-sm">Success</p>
                <code className="text-xs">bg-green-500</code>
              </div>
              <div className="text-center">
                <div className="h-16 bg-yellow-500 rounded mb-2"></div>
                <p className="text-sm">Warning</p>
                <code className="text-xs">bg-yellow-500</code>
              </div>
              <div className="text-center">
                <div className="h-16 bg-red-500 rounded mb-2"></div>
                <p className="text-sm">Error</p>
                <code className="text-xs">bg-red-500</code>
              </div>
            </div>
          </div>

          {/* Text Colors */}
          <div>
            <h3 className="text-lg font-medium mb-3">Text Colors</h3>
            <div className="space-y-2">
              <p className="text-gray-900">text-gray-900 - Dark text</p>
              <p className="text-gray-700">text-gray-700 - Medium dark text</p>
              <p className="text-gray-500">text-gray-500 - Medium text</p>
              <p className="text-gray-300 bg-gray-800 p-2 rounded">text-gray-300 - Light text</p>
              <p className="text-white bg-gray-800 p-2 rounded">text-white - White text</p>
            </div>
          </div>
        </div>
      </div>

      {/* Theme Toggle */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Dark Mode Toggle</h2>

        <div className={cn(
          'p-6 rounded-lg transition-colors',
          isDark ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
        )}>
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg font-medium">
              Current Theme: {isDark ? 'Dark' : 'Light'}
            </p>
            <button
              onClick={() => setIsDark(!isDark)}
              className={cn(
                'px-4 py-2 rounded-lg font-medium transition-colors',
                isDark
                  ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-400'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              )}
            >
              {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
          </div>

          <div className="space-y-2">
            <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
              This is an example of theme switching with Tailwind CSS.
            </p>
            <div className={cn(
              'p-4 rounded border',
              isDark
                ? 'bg-gray-700 border-gray-600'
                : 'bg-white border-gray-300'
            )}>
              <p className="text-sm">
                Container background changes based on theme selection.
              </p>
            </div>
          </div>
        </div>

        <code className="block mt-4 text-sm bg-gray-900 text-green-400 p-2 rounded">
          {`className={cn(
  'p-6 rounded-lg transition-colors',
  isDark ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
)}`}
        </code>
      </div>
    </div>
  );
}

function ComponentsDemo() {
  const [alertVisible, setAlertVisible] = useState(true);
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <div className="space-y-8">
      {/* Buttons */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Buttons</h2>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <button className="btn-primary">Primary Button</button>
            <button className="btn-secondary">Secondary Button</button>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              Success Button
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
              Danger Button
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Outline Button
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="px-3 py-1.5 bg-blue-500 text-sm text-white rounded-md hover:bg-blue-600">Small</button>
            <button className="px-4 py-2 bg-blue-500 text-base text-white rounded-lg hover:bg-blue-600">Medium</button>
            <button className="px-6 py-3 bg-blue-500 text-lg text-white rounded-xl hover:bg-blue-600">Large</button>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Cards</h2>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="card">
            <h3 className="text-lg font-semibold mb-2">Basic Card</h3>
            <p className="text-gray-600">Simple card with padding and shadow.</p>
          </div>

          <div className="border border-blue-200 bg-blue-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Colored Card</h3>
            <p className="text-blue-700">Card with custom colors and border.</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-2">Gradient Card</h3>
            <p>Card with gradient background.</p>
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Alerts & Messages</h2>

        <div className="space-y-3">
          {alertVisible && (
            <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg">
              <div className="flex justify-between items-center">
                <span>ℹ️ This is an informational alert message.</span>
                <button
                  onClick={() => setAlertVisible(false)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            ✅ Success! Your changes have been saved.
          </div>

          <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg">
            ⚠️ Warning: Please review your input before submitting.
          </div>

          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            🚨 Error: Something went wrong. Please try again.
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Tabs</h2>

        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {['tab1', 'tab2', 'tab3'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'py-2 px-1 border-b-2 font-medium text-sm transition-colors',
                  activeTab === tab
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                )}
              >
                {tab === 'tab1' ? 'Profile' : tab === 'tab2' ? 'Settings' : 'Analytics'}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-4">
          {activeTab === 'tab1' && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-2">Profile Content</h3>
              <p className="text-gray-600">User profile information and settings.</p>
            </div>
          )}
          {activeTab === 'tab2' && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-2">Settings Content</h3>
              <p className="text-gray-600">Application settings and preferences.</p>
            </div>
          )}
          {activeTab === 'tab3' && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-2">Analytics Content</h3>
              <p className="text-gray-600">Usage statistics and analytics data.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AnimationsDemo() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);

  return (
    <div className="space-y-8">
      {/* Transition Classes */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Transitions</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Color Transitions</h3>
            <button className="bg-blue-500 hover:bg-red-500 text-white px-6 py-3 rounded-lg transition-colors duration-500">
              Hover me (color transition)
            </button>
            <code className="block mt-2 text-sm bg-gray-900 text-green-400 p-2 rounded">
              {`transition-colors duration-500`}
            </code>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Transform Transitions</h3>
            <button className="bg-purple-500 hover:scale-110 text-white px-6 py-3 rounded-lg transition-transform duration-300">
              Hover me (scale transform)
            </button>
            <code className="block mt-2 text-sm bg-gray-900 text-green-400 p-2 rounded">
              {`transition-transform duration-300 hover:scale-110`}
            </code>
          </div>
        </div>
      </div>

      {/* Animation Classes */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Animations</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Built-in Animations</h3>
            <div className="flex flex-wrap gap-4">
              <div className="w-20 h-20 bg-blue-500 rounded-lg animate-spin"></div>
              <div className="w-20 h-20 bg-green-500 rounded-lg animate-ping"></div>
              <div className="w-20 h-20 bg-purple-500 rounded-lg animate-pulse"></div>
              <div className="w-20 h-20 bg-orange-500 rounded-lg animate-bounce"></div>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <code className="block bg-gray-900 text-green-400 p-2 rounded">animate-spin</code>
              <code className="block bg-gray-900 text-green-400 p-2 rounded">animate-ping</code>
              <code className="block bg-gray-900 text-green-400 p-2 rounded">animate-pulse</code>
              <code className="block bg-gray-900 text-green-400 p-2 rounded">animate-bounce</code>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Custom Animations</h3>
            <div className="space-y-4">
              <div className="animate-fade-in">
                <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg">
                  Fade In Animation (custom)
                </div>
              </div>

              <div className="animate-slide-up">
                <div className="p-4 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg">
                  Slide Up Animation (custom)
                </div>
              </div>
            </div>
            <code className="block mt-2 text-sm bg-gray-900 text-green-400 p-2 rounded">
              {`// In tailwind.config.js
animations: {
  'fade-in': 'fadeIn 0.5s ease-in-out',
  'slide-up': 'slideUp 0.3s ease-out',
}`}
            </code>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Interactive Animations</h3>
            <div className="flex gap-4">
              <button
                onClick={() => setIsSpinning(!isSpinning)}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg"
              >
                {isSpinning ? 'Stop' : 'Start'} Spinning
              </button>

              <button
                onClick={() => setIsPulsing(!isPulsing)}
                className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg"
              >
                {isPulsing ? 'Stop' : 'Start'} Pulsing
              </button>
            </div>

            <div className="mt-4 flex gap-4">
              <div className={cn(
                'w-16 h-16 bg-indigo-500 rounded-lg',
                isSpinning && 'animate-spin'
              )}></div>
              <div className={cn(
                'w-16 h-16 bg-pink-500 rounded-lg',
                isPulsing && 'animate-pulse'
              )}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResponsiveDemo() {
  return (
    <div className="space-y-8">
      {/* Responsive Grid */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Responsive Grid</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="p-4 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-lg text-center font-medium">
              Item {i}
            </div>
          ))}
        </div>

        <code className="block mt-4 text-sm bg-gray-900 text-green-400 p-2 rounded">
          {`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4`}
        </code>
        <p className="text-sm text-gray-600 mt-2">
          • 1 column on mobile (default)
          <br />• 2 columns on small screens (640px+)
          <br />• 3 columns on medium screens (768px+)
          <br />• 4 columns on large screens (1024px+)
        </p>
      </div>

      {/* Responsive Typography */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Responsive Typography</h2>

        <div className="space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Responsive Heading
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-center text-gray-600">
            This text size adapts to different screen sizes for optimal readability.
          </p>
        </div>

        <code className="block mt-4 text-sm bg-gray-900 text-green-400 p-2 rounded">
          {`text-2xl sm:text-3xl md:text-4xl lg:text-5xl`}
        </code>
      </div>

      {/* Responsive Spacing */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Responsive Spacing</h2>

        <div className="space-y-4">
          <div className="p-4 sm:p-6 md:p-8 lg:p-12 bg-blue-50 rounded-lg">
            <h3 className="font-medium mb-2">Responsive Padding</h3>
            <p className="text-sm text-gray-600">
              Padding increases on larger screens: p-4 on mobile, p-6 on small, p-8 on medium, p-12 on large.
            </p>
          </div>

          <div className="space-y-2 sm:space-y-4 md:space-y-6 lg:space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 bg-green-100 rounded-lg">
                <p className="text-sm">Item {i} - Responsive vertical spacing between elements.</p>
              </div>
            ))}
          </div>
        </div>

        <code className="block mt-4 text-sm bg-gray-900 text-green-400 p-2 rounded">
          {`p-4 sm:p-6 md:p-8 lg:p-12
space-y-2 sm:space-y-4 md:space-y-6 lg:space-y-8`}
        </code>
      </div>

      {/* Responsive Display */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Responsive Display</h2>

        <div className="space-y-4">
          <div className="block sm:hidden p-4 bg-red-100 rounded-lg">
            <p className="text-red-800 font-medium">📱 Mobile Only (block sm:hidden)</p>
          </div>

          <div className="hidden sm:block md:hidden p-4 bg-yellow-100 rounded-lg">
            <p className="text-yellow-800 font-medium">📱 Small Screens Only (hidden sm:block md:hidden)</p>
          </div>

          <div className="hidden md:block lg:hidden p-4 bg-green-100 rounded-lg">
            <p className="text-green-800 font-medium">💻 Medium Screens Only (hidden md:block lg:hidden)</p>
          </div>

          <div className="hidden lg:block p-4 bg-blue-100 rounded-lg">
            <p className="text-blue-800 font-medium">🖥️ Large Screens Only (hidden lg:block)</p>
          </div>
        </div>

        <p className="text-sm text-gray-600 mt-4">
          Resize your browser window to see different content based on screen size.
        </p>
      </div>

      {/* Mobile First Demo */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Mobile-First Approach</h2>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Mobile-First Benefits:</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>✅ Better performance on mobile devices</li>
            <li>✅ Cleaner, more maintainable code</li>
            <li>✅ Progressive enhancement approach</li>
            <li>✅ Easier to debug and test</li>
          </ul>

          <div className="mt-4 p-3 bg-white rounded border">
            <code className="text-xs">
              {`/* Mobile-first approach */}
.className {
  /* Base styles for mobile */
  padding: 1rem;

  /* Enhance for larger screens */
  @media (min-width: 768px) {
    padding: 2rem;
  }
}`}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}