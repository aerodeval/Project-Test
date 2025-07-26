import React, { useState } from 'react';
import { useReactFlow } from '@xyflow/react';
import { toast } from "sonner"
import {IconMessage,IconVideo} from  '@tabler/icons-react'


function MessageSection({ input, setInput, onBack, onSave }) {
  return (
    <div className='flex flex-col'>
      <button onClick={onBack} className="mb-2 px-2 py-1 rounded bg-gray-200 ml-auto">Back</button>
      <h3>Message Section</h3>
      <input 
        value={input} 
        onChange={e => setInput(e.target.value)} 
        placeholder="Enter your message"
        className="w-full p-2 border rounded mb-2"
      />
      <button 
        onClick={onSave} 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        disabled={!input.trim()}
      >
        Save Message
      </button>
    </div>
  );
}

function VideoSection({ onBack }) {
  return (
    <div>
      <button onClick={onBack} className="mb-2 px-2 py-1 rounded bg-gray-200">Back</button>
      <h3>Video Section</h3>
    </div>
  );
}

export default function Sidebar({ setNodes }) {
  const [input, setInput] = useState("");
  const [activeSection, setActiveSection] = useState(null);
  const [savedMessage, setSavedMessage] = useState("");


  // Save the message and return to main menu
  const handleSaveMessage = () => {
    if (!input.trim()) return;
    setSavedMessage(input.trim());
    setInput("");
    setActiveSection(null);
  };

  // Drag functionality for buttons
  const onDragStart = (event, nodeType) => {
//dont let user add without setting message
    if(savedMessage){
    if (nodeType === 'sendMessage') {
      event.dataTransfer.setData('application/reactflow', nodeType);
      event.dataTransfer.setData('custom-message', savedMessage);
    } else {
      event.dataTransfer.setData('application/reactflow', nodeType);
    }
    event.dataTransfer.effectAllowed = 'move';}

    else{
      toast("Please add relevant data by clicking on the node type an then add the node")
    }
  };
  const utilities = [
    {
      label: 'Message',
      icon: <IconMessage/>, // you can replace with an actual icon component if using libraries like lucide or react-icons
      type: 'message',
    },
    {
      label: 'Video',
      icon: <IconVideo/>,
      type: 'video',
    },
  ];

  return (
    <aside>
      {/* Only show buttons when no section is active */}
      {!activeSection && (
        <div className='flex gap-1'>
          {utilities.map((data, index) => (
            <button 
              key={data.type} 
              onClick={() => setActiveSection(data.type)} 
              onDragStart={event => onDragStart(event, data.type === 'message' ? 'sendMessage' : data)}
              draggable
              className='w-[100px] h-[100px] rounded-lg shadow-md flex items-center justify-center border-blue-500 border-2'
            >
              <div className='flex items-center flex-col text-blue-500'>{data.icon}
              <h2 className='text-md'>{data.label}</h2></div>
            </button>
          ))}
        </div>
      )}
      {/* Show sections when active */}
      {activeSection === 'message' && (
        <MessageSection 
          input={input} 
          setInput={setInput} 
          onBack={() => setActiveSection(null)} 
          onSave={handleSaveMessage}
        />
      )}
      {activeSection === 'video' && (
        <VideoSection onBack={() => setActiveSection(null)} />
      )}
    </aside>
  );
}
