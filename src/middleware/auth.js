const jwt = require("jsonwebtoken");
const Users = require('../models/user')

const auth = async function(req, res, next){

    try{
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'thisismynodecourse');
    
        const user = await Users.findOne({_id: decoded._id, 'tokens.token': token})

        if(!user){
            throw new Error();
        }

        req.token = token
        req.user = user
        next();
    } catch (e){
          res.status('401').send({error: 'Please authenticate'})
    }
}


module.exports = auth