import type { Node } from "@xyflow/react";

/** Gemeinsamer Teil aller Nodes */
type BaseNodeData<TOptions> = {
  label: string;
  options: TOptions;
};

/** 🛜 Sensor Blocks */

// NFC Sensor Block
export type SensorNFCNode = Node<
  BaseNodeData<{
    trihow: "specificTrihow" | "allTrihows";
    channelSelective: boolean;
    channel: number | null;
    languageSelective: boolean;
  }>,
  "sensor-nfc"
>;

// Button Sensor Block
export type SensorButtonNode = Node<
  BaseNodeData<{
    triggerId: number;
  }>,
  "sensor-button"
>;

// Buzzer Sensor Block
export type SensorBuzzerNode = Node<
  BaseNodeData<{
    triggerId: number;
  }>,
  "sensor-buzzer"
>;

/** ⚡️ Action Blocks */

// showSingleScreen Action
export type ActionShowSingleScreenNode = Node<
  BaseNodeData<{
    shouldStopHometimer: boolean;
    slideId: string;
    isHomeSlide: boolean;
    loopVideo: boolean;
    frameType: string;
    renderOnScreen: number;
  }>,
  "action-showSingleScreen"
>;

// startHometimer Action
export type ActionStartHometimerNode = Node<
  BaseNodeData<{
    newGlobalHomeTimer: number;
  }>,
  "action-startHometimer"
>;

// stopHometimer Action
export type ActionStopHometimerNode = Node<
  { label: string },
  "action-stopHometimer"
>;

// setLanguage Action
export type ActionSetLanguageNode = Node<
  BaseNodeData<{
    targetLanguage: string;
  }>,
  "action-setLanguage"
>;

/** Union Types für bessere Handhabung im Flow */

export type SensorNode = SensorNFCNode | SensorButtonNode | SensorBuzzerNode;

export type ActionNode =
  | ActionShowSingleScreenNode
  | ActionStartHometimerNode
  | ActionStopHometimerNode
  | ActionSetLanguageNode;

export type AllFlowNodes = SensorNode | ActionNode;
