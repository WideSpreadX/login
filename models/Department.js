const mongoose = require('mongoose');


const departmentSchema = new mongoose.Schema({
    in_company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
    name: String,
    tools: [{
        tool: { type: mongoose.Schema.Types.ObjectId, ref: 'Item'},
        number: String,
    }],
    crews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Crew'}],
    vehicles: [{
        vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Item'},
        number: String,
        license_plate: String,
        vin: String,
        driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    }],
    trailers: [{
        trailer: { type: mongoose.Schema.Types.ObjectId, ref: 'Item'},
        number: String,
        license_plate: String,
        for_driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    }],
    schedule: [ {
        sunday: [{
            client: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            work: String,
            time_start: {
                type: Date,
                default: Date.now()
            },
            
            time_end: {
                type: Date,
                default: Date.now()
            },
            notes: String

        }],
        monday: [{
            client: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            work: String,
            time_start: {
                type: Date,
                default: Date.now()
            },
            
            time_end: {
                type: Date,
                default: Date.now()
            },
            notes: String

        }],
        tuesday: [{
            client: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            work: String,
            time_start: {
                type: Date,
                default: Date.now()
            },
            
            time_end: {
                type: Date,
                default: Date.now()
            },
            notes: String

        }],
        wednesday: [{
            client: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            work: String,
            time_start: {
                type: Date,
                default: Date.now()
            },
            
            time_end: {
                type: Date,
                default: Date.now()
            },
            notes: String

        }],
        thursday: [{
            client: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            work: String,
            time_start: {
                type: Date,
                default: Date.now()
            },
            
            time_end: {
                type: Date,
                default: Date.now()
            },
            notes: String

        }],
        friday: [{
            client: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            work: String,
            time_start: {
                type: Date,
                default: Date.now()
            },
            
            time_end: {
                type: Date,
                default: Date.now()
            },
            notes: String

        }],
        saturday: [{
            client: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            work: String,
            time_start: {
                type: Date,
                default: Date.now()
            },
            
            time_end: {
                type: Date,
                default: Date.now()
            },
            notes: String

        }],

    }
    ],
    manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    employees: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    department_color: String,
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;