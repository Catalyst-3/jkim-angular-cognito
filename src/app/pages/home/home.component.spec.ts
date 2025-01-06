import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { BehaviorSubject, of } from "rxjs";
import { HomeComponent } from "./home.component";
import { AuthService, CustomUser } from "../../auth/auth.service";
import { CommonModule } from "@angular/common";

describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let userSubject: BehaviorSubject<CustomUser | null>;

  beforeEach(async () => {
    userSubject = new BehaviorSubject<CustomUser | null>(null);
    mockAuthService = jasmine.createSpyObj(
      "AuthService",
      ["login", "logout", "signUp"],
      {
        user$: userSubject.asObservable(),
      }
    );

    await TestBed.configureTestingModule({
      imports: [HomeComponent, CommonModule, FormsModule],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display login form when user is not logged in", () => {
    userSubject.next(null);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector("form")).toBeTruthy();
    expect(compiled.querySelector("h2.form-header").textContent).toContain(
      "Sign in to your account"
    );
  });

  it("should display user information when user is logged in", () => {
    userSubject.next({
      username: "testuser",
      userId: "test-user-id",
      isAdmin: false,
    } as CustomUser);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector("h2").textContent).toContain(
      "Welcome, testuser!"
    );
    expect(compiled.querySelector("button").textContent).toContain("Sign Out");
  });

  it("should call login method on form submit", async () => {
    const compiled = fixture.nativeElement;
    component.enteredEmail = "test@example.com";
    component.enteredPassword = "password";
    fixture.detectChanges();

    const form = compiled.querySelector("form");
    form.dispatchEvent(new Event("submit"));

    await fixture.whenStable();
    expect(mockAuthService.login).toHaveBeenCalledWith(
      "test@example.com",
      "password"
    );
  });

  it("should display error message on login failure", async () => {
    mockAuthService.login.and.returnValue(Promise.reject("Login failed"));
    component.enteredEmail = "test@example.com";
    component.enteredPassword = "password";
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const form = compiled.querySelector("form");
    form.dispatchEvent(new Event("submit"));

    await fixture.whenStable();
    fixture.detectChanges();

    const errorMessageElement = compiled.querySelector(".error-message");
    expect(errorMessageElement).toBeTruthy();
    expect(errorMessageElement.textContent).toContain(
      "Login failed. Please try again."
    );
  });

  it("should call logout method on button click", () => {
    userSubject.next({
      username: "testuser",
      userId: "test-user-id",
      isAdmin: false,
    } as CustomUser);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const button = compiled.querySelector("button");
    button.click();

    expect(mockAuthService.logout).toHaveBeenCalled();
  });

  it("should switch to Create Account tab", () => {
    component.setActiveTab("createAccount");
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector("h2.form-header").textContent).toContain(
      "Create a new account"
    );
  });

  it("should call signUp method on form submit and switch to signIn tab on success", async () => {
    component.setActiveTab("createAccount");
    fixture.detectChanges();

    component.enteredEmail = "test@example.com";
    component.enteredPassword = "password";
    component.enteredConfirmPassword = "password";
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const form = compiled.querySelector("form");
    form.dispatchEvent(new Event("submit"));

    await fixture.whenStable();
    expect(mockAuthService.signUp).toHaveBeenCalledWith(
      "test@example.com",
      "password"
    );
    expect(component.activeTab).toBe("signIn");
  });

  it("should display error message if passwords do not match", () => {
    component.setActiveTab("createAccount");
    fixture.detectChanges();

    component.enteredEmail = "test@example.com";
    component.enteredPassword = "password";
    component.enteredConfirmPassword = "differentpassword";

    const compiled = fixture.nativeElement;
    const form = compiled.querySelector("form");
    form.dispatchEvent(new Event("submit"));

    fixture.detectChanges();
    expect(component.errorMessage).toBe("Passwords do not match");
    expect(compiled.querySelector(".error-message").textContent).toContain(
      "Passwords do not match"
    );
  });

  it("should display error message on signup failure", async () => {
    mockAuthService.signUp.and.returnValue(Promise.reject("Sign up failed"));
    component.setActiveTab("createAccount");
    fixture.detectChanges();

    component.enteredEmail = "test@example.com";
    component.enteredPassword = "password";
    component.enteredConfirmPassword = "password";

    const compiled = fixture.nativeElement;
    const form = compiled.querySelector("form");
    form.dispatchEvent(new Event("submit"));

    await fixture.whenStable();
    fixture.detectChanges();
    expect(component.errorMessage).toBe("Sign up failed. Please try again.");
    expect(compiled.querySelector(".error-message").textContent).toContain(
      "Sign up failed. Please try again."
    );
  });
});
