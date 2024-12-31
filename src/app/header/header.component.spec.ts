import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { HeaderComponent } from "./header.component";
import { AuthService } from "../auth/auth.service";
import { AuthUser } from "aws-amplify/auth";
import { RouterModule } from "@angular/router";

describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj("AuthService", [], {
      user$: of({
        userId: "test-user-id",
      } as AuthUser),
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

  // it("should display user-specific links when user is logged in", () => {
  //   const compiled = fixture.nativeElement;
  //   expect(
  //     compiled.querySelector('a[routerLink="/dashboard/test-user-id"]')
  //   ).toBeTruthy();
  //   expect(
  //     compiled.querySelector('a[routerLink="/admin/test-user-id"]')
  //   ).toBeTruthy();
  // });

  // it("should not display user-specific links when user is not logged in", () => {
  //   const mockAuthServiceLoggedOut = jasmine.createSpyObj("AuthService", [], {
  //     user$: of(null),
  //   });
  //   TestBed.overrideProvider(AuthService, {
  //     useValue: mockAuthServiceLoggedOut,
  //   });
  //   fixture = TestBed.createComponent(HeaderComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   expect(
  //     compiled.querySelector('a[routerLink="/dashboard/test-user-id"]')
  //   ).toBeFalsy();
  //   expect(
  //     compiled.querySelector('a[routerLink="/admin/test-user-id"]')
  //   ).toBeFalsy();
  // });
});
