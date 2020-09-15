const Joi = require("joi")
function validateChar(user) {
    const schema = {
        id: Joi.number(),
        name: Joi.string().min(3).required(),
        created_date: Joi.string(),
        number: Joi.number().min(10).required(),
        incoming_call_count: Joi.number().required(),
        location: Joi.string().min(5).required(),
        outgoing_call_count: Joi.number().required()
    }
    return Joi.validate(user, schema)
}

function validateupdateChar(userdata) {
    const schema = {
        name: Joi.string().min(3),
        number: Joi.number().min(10),
        incoming_call_count: Joi.number(),
        location: Joi.string().min(5),
        outgoing_call_count: Joi.number()
    }
    return Joi.validate(userdata, schema)
}
module.exports = { validateupdateChar, validateChar }