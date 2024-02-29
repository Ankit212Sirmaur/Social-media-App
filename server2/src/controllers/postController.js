const { success, error } = require("../utils/responseWrapper");

const getAllPost = async (req, res) =>{
    console.log(req._id);
    try {
        return res.send(success('getting all the post', 200));
    } catch (e) {
        console.log(e);
        return res.send(error('something wrong', 500));
    }
}

module.exports = getAllPost;