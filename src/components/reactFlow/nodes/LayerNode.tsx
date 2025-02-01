import { memo, useCallback, useEffect, useState } from 'react';
import { NodeProps, NodeResizeControl, useNodesData,  useReactFlow, NodeResizer, Handle, Position } from '@xyflow/react';
import { Ellipsis} from 'lucide-react'

import IconButton from '@/components/element/icon-button'
import { Input } from '@/components/ui/input'
import { useReactFlowStore } from '../index';
import { type LayerNodeType, type AppNode } from './types';

export const LayerNode = ({ id, data, selected }: NodeProps<LayerNodeType>) => {
   const multiSelected = useReactFlowStore((state) => state.multiSelected);
    // 드래그 중인 노드가 현재 노드와 교차하는지 확인
    const { updateNodeData } = useReactFlow();
    const [localLabel, setLocalLabel] = useState(data.label);

    // data.label이 외부에서 변경될 경우 localLabel 동기화
    useEffect(() => {
      setLocalLabel(data.label);
    }, [data.label]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setLocalLabel(newValue);
      // 임시 업데이트
      updateNodeData(id, {
        ...data,
        label: newValue,
        directUpdate: true
      });
    };

    const handleBlur = () => {
      // 포커스를 잃었을 때 최종 업데이트
      updateNodeData(id, {
        ...data,
        label: localLabel,
        directUpdate: true
      });
    };

    // Layer의 배경 색상 변경

    
    return (
      <div className='react-flow__node-default react-flow__node-container layer-node'>
        <div className='layer-node-header flex justify-between items-center p-1 px-2'>
           
           <Input className='w-full font-bold text-gray-700 bg-transparent border-none p-1 px-2' 
           value={localLabel} 
           onChange={handleChange}
           onBlur={handleBlur}/>
            <IconButton className='text-gray-700' icon={<Ellipsis/>} onClick={()=>{
                console.log('ellipsis')
            }}/>

        </div>
        

        <Handle id="b" type="source" position={Position.Bottom} />
        <Handle id="l" type="source" position={Position.Left} />
        <Handle id="r" type="source" position={Position.Right} />
        <Handle id="t" type="source" position={Position.Top} />
        
        <NodeResizer
            isVisible={(selected && !multiSelected) ?? false}
        
            lineStyle={{
                padding : '4px',
            }}
            
            minWidth={140}
            minHeight={50}
            
        />    
      </div>
    );
  }

// 헬퍼 함수들
function calculateNewDimensions(parent: AppNode, intersectingNodes: AppNode[]) {
  let minX = Math.min(...intersectingNodes.map(n => n.position.x));
  let minY = Math.min(...intersectingNodes.map(n => n.position.y));
  let maxX = Math.max(...intersectingNodes.map(n => n.position.x + n.width!));
  let maxY = Math.max(...intersectingNodes.map(n => n.position.y + n.height!));

  return {
    width: Math.max(parent.width!, maxX - minX + 20), // 여백 추가
    height: Math.max(parent.height!, maxY - minY + 20) // 여백 추가
  };
}
