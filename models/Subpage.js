const mongoose = require('mongoose');


const subPageSchema = new mongoose.Schema({
    company_site: { type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
    page_name: String,
    page_body: {
        page_header1: String,
        page_body1: String,
        page_header2: String,
        page_body2: String,
        page_header3: String,
        page_body3: String
    },
    page_side: {
        phone1: String,
        phone2: String,
        phone3: String,
        email1: String,
        email2: String,
        email3: String,
        email4: String,
        fax1: String,
        fax2: String
    },
    page_background: String,
    page_slideshow: [String]
});

const Subpage = mongoose.model('Subpage', subPageSchema);

module.exports = Subpage;