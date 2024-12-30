import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient } from "@angular/common/http";
import { HomeComponent } from "./home.component";

// import * as AmplifyAuth from "@aws-amplify/auth";

describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockSignOut: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        provideHttpClientTesting(),
        provideHttpClient(),
        // { provide: AuthService, useClass: MockAuthService },
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

  it("should intially show amplify authenticator component and conditional text when the user is not logged in", () => {
    const authComponent = fixture.debugElement.query(
      By.css("amplify-authenticator")
    );

    expect(authComponent).toBeTruthy();

    fixture.whenStable().then(() => {
      const h2 = fixture.debugElement.query(By.css("h2")).nativeElement;
      expect(h2.textContent).toContain("Sign in to your account");
    });
  });

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
