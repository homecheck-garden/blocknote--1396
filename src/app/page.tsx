'use client'
import _ from 'lodash'
import ReactFlow from '@/components/reactFlow/board'
import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { useCanvasStore } from './index'
import { MultiStepLoaderOverlayComponent } from '@/components/overlay/loader'

import { edgeTypes } from '@/components/reactFlow/edges';
import { CustomNodeChange, OnCustomNodesChange } from '@/components/reactFlow/types';
import { useNodesState, useEdgesState, Edge, NodeChange, EdgeChange } from '@xyflow/react';
import type { AppNode } from '@/components/reactFlow/nodes/types';
import { ReactFlowNodeType } from '@/components/reactFlow/nodes';


export default function CanvasDetailView() {
 const [loading, setLoading ]= useState<boolean>(true)
 const [name, setName] = useState<string>('')
 const [loadingStepIndex, setLoadingStepIndex] = useState<number>(0)
 const [viewport, setViewport] = useState<{
  zoom : number,
  x : number,
  y : number
 }>({
  zoom : 1,
  x : 0,
  y : 0
 })

 const [nodes, setNodes, onNodesChange] = useNodesState([{
  id : "A",
  type : ReactFlowNodeType.Card,
  position : {x : 100, y : 100},
  data : {
    label : "Card A"
  },
  style : {
    width : 250,
    height : 400
  }
 },
 {
  id : "B",
  type : ReactFlowNodeType.Card,
  position : {x : 400, y : 100},
  data : {
    label : "Card B"
  },
  style : {
    width : 250,
    height : 400
  }
 },
 {
  id : "C",
  type : ReactFlowNodeType.Card,
  position : {x : 700, y : 100},
  data : {
    label : "Card C"
  },
  style : {
    width : 250,
    height : 400
  }
 }] as AppNode[]);
 const [edges, setEdges, onEdgesChange] = useEdgesState([] as Edge[]);

 const setCurrentCanvasId = useCanvasStore((state) => state.setCurrentCanvasId)


 const loadingSteps = [{
  text : "loading"
 }]

 const setSaveStatus = useCanvasStore((state) => state.setSaveStatus)


 const sleep = (ms : number) => new Promise(resolve => setTimeout(resolve, ms));
 useEffect(() => {
  
  async function fetchData() {
    setCurrentCanvasId("Canvas Id");

    setName("Canvas Name ");
    setLoadingStepIndex(1)
    await sleep(200)
    setLoading(false)
 


  }
  fetchData();
}, []);

async function onCanvasDataChanged() {
  setSaveStatus('saved');
}

async function onTitleChanged(value : string) {
    await onCanvasDataChangedDebounce();
}






const onTitleChangedDebounce = _.debounce(onTitleChanged, 1200)
const onCanvasDataChangedDebounce = _.debounce(onCanvasDataChanged, 500)


  return (
      <main style={{width : '100vw', height :'100vh'}}>
        {!loading ? 
        <ReactFlow 
       
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange as OnCustomNodesChange<AppNode>}
        name={name}
        onTitleChanged={onTitleChangedDebounce}
        nodes={nodes}
        edges={edges}
        setNodes={setNodes}
        setEdges={setEdges}
        ></ReactFlow> : null}
        <MultiStepLoaderOverlayComponent 
          loading={loading} 
          steps={loadingSteps}
          duration={undefined}
          index={loadingStepIndex}
        /> 
      </main>

  );
}