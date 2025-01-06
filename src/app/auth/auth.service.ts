import { Injectable } from "@angular/core";
import {
  AuthSession,
  AuthUser,
  fetchAuthSession,
  getCurrentUser,
  signIn,
  SignInInput,
  signOut,
  signUp,
} from "aws-amplify/auth";
import { BehaviorSubject, Observable } from "rxjs";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  "cognito:groups"?: string[];
}

export interface CustomUser extends AuthUser {
  isAdmin: boolean;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private userSubject = new BehaviorSubject<CustomUser | null>(
    this.restoreUser()
  );
  private userGroupsSubject = new BehaviorSubject<string[]>([]);
  userGroups: string[] = [];
  private isAdminSubject = new BehaviorSubject<boolean>(
    this.restoreUser()?.isAdmin ?? false
  );
  private accessToken: CustomJwtPayload | undefined = undefined;

  get user$(): Observable<CustomUser | null> {
    return this.userSubject.asObservable();
  }

  get userGroups$(): Observable<string[]> {
    return this.userGroupsSubject.asObservable();
  }

  private restoreUser(): CustomUser | null {
    const userJson = localStorage.getItem("currentUser");
    return userJson ? JSON.parse(userJson) : null;
  }

  private saveUser(user: CustomUser | null): void {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("currentUser");
    }
  }

  async login(email: string, password: string): Promise<void> {
    try {
      const signInInput: SignInInput = {
        username: email,
        password,
      };
      await signIn(signInInput);
      await this.fetchCurrentUser();
    } catch (error) {
      console.error("Error during sign-in:", error);
      throw error;
    }
  }

  async signUp(email: string, password: string): Promise<void> {
    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username: email,
        password,
      });

      await this.login(email, password);
      await this.fetchCurrentUser();
    } catch (error) {
      console.error("Error during sign-up:", error);
      throw error;
    }
  }

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

  async fetchCurrentUser(): Promise<void> {
    try {
      const validAuthSession = await this.checkAuthSession();

      if (validAuthSession) {
        const user: AuthUser = await getCurrentUser();
        await this.fetchUserGroups();

        const userWithDetails: CustomUser = {
          ...user,
          isAdmin: this.isAdminSubject.value,
        };

        this.userSubject.next(userWithDetails);
        this.saveUser(userWithDetails);
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
