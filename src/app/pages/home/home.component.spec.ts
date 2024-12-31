import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient } from "@angular/common/http";
import { HomeComponent } from "./home.component";
import { AuthService } from "../../auth/auth.service";
import { BehaviorSubject, of } from "rxjs";
import { AmplifyAuthenticatorModule } from "@aws-amplify/ui-angular";
import { AuthUser, ConfirmSignInOutput } from "aws-amplify/auth";

// import * as AmplifyAuth from "@aws-amplify/auth";

describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let userSubject: BehaviorSubject<AuthUser | null>;

  beforeEach(async () => {
    userSubject = new BehaviorSubject<AuthUser | null>(null);
    mockAuthService = jasmine.createSpyObj("AuthService", ["logout"], {
      user$: userSubject.asObservable(),
    });

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        // provideHttpClientTesting(),
        // provideHttpClient(),
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the component", () => {
    const homeComponent: HTMLElement = fixture.nativeElement;
    const title = homeComponent.querySelector("h1");

    expect(title).toBeDefined();
    expect(component).toBeTruthy();
  });

  it("should intially show amplify authenticator component and conditional text when the user is not logged in", waitForAsync(() => {
    const authComponent = fixture.debugElement.query(
      By.css("amplify-authenticator")
    );

    expect(authComponent).toBeTruthy();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const h2 = fixture.debugElement.query(By.css("h2")).nativeElement;
      expect(h2.textContent).toContain("Sign in to your account");
    });
  }));

  it('should show "Sign in to your account" when user is logged out', waitForAsync(() => {
    // Emit a null value to simulate the logged-out state
    userSubject.next(null);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges(); // Trigger DOM update

      const h2 = fixture.debugElement.query(
        By.css(".amplify-heading--2")
      )?.nativeElement;
      expect(h2.textContent).toContain("Sign in to your account");
    });
  }));

  // it("should display the username when the user is logged in", waitForAsync(() => {
  //   const mockUser = {
  //     username: "testuser",
  //     userId: "testuser",
  //     signInDetails: {
  //       loginId: "testuser@example.com",
  //     },
  //   };
  //   userSubject.next(mockUser);
  //   fixture.detectChanges();

  //   fixture.whenStable().then(() => {
  //     fixture.detectChanges();

  //     const h2 = fixture.debugElement.query(By.css("h2")).nativeElement;
  //     expect(h2.textContent).toContain("Welcome, testuser!");
  //   });
  // }));

  // it("should display the username when user is logged in", waitForAsync(() => {
  //   fixture.whenStable().then(() => {
  //     fixture.detectChanges(); // Trigger change detection after async updates
  //     const welcomeMessage = fixture.debugElement.query(
  //       By.css("h2")
  //     )?.nativeElement;
  //     expect(welcomeMessage.textContent).toContain("Welcome, testuser!");
  //   });
  // }));

  // it('should display "Sign in to your account" when user is not logged in', () => {
  //   // Mock the AuthService to return null for the user
  //   mockAuthService.user$ = of(null);
  //   fixture.detectChanges();

  //   const compiled = fixture.nativeElement as HTMLElement;
  //   const signInHeader = compiled.querySelector(".amplify-heading--2");
  //   expect(signInHeader?.textContent).toContain("Sign in to your account");
  // });

  // it('should call logout when the "Sign Out" button is clicked', async () => {
  //   spyOn(console, "log");

  //   const compiled = fixture.nativeElement as HTMLElement;

  //   // Find and click the "Sign Out" button
  //   const signOutButton = compiled.querySelector("button");
  //   expect(signOutButton).toBeTruthy();

  //   signOutButton?.click();
  //   await fixture.whenStable();

  //   // Assert that logout was called and a log was printed
  //   expect(mockAuthService.logout).toHaveBeenCalled();
  //   expect(console.log).toHaveBeenCalledWith("User logged out successfully");
  // });

  // xit("should display the welcome message when the user is logged in", async () => {
  //   const signInOutput: AmplifyAuth.SignInOutput = {
  //     isSignedIn: true,
  //     nextStep: {
  //       additionalInfo: { "": "" },
  //       signInStep: "CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE",
  //     },
  //   };
  //   spyOn(AmplifyAuth, "signIn").and.returnValue(Promise.resolve(signInOutput));

  //   const mockUsername = "testuser";
  //   const mockPassword = "password123";
  //   const signInInput: AmplifyAuth.SignInInput = {
  //     username: mockUsername,
  //     password: mockPassword,
  //   };
  //   const result = await AmplifyAuth.signIn({
  //     username: mockUsername,
  //     password: mockPassword,
  //   });

  //   expect(AmplifyAuth.signIn).toHaveBeenCalledWith({
  //     username: mockUsername,
  //     password: mockPassword,
  //   });
  //   expect(result.isSignedIn).toBeTrue();
  // });

  // xit('should call signOut and log a success message when the "Sign Out" button is clicked', waitForAsync(async () => {}));
});
