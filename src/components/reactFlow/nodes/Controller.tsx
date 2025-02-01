import React, { useRef, useState, useEffect } from 'react';

export function NodeController({
    title
}: {
    title : string
}) {

    const controllerRef = useRef<HTMLDivElement>(null);
    const [controllerHeight, setControllerHeight] = useState(0);
  

    // B div가 렌더된 후 B div의 높이를 가져옴
    useEffect(() => {
      if (controllerRef.current) {
        setControllerHeight(controllerRef.current.offsetHeight);
      }
    }, []);

    const dragAreaStyle: React.CSSProperties = {
        // B div 높이를 뺀 나머지를 A div 높이로
        height: `calc(100% - ${controllerHeight}px)`,
      };

    return <>
        <div ref={controllerRef} className='controll-bar drag-handle'>
            <h4 className='title'>{ title }</h4>
            <i className='bx bx-chevron-up'></i>
        </div>
        <div style={dragAreaStyle} className='not-selected-drag-area drag-handle'></div>
    </>
}