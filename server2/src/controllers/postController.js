const getAllPost = async (req, res) =>{
    console.log(req._id);
    try {
        return res.json({
            msg: 'getting all the post'
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = getAllPost;