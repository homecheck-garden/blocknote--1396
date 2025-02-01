import { create } from 'zustand'
import { AppNode, LayerNodeType } from './nodes/types'
import { SetStateAction } from 'react'
import { ReactFlowNodeType } from './nodes'
import { moveNodeToTop } from './functions'

export const useReactFlowStore = create<{
    zoom: number,
    multiSelected :boolean,
    setZoom: (value : number) => void
    setSelectionLength : (value : number)=> void
}>((set) => ({
  zoom: 1,
  multiSelected : false,
  setZoom: (value : number) => set((state) => ({ zoom: value })),
  setSelectionLength : (value : number)=> set((state)=> ({multiSelected : value > 1 }))
}))




export function FocusNode(node : AppNode, config : {
  updateNode : (id : string, node : Partial<AppNode>) => void
  setNodes : (value :SetStateAction<AppNode[]>) => void
  getNode : (id : string) => AppNode | undefined
}) {
  return;
  const {setNodes, getNode} = config;
  setNodes((prevNodes) => {

    switch(node.type) {
      // 레이어인 경우, 레이어를 맨 앞으로 가져온 후, 자식 노드들도 가져옴
      case ReactFlowNodeType.Layer:
        const layerMovedNodes = moveNodeToTop(node, prevNodes);
        if(layerMovedNodes) {
          const childNodeIds = node.data.childNodeIds ?? [];
          let movedNodes = layerMovedNodes;
          for(const childNodeId of childNodeIds) {
            const childNode = getNode(childNodeId) as AppNode | undefined;
            if(!childNode) continue;
            const childMovedNodes = moveNodeToTop(childNode, prevNodes);
            if(!childMovedNodes) continue;
            movedNodes = childMovedNodes
          }
          return movedNodes;
        }
        break;
      default :
        // 그 외에는 맨 뒤에 추가
        const defaultMovedNodes = moveNodeToTop(node, prevNodes);
        if(defaultMovedNodes) return defaultMovedNodes;
    }

    return prevNodes;
  });
}


export function exceptChildNodes(nodes : AppNode[]) {
  const childNodeIds = (nodes.filter(node => node.type === ReactFlowNodeType.Layer) as LayerNodeType[]).flatMap(node => node.data.childNodeIds ?? []);
  return {
    deletedNodes : nodes.filter(node => !childNodeIds.includes(node.id)),
    preservedNodes : nodes.filter(node => childNodeIds.includes(node.id))
  }
}


function toNumber(value : string | number | undefined) {
  if(typeof value === 'number') return value;
  if(typeof value === 'string') return parseInt(value);
  return 0;
}
