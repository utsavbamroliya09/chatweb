const loginModel = require("../model/login.model");
const signModel = require("../model/sign.model");


exports.createloginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existUser = await signModel.findOne({ email })
        if (!existUser) {
            res.status(400).json({
                success: false,
                data: null,
                message: "User not found"
            })
        }
        // const newUser = await loginModel.create({
        //     UserId: existUser._id,
        //     name : existUser.name,
        //     email: existUser.email,
        //     password
        // });
        // const loginUser = {
        //     ...newUser.toObject(),
        //     CreatedAt: new Date().toLocaleDateString(),
        //     CreatedTime: new Date().toLocaleTimeString()
        // }
        res.status(200).json({
            success: true,
            data: {
                _id: existUser._id,
                name: existUser.name,
                email: existUser.email
            },
            message: "User created successfully"
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            data: null,
            message: error.message || "Internal server error"
        })
    }
}

exports.fetchUser = async (req, res) => {
    try {
        const user = await signModel.find()
        res.status(200).json({
            success: true,
            data: user,
            message: "User fetch successfully"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            data: null,
            message: error.message || "Internal server error"
        })
    }
}