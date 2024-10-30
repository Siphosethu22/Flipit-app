import { useState } from 'react';
import { format } from 'date-fns';
import { 
  FaceSmileIcon,
  HandThumbUpIcon,
  HeartIcon,
  ArrowPathIcon,
  EllipsisHorizontalIcon
} from '@heroicons/react/24/outline';

export default function Message({ message, isOwn }) {
  const [showReactions, setShowReactions] = useState(false);
  
  const reactions = [
    { icon: HandThumbUpIcon, label: 'Like' },
    { icon: HeartIcon, label: 'Love' },
    { icon: FaceSmileIcon, label: 'Smile' }
  ];

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4 relative group`}>
      <div className={`max-w-[70%] ${isOwn ? 'bg-indigo-500 text-white' : 'bg-white'} rounded-lg p-3 shadow`}>
        <div className="flex items-start gap-2">
          {!isOwn && (
            <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0">
              <img 
                src={message.avatar} 
                alt={message.sender}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          )}
          <div className="flex-1">
            {!isOwn && (
              <p className="text-sm font-semibold text-gray-900 mb-1">
                {message.sender}
              </p>
            )}
            <p className={`text-sm ${isOwn ? 'text-white' : 'text-gray-700'}`}>
              {message.content}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-xs ${isOwn ? 'text-indigo-100' : 'text-gray-500'}`}>
                {format(new Date(message.timestamp), 'HH:mm')}
              </span>
              {message.isEdited && (
                <span className={`text-xs ${isOwn ? 'text-indigo-100' : 'text-gray-500'}`}>
                  <ArrowPathIcon className="w-3 h-3 inline mr-1" />
                  edited
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Reactions */}
        <div 
          className={`absolute ${isOwn ? 'right-full mr-2' : 'left-full ml-2'} top-0 
          ${showReactions ? 'opacity-100 visible' : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible'}
          transition-all duration-200`}
        >
          <div className="bg-white rounded-full shadow-lg p-1 flex items-center gap-1">
            {reactions.map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                title={label}
              >
                <Icon className="w-4 h-4 text-gray-600" />
              </button>
            ))}
          </div>
        </div>

        {/* Message actions */}
        <button 
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 
          opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => setShowReactions(!showReactions)}
        >
          <EllipsisHorizontalIcon className="w-4 h-4 text-gray-500" />
        </button>
      </div>
    </div>
  );
}