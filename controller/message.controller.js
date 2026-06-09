const messageModel = require("../model/message.model")

exports.sendMessage = async (req, res) => {
    try {
        const { senderId, reciverId, message } = req.body
        const newMessage = await messageModel.create({
            senderId,
            reciverId,
            message
        })
        const messagedata = {
            ...newMessage.toObject(),
            Data: new Date().toLocaleDateString(),
            Time: new Date().toLocaleTimeString()
        }
        res.status(201).json({
            success: true,
            data: messagedata,
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            data: null,
            message: error.message || "Internal server error"
        })
    }
}


exports.getMessage = async (req, res) => {
    try {
        const { senderId, receiverId } = req.params;

        const messages = await messageModel.find({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId }
            ]
        }).sort({ createdAt: 1 });

        return res.status(200).json({
            success: true,
            data: {
                 messages,
                Time: new Date().toLocaleDateString()
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false });
    }
};
