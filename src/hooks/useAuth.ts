import { useMemo, useSyncExternalStore } from "react";
import { FirebaseAuthService } from "../services/auth/FirebaseAuthService";

export const authService = new FirebaseAuthService();

export const useAuth = () => {
  const userId = useSyncExternalStore(
    authService.subscribeToAuthChange.bind(authService),
    authService.getUserId.bind(authService),
  );
  const hasLoaded = useMemo(() => authService.hasLoaded(), [userId]);
  return { userId, hasLoaded };
};
