
import { AppNode } from './nodes/types'

export function moveNodeToTop(node : AppNode, nodes : AppNode[]) {
    const newNodes = [...nodes];
    const index = newNodes.findIndex((n) => n.id === node.id);
    if(index === -1) return undefined;
    const [removed] = newNodes.splice(index, 1);
    newNodes.push(removed);
    return newNodes;
  }