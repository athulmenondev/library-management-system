export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'librarian' | 'user';
}

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'librarian@example.com',
    password: 'password123',
    role: 'librarian'
  },
  {
    id: '3',
    name: 'John Smith',
    email: 'john.smith@example.com',
    password: 'password123',
    role: 'librarian'
  },
  {
    id: '4',
    name: 'Alice Brown',
    email: 'user@example.com',
    password: 'password123',
    role: 'user'
  },
  {
    id: '5',
    name: 'Bob Wilson',
    email: 'bob.user@example.com',
    password: 'password123',
    role: 'user'
  }
];
