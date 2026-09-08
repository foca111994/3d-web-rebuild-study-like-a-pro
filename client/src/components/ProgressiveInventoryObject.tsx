import { Component, lazy, Suspense, useState, type ReactNode } from "react";

const loadRenderer = () => import("./InventoryObject3D");
const Renderer = lazy(loadRenderer);
export async function preloadInventoryModel(url: string) {
  const renderer = await loadRenderer();
  renderer.preloadModel(url);
}

class ModelBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

type Props = {
  active: boolean;
  label: string;
  modelSize: number;
  url: string;
  poster: string;
  enabled: boolean;
  preview?: boolean;
  onReady?: () => void;
};

export default function ProgressiveInventoryObject({ poster, enabled, preview = false, onReady, ...props }: Props) {
  const [ready, setReady] = useState(false);
  const image = <img className="pilot-model-poster" src={poster} alt="" width="512" height="560" fetchPriority={preview ? "low" : "high"} decoding="async" />;
  return <div className={`pilot-model-frame pilot-canvas${preview ? " pilot-canvas--preview" : ""}`} aria-label={props.label}>
    {(!ready || !enabled) && image}
    {enabled && <ModelBoundary fallback={ready ? image : null}>
      <Suspense fallback={null}>
        <Renderer {...props} preview={preview} onReady={() => { setReady(true); onReady?.(); }} />
      </Suspense>
    </ModelBoundary>}
  </div>;
}
