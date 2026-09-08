export const MOBILE_SCENE_QUERY = "(max-width: 720px), (max-width: 960px) and (max-height: 540px)";

export type ConnectionHint = { effectiveType?: string; saveData?: boolean };

export function canPrefetchModel(connection?: ConnectionHint) {
  return !connection?.saveData && !["2g", "slow-2g"].includes(connection?.effectiveType ?? "");
}

/** Recheck network and visibility when the grace period expires, not only on mount. */
export function scheduleModelWarmup(warmup: () => void, connection: () => ConnectionHint | undefined, visible: () => boolean) {
  if (!canPrefetchModel(connection())) return () => {};
  const timer = setTimeout(() => {
    if (canPrefetchModel(connection()) && visible()) warmup();
  }, 2500);
  return () => clearTimeout(timer);
}
