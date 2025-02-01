import React, { useCallback } from 'react';
import { useReactFlowStore } from '../index'
import {
    useReactFlow,
    Panel,
    MiniMap
  } from '@xyflow/react';
import IconButton from '@/components/element/icon-button';
function roundToQuarter(num: number): number {
    return Math.round(num * 4) / 4;
  }
  
  

export function ReactFlowPreviewControls() {
    const zoom = useReactFlowStore((state) => state.zoom);
    const setZoom = useReactFlowStore((state) => state.setZoom )
    const { setViewport, getViewport , zoomIn, zoomOut } = useReactFlow();
 
    const handleZoom = useCallback((value : number) => {
        const currentViewPort = getViewport();
      setViewport({ x: currentViewPort.x, y: currentViewPort.y, zoom: value }, { duration: 800 });
      setZoom(value)
    }, [setViewport]);

    return <>
    <Panel className='react-flow__preview-controls' position={'bottom-right'}>
      <div className='react-flow__zoom-controls p-1 px-2'>
          <div className='scale'>
          <b>{(zoom * 100).toFixed(0)}</b>%
          </div>
          <div style={{flex: 1}}></div>
          <IconButton icon={<i className='bx bx-plus'></i>} onClick={()=>handleZoom(roundToQuarter(zoom) + 0.25)}/>
          <IconButton icon={<i className='bx bx-minus' ></i>} onClick={()=>handleZoom(roundToQuarter(zoom) - 0.25)}/>
      </div>
      <MiniMap nodeStrokeWidth={3} />
    </Panel>
    </>
}