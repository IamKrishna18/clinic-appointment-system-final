import React, { useState } from 'react';

interface AppointmentBookingProps {
  hospital: { id: string; name: string };
  onClose: () => void;
}

const specialties = [
  { id: 's1', name: 'Cardiology' },
  { id: 's2', name: 'Dermatology' },
  { id: 's3', name: 'Pediatrics' },
  { id: 's4', name: 'Orthopedics' },
  { id: 's5', name: 'General Physician' },
];

const doctors = [
  { id: '662fb93c7a928a83f3b1f4d1', name: 'Dr. Priya Sharma', specialtyId: 's1', hospitalId: 'h1', availability: ['09:00', '10:00', '11:00'] },
  { id: '662fb93c7a928a83f3b1f4d2', name: 'Dr. Rahul Singh', specialtyId: 's2', hospitalId: 'h1', availability: ['14:00', '15:00', '16:00'] },
  { id: '662fb93c7a928a83f3b1f4d3', name: 'Dr. Anjali Gupta', specialtyId: 's3', hospitalId: 'h2', availability: ['09:30', '10:30', '11:30'] },
  { id: '662fb93c7a928a83f3b1f4d4', name: 'Dr. Vikram Reddy', specialtyId: 's4', hospitalId: 'h3', availability: ['13:00', '14:00', '15:00'] },
  { id: '662fb93c7a928a83f3b1f4d5', name: 'Dr. Neha Patel', specialtyId: 's5', hospitalId: 'h4', availability: ['10:00', '11:00', '12:00'] },
];

const AppointmentBooking: React.FC<AppointmentBookingProps> = ({ hospital, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState<any>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const filteredDoctors = doctors.filter(
    (doc) => doc.hospitalId === hospital.id && (!selectedSpecialty || doc.specialtyId === selectedSpecialty.id)
  );

  const getNext50Days = () => {
  return Array.from({ length: 50 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toISOString().split('T')[0];
  });
};

  const handleAppointmentSubmit = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientId: '662fb9368f8a9d2b7a5e1b9c',
          doctorId: selectedDoctor?.id,
          date: selectedDate,
          time: selectedTime,
          reason: `${selectedSpecialty?.name} consultation`,
        }),
      });

      const data = await res.json();
      console.log('📨 Appointment Response:', data);

      if (res.ok) {
        setConfirmed(true);
        setTimeout(onClose, 2000);
      } else {
        alert('❌ Failed to book appointment: ' + data?.error);
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('🚨 Something went wrong.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-cyan-50 to-blue-100 w-full h-full p-8 overflow-y-auto animate-fade-in-up font-sans rounded-lg shadow-xl">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-teal-700 mb-6">
          Booking for: <span className="text-emerald-600">{hospital.name}</span>
        </h2>

        {step === 1 && !confirmed && (
          <>
            <h3 className="mb-2 font-semibold text-lg">Choose a Specialty:</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {specialties.map((s) => (
                <button key={s.id} onClick={() => setSelectedSpecialty(s)} className={`p-3 rounded-lg border shadow-md font-medium ${selectedSpecialty?.id === s.id ? 'bg-cyan-200 border-teal-600' : 'bg-white hover:bg-cyan-50'}`}>{s.name}</button>
              ))}
            </div>
            <div className="mt-6 text-right">
              <button disabled={!selectedSpecialty} onClick={() => setStep(2)} className="px-6 py-3 bg-teal-600 text-white rounded-lg shadow-lg hover:bg-teal-700 transition disabled:opacity-40">Next</button>
            </div>
          </>
        )}

        {step === 2 && !confirmed && (
          <>
            <h3 className="mb-2 font-semibold text-lg">Choose a Doctor:</h3>
            <div className="space-y-3">
              {filteredDoctors.length ? filteredDoctors.map((d) => (
                <button key={d.id} onClick={() => setSelectedDoctor(d)} className={`w-full text-left p-3 rounded-lg border shadow-sm font-medium ${selectedDoctor?.id === d.id ? 'bg-cyan-200 border-teal-600' : 'bg-white hover:bg-cyan-50'}`}>{d.name}</button>
              )) : <p className="text-gray-600">No doctors available for this selection.</p>}
            </div>
            <div className="mt-6 flex justify-between">
              <button onClick={() => setStep(1)} className="text-gray-600 underline">← Back</button>
              <button disabled={!selectedDoctor} onClick={() => setStep(3)} className="px-6 py-3 bg-teal-600 text-white rounded-lg shadow-lg hover:bg-teal-700 transition disabled:opacity-40">Next</button>
            </div>
          </>
        )}

        {step === 3 && !confirmed && (
          <>
            <h3 className="mb-2 font-semibold text-lg">Choose Date & Time:</h3>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mb-4">
              {getNext50Days().map((date) => (
                <button key={date} onClick={() => setSelectedDate(date)} className={`p-2 rounded border text-sm font-medium ${selectedDate === date ? 'bg-cyan-200 border-teal-600' : 'bg-white hover:bg-cyan-50'}`}>{new Date(date).toLocaleDateString()}</button>
              ))}
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {selectedDoctor?.availability?.map((time: string) => (
                <button key={time} onClick={() => setSelectedTime(time)} className={`p-2 rounded border text-sm font-medium ${selectedTime === time ? 'bg-cyan-200 border-teal-600' : 'bg-white hover:bg-cyan-50'}`}>{time}</button>
              ))}
            </div>
            <div className="mt-6 flex justify-between">
              <button onClick={() => setStep(2)} className="text-gray-600 underline">← Back</button>
              <button disabled={!selectedDate || !selectedTime} onClick={() => setStep(4)} className="px-6 py-3 bg-teal-600 text-white rounded-lg shadow-lg hover:bg-teal-700 transition disabled:opacity-40">Next</button>
            </div>
          </>
        )}

        {step === 4 && !confirmed && (
          <>
            <h3 className="mb-4 font-semibold text-lg">Confirm Your Appointment</h3>
            <div className="space-y-2 text-gray-700 text-sm bg-white p-4 rounded-lg border shadow-sm">
              <p><strong>Hospital:</strong> {hospital.name}</p>
              <p><strong>Doctor:</strong> {selectedDoctor?.name}</p>
              <p><strong>Specialty:</strong> {selectedSpecialty?.name}</p>
              <p><strong>Date:</strong> {selectedDate}</p>
              <p><strong>Time:</strong> {selectedTime}</p>
            </div>
            <div className="mt-6 flex justify-between">
              <button onClick={() => setStep(3)} className="text-gray-600 underline">← Back</button>
              <button onClick={handleAppointmentSubmit} className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition">Confirm Booking</button>
            </div>
          </>
        )}

        {confirmed && (
          <div className="text-center mt-10">
            <h3 className="text-2xl font-bold text-green-700 mb-3">✅ Appointment Confirmed!</h3>
            <p className="text-gray-600">Your appointment has been booked. Closing shortly...</p>
          </div>
        )}

        <div className="mt-8 text-center">
          <button onClick={onClose} className="text-sm text-red-500 underline">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;
