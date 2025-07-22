
import { Calendar, MapPin, Search, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeroSectionProps {
  onBookAppointment: () => void;
}

const HeroSection = ({ onBookAppointment }: HeroSectionProps) => {
  return (
    <section className="relative py-20 px-4 overflow-hidden" id='home'>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-green-600/10"></div>
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="max-w-6xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 leading-tight">
                Your Health,{' '}
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Our Priority
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                Connect with India's top doctors and hospitals. Book appointments instantly, 
                manage your health records, and get expert medical care when you need it.
              </p>
            </div>

            {/* Quick Search */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-blue-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input 
                    placeholder="Search doctors, hospitals..."
                    className="pl-10 border-gray-200 focus:border-blue-500"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input 
                    placeholder="Select location"
                    className="pl-10 border-gray-200 focus:border-blue-500"
                  />
                </div>
                <Button 
  onClick={() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user) {
      // Show login modal
      const loginModalEvent = new CustomEvent('open-login-modal');
      window.dispatchEvent(loginModalEvent);
    } else {
      onBookAppointment(); // Proceed to booking
    }
  }}
  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 h-11"
>
  <Calendar className="h-4 w-4 mr-2" />
  Book Now
</Button>

              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                <span className="text-gray-600">4.8/5 Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-green-500 border-2 border-white"
                    ></div>
                  ))}
                </div>
                <span className="text-gray-600">10K+ Happy Patients</span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative animate-scale-in">
            <div className="relative bg-gradient-to-br from-blue-100 to-green-100 rounded-3xl p-8 shadow-2xl">
              <div className="space-y-6">
                {/* Mock Dashboard Cards */}
                <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Next Appointment</h3>
                      <p className="text-sm text-gray-600">Dr. Sharma - Tomorrow 10:00 AM</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Apollo Hospital</h3>
                      <p className="text-sm text-gray-600">Delhi - 2.5 km away</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Star className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Health Score</h3>
                      <p className="text-sm text-gray-600">85/100 - Excellent</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
