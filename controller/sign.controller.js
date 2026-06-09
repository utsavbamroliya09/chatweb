const signModel = require("../model/sign.model");

exports.createsignUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = await signModel.create({
            name,
            email,
            password
        });
        const signUser = {
            ...newUser.toObject(),
            CreatedAt: new Date().toLocaleDateString(),
            CreatedTime: new Date().toLocaleTimeString()
        }
        res.status(201).json({
            success: true,
            data: signUser,
            message: "User created successfully"
        })

    } catch (error) {
        res.status(400).json({
            success : false,
            data : null,
            message : error.message || "Internal server error"
        })
    }
}