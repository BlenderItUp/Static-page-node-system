import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';

interface CodeEditorProps {
  initialCode: string;
  onCodeChange: (code: string) => void;
  nodeId: string; // Pass the node ID to generate unique styles
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialCode, onCodeChange, nodeId }) => {
  const [code, setCode] = useState(initialCode || '');

  const handleChange = (newValue: string) => {
    setCode(newValue);
    onCodeChange(newValue);
  };

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `.node-${nodeId} { ${code} }`;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, [code, nodeId]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1em', height: '100%' }}>
      <div style={{ position: 'relative', flex: '1 1 auto', height: '50%', overflow: 'hidden' }}>
        <AceEditor
          mode="css"
          theme="monokai"
          onChange={handleChange}
          name="UNIQUE_ID_OF_DIV"
          value={code}
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
          style={{ width: '100%', height: '100%', whiteSpace: 'pre', overflow: 'auto' }}
        />
      </div>
      <div style={{ flex: '1 1 auto', overflow: 'auto' }}>
        <h2>Live Preview</h2>
        <div style={{ border: '1px solid #ddd', borderRadius: '5px', padding: '10px', maxHeight: '300px', overflow: 'auto' }}>
          <div className={`node node-${nodeId}`}>
            <p>This is a preview of your CSS styling.</p>
            <button>Sample Button</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
