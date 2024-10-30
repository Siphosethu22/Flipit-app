import { useState } from 'react';
import { 
  ChatBubbleLeftIcon,
  UserGroupIcon,
  PhoneIcon,
  Cog8ToothIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon
} from '@heroicons/react/24/solid';
import useStore from '../store';

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const { contacts, groups, setCurrentChat } = useStore();

  const navItems = [
    { icon: ChatBubbleLeftIcon, label: 'Chats', count: contacts.length },
    { icon: UserGroupIcon, label: 'Groups', count: groups.length },
    { icon: PhoneIcon, label: 'Calls', count: 0 },
    { icon: Cog8ToothIcon, label: 'Settings' }
  ];

  return (
    <div 
      className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 ${
        isExpanded ? 'w-64' : 'w-20'
      }`}
    >
      <div className="p-4 flex items-center justify-between border-b">
        <h1 className={`font-bold text-xl ${isExpanded ? 'block' : 'hidden'}`}>
          FlipIt
        </h1>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          {isExpanded ? (
            <ChevronDoubleLeftIcon className="h-5 w-5" />
          ) : (
            <ChevronDoubleRightIcon className="h-5 w-5" />
          )}
        </button>
      </div>

      <nav className="p-4">
        {navItems.map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center p-3 hover:bg-gray-100 rounded-lg mb-2"
          >
            <item.icon className="h-6 w-6 text-gray-500" />
            {isExpanded && (
              <>
                <span className="ml-3">{item.label}</span>
                {item.count > 0 && (
                  <span className="ml-auto bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full text-xs">
                    {item.count}
                  </span>
                )}
              </>
            )}
          </button>
        ))}
      </nav>

      {isExpanded && (
        <div className="p-4 border-t mt-auto">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <span className="text-indigo-600 font-semibold">U</span>
            </div>
            <div className="ml-3">
              <p className="font-semibold">User Name</p>
              <p className="text-sm text-gray-500">Online</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}