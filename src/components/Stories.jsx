import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/solid';
import useStore from '../store';

export default function Stories() {
  const { stories, addStory } = useStore();
  const [selectedStory, setSelectedStory] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        addStory({
          id: Date.now(),
          content: e.target?.result,
          timestamp: new Date(),
          type: file.type.startsWith('image/') ? 'image' : 'video'
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4 bg-white shadow-sm">
      <div className="flex space-x-4 overflow-x-auto">
        <label className="flex flex-col items-center cursor-pointer">
          <div className="w-16 h-16 rounded-full border-2 border-dashed border-indigo-500 flex items-center justify-center">
            <PlusIcon className="h-6 w-6 text-indigo-500" />
          </div>
          <input type="file" accept="image/*,video/*" className="hidden" onChange={handleFileChange} />
          <span className="text-xs mt-1">Add Story</span>
        </label>

        {stories.map((story) => (
          <button
            key={story.id}
            onClick={() => setSelectedStory(story)}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-full border-2 border-indigo-500 overflow-hidden">
              {story.type === 'image' ? (
                <img src={story.content} alt="" className="w-full h-full object-cover" />
              ) : (
                <video src={story.content} className="w-full h-full object-cover" />
              )}
            </div>
            <span className="text-xs mt-1">Story</span>
          </button>
        ))}
      </div>

      {selectedStory && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="max-w-2xl w-full">
            {selectedStory.type === 'image' ? (
              <img src={selectedStory.content} alt="" className="w-full" />
            ) : (
              <video src={selectedStory.content} controls className="w-full" />
            )}
            <button
              onClick={() => setSelectedStory(null)}
              className="absolute top-4 right-4 text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}