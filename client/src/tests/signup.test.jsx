import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignUp from '../scenes/SignUp';
import { useUser } from '../context/usercontext';


const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

const mockSignUp = jest.fn();

jest.mock('../context/usercontext', () => ({
  useUser: () => ({
    user: null,
    signUp: mockSignUp,
    signIn: jest.fn(),
    signOut: jest.fn(),
  }),
}));

describe('SignUp', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('User Fills Out Sign Up Form', () => {
    render(<SignUp />);

    const usernameInput = screen.getByLabelText(/username/i);
    const emailInput = screen.getByLabelText(/^email:/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const roleInput = screen.getByLabelText(/role:/i);

    fireEvent.change(usernameInput, { target: { name: 'username', value: 'user1' } });
    fireEvent.change(emailInput, { target: { name: 'email', value: 'user1@test.com' } });
    fireEvent.change(passwordInput, { target: { name: 'password', value: '123456' } });
    fireEvent.change(roleInput, { target: { name: 'role', value: 'admin' } });

    expect(usernameInput).toHaveValue('user1');
    expect(emailInput).toHaveValue('user1@test.com');
    expect(passwordInput).toHaveValue('123456');
    expect(roleInput).toHaveValue('admin');
  });

  test('Sign Up and Navigate to Home', async () => {
    mockSignUp.mockResolvedValueOnce(undefined); // pretend success

    render(<SignUp />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { name: 'username', value: 'user1' },
    });
    fireEvent.change(screen.getByLabelText(/^email:/i), {
      target: { name: 'email', value: 'user1@test.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { name: 'password', value: '123456' },
    });
    fireEvent.change(screen.getByLabelText(/role:/i), {
      target: { name: 'role', value: 'user' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(mockSignUp).toHaveBeenCalledWith(
      'user1',
      'user1@test.com',
      '123456',
      'user',
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
});