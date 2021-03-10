const mongoose = require('mongoose');


const EventSchema = new mongoose.Schema({
    name: String,
    description: String,
    invitation_body: String,
    event_notes: [String],
    category: String,
    private: Boolean,
    host: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    admins: [{
        admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        role: String
    }],
    schedule: {
        start: {
            time: String,
            day: Date,
        },
        end: {
            time: String,
            day: Date,
        },
        raindate: {
            start: {
                time: String,
                day: Date,
            },
            end: {
                time: String,
                day: Date,
            }
        }
    },
    invited: [{
        person: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    }],
    attending: [{
        person: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        guests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    }],
    location: {
        unit: String,
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String,
        building_type: String,
        indoor: Boolean,
        handicap_accessible: Boolean,
        virtual: {
            is_virtual: Boolean,
            link: String,
        },
    },
    colors: {
        main: String,
        accent: String
    },
    images: {
        background: String,
        album: [{
            name: String,
            description: String,
            images: [{
                image: String,
                description: String
            }]
        }]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;