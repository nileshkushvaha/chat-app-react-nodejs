const User = require("../models/userModel")
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const checkUsername = await User.findOne({ username })
        if (checkUsername) {
            return res.json({ msg: "Username already exist.", status: false });
        }
        const checkEmail = await User.findOne({ email })
        if (checkEmail) {
            return res.json({ msg: "Username already exist.", status: false });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = await User.create({
            username,
            email,
            password: hashedPassword
        });
        delete userData.password;
        return res.status(201).json({ status: true, userData })
    } catch (error) {
        next(error);
    }

}

module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.json({ msg: "Incorrect username or password.", status: false });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.json({ msg: "Invalid username or password.", status: false });
        }
        delete user.password;
        return res.status(200).json({ status: true, user })
    } catch (error) {
        next(error);
    }

}

module.exports.setAvatar = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const user = await User.findByIdAndUpdate({ _id: userId }, {
            isAvatarImageSet: true,
            avatarImage: avatarImage
        },
            {
                new: true
            });
        return res.json({
            isSet: user.isAvatarImageSet,
            image: user.avatarImage
        });
    } catch (error) {
        next(error);
    }
}

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({ _id: { $ne: req.params.id } }).select([
            "email", "username", "avatarImage", "_id"
        ]);
        return res.json(users)
    } catch (error) {
        next(error);
    }

}