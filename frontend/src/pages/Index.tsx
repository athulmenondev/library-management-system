import LoginForm from "@/components/LoginForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">BookVault</h1>
          <p className="text-gray-600">Welcome back! Please sign in to your account.</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Index;
