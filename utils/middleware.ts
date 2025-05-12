import { Middleware } from "@reduxjs/toolkit";
import { saveToLocalStorage } from "./localStorage";
import { RootState } from "@/store";

const isActionWithType = (action: unknown): action is { type: string } => {
  return (
    typeof action === "object" &&
    action !== null &&
    "type" in action &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeof (action as any).type === "string"
  );
};

export const localStorageMiddleware: Middleware<object, RootState> =
  (store) => (next) => (action) => {
    const result = next(action);
    const state = store.getState();

    if (isActionWithType(action) &&
      (action.type.startsWith("favorites/")
        || action.type.startsWith("watched/"))
    ) {
      saveToLocalStorage("favorites", state.favorites);
      saveToLocalStorage("watched", state.watched);
    }

    return result;
  }