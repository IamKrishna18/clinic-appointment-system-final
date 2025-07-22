
import { useState } from 'react';
import { Calendar, Clock, MapPin, Star, Users, Heart, Shield, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import HospitalPartners from '@/components/HospitalPartners';
import ServicesSection from '@/components/ServicesSection';
import AuthModal from '@/components/AuthModal';
import Footer from '@/components/Footer';
import About from '@/components/About';


const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [user, setUser] = useState(() => {
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
});
const handleLogout = () => {
  localStorage.removeItem('user');
  setUser(null);
};



  const openAuthModal = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navbar 
  onLogin={() => openAuthModal('login')} 
  onSignup={() => openAuthModal('signup')} 
  onLogout={() => {
    setUser(null);
    localStorage.removeItem('user');
  }}
  user={user}
/>


      
      <main className="relative">
        <HeroSection onBookAppointment={() => openAuthModal('signup')} />
        
        {/* Quick Stats Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { icon: Users, number: '500+', label: 'Expert Doctors', color: 'text-blue-600' },
                { icon: Heart, number: '50+', label: 'Partner Hospitals', color: 'text-red-500' },
                { icon: Calendar, number: '10K+', label: 'Appointments', color: 'text-green-600' },
                { icon: Award, number: '98%', label: 'Patient Satisfaction', color: 'text-purple-600' },
              ].map((stat, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 shadow-md">
                  <CardContent className="pt-6">
                    <stat.icon className={`h-12 w-12 mx-auto mb-4 ${stat.color}`} />
                    <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <HospitalPartners />
        <ServicesSection />

      <About/>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-green-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Book Your Appointment?</h2>
            <p className="text-xl text-blue-100 mb-8">Join thousands of patients who trust MediCare Connect</p>
            <Button 
              onClick={() => openAuthModal('signup')}
              className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
            >
              Get Started Today
            </Button>
          </div>
        </section>
      </main>

      <AuthModal 
  isOpen={isAuthModalOpen}
  onClose={() => setIsAuthModalOpen(false)}
  mode={authMode}
  onModeChange={setAuthMode}
  onLoginSuccess={(user) => setUser(user)} // ✅ this line enables login tracking
/>

<Footer></Footer>

    </div>
  );
};

export default Index;
