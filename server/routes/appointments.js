const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Create new appointment
router.post('/', async (req, res) => {
  try {
    const { patientId, doctorId, date, time, reason } = req.body;

    const appointment = new Appointment({
      patient: patientId,
      doctor: doctorId,
      date: new Date(`${date}T${time}`),  // Combine date & time into one Date object
      reason,
    });

    await appointment.save();
    res.status(201).json({ message: 'Appointment created', apptId: appointment._id });
  } catch (err) {
    console.error('❌ Appointment save error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Get all appointments
router.get('/', async (req, res) => {
  const appts = await Appointment.find().populate('patient doctor', 'name email');
  res.json(appts);
});

// Get a single appointment
router.get('/:id', async (req, res) => {
  const appt = await Appointment.findById(req.params.id).populate('patient doctor', 'name email');
  if (!appt) return res.status(404).json({ error: 'Not found' });
  res.json(appt);
});

// Update appointment status, date, etc.
router.put('/:id', async (req, res) => {
  const appt = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!appt) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Updated', appt });
});

// Cancel/delete
router.delete('/:id', async (req, res) => {
  await Appointment.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
