import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import {  
  DefaultReactSuggestionItem,
  SuggestionMenuProps,
  getDefaultReactSlashMenuItems
} from "@blocknote/react";
import { useEffect } from 'react';
import type { BlockNoteEditor, Dictionary } from "@blocknote/core";



export const getSlashMenuItems = (
    editor: BlockNoteEditor
  ): DefaultReactSuggestionItem[] => [
    ...getDefaultReactSlashMenuItems(editor).map(item => {

        return item
    }),
  ];
   

// Custom component to replace the default Slash Menu.
export function getSlashMenuComponent(
    props: SuggestionMenuProps<DefaultReactSuggestionItem >
  ) {
  
    useEffect(()=> {
      // slashMenu를 키보드로 이동하거나 마우스 Wheel로 이동할 때, viewPort에 노출하게 함.
      const slashMenuItems = document.getElementsByClassName("slash-menu-item selected");
      if(slashMenuItems.length > 0) {
        slashMenuItems[0].scrollIntoView({block : 'nearest'})
      }
    },[props.selectedIndex])
  
    return (
      <div id="slash-menu" className={"slash-menu"} >
        {props.items.map((item, index) => (
          <div
            key={item.title}
            className={`slash-menu-item ${
              props.selectedIndex === index ? " selected" : ""
            }`}
            onClick={() => {
              props.onItemClick?.(item);
            }}>
              <i>
              {item.icon}
              </i>
              <label>
                {item.title}
              </label>
          </div>
        ))}
      </div>
    );
  }
  