'use client'
import { memo, useEffect } from 'react';
import { Handle, Position, type NodeProps, NodeResizeControl, NodeResizer,  useReactFlow } from '@xyflow/react';

import Editor from '@/components/document/editor';
import { NodeController } from './Controller'
import { useReactFlowStore } from '../index'

import { type CardNodeType } from './types';


export function CardNodeComponent({
  id,
  positionAbsoluteX,
  positionAbsoluteY,
  data,
  selected,
  draggable,
  
}: NodeProps<CardNodeType>) {
  const { updateNode } = useReactFlow();  

  const multiSelected = useReactFlowStore((state) => state.multiSelected);


  useEffect(()=>{
    
      updateNode(id, {
        draggable : !selected
      })
    
  }, [selected, multiSelected])

  return (
    // We add this class to use the same styles as React Flow's default nodes.
    <>
    <div data-no-drag className={"react-flow__node-default card-node" + (selected ? " selected" : '') + (multiSelected ? ' multi-selected' : '')}>
      <NodeController title={data.label}/>
  
      <div className='content' >
        <Editor editable={(selected && !multiSelected) ?? false} />
      </div>

      <Handle id="b" type="source" position={Position.Bottom} />
      <Handle id="l" type="source" position={Position.Left} />
      <Handle id="r" type="source" position={Position.Right} />
      <Handle id="t" type="source" position={Position.Top} />
      
      <NodeResizer
        color="#0064FF"
        handleStyle={
          {
            display : 'none'
          }
        }
        isVisible={(selected && !multiSelected) ?? false}
        lineStyle={
          {
            borderWidth : '1px',
            borderRadius : "var(--xy-node-border-radius, var(--xy-node-border-radius-default))"
          }
        }
        minWidth={140}
        minHeight={50}
      />    
    </div>

    </>
  );
}
export const CardNode = memo(CardNodeComponent);
