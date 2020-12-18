const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    type: String,
    url: String,
    created_at: String,
    company: String,
    company_url: String,
    location: String,
    title: String,
    description: String,
    is_verification_required: Boolean
});
const model=mongoose.model('job', jobSchema);

module.exports=model;