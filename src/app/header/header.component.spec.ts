import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BehaviorSubject } from "rxjs";
import { HeaderComponent } from "./header.component";
import { AuthService, CustomUser } from "../auth/auth.service";
import { RouterModule } from "@angular/router";

describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let userSubject: BehaviorSubject<CustomUser | null>;

  beforeEach(async () => {
    userSubject = new BehaviorSubject<CustomUser | null>(null);
    mockAuthService = jasmine.createSpyObj("AuthService", ["login", "logout"], {
      user$: userSubject.asObservable(),
    });

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterModule.forRoot([])],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should not display user-specific links when user is not logged in", () => {
    userSubject.next(null);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(
      compiled.querySelector('a[href="/dashboard/test-user-id"]')
    ).toBeFalsy();
    expect(compiled.querySelector('a[href="/admin/test-user-id"]')).toBeFalsy();
  });

  it("should display Dashboard link when user is logged in", () => {
    userSubject.next({
      username: "testuser",
      userId: "test-user-id",
      isAdmin: false,
    } as CustomUser);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(
      compiled.querySelector('a[href="/dashboard/test-user-id"]')
    ).toBeTruthy();
  });

  it("should not display Admin link when user is logged in and not an admin", () => {
    userSubject.next({
      username: "testuser",
      userId: "test-user-id",
      isAdmin: false,
    } as CustomUser);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('a[href="/admin/test-user-id"]')).toBeFalsy();
  });

  it("should display Admin link when user is logged in and is an admin", () => {
    userSubject.next({
      username: "testuser",
      userId: "test-user-id",
      isAdmin: true,
    } as CustomUser);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(
      compiled.querySelector('a[href="/admin/test-user-id"]')
    ).toBeTruthy();
  });
});
