import type { Node, BuiltInNode } from '@xyflow/react';

export type SendMessageNode = Node<{ label: string }, 'sendMessage'>;
export type AppNode = BuiltInNode | SendMessageNode;
