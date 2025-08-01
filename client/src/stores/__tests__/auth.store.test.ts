import { AuthService } from '@services/auth.service';
import { beforeEach, describe, expect, test, vi } from 'vitest';

// Mock the AuthService
vi.mock('@services/auth.service');

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock createRoot to return the store directly
vi.mock('solid-js', async () => {
  return await vi.importActual('solid-js');
});

describe('authStore', () => {
  let authStore: any;
  let mockAuthService: any;

  beforeEach(async () => {
    vi.clearAllMocks();

    // Clear all mocks
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
    localStorageMock.clear.mockClear();

    // Import the store after mocking
    const { authStore: store } = await import('@stores/auth.store');
    authStore = store;

    // Get the mocked AuthService
    mockAuthService = vi.mocked(AuthService);
  });

  test('login should store token and set authenticated', async () => {
    // Mock successful login
    const mockToken = { access_token: 'test_token_123' };
    mockAuthService.prototype.login.mockResolvedValue(mockToken);

    await authStore.login({ email: 'test@example.com', password: '123' });

    expect(localStorageMock.setItem).toHaveBeenCalledWith('access_token', 'test_token_123');
    expect(authStore.isAuthenticated()).toBe(true);
  });

  test('register should store token and set authenticated', async () => {
    // Mock successful registration
    const mockResponse = {
      data: { access_token: 'signup_token_456' },
      status: 200,
      statusText: 'OK',
    };
    mockAuthService.prototype.signUp.mockResolvedValue(mockResponse);

    await authStore.register({ username: 'test', email: 'test@example.com', password: 'password' });

    expect(localStorageMock.setItem).toHaveBeenCalledWith('access_token', 'signup_token_456');
    expect(authStore.isAuthenticated()).toBe(true);
  });

  test('logout should clear token and reset auth state', async () => {
    // Set initial state
    localStorageMock.getItem.mockReturnValue('existing_token');
    mockAuthService.prototype.logout.mockResolvedValue(undefined);

    await authStore.logout();

    expect(localStorageMock.removeItem).toHaveBeenCalledWith('access_token');
    expect(authStore.isAuthenticated()).toBe(false);
  });

  test('login failure should not set authenticated', async () => {
    // Mock failed login
    mockAuthService.prototype.login.mockRejectedValue(new Error('Login failed'));

    await authStore.login({ email: 'fail@example.com', password: 'wrong' });

    expect(authStore.isAuthenticated()).toBe(false);
    expect(localStorageMock.setItem).not.toHaveBeenCalled();
  });

  test('register failure should not set authenticated', async () => {
    // Mock failed registration
    mockAuthService.prototype.signUp.mockRejectedValue(new Error('Registration failed'));

    await authStore.register({ username: 'test', email: 'test@example.com', password: 'password' });

    expect(authStore.isAuthenticated()).toBe(false);
    expect(localStorageMock.setItem).not.toHaveBeenCalled();
  });

  test('validateToken should set authenticated when token is valid', async () => {
    // Mock valid token
    localStorageMock.getItem.mockReturnValue('valid_token');
    mockAuthService.prototype.validateToken.mockResolvedValue({ isValid: true });

    const result = await authStore.validateToken();

    expect(result).toBe(true);
    expect(authStore.isAuthenticated()).toBe(true);
  });

  test('validateToken should not set authenticated when token is invalid', async () => {
    // Mock invalid token
    localStorageMock.getItem.mockReturnValue('invalid_token');
    mockAuthService.prototype.validateToken.mockResolvedValue({ isValid: false });

    const result = await authStore.validateToken();

    expect(result).toBe(false);
    expect(authStore.isAuthenticated()).toBe(false);
  });

  test('validateToken should not set authenticated when no token exists', async () => {
    // Mock no token
    localStorageMock.getItem.mockReturnValue(null);

    const result = await authStore.validateToken();

    expect(result).toBe(false);
    expect(authStore.isAuthenticated()).toBe(false);
  });

  test('refreshToken should update token and set authenticated', async () => {
    // Mock successful token refresh
    const mockToken = { access_token: 'new_refreshed_token' };
    mockAuthService.prototype.refreshToken.mockResolvedValue(mockToken);

    await authStore.refreshToken();

    expect(localStorageMock.setItem).toHaveBeenCalledWith('access_token', 'new_refreshed_token');
    expect(authStore.isAuthenticated()).toBe(true);
  });

  test('refreshToken should not set authenticated when refresh fails', async () => {
    // Mock failed token refresh
    mockAuthService.prototype.refreshToken.mockRejectedValue(new Error('Refresh failed'));

    await authStore.refreshToken();

    expect(authStore.isAuthenticated()).toBe(false);
    expect(localStorageMock.setItem).not.toHaveBeenCalled();
  });
});
