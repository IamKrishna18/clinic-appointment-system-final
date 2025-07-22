import React, { useState } from 'react';
import AppointmentBooking from './AppointmentBooking.tsx'; // make sure the path is correct

const hospitals = [
  { id: 'h1', name: 'Apollo Hospitals, Delhi' },
  { id: 'h2', name: 'Fortis Hospital, Mumbai' },
  { id: 'h3', name: 'Manipal Hospitals, Bangalore' },
  { id: 'h4', name: 'Max Healthcare, Chennai' },
];

const HospitalPartners = () => {
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [showBooking, setShowBooking] = useState(false);

  const handleBook = async (hospital) => {
    try {
      // API call to /hospitals
      const response = await fetch('http://localhost:5000/hospitals', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(hospital),
});


      if (!response.ok) {
        throw new Error('Failed to notify server');
      }

      const data = await response.json();
      console.log('Server response:', data);

      // Proceed to show the booking modal
      setSelectedHospital(hospital);
      setShowBooking(true);
    } catch (error) {
      console.error('API Error:', error.message);
      alert('Failed to connect to the hospital service. Try again later.');
    }
  };

  const handleClose = () => {
    setShowBooking(false);
    setSelectedHospital(null);
  };

  return (
    <div className="p-6" id='hospitals'>
      <h1 className="text-3xl font-bold mb-6">Our Hospital Partners</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hospitals.map((hospital) => (
          <div key={hospital.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{hospital.name}</h2>
            <button
              onClick={() => handleBook(hospital)}
              className="mt-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>

      {showBooking && selectedHospital && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg w-full max-w-4xl p-4">
            <AppointmentBooking
              hospital={selectedHospital}
              onClose={handleClose}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalPartners;
