// renderContent.tsx
import React from 'react';
import { Edge, Node } from 'reactflow';
import { nodeRegistry } from './NodeRegistry';

export const renderContent = (
  nodeId: string,
  nodes: Node[],
  edges: Edge[],
  handleId: string = 'a'
): React.ReactNode => {
  const edge = edges.find(
    (edge) =>
      edge.source === nodeId &&
      (!edge.sourceHandle || edge.sourceHandle === handleId),
  );

  if (!edge) {
    return null;
  }

  const connectedNode = nodes.find((node) => node.id === edge.target);

  if (!connectedNode) {
    return null;
  }

  const childContent = renderContent(connectedNode.id, nodes, edges, 'a');
  const innerChildContent = renderContent(connectedNode.id, nodes, edges, 'b');

  const renderFunction = nodeRegistry[connectedNode.type];

  if (!renderFunction) {
    return null;
  }

  return renderFunction(connectedNode.data, childContent, innerChildContent, nodeId);
};
