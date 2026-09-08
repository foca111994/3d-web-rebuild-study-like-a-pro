import { afterEach, describe, expect, it, vi } from "vitest";
import { canPrefetchModel, scheduleModelWarmup, type ConnectionHint } from "./inventoryLoading";

afterEach(() => vi.useRealTimers());
describe("model loading on constrained connections", () => {
  it.each([{ saveData: true }, { effectiveType: "2g" }, { effectiveType: "slow-2g" }])("does not warm up on %j", connection => {
    vi.useFakeTimers();
    const load = vi.fn();
    scheduleModelWarmup(load, () => connection, () => true);
    vi.runAllTimers();
    expect(load).not.toHaveBeenCalled();
    expect(canPrefetchModel(connection)).toBe(false);
  });
  it("waits the full grace period and permits browsers without Network Information API", () => {
    vi.useFakeTimers(); const load = vi.fn();
    scheduleModelWarmup(load, () => undefined, () => true);
    vi.advanceTimersByTime(2499); expect(load).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1); expect(load).toHaveBeenCalledOnce();
  });
  it("cancels stale navigation and rechecks a connection that becomes constrained", () => {
    vi.useFakeTimers(); const load = vi.fn(); let connection: ConnectionHint = { effectiveType: "4g" };
    const cancel = scheduleModelWarmup(load, () => connection, () => true);
    cancel(); vi.runAllTimers(); expect(load).not.toHaveBeenCalled();
    scheduleModelWarmup(load, () => connection, () => true);
    connection = { saveData: true }; vi.runAllTimers(); expect(load).not.toHaveBeenCalled();
  });
  it("does not warm up a background tab", () => {
    vi.useFakeTimers(); const load = vi.fn();
    scheduleModelWarmup(load, () => undefined, () => false);
    vi.runAllTimers(); expect(load).not.toHaveBeenCalled();
  });
});
