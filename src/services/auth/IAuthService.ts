export interface IAuthService {
  initiateSignIn(): Promise<string>;
  subscribeToAuthChange(
    callback: (userId?: string) => void,
    errorFn?: (err: Error) => void,
    completeFn?: () => void,
  ): () => void;
  getUserId(): string | undefined;
  isSignedIn(): boolean;
}
