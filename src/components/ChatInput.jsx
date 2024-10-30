import { useState, useRef } from 'react';
import { 
  PaperAirplaneIcon, 
  PaperClipIcon,
  PhotoIcon,
  FaceSmileIcon,
  MicrophoneIcon
} from '@heroicons/react/24/outline';

export default function ChatInput({ onSendMessage }) {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t bg-white p-4">
      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <div className="flex-1 bg-gray-100 rounded-lg p-2">
          <div className="flex items-center gap-2 mb-2">
            <button
              type="button"
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <PaperClipIcon className="w-5 h-5 text-gray-500" />
            </button>
            <button
              type="button"
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <PhotoIcon className="w-5 h-5 text-gray-500" />
            </button>
            <button
              type="button"
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <FaceSmileIcon className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          <div className="flex items-end gap-2">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 bg-transparent resize-none outline-none max-h-32"
              rows={1}
            />
            {message.trim() ? (
              <button
                type="submit"
                className="p-2 bg-indigo-500 hover:bg-indigo-600 rounded-full transition-colors"
              >
                <PaperAirplaneIcon className="w-5 h-5 text-white" />
              </button>
            ) : (
              <button
                type="button"
                className={`p-2 ${isRecording ? 'bg-red-500' : 'hover:bg-gray-200'} rounded-full transition-colors`}
                onClick={() => setIsRecording(!isRecording)}
              >
                <MicrophoneIcon className={`w-5 h-5 ${isRecording ? 'text-white' : 'text-gray-500'}`} />
              </button>
            )}
          </div>
        </div>
      </form>
      
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        multiple
        accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx"
      />
    </div>
  );
}