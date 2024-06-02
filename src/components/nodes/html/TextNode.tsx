import React from 'react';
import BaseNode from '../BaseNode';
import { NodeProps } from 'reactflow';

const TextNode: React.FC<NodeProps> = (props) => {
  return (
    <BaseNode {...props}>
      {({ nodeData, handleInputChange }) => (
        <div className={`node node-${props.id}`} style={{ ...nodeData.styles, fontSize: `${nodeData.styles.fontSize || 14}px` }}>
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
  id: any,
) => (
  <>
  <div className={`node-${id}`} style={{ ...data.styles }}>
        <p>{data.label || 'Default Text'}{innerChildContent}</p>
  </div>
    {childContent}
  </>
);

const styles = {
  input: {
    width: '100%',
    padding: '5px',
  },
};

export default TextNode;
