// src/components/CustomNode.jsx
import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';

// Approximately 948 KB (Safe buffer for 1MB Firestore limit)
const MAX_BASE64_SIZE = 948576; 

const CustomNode = ({ id, data, selected, isConnectable }) => {
  const [editMode, setEditMode] = useState(false);
  // Using 'name' for local state, which corresponds to the 'label' data property
  const [name, setName] = useState(data.label || ''); 
  const [image, setImage] = useState(data.image || '');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    // This correctly converts the image to a Base64 string, which is JSON-safe
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (image) {
      // Check the size of the Base64 string
      const imageSize = image.length;
      
      if (imageSize > MAX_BASE64_SIZE) {
        // Use a custom alert for error handling
        const message = `❌ Image too large! The image data is ${Math.round(imageSize / 1024)} KB, but the maximum allowed size is approximately ${Math.round(MAX_BASE64_SIZE / 1024)} KB (to fit within Firestore limits). Please use a smaller image.`;
        console.error(message);
        window.alert(message); // Using window.alert for quick notification here, assuming it's okay for external checks
        return; 
      }
    }
    
    // Call the onUpdate function provided by TreeView to correctly update React Flow's state
    data.onUpdate(id, { label: name, image: image }); 
    setEditMode(false);
  };

  // Check if any tags are selected to filter this node (used for visual feedback in TreeView)
  const isFiltered = data.selectedTags && data.tags 
      && data.selectedTags.length > 0 
      && !data.selectedTags.some(tag => data.tags.includes(tag));
      
  if (isFiltered) {
    // Return null or an empty div if the node should be hidden by the filter
    return null; 
  }


  return (
    <div
      // CRITICAL: Set node size to 180x140px. The opacity is for the tag filter, if applicable.
      className={`bg-white border-2 rounded shadow-xl w-[160px] h-[110px] flex flex-col items-center justify-between relative transition-all duration-200 
        ${selected ? 'border-indigo-500 scale-[1.02]' : 'border-gray-200'}
        ${data.collapsed ? 'opacity-70' : ''}
      `}
      onContextMenu={(e) => {
        e.preventDefault();
        setEditMode(true);
      }}
    >
      {/* Target Handle (for incoming parent/spouse links) */}
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} /> 
      
      {/* Image Section - Reduced height to h-[80px] to make room for text */}
      {image ? (
        <img src={image} alt="avatar" className="w-full h-[80px] object-cover rounded-t" />
      ) : (
        <div className="w-full h-[80px] bg-gray-200 flex items-center justify-center text-sm text-gray-500 font-medium pt-2">
            No Image
        </div>
      )}
      
      {/* Text Content Area - New structure for all data fields */}
      <div className="w-full text-center py-1 px-1 flex flex-col justify-center flex-grow">
          {/* Name: **Bold and Bigger** (text-base font-bold) */}
          <div className="text-base font-bold truncate text-gray-800 leading-tight">
            {name}
          </div>
          
          {/* DOB & Anniversary: Smaller (text-xs) */}
          {(data.dob || data.anniversary) && (
              <div className="text-xs text-gray-600 leading-snug">
                  {data.dob && <span>DOB: {data.dob}</span>}
                  {data.dob && data.anniversary && <span> | </span>}
                  {data.anniversary && <span>Ann: {data.anniversary}</span>}
              </div>
          )}

          {/* Tags: *Italic* and Smaller (text-xs italic) */}
          {data.tags && (
              <div className="text-xs italic text-gray-500 leading-snug truncate">
                  {data.tags.split(',').map(tag => tag.trim()).join(' | ')}
              </div>
          )}
      </div>
      
    <button
        className="absolute top-1 right-1 text-xs bg-white bg-opacity-80 p-1 rounded-full shadow-md z-20"
        onClick={() => data.toggleCollapse(id)}
        title={data.collapsed ? 'Expand Children' : 'Collapse Children'}
        >
        {data.collapsed ? '➕' : '➖'}
    </button>

      {/* Source Handle (for outgoing child links) */}
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} /> 

      {editMode && (
        <div className="absolute top-0 left-0 w-full h-full bg-white p-2 z-30 shadow-2xl rounded-lg border-4 border-indigo-400">
          <label className="text-xs font-medium text-gray-500">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-1 border p-1 text-sm rounded focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Full Name"
          />
          <label className="text-xs font-medium text-gray-500">Image:</label>
          <input type="file" onChange={handleImageUpload} className="mb-2 w-full text-xs" />
          <div className="flex justify-between mt-2">
            <button 
                onClick={handleSave} 
                className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600 transition-colors"
            >
                Save
            </button>
            <button 
                onClick={() => data.onDelete(id)} 
                className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600 transition-colors"
            >
                Delete
            </button>
            <button 
                onClick={() => setEditMode(false)} 
                className="bg-gray-400 text-white px-2 py-1 rounded text-xs hover:bg-gray-500 transition-colors"
            >
                Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomNode;