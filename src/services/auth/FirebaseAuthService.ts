import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  type User,
} from "firebase/auth";
import type { IAuthService } from "./IAuthService";

const gAuthProvider = new GoogleAuthProvider();

export class FirebaseAuthService implements IAuthService {
  private user?: User;

  public async initiateSignIn(): Promise<string> {
    const auth = getAuth();
    auth.useDeviceLanguage();
    const outer = this;
    const result = await signInWithPopup(auth, gAuthProvider);
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential) throw Error("No credential found on successful sign-in");
    // const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    outer.user = user;
    return user.uid;
  }

  public subscribeToAuthChange(
    callback: (userId?: string) => void,
    errorFn?: (err: Error) => void,
    completeFn?: () => void,
  ): () => void {
    const handler = (user: User | null) => {
      this.user = user ?? undefined;
      callback(user?.uid);
    };
    return onAuthStateChanged(
      getAuth(),
      handler.bind(this),
      errorFn,
      completeFn,
    );
  }

  public getUserId(): string | undefined {
    if (!this.user) return undefined;
    return this.user.uid ?? undefined;
  }

  public isSignedIn(): boolean {
    return !!this.user;
  }
}
