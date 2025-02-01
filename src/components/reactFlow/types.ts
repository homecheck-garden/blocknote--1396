'use client'
import { Dispatch, useRef, MouseEventHandler, SetStateAction, SyntheticEvent, useCallback, useState } from 'react';
import {
  Edge,
  OnNodesChange,
  OnEdgesChange,  
  NodeChange,
} from '@xyflow/react';


import { AppNode, LayerNodeType } from './nodes/types';


type NodeParentIdChange = {
    type : 'parentId',
    parentId : string | undefined,
    id : string
}

type NodeChildIdsChange = {
  type : 'childIds',
  childNodeIds : string[],
  id : string
}

export type CustomNodeChange<AppNode> = NodeChange | NodeParentIdChange | NodeChildIdsChange 

export type OnCustomNodesChange<AppNode> = (changes: CustomNodeChange<AppNode>[]) => void;


export interface boardProps {
  name : string
  onTitleChanged : (newTitle : string) => void
  onNodesChange : OnCustomNodesChange<AppNode>
  onEdgesChange : OnEdgesChange<Edge>
  nodes : AppNode[]
  edges : Edge[]
  setNodes : Dispatch<SetStateAction<AppNode[]>>
  setEdges : Dispatch<SetStateAction<Edge[]>>
}
