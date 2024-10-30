import { useState, useEffect } from 'react';
import { PhoneIcon, VideoCameraIcon, MicrophoneIcon, XIcon } from '@heroicons/react/solid';
import useStore from '../store';

export default function CallInterface() {
  const { currentCall, endCall, toggleMute, toggleVideo } = useStore();
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    let interval;
    if (currentCall) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentCall]);

  if (!currentCall) return null;

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full bg-indigo-100 mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl font-bold">{currentCall.contact.name[0]}</span>
          </div>
          <h3 className="text-xl font-semibold">{currentCall.contact.name}</h3>
          <p className="text-gray-500">{currentCall.type === 'video' ? 'Video Call' : 'Voice Call'}</p>
          <p className="mt-2">{formatDuration(callDuration)}</p>
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={toggleMute}
            className={`p-4 rounded-full ${currentCall.isMuted ? 'bg-red-500' : 'bg-gray-200'}`}
          >
            <MicrophoneIcon className="h-6 w-6" />
          </button>
          
          {currentCall.type === 'video' && (
            <button
              onClick={toggleVideo}
              className={`p-4 rounded-full ${currentCall.isVideoOff ? 'bg-red-500' : 'bg-gray-200'}`}
            >
              <VideoCameraIcon className="h-6 w-6" />
            </button>
          )}

          <button
            onClick={endCall}
            className="p-4 rounded-full bg-red-500 text-white"
          >
            <XIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}