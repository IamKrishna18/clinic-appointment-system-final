import { Clock, MapPin, Shield } from "lucide-react";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const About: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-white" id="about">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose MediCare Connect?</h2>
          <p className="text-lg text-gray-600">Experience healthcare booking like never before</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Clock,
              title: "Instant Booking",
              description: "Book appointments in seconds with real-time availability",
              color: "bg-blue-100 text-blue-600",
            },
            {
              icon: Shield,
              title: "Secure & Private",
              description: "Your medical data is protected with bank-level security",
              color: "bg-green-100 text-green-600",
            },
            {
              icon: MapPin,
              title: "Pan-India Network",
              description: "Access to top hospitals across all major Indian cities",
              color: "bg-purple-100 text-purple-600",
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className="hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 shadow-md"
            >
              <CardHeader className="text-center">
                <div
                  className={`w-16 h-16 rounded-full ${feature.color} flex items-center justify-center mx-auto mb-4`}
                >
                  <feature.icon className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl text-gray-800">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
