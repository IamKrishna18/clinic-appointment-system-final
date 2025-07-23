
import { Heart, Brain, Eye, Baby, Bone, Stethoscope } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const services = [
  {
    icon: Heart,
    title: 'Cardiology',
    description: 'Complete heart care with advanced diagnostics and treatments',
    color: 'bg-red-100 text-red-600',
    specialists: '150+ Specialists'
  },
  {
    icon: Brain,
    title: 'Neurology',
    description: 'Expert neurological care for brain and nervous system disorders',
    color: 'bg-purple-100 text-purple-600',
    specialists: '120+ Specialists'
  },
  {
    icon: Eye,
    title: 'Ophthalmology',
    description: 'Comprehensive eye care and vision correction services',
    color: 'bg-blue-100 text-blue-600',
    specialists: '80+ Specialists'
  },
  {
    icon: Baby,
    title: 'Pediatrics',
    description: 'Specialized healthcare for infants, children, and adolescents',
    color: 'bg-pink-100 text-pink-600',
    specialists: '100+ Specialists'
  },
  {
    icon: Bone,
    title: 'Orthopedics',
    description: 'Bone, joint, and musculoskeletal system treatments',
    color: 'bg-green-100 text-green-600',
    specialists: '90+ Specialists'
  },
  {
    icon: Stethoscope,
    title: 'General Medicine',
    description: 'Primary healthcare and preventive medicine services',
    color: 'bg-yellow-100 text-yellow-600',
    specialists: '200+ Specialists'
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Medical Specialties</h2>
          <p className="text-lg text-gray-600">Expert care across all medical disciplines</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 shadow-md group"
            >
              <CardHeader className="text-center">
                <div className={`w-16 h-16 rounded-full ${service.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <service.icon className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl text-gray-800">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-gray-600">{service.description}</p>
                <div className="text-sm text-blue-600 font-medium">{service.specialists}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
