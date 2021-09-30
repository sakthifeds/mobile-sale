import { TestBed } from '@angular/core/testing';

import { AuthenticationtokenInterceptor } from './authenticationtoken.interceptor';

describe('AuthenticationtokenInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthenticationtokenInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthenticationtokenInterceptor = TestBed.inject(AuthenticationtokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
