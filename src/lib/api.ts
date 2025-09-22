// API service for handling HTTP requests
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'student' | 'club_admin' | 'college_admin';
  college: string;
  createdAt: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'student' | 'club_admin' | 'college_admin' | '';
  college: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Mock database - in a real app, this would be replaced with actual database calls
class MockDatabase {
  private users: User[] = [];

  async createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<ApiResponse<User>> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user already exists
    const existingUser = this.users.find(user => user.email === userData.email);
    if (existingUser) {
      return {
        success: false,
        error: 'User with this email already exists'
      };
    }

    // Create new user
    const newUser: User = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };

    this.users.push(newUser);

    // Store in localStorage for persistence
    localStorage.setItem('campbuzz_users', JSON.stringify(this.users));

    return {
      success: true,
      data: newUser
    };
  }

  async getUsers(): Promise<User[]> {
    const stored = localStorage.getItem('campbuzz_users');
    if (stored) {
      this.users = JSON.parse(stored);
    }
    return this.users;
  }
}

const db = new MockDatabase();

// API functions
export const userApi = {
  async signup(userData: SignupData): Promise<ApiResponse<User>> {
    // Validate passwords match
    if (userData.password !== userData.confirmPassword) {
      return {
        success: false,
        error: 'Passwords do not match'
      };
    }

    // Validate password strength
    if (userData.password.length < 6) {
      return {
        success: false,
        error: 'Password must be at least 6 characters long'
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      return {
        success: false,
        error: 'Please enter a valid email address'
      };
    }

    // Validate required fields
    if (!userData.name || !userData.college || !userData.role) {
      return {
        success: false,
        error: 'All fields are required'
      };
    }

    try {
      const result = await db.createUser({
        name: userData.name,
        email: userData.email,
        password: userData.password, // In real app, this would be hashed
        role: userData.role,
        college: userData.college
      });

      return result;
    } catch (error) {
      return {
        success: false,
        error: 'An error occurred while creating your account'
      };
    }
  },

  async getAllUsers(): Promise<User[]> {
    return await db.getUsers();
  }
};
