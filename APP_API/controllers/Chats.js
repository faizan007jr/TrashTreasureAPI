const mongoose = require('mongoose');
const Chats = mongoose.model('Chats');

const sendMessage = (req, res) => {
    let sender = req.session.user;
    let receiver = req.body.receiverid;
    let msg = req.body.message;

    if(!sender) {
        res
            .status(404)
            .json({ "message" : "Not found, Sender ID is required" });
        return;
    }
    Chats
        .create({
            sender: sender,
            receiver: receiver,
            message: msg
        }, (err, msgData) => {
            if(err) {
                res
                    .status(400)
                    .json(err);
                return;
            }
            res
                .status(200)
                .json(msgData);
        });
};

const getMessages = (req, res) => {
    let sender = req.session.user;
    let receiver = req.body.receiverid;

    if(!sender) {
        res
            .status(404)
            .json({ "message" : "Not found, Sender ID is required" });
        return;
    }
    Chats
        .find({ sender: sender, receiver: receiver })
        .exec((err, chatData) => {
            if(err) {
                res
                    .status(400)
                    .json(err);
                return;
            }
            res
                .status(200)
                .json(chatData);
        });
};

module.exports = {
    sendMessage,
    getMessages
};