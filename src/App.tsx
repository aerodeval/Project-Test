import { useCallback, useRef } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  type OnConnect,
} from '@xyflow/react';
import { initialNodes, nodeTypes } from './nodes';
import { AppNode } from './nodes/types';
// @ts-ignore
import Sidebar from './Sidebar.jsx';
import '@xyflow/react/dist/style.css';
// @ts-ignore
import { DnDProvider, useDnD } from './DndContext';
import { toast } from 'sonner';
import { initialEdges, edgeTypes } from './edges';




let id = 0;
const getId = () => `dndnode_${id++}`;

export default function App() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { screenToFlowPosition } = useReactFlow();



   //Function to check if node is connected. Returns true if every node is connected by at least one edge
  const checkNodeIdle = (nodes: any[], edges: any[]) => {
    const allConnected = nodes.every(node =>
      edges.some(edge => edge.source === node.id || edge.target === node.id)
    );
    if (allConnected === false) {
      toast.warning("Cannot Save flow", { style: { 'background': 'red' } })
    }
    else {
      toast.success("Flow succesfully saved", { style: { 'background': 'green' } })
    }
  };



  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      // Get the custom message if present
      const customMessage = event.dataTransfer.getData('custom-message');
      let newNode: AppNode;
      if (type === 'sendMessage') {
        const label = customMessage || 'sendMessage node';
        newNode = {
          id: getId(),
          type: 'sendMessage',
          position,
          data: { label },
        };
      } else {
        const label = `${type} node`;
        newNode = {
          id: getId(),
          type: type as any, // fallback for other types
          position,
          data: { label },
        };
      }
      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes]
  );

  return (

    <div>
      <header className='bg-gray-300 border-b-gray-900 flex items-center relative' >
        <div>
          {/* {!nodeStatus ? (
    <div className="flex justify-center">
      <h1 role="alert">Error</h1>
    </div>
  ) : null} */}
          <div className='absolute right-10 top-3'>
            <button
              onClick={() => checkNodeIdle(nodes, edges)}
              className={`   text-gray-900 bg-white  border-blue-500 border-2 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 `} >
              Save Changes
            </button> 
          </div>
        </div>
      </header>
      <div className="dndflow">
        <DnDProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper} style={{ width: '100%', height: '90vh' }}>
            <ReactFlow
              nodes={nodes}
              nodeTypes={nodeTypes}
              onNodesChange={onNodesChange}
              edges={edges}
              edgeTypes={edgeTypes}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onDrop={onDrop}
              onDragOver={onDragOver}
              fitView
            >
              <Background />
              <MiniMap />
              <Controls />
            </ReactFlow>
          </div>
          <Sidebar setNodes={setNodes} setEdges={setEdges} />
        </DnDProvider>
      </div> 
    </div>
  );
}
