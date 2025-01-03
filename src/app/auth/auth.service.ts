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

interface CustomJwtPayload extends JwtPayload {
  "cognito:groups"?: string[];
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private userSubject = new BehaviorSubject<AuthUser | null>(
    this.restoreUser()
  );
  private userGroupsSubject = new BehaviorSubject<string[]>([]);
  userGroups: string[] = [];
  private isAdminSubject = new BehaviorSubject<boolean>(false);
  private accessToken: CustomJwtPayload | undefined = undefined;

  get user$(): Observable<AuthUser | null> {
    return this.userSubject.asObservable();
  }

  get userGroups$(): Observable<string[]> {
    return this.userGroupsSubject.asObservable();
  }

  get isAdmin$(): Observable<boolean> {
    return this.isAdminSubject.asObservable();
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

      const decodedToken = jwtDecode<CustomJwtPayload>(accessToken.toString());
      const currentTime = Math.floor(Date.now() / 1000);

      if (!decodedToken.exp) {
        console.error("Token does not contain a valid expiration.");
        return false;
      }
      const isValid = decodedToken.exp > currentTime;

      this.accessToken = decodedToken;

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
        await this.fetchUserGroups(); // move to login()
      } else {
        this.userSubject.next(null);
        this.saveUser(null);
        this.userGroupsSubject.next([]);
      }
    } catch (error) {
      console.error("Error fetching current user:", error);
      this.userSubject.next(null);
      this.saveUser(null);
      this.userGroupsSubject.next([]);
    }
  }

  // async login(): Promise<void> {
  //   try {
  //     await this.fetchCurrentUser();
  //     await this.fetchUserGroups();
  //     await this.assignAdminUser();
  //   } catch (error) {
  //     console.error("Error during sign-in:", error);
  //     throw error;
  //   }
  // }

  async logout(): Promise<void> {
    try {
      await signOut();
      this.userSubject.next(null);
      this.saveUser(null);
      this.userGroupsSubject.next([]);
      this.isAdminSubject.next(false);
    } catch (error) {
      console.error("Error during sign-out:", error);
      throw error;
    }
  }

  async fetchUserGroups() {
    try {
      if (!this.accessToken) {
        console.error(
          "Cannot fetch user groups because there was no access token found."
        );
        return;
      }

      this.userGroups = this.accessToken["cognito:groups"] ?? [];
      this.userGroupsSubject.next(this.userGroups);
      this.isAdminSubject.next(this.userGroups.includes("admins"));
    } catch (error) {
      console.error("Error fetching user groups:", error);
      this.userGroupsSubject.next([]);
      this.isAdminSubject.next(false);
    }
  }
}
