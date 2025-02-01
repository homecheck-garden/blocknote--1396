'use client'
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import {   
  DragHandleButton,
  SideMenu,
  SideMenuController,
  useCreateBlockNote, 
  BlockColorsItem,
  DragHandleMenu,
  SuggestionMenuController,
} from "@blocknote/react";
import { filterSuggestionItems } from '@blocknote/core'
import { createPortal } from 'react-dom';
import { getSlashMenuComponent, getSlashMenuItems } from './slashMenu'
import { stringDictionary } from './locales'




export default function documentEditorComponent({editable } : {
  editable : boolean
}){
  const editor = useCreateBlockNote({
    dictionary : stringDictionary,
    animations : false,
    sideMenuDetection : editable ? 'editor' : 'viewport'
  });




  editor.isEditable = editable;
  return (
    <div>
      <BlockNoteView 
      editor={editor} 
      sideMenu={false} 
      
      onChange={()=>
        console.log(
          editor.document)
      }
      slashMenu={false}
      theme={"light"}>
        <SideMenuController
          sideMenu={(props) => (
            <SideMenu
              {...props} >

                
                <DragHandleButton {...props}
                
                
                dragHandleMenu={(props) => (
                    <DragHandleMenu {...props}>
                      <BlockColorsItem {...props}>색상</BlockColorsItem>
                    </DragHandleMenu>
                  )}>
                </DragHandleButton>
              </SideMenu>
              
            
          )}
        />
        {createPortal(

          <SuggestionMenuController
            triggerCharacter={"/"}
            suggestionMenuComponent={getSlashMenuComponent}
            floatingOptions={{
        
              strategy : "fixed",
              placement : "bottom",
        
            }}
            getItems={async (query) =>
              filterSuggestionItems(getSlashMenuItems(editor), query)
            }
            ></SuggestionMenuController>
        , document.body!)}


        

      </BlockNoteView>
      
      </div>
  );
}

