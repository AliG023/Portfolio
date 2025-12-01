import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignIn from '../scenes/SignIn';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));


const mockSignIn = jest.fn();

jest.mock('../context/usercontext', () => ({
  useUser: () => ({
    user: null,
    signIn: mockSignIn,
    signOut: jest.fn(),
    signUp: jest.fn(),
  }),
}));

describe('SignIn', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  test('User Types Inputs', () => {
    render(<SignIn />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(usernameInput, {
      target: { name: 'username', value: 'user1' },
    });
    fireEvent.change(passwordInput, {
      target: { name: 'password', value: '123456' },
    });

    expect(usernameInput).toHaveValue('user1');
    expect(passwordInput).toHaveValue('123456');
  });

  test('Sign In and Navigate to Home', async () => {
    render(<SignIn />);


    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { name: 'username', value: 'user1' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { name: 'password', value: '123456' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));


    expect(mockSignIn).toHaveBeenCalledWith('user1', '123456');
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
});