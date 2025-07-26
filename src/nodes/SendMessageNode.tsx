import { Handle, Position, type NodeProps } from '@xyflow/react';
import {IconBrandWhatsapp,IconMessage} from  '@tabler/icons-react'

export default function SendMessageNode({ data }: NodeProps) {
 
  return (
    <div className="react-flow__node-default  border rounded  bg-white shadow-md">
      <div className=" text-black mb-2 flex justify-between  bg-emerald-300 p-2">
        <div className="flex gap-1 items-center">
          <IconMessage size={10}/>
       <span className="font-semibold">Send Message</span> </div>

        <div className="bg-white rounded-full p-1" > <IconBrandWhatsapp size={10}/></div>
      </div>
      <div className="text-sm text-gray-700 mb-2">
        {String(data.label)}
      </div>
      
      {/* Input handle - can receive connections */}
      <Handle 
        type="target" 
        position={Position.Left} 
  
      />
      
      {/* Output handle - can send connections */}
      <Handle 
        type="source" 
        position={Position.Right} 
    
      />
    </div>
  );
}