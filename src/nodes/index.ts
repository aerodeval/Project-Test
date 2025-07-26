import type { NodeTypes } from '@xyflow/react';

import { AppNode } from './types';
import SendMessageNode from './SendMessageNode';
export const initialNodes: AppNode[] = [
  // {
  //   id: 'b',
  //   type: 'position-logger',
  //   position: { x: -100, y: 100 },
  //   data: { label: 'drag me!' },
  // },
  // { id: 'c', position: { x: 100, y: 100 }, data: { label: 'your ideas' } },
  // {
  //   id: 'd',
  //   type: 'output',
  //   position: { x: 0, y: 200 },
  //   data: { label: 'with React Flow' },
  // },  

  // {
  //   id: 'message1',
  //   type: 'sendMessage',
  //   position: { x: 0, y: 0 },
  //   data: { label: 'message1' },
  // },
  // {
  //   id: 'message2',
  //   type: 'sendMessage',
  //   position: { x: 0, y: 100 },
  //   data: { label: 'message2' },
  // },

];

export const nodeTypes = {
  sendMessage: SendMessageNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;
