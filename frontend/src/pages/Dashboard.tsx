import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut, User, BookOpen, Users } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const userString = sessionStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    navigate('/');
  };

  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-indigo-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-800">Library Management System</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-600">
                <User className="h-4 w-4 mr-2" />
                <span className="font-medium">{user.name}</span>
                <span className="ml-2 px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium capitalize">
                  {user.role}
                </span>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="flex items-center"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, {user.name}!</h2>
          <p className="text-gray-600">Manage your library efficiently with our comprehensive system.</p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="flex items-center mb-4">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-800 ml-3">Books</h3>
            </div>
            <p className="text-gray-600 mb-4">Manage your book collection, add new books, and track availability.</p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Manage Books
            </Button>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="flex items-center mb-4">
              <Users className="h-8 w-8 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-800 ml-3">Members</h3>
            </div>
            <p className="text-gray-600 mb-4">View and manage library members, track borrowing history.</p>
            <Button className="w-full bg-green-600 hover:bg-green-700">
              Manage Members
            </Button>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="flex items-center mb-4">
              <BookOpen className="h-8 w-8 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-800 ml-3">Transactions</h3>
            </div>
            <p className="text-gray-600 mb-4">Track book loans, returns, and overdue items.</p>
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              View Transactions
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
            <div className="text-2xl font-bold text-gray-800">1,234</div>
            <div className="text-gray-600 text-sm">Total Books</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
            <div className="text-2xl font-bold text-gray-800">567</div>
            <div className="text-gray-600 text-sm">Active Members</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
            <div className="text-2xl font-bold text-gray-800">89</div>
            <div className="text-gray-600 text-sm">Books Borrowed</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
            <div className="text-2xl font-bold text-gray-800">12</div>
            <div className="text-gray-600 text-sm">Overdue Items</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
