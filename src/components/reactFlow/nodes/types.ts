import type { Node, BuiltInNode } from '@xyflow/react';

export type PositionLoggerNode = Node<{ label: string }, 'position-logger'>;
export type CardNodeType = Node<{ label: string }, 'card'>;
export type LayerNodeType = Node<{ 
    label: string
    childNodeIds: string[]
}, 'layer'>;
export type AppNode = BuiltInNode | PositionLoggerNode | CardNodeType | LayerNodeType;
