import React, { memo } from "react";
import { Handle, NodeProps, Position } from "@xyflow/react";

const GenericNodeWrapper = ({
  label,
  children,
}: {
  label: string;
  children?: React.ReactNode;
}) => (
  <div
    style={{
      border: "1px solid black",
      borderRadius: 8,
      padding: 8,
      minWidth: 220,
      backgroundColor: "white",
    }}
  >
    <div style={{ fontWeight: "bold", marginBottom: 6 }}>{label}</div>
    {children}
  </div>
);

export const SensorNFCNode = memo(
  ({ data }: NodeProps<{ label: string; options: any }>) => (
    <GenericNodeWrapper label={data.label}>
      <div>Trihow: {data.options.trihow}</div>
      <div>Channel: {data.options.channel ?? "auto"}</div>
      <div>
        Language Selective: {data.options.languageSelective ? "Yes" : "No"}
      </div>
      <Handle type="source" id="active" position={Position.Right} />
      <Handle type="source" id="passive" position={Position.Left} />
    </GenericNodeWrapper>
  )
);

export const SensorButtonNode = memo(
  ({ data }: NodeProps<{ label: string; options: any }>) => (
    <GenericNodeWrapper label={data.label}>
      <div>Trigger ID: {data.options.triggerId}</div>
      <Handle type="source" id="active" position={Position.Bottom} />
    </GenericNodeWrapper>
  )
);

export const SensorBuzzerNode = memo(
  ({ data }: NodeProps<{ label: string; options: any }>) => (
    <GenericNodeWrapper label={data.label}>
      <div>Trigger ID: {data.options.triggerId}</div>
      <Handle type="source" id="active" position={Position.Bottom} />
    </GenericNodeWrapper>
  )
);

export const ActionNode = memo(
  ({ data }: NodeProps<{ label: string; options: any }>) => (
    <GenericNodeWrapper label={data.label}>
      {data.options &&
        Object.entries(data.options).map(([key, val]) => (
          <div key={key}>
            {key}: {String(val)}
          </div>
        ))}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </GenericNodeWrapper>
  )
);

export const SettingsNode = memo(
  ({ data }: NodeProps<{ label: string; settings: any }>) => (
    <GenericNodeWrapper label={data.label}>
      <div>Home timer: {data.settings.hometimer}</div>
      <div>Reset timer: {data.settings.resetimer}</div>
      <Handle type="source" position={Position.Bottom} />
    </GenericNodeWrapper>
  )
);
