import { Injectable } from "@angular/core";
import {
  AuthSession,
  AuthUser,
  fetchAuthSession,
  getCurrentUser,
  signOut,
} from "aws-amplify/auth";
import { BehaviorSubject, Observable } from "rxjs";
import { jwtDecode, JwtPayload } from "jwt-decode";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private userSubject = new BehaviorSubject<AuthUser | null>(
    this.restoreUser()
  );
  userGroups: string[] = [];

  get user$(): Observable<AuthUser | null> {
    return this.userSubject.asObservable();
  }

  private restoreUser(): AuthUser | null {
    const userJson = localStorage.getItem("currentUser");
    return userJson ? JSON.parse(userJson) : null;
  }

  private saveUser(user: AuthUser | null): void {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("currentUser");
    }
  }

  async checkAuthSession(): Promise<boolean> {
    try {
      const authSession: AuthSession = await fetchAuthSession({
        forceRefresh: true,
      });
      const accessToken = authSession.tokens?.accessToken;

      if (!accessToken) {
        console.error("No access token found.");
        return false;
      }

      const decodedToken = jwtDecode<JwtPayload>(accessToken.toString());
      const currentTime = Math.floor(Date.now() / 1000);

      if (!decodedToken.exp) {
        console.error("Token does not contain a valid expiration.");
        return false;
      }
      const isValid = decodedToken.exp > currentTime;

      return isValid;
    } catch (error) {
      console.error("Error checking auth session:", error);
      return false;
    }
  }

  async fetchCurrentUser(): Promise<void> {
    try {
      const validAuthSession = await this.checkAuthSession();

      if (validAuthSession) {
        const user: AuthUser = await getCurrentUser();
        this.userSubject.next(user);
        this.saveUser(user);
      } else {
        this.userSubject.next(null);
        this.saveUser(null);
      }
    } catch (error) {
      console.error("Error fetching current user:", error);
      this.userSubject.next(null);
      this.saveUser(null);
    }
  }

  // async login()

  async logout(): Promise<void> {
    try {
      await signOut();
      this.userSubject.next(null);
      this.saveUser(null);
    } catch (error) {
      console.error("Error during sign-out:", error);
      throw error;
    }
  }
}
