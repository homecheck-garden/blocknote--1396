# ParentId 를 설정하면, 부모의 좌표에 기본으로 따라가지므로 직접 구현할 필요 없음.
```
const draggingNodeIds = draggingNodes.map(node => node.id);
 // 부모 노드 이동 시 자식 노드들도 함께 이동
const parentNode = draggingNode;

// 자식 노드들중이지만 드래그 중이지 않은 애들만 찾기.
const childNodeIds = parentNode.data.childNodeIds?.filter(id => 
    !draggingNodeIds.includes(id)
) ?? [];
const childNodes = (getNodes() as AppNode[]).filter(node => childNodeIds.includes(node.id));
const parentPreviousPosition = previousPosition.get(parentNode.id);
if(!parentPreviousPosition || !parentNode || childNodes.length == 0) return;

// setNodes 로는 onNodesChange에 자동으로 호출되지 않아서 수동 호출 해줘야 함.

/*
for(const childNode of childNodes) {
    if(!childNodeRelativePosition.has(childNode.id)) {
        childNodeRelativePosition.set(childNode.id, {
        x : parentPreviousPosition.x - childNode.position.x,
        y : parentPreviousPosition.y - childNode.position.y
        })
        console.log(childNode.id, childNodeRelativePosition.get(childNode.id))
    }
    const deltaX = childNodeRelativePosition.get(childNode.id)!.x;
    const deltaY = childNodeRelativePosition.get(childNode.id)!.y;
    const position = {
        x: parentNode.position.x - deltaX,
        y: parentNode.position.y - deltaY
    }

    
    onNodesChange([{
        id : childNode.id,
        type : 'position',
        position
    }])
    
}            
    */
```