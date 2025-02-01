'use client'
import { Dispatch, useRef, MouseEventHandler, SetStateAction, SyntheticEvent, useCallback, useState, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
  type OnConnect,
  Viewport,

  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  useStoreApi,
  useStore,
  useReactFlow,
  ReactFlowProvider,
  OnNodeDrag,
  ConnectionMode,
  SelectionDragHandler,
  useOnSelectionChange
  
} from '@xyflow/react';


import '@xyflow/react/dist/style.css';
import { useReactFlowStore,  FocusNode, exceptChildNodes } from './index'
import { ReactFlowPreviewControls } from './controls/preview'
import { ReactFlowHeaderControls } from './controls/header'
import { ReactFlowCanvasContextMenu } from './context-menu'

import { ReactFlowNodeType, nodeTypes } from './nodes';
import { edgeTypes } from './edges';
import { AppNode, LayerNodeType } from './nodes/types';
import { boardProps } from './types';



const previousPosition = new Map<string, {x : number, y : number}>();
const childNodeRelativePosition = new Map<string, {x : number, y : number}>();

export  function ReactFlowBoardComponent( { 
  name, 
  onTitleChanged, 

  onEdgesChange,
  onNodesChange,
  nodes, 
  edges, 
  setNodes, 
  setEdges,
}: boardProps) {


    // panOnDrag를 토글하기 위한 state
    const [panEnabled, setPanEnabled] = useState(false);
    const [ panScrollEnabled, setPanScrollEnabled ] = useState(true);
    const [selectedNodeId, setSelectedNodeId] = useState<string>('');
    ///<summary>
    /// 마우스를 드래그해서 끌어다 놓았을 때, 그룹화하려고 사용하기 위함.
    ///</summary>
    const [raycastGrouppableNode, setRaycastGrouppableNode] = useState<LayerNodeType | null>(null);
    const [connecting, setConnecting] = useState(false)
    const [menu, setMenu] = useState< {
      top?: number | string;
      left?: number | string;
      right?: number | string;
      bottom?: number | string;
      flowPosition : {
        x : number,
        y : number
      }
    } | null>(null);
    const { 
      getNode, 
      getNodes, 
      updateNode,
      screenToFlowPosition,
      addNodes
    
    } = useReactFlow();
    const resetSelectedElements = useStore((state)=> state.resetSelectedElements);
    const ref = useRef<HTMLDivElement>(null);


  const setZoom = useReactFlowStore((state) => state.setZoom);
  const multiSelected = useReactFlowStore((state) => state.multiSelected)
  const setSelectionLength = useReactFlowStore((state) => state.setSelectionLength)
  const onConnect: OnConnect = useCallback(
    (connection) => {
      setEdges((edges) => {
        
        const newEdges = addEdge({
          ...connection,
          animated : true
        }, edges)

        const createdEdge = newEdges[newEdges.length - 1]
        if(!createdEdge) return newEdges
        return newEdges
    })
    },
    [setEdges]
  );



  const onViewportChangeDelegator = useCallback((viewport : Viewport) => {
    setZoom(viewport.zoom);
  }, [])

  const onPointerEnterToNode = useCallback(()=> {
    if(!selectedNodeId) return;
    setPanScrollEnabled(false)
  }, [selectedNodeId])
  const onPointerLeaveToNode = useCallback(()=> {
    setPanScrollEnabled(true)
  }, [])

  const onCanvasContextMenu = useCallback<MouseEventHandler<HTMLDivElement>>(
    (event) => {
      event.preventDefault();
      if (!ref.current) return;
      const target = event.target as HTMLDivElement
      const isPane = (target == ref.current
        || target.parentElement == ref.current
        || target.parentElement?.parentElement == ref.current)
      if(!isPane) {
        // node 또는 edge 인 경우
        return;
      }

      const reactFlowBounds = ref.current.getBoundingClientRect();
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      setMenu({
        top: event.clientY < reactFlowBounds.height - 200 ? event.clientY : undefined,
        left: event.clientX < reactFlowBounds.width - 200 ? event.clientX : undefined,
        right: event.clientX >= reactFlowBounds.width - 200 ? reactFlowBounds.width - event.clientX : undefined,
        bottom: event.clientY >= reactFlowBounds.height - 200 ? reactFlowBounds.height - event.clientY : undefined,
        flowPosition: position
      });
    },
    [setMenu]
  );
  const onPaneClick = useCallback(() => {
    setMenu(null)
    setRaycastGrouppableNode(null);
    setSelectedNodeId('');
    setSelectionLength(0);
    resetSelectedElements();

  }, [setMenu]);

  // 노드 클릭 시, 해당 노드를 배열에서 맨 뒤로 이동
  const onNodeClick =  useCallback((event : SyntheticEvent, prevNode : AppNode )=> {
    setMenu(null)
    // 클릭된 노드를 강조하여 맨 앞으로 가져옴
    FocusNode(prevNode, {
      updateNode,
      setNodes,
      getNode : getNode as (id : string) => AppNode | undefined
    })
  },[])



    const handlePaneMouseDown = useCallback((event: React.MouseEvent) => {
      // 가운데 클릭(1)일 때만 panOnDrag를 true로
      if (event.button === 1) {
        setPanEnabled(true);
      }
    }, []);
  
    const handlePaneMouseUp = (event: React.MouseEvent) => {
      // 마우스 버튼에서 손을 뗄 때 panOnDrag를 false로
      if (event.button === 1) {
        setPanEnabled(false);
      }
    };

    function onNodeSelectionChange( result : {nodes : Node[], edges : Edge[]}) {
      if(result.nodes.length === 0) return;
      setSelectedNodeId(result.nodes[0].id)
      setSelectionLength(result.nodes.length)
    }



    const onNodeDragsStart: SelectionDragHandler<AppNode> = useCallback((event, draggingNodes) => {
      resetSelectedElements();
      for(const node of draggingNodes.filter(n => n.type === 'layer')) {
        previousPosition.set(node.id, node.position);
      }
    }, [])

    const onNodeDrags: SelectionDragHandler<AppNode> = useCallback(
      (event, draggingNodes) => {
        setMenu(null)

        if(draggingNodes.length == 0) return;
        const draggingNode = draggingNodes[0];
        if(draggingNodes.length > 1) {
          onNodeClick(event, draggingNode);
        }
        
        switch(draggingNode.type) {
          case ReactFlowNodeType.Layer:
          break;
          case 'card':
          default : 
            // 마우스 위치에서 raycast 수행
            const mouseX = event.clientX;
            const mouseY = event.clientY;
            
            // 모든 노드를 가져와서 마우스 위치와 비교
            const grouppableNodes = getNodes().filter(node => node.type == ReactFlowNodeType.Layer);
            const intersectedNodes = grouppableNodes.filter(node => {
              if(node.id === draggingNode.id) return false;
              const nodeElement = document.querySelector(`[data-id="${node.id}"]`);
              if (!nodeElement) return false;
              
              // 실제 렌더링된 위치와 크기 가져오기
              const rect = nodeElement.getBoundingClientRect();
              // 마우스 위치에서 수직선을 그었을 때 교차하는 노드 찾기
              return mouseX >= rect.left && 
                    mouseX <= rect.right &&
                    rect.top <= mouseY && 
                    rect.bottom >= mouseY;
            }) as AppNode[];
            const capturedGrouppableNode = intersectedNodes[0] as LayerNodeType;
            if(!capturedGrouppableNode) {
              if(raycastGrouppableNode) {
                updateNode(raycastGrouppableNode.id, {
                  className : raycastGrouppableNode.className?.replace('grouppable-target', '')
                })
                setRaycastGrouppableNode(null);
              }
              return;
            }
            // 만약 LayerNode 인 경우, 해당 Node에게 className으리 target되었다고 표시.
            updateNode(capturedGrouppableNode.id, {
              className : `${(capturedGrouppableNode.className?? '').replaceAll('grouppable-target', '')} grouppable-target`
            })
            setRaycastGrouppableNode(capturedGrouppableNode);
            break;
        }
            
      
      },
      [ multiSelected, raycastGrouppableNode,  setEdges],
    );

    const onNodeDragStop: SelectionDragHandler<AppNode> = useCallback(
      (_, draggedNodes) => {
        childNodeRelativePosition.clear();
        if(draggedNodes.length == 0) return;
        const firstNode = draggedNodes[0];
        onNodeClick(_, firstNode);
        setRaycastGrouppableNode(null);

        if(!raycastGrouppableNode) {
          releaseParentRelation(draggedNodes);
          return;
        }
        updateNode(raycastGrouppableNode.id, {
          className : raycastGrouppableNode.className?.replace('grouppable-target', '')
        })

        const childNodeIds = raycastGrouppableNode.data.childNodeIds ?? [];

        const newChildNodes = draggedNodes.filter(node => !childNodeIds.includes(node.id) && node.type != ReactFlowNodeType.Layer);

        for(const node of draggedNodes) {
          if(childNodeIds.includes(node.id)) continue;

          const diffPosition = {
            x : node.position.x - raycastGrouppableNode.position.x,
            y : node.position.y - raycastGrouppableNode.position.y
          }
          updateNode(node.id, {
            parentId : raycastGrouppableNode.id,
          })
          updateNode(node.id, {
            position : diffPosition
          })
        }

        childNodeIds.push(...newChildNodes.map(node => node.id));

        updateNode(raycastGrouppableNode.id, {
          data : {
            ...raycastGrouppableNode.data,
            childNodeIds : childNodeIds
          }
        })
        resetSelectedElements();

      },
      [raycastGrouppableNode],
    );
  
  const releaseParentRelation = useCallback((nodes : AppNode[])=>{
    const parentNodeChildIds = new Map<string, string[]>();
    
    for(const node of nodes) {
      const parentId = node.parentId;
      if(!parentId) continue;


      const parentNode = getNode(parentId);
      if(!parentNode) continue;

      const parentPosition = parentNode.position;
      


      const diffPosition = {
        x : parentPosition.x + node.position.x,
        y : parentPosition.y + node.position.y
      }
      if(!parentNodeChildIds.has(parentNode.id)) {
        parentNodeChildIds.set(parentNode.id, ((parentNode.data.childNodeIds as string[]) ?? []));
      }

      parentNodeChildIds.set(parentNode.id, parentNodeChildIds.get(parentNode.id)!.filter(id => id !== node.id));

      updateNode(node.id, {
        parentId : undefined,
        position : diffPosition
      })
    }

    for(const [parentNodeId, childNodeIds] of parentNodeChildIds) {
      updateNode(parentNodeId, {
        data : {
          childNodeIds
        }
      })
    }
  },[])

  return (
      <ReactFlow 
      ref={ref}
      snapToGrid={true}
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesDelete={(nodes )=>{
          console.log('nodes deleted(not Implemented): ', nodes)
        }}
        onBeforeDelete={async ({nodes,edges})=>{
          const result = exceptChildNodes(nodes);
          releaseParentRelation(result.preservedNodes);
          return {
            nodes : result.deletedNodes,
            edges : edges
          }
        }}
        onSelectionChange={onNodeSelectionChange}
        onNodeClick={onNodeClick}
        onNodeDrag={(event, node)=>{
          !multiSelected ? onNodeDrags(event, [node]) : null
        }}
        onSelectionDrag={(event, nodes)=>{
          onNodeDrags(event, nodes)
        }}
        onSelectionDragStop={(event, nodes)=>{
          onNodeDragStop(event, nodes)
        }}

        onNodeDragStart={(event, node)=>{
          !multiSelected ? onNodeDragsStart(event, [node]) : null
        }}
        onSelectionDragStart={(event,nodes)=>{
          onNodeDragsStart(event, nodes)
        }}
        onNodeDragStop={(event, node )=> {
          !multiSelected ?  onNodeDragStop(event, [node]) : null
        }}

        onEdgeClick={()=>setMenu(null)}
        edges={edges}
        edgeTypes={edgeTypes}
        
        onConnect={onConnect}

        onMouseDownCapture={handlePaneMouseDown}
        onPointerUp={handlePaneMouseUp}
        
        onNodeMouseEnter={onPointerEnterToNode}
        onNodeMouseLeave={onPointerLeaveToNode}

        panOnDrag={panEnabled}
        panActivationKeyCode={null}
        



        multiSelectionKeyCode={ 'Shift' }
        selectionKeyCode={null}
        selectionOnDrag={false}
        selectNodesOnDrag={true}
        onPaneClick={onPaneClick}

        minZoom={0.25}
        maxZoom={2.5}
        preventScrolling={panScrollEnabled}

        
        onConnectStart={()=> {
          setMenu(null)
          setConnecting(true)
        }}
        onConnectEnd={()=> {
          setConnecting(false)
        }}

        connectionMode={ConnectionMode.Loose}
        onContextMenu={onCanvasContextMenu}
        onNodeContextMenu={()=> {
          console.log('node context menu')
        }}
        onEdgeContextMenu={undefined}
        
        zoomOnDoubleClick={false}
        
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}

        onViewportChange={onViewportChangeDelegator}
      >
        <Background  />
        <ReactFlowHeaderControls
            initialTitle={name}
            onTitleChange={(val)=>onTitleChanged(val)}
          /> 
          

        <ReactFlowPreviewControls/>
        {menu && 
        <ReactFlowCanvasContextMenu 
          left={menu.left}
          top={menu.top}
          right={menu.right}
          bottom={menu.bottom}
          onDocumentCreateClick={()=>{
            addNodes([{
              id : `document-${Date.now()}`,
              type : ReactFlowNodeType.Card,
              position : menu.flowPosition,
              data : {
                label : '새 문서'
              },
              style : {
                width : 200,
                height : 250
              }
            }])
            setMenu(null)
          }}
          onLayerCreateClick={()=>{
            addNodes([{
              id : `group-${Date.now()}`,
              type : ReactFlowNodeType.Layer,
              position : menu.flowPosition,
              data : {
                label : '새 그룹'
              },
              style : {
                width : 400,
                height : 400
              }
            }])
            setMenu(null)
          }}
          onTextCreateClick={()=>{}}
        />}
        
      </ReactFlow> 
  );
}


export default ({ name, onTitleChanged, onEdgesChange,onNodesChange,  nodes, edges, setNodes, setEdges } : boardProps) => {
  return (
    <ReactFlowProvider>
      <ReactFlowBoardComponent 
      name={name} 
      onTitleChanged={onTitleChanged} 
      nodes={nodes} 
      edges={edges} 
      setNodes={setNodes} 
      setEdges={setEdges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      />
    </ReactFlowProvider>
  )
}