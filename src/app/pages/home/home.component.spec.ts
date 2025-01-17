import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
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
    mockAuthService = jasmine.createSpyObj("AuthService", ["logout"], {
      user$: userSubject.asObservable(),
    });

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
    expect(compiled.querySelector("h2.form-title").textContent).toContain(
      "Sign in to your account"
    );
  });

  it("should display user information when user is logged in", () => {
    userSubject.next({
      username: "testuser",
      userId: "test-user-id",
      isAdmin: false,
      signInDetails: {
        loginId: "testuser@test.com",
      },
    } as CustomUser);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector("h2").textContent).toContain(
      "Welcome, testuser@test.com!"
    );
    expect(compiled.querySelector("button").textContent).toContain("Sign Out");
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
});
