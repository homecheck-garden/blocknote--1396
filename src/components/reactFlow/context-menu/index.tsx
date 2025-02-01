import React, { useCallback } from 'react';
import { Type, File, Layers } from 'lucide-react'

interface ContextMenuProps {
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  onDocumentCreateClick?: () => void;
  onTextCreateClick?: () => void;
  onLayerCreateClick?: () => void;
}

export function ReactFlowCanvasContextMenu({
  top,
  left,
  right,
  bottom,
  onDocumentCreateClick,
  onTextCreateClick,
  onLayerCreateClick
}: ContextMenuProps) {


  return (
    <div style={{ top, left, right, bottom }} 
    className="react-flow__context-menu p-1 flex flex-col gap">
      <button onClick={onDocumentCreateClick} className='flex items-center gap-2 p-2 hover:bg-accent hover:text-accent-foreground'>
        <File size={16} />
        <small>새 문서 추가</small>
      </button>
      <button onClick={onTextCreateClick} className='flex items-center gap-2 p-2 hover:bg-accent hover:text-accent-foreground'>
        <Type size={16} />
        <small>새 텍스트 추가</small>
      </button>
      <button onClick={onLayerCreateClick} className='flex items-center gap-2 p-2 hover:bg-accent hover:text-accent-foreground'>
        <Layers size={16} />
        <small>새 레이어 추가</small>
      </button>
    </div>
  );
}