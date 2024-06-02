import React from "react";
import NodeSystem from "./components/NodeSystem";
import "reactflow/dist/style.css";

import { ReactFlowProvider } from "reactflow";

const App: React.FC = () => {
  
  return (
    <ReactFlowProvider>
    <NodeSystem />
  </ReactFlowProvider>
  );
};

export default App;
