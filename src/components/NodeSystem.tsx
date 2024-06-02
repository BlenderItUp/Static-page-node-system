import React, { useState, useEffect } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
} from "reactflow";
import TextNode from "./nodes/html/TextNode";
import OutputNode from "./nodes/html/OutputNode";
import StyleEditor from "./nodes/StyleEditor";
import { saveToLocalStorage, getFromLocalStorage } from "../utils/localStorage";
import { renderContent } from "./nodes/renderContent"; // Ensure this path is correct

import "reactflow/dist/style.css";

const nodeTypes = {
  text: TextNode,
  output: OutputNode,
};

const initialNodes = getFromLocalStorage("nodes") || [
  {
    id: "1",
    type: "output",
    position: { x: 250, y: -480 },
    data: { label: "", styles: { css: "body { color: red; }" } },
  },
  {
    id: "2",
    type: "text",
    position: { x: 250, y: -150 },
    data: { label: "Div Content", styles: {} },
  },
  {
    id: "12",
    type: "div",
    position: { x: 250, y: -150 },
    data: { label: "Div Content", styles: {} },
  },
  {
    id: "13",
    type: "div",
    position: { x: 250, y: -150 },
    data: { label: "Div Content", styles: {} },
  },
  {
    id: "14",
    type: "div",
    position: { x: 250, y: -150 },
    data: { label: "Div Content", styles: {} },
  },
  {
    id: "3",
    type: "header",
    position: { x: 500, y: 0 },
    data: { level: "h1", label: "John Doe", styles: {} },
  },
  {
    id: "4",
    type: "text",
    position: { x: 500, y: 200 },
    data: { label: "Full Stack Developer", styles: {} },
  },
  {
    id: "5",
    type: "header",
    position: { x: 50, y: 0 },
    data: { level: "h2", label: "Bio", styles: {} },
  },
  {
    id: "6",
    type: "text",
    position: { x: 50, y: 100 },
    data: {
      styles: {},
      label:
        "Hello! I'm John, a passionate Full Stack Developer with a love for creating dynamic and responsive web applications.",
    },
  },
  {
    id: "7",
    type: "header",
    position: { x: 50, y: 200 },
    data: { level: "h2", label: "Projects", styles: {} },
  },
  {
    id: "8",
    type: "ul",
    position: { x: 50, y: 300 },
    data: {
      styles: {},
      items: [
        "Project 1: https://github.com/johndoe/project1",
        "Project 2: https://github.com/johndoe/project2",
        "Project 3: https://github.com/johndoe/project3",
      ],
    },
  },
  {
    id: "9",
    type: "header",
    position: { x: 50, y: 400 },
    data: { level: "h2", label: "Contact", styles: {} },
  },
  {
    id: "10",
    type: "text",
    position: { x: 50, y: 500 },
    data: { label: "Email: john.doe@example.com", styles: {} },
  },
  {
    id: "11",
    type: "text",
    position: { x: 50, y: 600 },
    data: { label: "GitHub: https://github.com/johndoe", styles: {} },
  },
];

const initialEdges: Edge[] = getFromLocalStorage("edges") || [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    sourceHandle: "a",
    type: "smoothstep",
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    sourceHandle: "a",
    type: "smoothstep",
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    sourceHandle: "a",
    type: "smoothstep",
  },
  {
    id: "e4-5",
    source: "4",
    target: "5",
    sourceHandle: "a",
    type: "smoothstep",
  },
  {
    id: "e5-6",
    source: "5",
    target: "6",
    sourceHandle: "a",
    type: "smoothstep",
  },
  {
    id: "e6-7",
    source: "6",
    target: "7",
    sourceHandle: "a",
    type: "smoothstep",
  },
  {
    id: "e7-8",
    source: "7",
    target: "8",
    sourceHandle: "a",
    type: "smoothstep",
  },
  {
    id: "e8-9",
    source: "8",
    target: "9",
    sourceHandle: "a",
    type: "smoothstep",
  },
  {
    id: "e9-10",
    source: "9",
    target: "10",
    sourceHandle: "a",
    type: "smoothstep",
  },
  {
    id: "e10-11",
    source: "10",
    target: "11",
    sourceHandle: "a",
    type: "smoothstep",
  },
];

const NodeSystem: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState();
  const [previewMode, setPreviewMode] = useState(false);

  const onNodeClick = (_: any, node: any) => {
    setSelectedNode({ ...node });
  };

  const updateNodeStyle = (nodeId: string, newStyles: { css: string }) => {
    setNodes(
      nodes.map((node) =>
        node.id === nodeId ? { ...node, data: { styles: newStyles } } : node
      )
    );
  };

  useEffect(() => {
    saveToLocalStorage("nodes", nodes);
  }, [nodes]);

  useEffect(() => {
    saveToLocalStorage("edges", edges);
  }, [edges]);

  const onConnect = (params: Edge | Connection) =>
    setEdges((eds) => addEdge(params, eds));

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
      {previewMode ? (
        <div style={{ flexGrow: 1, padding: 20 }}>
          <button onClick={() => setPreviewMode(false)}>Edit Mode</button>
          <div>
            {nodes
              .filter((node) => node.type === "output")
              .map((node) => (
                <div key={node.id}>{renderContent(node.id, nodes, edges)}</div>
              ))}
          </div>
        </div>
      ) : (
        <div
          style={{
            flexGrow: 1,
            height: "100%",
            width: "100%",
            position: "relative",
          }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            style={{ height: "100%", width: "100%" }}
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
          <button
            onClick={() => setPreviewMode(true)}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              padding: "10px 20px",
              zIndex: 4,
            }}
          >
            Preview Mode
          </button>
          <button
            onClick={() => saveToLocalStorage("nodes", nodes)}
            style={{
              position: "absolute",
              top: 50,
              right: 10,
              padding: "10px 20px",
              zIndex: 4,
            }}
          >
            Save to Local Storage
          </button>
        </div>
      )}
      {selectedNode && !previewMode && (
        <StyleEditor
          selectedNode={selectedNode}
          updateNodeStyle={updateNodeStyle}
        />
      )}
    </div>
  );
};

export default NodeSystem;
