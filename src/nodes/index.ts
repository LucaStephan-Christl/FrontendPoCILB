import type { NodeTypes } from "@xyflow/react";
import { AllFlowNodes } from "./types";
import {
  ActionNode,
  SensorButtonNode,
  SensorBuzzerNode,
  SensorNFCNode,
} from "./nodes";

export const initialNodes: AllFlowNodes[] = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    type: "sensor-nfc",
    data: {
      label: "NFC-Reader",
      options: {
        trihow: "allTrihows",
        channelSelective: false,
        channel: null,
        languageSelective: false,
        active: [],
        passive: [],
      },
    },
  },
  {
    id: "2",
    type: "action-startHometimer",
    position: { x: -100, y: 100 },
    data: { label: "startHometimer", options: { newGlobalHomeTimer: 60 } },
  },
  {
    id: "3",
    type: "action-showSingleScreen",
    position: { x: 100, y: 100 },
    data: {
      label: "showSlide",
      options: {
        shouldStopHometimer: true,
        slideId: "slide1",
        isHomeSlide: false,
        loopVideo: false,
        frameType: "video",
        renderOnScreen: 1,
      },
    },
  },
  {
    id: "4",
    type: "action-stopHometimer",
    position: { x: 0, y: 200 },
    data: { label: "stopHometimer" },
  },
  {
    id: "5",
    type: "sensor-button",
    position: { x: -200, y: 0 },
    data: { label: "Button Sensor", options: { triggerId: 1 } },
  },
  {
    id: "6",
    type: "action-setLanguage",
    position: { x: 200, y: 0 },
    data: {
      label: "setLanguage",
      options: { targetLanguage: "en" },
    },
  },
];

export const nodeTypes = {
  "sensor-nfc": SensorNFCNode,
  "sensor-button": SensorButtonNode,
  "sensor-buzzer": SensorBuzzerNode,
  "action-startHometimer": ActionNode,
  "action-showSingleScreen": ActionNode,
  "action-stopHometimer": ActionNode,
  "action-setLanguage": ActionNode,
} satisfies NodeTypes;
