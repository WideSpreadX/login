const mongoose = require('mongoose');


const CompanySchema = new mongoose.Schema({
    companyOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    company_name: String,
    company_bio: String,
    company_street_1: String,
    company_street_2: String,
    company_suite_number: String,
    company_city: String,
    company_state: String,
    company_zip: String,
    company_country: String,
    company_type: String,
    company_phone: String,
    company_fax: String,
    company_main_email: String

});

const Company = mongoose.model('Company', CompanySchema);

module.exports = Company;