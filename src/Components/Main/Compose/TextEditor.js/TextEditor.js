import React, { useState } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './TextEditor.css';

function TextEditor(props) {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleInlineStyleClick = (style) => {
    const newState = RichUtils.toggleInlineStyle(editorState, style);
    handleEditorChange(newState);
  };

  const handleSaveClick = () => {
    // Get the current content of the editor
    const content = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    
    // Make an API call to save the content to the backend
    alert(content);
    props.handleSend(content)
  };



  return (
    <div className="text-editor-container">
     
      <Editor editorState={editorState} onChange={handleEditorChange} />
      <div className="text-editor-controls">
        <button onClick={() => handleInlineStyleClick('BOLD')}>Bold</button>
        <button onClick={() => handleInlineStyleClick('ITALIC')}>Italic</button>
        {/* You can add more buttons for other formatting options */}
        <button onClick={handleSaveClick}>Save</button>
      </div>
    </div>
  );
}

export default TextEditor;
