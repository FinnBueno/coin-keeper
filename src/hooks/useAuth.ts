import { useSyncExternalStore } from "react";
import { FirebaseAuthService } from "../services/auth/FirebaseAuthService";

export const authService = new FirebaseAuthService();

let cachedSnapshot = {
  hasLoaded: authService.hasLoaded(),
  userId: authService.getUserId(),
};

const getSnapshot = () => {
  const hasLoaded = authService.hasLoaded();
  const userId = authService.getUserId();

  if (
    cachedSnapshot.hasLoaded !== hasLoaded ||
    cachedSnapshot.userId !== userId
  ) {
    cachedSnapshot = { hasLoaded, userId };
  }

  return cachedSnapshot;
};

export const useAuth = () => {
  const authState = useSyncExternalStore(
    authService.subscribeToAuthChange.bind(authService),
    getSnapshot,
  );
  return authState;
};
