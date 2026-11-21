import { useSyncExternalStore } from "react";
import { initialData } from "./mock";

const key = "stsms-demo-v1";
const listeners = new Set();
let data = structuredClone(initialData);
try {
  const saved = JSON.parse(localStorage.getItem(key));
  if (saved?.students && saved?.payments) data = { ...data, ...saved };
} catch {
  /* A blocked or invalid storage entry falls back to the fixtures. */
}
const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
export function useData() {
  return useSyncExternalStore(subscribe, () => data);
}
export function updateData(updater) {
  const next = updater(structuredClone(data));
  // Persist before publishing so a failed write never displays a false success.
  localStorage.setItem(key, JSON.stringify(next));
  data = next;
  listeners.forEach((listener) => listener());
}
export function resetDemo() {
  updateData(() => structuredClone(initialData));
}
