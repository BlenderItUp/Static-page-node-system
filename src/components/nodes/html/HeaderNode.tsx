// HeaderNode.tsx
import React from 'react';
import BaseNode from './BaseNode';
import { NodeProps } from 'reactflow';

const HeaderNode: React.FC<NodeProps> = (props) => {
  return (
    <BaseNode {...props}>
      {({ nodeData, handleInputChange }) => (
        <div style={nodeData.styles}>
          <select
            value={nodeData.level || 'h1'}
            onChange={(e) => handleInputChange('level', e.target.value)}
            style={styles.select}
          >
            <option value="h1">h1</option>
            <option value="h2">h2</option>
            <option value="h3">h3</option>
            <option value="h4">h4</option>
          </select>
          <input
            type="text"
            value={nodeData.label || 'Header Content'}
            onChange={(e) => handleInputChange('label', e.target.value)}
            style={styles.input}
          />
        </div>
      )}
    </BaseNode>
  );
};

export const renderHeader = (
  data: any,
  childContent: React.ReactNode,
  innerChildContent: React.ReactNode,
) => {
  const HeaderTag = data.level;
  return (
    <>
      <HeaderTag style={data.styles}>
        {data.label}
        {innerChildContent}
      </HeaderTag>
      {childContent}
    </>
  );
};

const styles = {
  select: {
    marginBottom: '10px',
  },
  input: {
    width: '100%',
    padding: '5px',
    fontSize: '1.5em',
    textAlign: 'center',
  },
};

export default HeaderNode;
