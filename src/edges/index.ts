import type { Edge, EdgeTypes } from "@xyflow/react";

export const initialEdges: Edge[] = [
  { id: "1->2", source: "1", sourceHandle: "passive", target: "2" },
  { id: "1->3", source: "1", sourceHandle: "active", target: "3" },
  { id: "3->4", source: "3", target: "4" },
];

export const edgeTypes = {
  // Add your custom edge types here!
} satisfies EdgeTypes;
