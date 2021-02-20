const mongoose = require('mongoose');


const AppointmentSchema = new mongoose.Schema({
    appointment_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    appointment_for: { type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
    appointment_given_to: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    reason: String,
    notes_before: String,
    notes_after: String,
    scheduled_for: Date,
    createdAt: {
        type: Date,
        default: Date.now()
    }

});

const Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = Appointment;