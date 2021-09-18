const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/database');
const User = db.User;

module.exports = {
    authenticate,
    getAllUsers,
    getById,
    addUser,
    registerCourse

}

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }

}

async function getAllUsers() {
    //Returning the result of the promise. In the next homework we will make sure no passwords are sent back to the user.
    return await User.find().select('-hash');
}



async function getById(id) {
    return await User.findOne({_id:id});
}

async function registerCourse(req){
    //TODO: Do not allow students to register more than five course.
    //TODO: On the angular side you will need to hide the 'add' button from the professors, however, you should still block them from adding courses here as well.
    if(req.user.role === "Professor"){
        throw "Professor cannot register classes";
    }
    let user = await getById(req.user.sub);
    if(user.courses.length === 5) {
        throw "course registration limit reached";
    }
    if(user.courses.includes(req.body.courseid)){
        throw "Already Added";
    }
    user.courses.push(req.body.courseid);
    return await User.updateOne({_id:req.user.sub}, {$set: {"courses": user.courses}});
}

async function addUser(userParam) {

    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }
    else  if (await User.findOne({ email: userParam.email })) {
        throw 'Email "' + userParam.email + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();

}

