import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { BehaviorSubject, of } from "rxjs";
import { AuthGuard, AuthAdminGuard } from "./auth.guard";
import { AuthService, CustomUser } from "./auth.service";

describe("AuthGuard", () => {
  let authGuard: AuthGuard;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let userSubject: BehaviorSubject<CustomUser | null>;

  beforeEach(() => {
    userSubject = new BehaviorSubject<CustomUser | null>(null);
    mockAuthService = jasmine.createSpyObj("AuthService", ["login"], {
      user$: userSubject.asObservable(),
    });
    const routerSpy = jasmine.createSpyObj("Router", ["navigate"]);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: routerSpy },
      ],
    });

    authGuard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it("should allow the authenticated user to access the route", (done: DoneFn) => {
    userSubject.next({
      username: "testuser",
      userId: "test-user-id",
      isAdmin: false,
    } as CustomUser);

    authGuard.canActivate().subscribe((result) => {
      expect(result).toBeTrue();
      done();
    });
  });

  it("should redirect an unauthenticated user to /unauthorized", (done: DoneFn) => {
    userSubject.next(null);

    authGuard.canActivate().subscribe((result) => {
      expect(result).toBeFalse();
      expect(router.navigate).toHaveBeenCalledWith(["/unauthorized"]);
      done();
    });
  });
});

describe("AuthAdminGuard", () => {
  let authAdminGuard: AuthAdminGuard;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let userGroupsSubject: BehaviorSubject<string[]>;

  beforeEach(() => {
    userGroupsSubject = new BehaviorSubject<string[]>([]);
    mockAuthService = jasmine.createSpyObj("AuthService", ["login"], {
      userGroups$: userGroupsSubject.asObservable(),
    });
    const routerSpy = jasmine.createSpyObj("Router", ["navigate"]);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: routerSpy },
      ],
    });

    authAdminGuard = TestBed.inject(AuthAdminGuard);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it("should allow the authenticated user to access the route", (done: DoneFn) => {
    userGroupsSubject.next(["admins"]);

    authAdminGuard.canActivate().subscribe((result) => {
      expect(result).toBeTrue();
      done();
    });
  });

  it("should redirect a non-admin user to /unauthorized", (done: DoneFn) => {
    userGroupsSubject.next([]);

    authAdminGuard.canActivate().subscribe((result) => {
      expect(result).toBeFalse();
      expect(router.navigate).toHaveBeenCalledWith(["/unauthorized"]);
      done();
    });
  });

  it("should redirect an unauthenticated user to /unauthorized for admin route", (done: DoneFn) => {
    userGroupsSubject.next([]);

    authAdminGuard.canActivate().subscribe((result) => {
      expect(result).toBeFalse();
      expect(router.navigate).toHaveBeenCalledWith(["/unauthorized"]);
      done();
    });
  });
});
