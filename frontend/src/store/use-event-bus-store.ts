import { defineStore } from "pinia";

import type { ILot } from "modules/lot/types/lot";

type EventMap = {
  "dialog/create-lot": undefined | null;
  "dialog/update-lot": ILot;
  "dialog/delete-lot": ILot["id"];
};

type EventName = keyof EventMap;
type EventListener<T extends EventName> = (payload: EventMap[T]) => void;

const useEventBusStore = defineStore("event-bus-store", () => {
  const listeners = new Map<EventName, EventListener<EventName>>();

  const on = <T extends EventName>(eventName: T, listener: EventListener<T>) => {
    listeners.set(eventName, listener as EventListener<EventName>);
  };

  const emit = <T extends EventName>(event: T, payload: EventMap[T]) => {
    const listener = listeners.get(event);
    if (listener) listener(payload);
  };

  const off = (event: EventName) => listeners.delete(event);

  const reset = () => listeners.clear();

  return {
    on,
    off,
    emit,
    reset,
  };
});

export default useEventBusStore;
