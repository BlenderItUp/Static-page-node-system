import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useReactFlow } from 'reactflow';
import { nodeRegistry } from '../NodeRegistry';

interface RouteParams {
  id: string;
}

const FullPageOutputNode: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const navigate = useNavigate();
  const { getNodes, getEdges } = useReactFlow();

  const nodeData = getNodes().find((node) => node.id === id)?.data;

  useEffect(() => {
    if (!nodeData) {
      navigate('/');
    }
  }, [nodeData, navigate]);

  const renderContent = (
    nodeId: string,
    handleId: string = 'a'
  ): React.ReactNode => {
    const edges = getEdges();
    const nodes = getNodes();

    const edge = edges.find(
      (edge) =>
        edge.source === nodeId &&
        (!edge.sourceHandle || edge.sourceHandle === handleId)
    );

    if (!edge) {
      return null;
    }

    const connectedNode = nodes.find((node) => node.id === edge.target);

    if (!connectedNode) {
      return null;
    }

    const childContent = renderContent(connectedNode.id, 'a');
    const innerChildContent = renderContent(connectedNode.id, 'b');

    const renderFunction = nodeRegistry[connectedNode.type];

    if (!renderFunction) {
      return null;
    }

    return renderFunction(connectedNode.data, childContent, innerChildContent);
  };

  return (
    <div style={styles.fullPageContainer}>
      <button onClick={() => navigate('/')} style={styles.exitButton}>
        Exit Full Page
      </button>
      <div>
        {renderContent(id)}
      </div>
    </div>
  );
};

const styles = {
  fullPageContainer: {
    width: '100vw',
    height: '100vh',
    padding: '20px',
    boxSizing: 'border-box',
    backgroundColor: '#fff',
    position: 'relative' as 'relative',
  },
  exitButton: {
    position: 'absolute' as 'absolute',
    top: '10px',
    right: '10px',
    padding: '10px 20px',
    cursor: 'pointer',
  },
};

export default FullPageOutputNode;
