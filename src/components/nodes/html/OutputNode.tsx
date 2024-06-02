// OutputNode.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Handle, Position, NodeProps, useReactFlow } from 'reactflow';
import { renderContent } from '../renderContent'; // Adjust the path as necessary

const OutputNode: React.FC<NodeProps> = ({ id, data }) => {
  const { getNodes, getEdges } = useReactFlow();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 'auto', height: 'auto' });

  useEffect(() => {
    // Inject styles dynamically
    const styleElement = document.createElement('style');
    styleElement.innerHTML = data.styles?.css || '';
    document.head.appendChild(styleElement);

    // Clean up on component unmount
    return () => {
      document.head.removeChild(styleElement);
    };
  }, [data.styles?.css]);

  useEffect(() => {
    if (containerRef.current) {
      setContainerSize({
        width: containerRef.current.scrollWidth + 'px',
        height: containerRef.current.scrollHeight + 'px'
      });
    }
  }, [data]);

  return (
    <div
      style={{
        ...styles.container,
        ...data.styles,
        width: containerSize.width,
        height: containerSize.height
      }}
      ref={containerRef}
    >
      <div style={styles.output}>
        {renderContent(id, getNodes(), getEdges())}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

const styles = {
  container: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
    minHeight: '150px',
  },
  output: {
    // Add any additional styling if needed
  },
};

export default OutputNode;
