
import { useState } from 'react';
import { X, Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'signup';
  onModeChange: (mode: 'login' | 'signup') => void;
  onLoginSuccess: (user: any) => void; // ✅ Add this line
}


const AuthModal = ({ isOpen, onClose, mode, onModeChange,onLoginSuccess }: AuthModalProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    userType: 'patient'
  });

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const endpoint =
    mode === 'signup'
      ? 'http://localhost:5000/api/auth/signup'
      : 'http://localhost:5000/api/auth/login';

  const payload =
    mode === 'signup'
      ? {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.userType,
          phone: formData.phone,
        }
      : {
          email: formData.email,
          password: formData.password,
        };

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

if (!res.ok) {
  if (data.message === 'User already exists' && mode === 'signup') {
    alert('User already exists. Switching to login.');
    onModeChange('login');
  } else {
    throw new Error(data.message || 'Authentication failed');
  }
  return;
}


    console.log('✅ Success:', data);

    // Store user/token if needed
    // localStorage.setItem('token', data.token);
     localStorage.setItem('user', JSON.stringify(data.user));
onLoginSuccess(data.user); // ✅ This line makes sure Navbar updates
alert('Authentication successful!');
onClose();
  } catch (error) {
    console.error('❌ Error:', error);
    alert((error as Error).message);
  }
};



  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-gray-800">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === 'signup' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="pl-10"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    className="pl-10"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Account Type</Label>
                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant={formData.userType === 'patient' ? 'default' : 'outline'}
                    onClick={() => handleInputChange('userType', 'patient')}
                    className="flex-1"
                  >
                    Patient
                  </Button>
                  <Button
                    type="button"
                    variant={formData.userType === 'doctor' ? 'default' : 'outline'}
                    onClick={() => handleInputChange('userType', 'doctor')}
                    className="flex-1"
                  >
                    Doctor
                  </Button>
                </div>
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="pl-10"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className="pl-10 pr-10"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
          >
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </Button>

          <Separator />

          <div className="text-center">
            <p className="text-sm text-gray-600">
              {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={() => onModeChange(mode === 'login' ? 'signup' : 'login')}
                className="ml-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
