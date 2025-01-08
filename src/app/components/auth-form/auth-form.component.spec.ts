import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { CommonModule } from "@angular/common";
import { AuthFormComponent } from "./auth-form.component";
import { AuthService, CustomUser } from "../../auth/auth.service";

describe("AuthFormComponent", () => {
  let component: AuthFormComponent;
  let fixture: ComponentFixture<AuthFormComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let userSubject: BehaviorSubject<CustomUser | null>;

  beforeEach(async () => {
    userSubject = new BehaviorSubject<CustomUser | null>(null);
    mockAuthService = jasmine.createSpyObj("AuthService", ["login", "signUp"], {
      user$: userSubject.asObservable(),
    });

    await TestBed.configureTestingModule({
      imports: [AuthFormComponent, CommonModule, FormsModule],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
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
  });

  it("should switch to Create Account tab", () => {
    component.setActiveTab("createAccount");
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector("h2.form-title").textContent).toContain(
      "Create a new account"
    );
  });

  it("should call signUp method on form submit", async () => {
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
    expect(component.errorMessage).toBeTruthy();
    expect(compiled.querySelector(".error-message").textContent).toBeTruthy();
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
    expect(component.errorMessage).toBeTruthy();
    expect(compiled.querySelector(".error-message").textContent).toBeTruthy();
  });
});
