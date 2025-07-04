type RawNode = {
  id: string;
  type?: string;
  position: { x: number; y: number };
  data: any;
};

type RawEdge = {
  id: string;
  source: string;
  target: string;
};

type OutputBlock = {
  block?: string;
  [key: string]: any;
};

export function buildFlowJSON(
  nodes: RawNode[],
  edges: RawEdge[]
): OutputBlock[] {
  const nodeMap = new Map<string, RawNode>();
  const edgesFromNode = new Map<string, RawEdge[]>();

  for (const node of nodes) {
    nodeMap.set(node.id, node);
  }

  for (const edge of edges) {
    if (!edgesFromNode.has(edge.source)) {
      edgesFromNode.set(edge.source, []);
    }
    edgesFromNode.get(edge.source)!.push(edge);
  }

  function traverseDownstream(
    startId: string,
    visited = new Set<string>()
  ): RawNode[] {
    const collected: RawNode[] = [];
    const queue = [startId];

    while (queue.length > 0) {
      const currentId = queue.shift()!;
      if (visited.has(currentId)) continue;
      visited.add(currentId);

      const node = nodeMap.get(currentId);
      if (!node) continue;
      collected.push(node);

      const outgoingEdges = edgesFromNode.get(currentId) || [];
      for (const e of outgoingEdges) {
        queue.push(e.target);
      }
    }

    return collected;
  }

  const outputBlocks: OutputBlock[] = [];

  for (const node of nodes) {
    if (node.type?.startsWith("sensor-")) {
      const activeNodes: RawNode[] = [];
      const passiveNodes: RawNode[] = [];

      const outgoingEdges = edgesFromNode.get(node.id) || [];

      for (const edge of outgoingEdges) {
        const sourceHandle = (edge as any).sourceHandle;

        if (sourceHandle === "active") {
          const chainNodes = traverseDownstream(edge.target);
          activeNodes.push(...chainNodes);
        } else if (sourceHandle === "passive") {
          const chainNodes = traverseDownstream(edge.target);
          passiveNodes.push(...chainNodes);
        }
      }

      const block: OutputBlock = {
        block: node.type,
        options: node.data.options,
      };

      if (activeNodes.length > 0) {
        block.active = activeNodes.map(transformNode);
      }
      if (passiveNodes.length > 0) {
        block.passive = passiveNodes.map(transformNode);
      }

      outputBlocks.push(block);
    }
  }

  return outputBlocks;

  function transformNode(node: RawNode): OutputBlock {
    const base: OutputBlock = {
      block: node.type?.startsWith("action-") ? "action" : node.type,
    };

    if (node.type?.startsWith("action-")) {
      base["action"] = node.type?.replace("action-", "");
    }

    if (node.data?.options) {
      base["options"] = node.data.options;
    }

    return base;
  }
}
