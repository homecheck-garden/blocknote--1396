import type { NodeTypes } from '@xyflow/react';

import { CardNode } from './CardNode';
import { LayerNode } from './LayerNode';


export enum ReactFlowNodeType {
  Card = 'card',
  Layer = 'layer',
}

export const nodeTypes = {
  [ReactFlowNodeType.Card]: CardNode,
  [ReactFlowNodeType.Layer]: LayerNode,

  // Add any of your custom nodes here!
} satisfies NodeTypes;
