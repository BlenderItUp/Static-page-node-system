import React, { useEffect } from 'react';
import BaseNode from '../BaseNode';
import { NodeProps } from 'reactflow';

const TextNode: React.FC<NodeProps> = (props) => {
  useEffect(() => {
    // Inject styles dynamically
    const styleElement = document.createElement('style');
    styleElement.innerHTML = props.data.styles?.css || '';
    document.head.appendChild(styleElement);

    // Clean up on component unmount
    return () => {
      document.head.removeChild(styleElement);
    };
  }, [props.data.styles?.css]);

  return (
    <BaseNode {...props}>
      {({ nodeData, handleInputChange }) => (
        <div className="node" style={{ ...nodeData.styles, fontSize: `${nodeData.styles.fontSize || 14}px` }}>
          <input
            type="text"
            value={nodeData.label || 'Text Content'}
            onChange={(e) => handleInputChange('label', e.target.value)}
            style={{ ...styles.input, fontSize: `${nodeData.styles.fontSize || 14}px` }}
          />
        </div>
      )}
    </BaseNode>
  );
};

export const renderText = (
  data: any,
  childContent: React.ReactNode,
  innerChildContent: React.ReactNode,
) => (
  <div className="node" style={{ ...data.styles }}>
    <p>{data.label || 'Default Text'}{innerChildContent}</p>
    {childContent}
    {innerChildContent}
  </div>
);

const styles = {
  input: {
    width: '100%',
    padding: '5px',
  },
};

export default TextNode;
