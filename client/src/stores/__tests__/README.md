# AuthStore Tests

This directory contains comprehensive tests for the `authStore` which manages authentication state in the application.

## Test Coverage

The tests cover all methods of the `authStore`:

### 1. `register(payload: SignUpDto)`
- ✅ Successful registration with valid payload
- ✅ Error handling for failed registration

### 2. `login(payload: LogInDto)`
- ✅ Successful login with valid credentials
- ✅ Error handling for failed login

### 3. `logout()`
- ✅ Successful logout and state cleanup
- ✅ Error handling during logout

### 4. `validateToken()`
- ✅ Valid token validation
- ✅ Invalid token handling
- ✅ No token scenario

### 5. `refreshToken()`
- ✅ Successful token refresh
- ✅ Error handling for refresh failures
- ✅ Handling empty token response

### 6. `isAuthenticated` signal
- ✅ Default state (false)
- ✅ State updates after authentication changes

## Running Tests

To run the tests, use the following commands:

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test --watch

# Run tests with UI
yarn test:ui

# Run tests with coverage
yarn test:coverage
```

## Test Structure

Each test method is organized into its own `describe` block with multiple test cases covering:
- Happy path scenarios
- Error handling
- Edge cases
- State management

## Mocking

The tests use comprehensive mocking for:
- `AuthService` - All service methods are mocked
- `localStorage` - Browser storage is mocked for testing
- Console methods - To reduce noise in test output

## Dependencies

The tests require the following testing dependencies:
- `vitest` - Testing framework
- `jsdom` - DOM environment for browser APIs
- `@testing-library/jest-dom` - Additional matchers 