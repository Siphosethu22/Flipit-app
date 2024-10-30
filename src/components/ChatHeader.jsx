import {
  PhoneIcon,
  VideoCameraIcon,
  MagnifyingGlassIcon,
  EllipsisHorizontalIcon
} from '@heroicons/react/24/outline';

export default function ChatHeader({ chat, onStartCall, onStartVideo, onSearch }) {
  return (
    <div className="bg-white border-b px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex-shrink-0">
            {chat.avatar ? (
              <img 
                src={chat.avatar} 
                alt={chat.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="w-full h-full flex items-center justify-center text-indigo-500 font-semibold">
                {chat.name[0].toUpperCase()}
              </span>
            )}
          </div>
          
          <div>
            <h2 className="font-semibold">{chat.name}</h2>
            <p className="text-sm text-gray-500">
              {chat.isOnline ? 'Online' : 'Last seen recently'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onStartCall}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Start voice call"
          >
            <PhoneIcon className="w-5 h-5 text-gray-600" />
          </button>
          
          <button
            onClick={onStartVideo}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Start video call"
          >
            <VideoCameraIcon className="w-5 h-5 text-gray-600" />
          </button>
          
          <button
            onClick={onSearch}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Search in conversation"
          >
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-600" />
          </button>
          
          <button
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="More options"
          >
            <EllipsisHorizontalIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}