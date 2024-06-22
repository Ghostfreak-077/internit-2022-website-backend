const Admin = require("../models/admin"); //schema
const jwt = require("jsonwebtoken");


// No need to call this function, offical admin is already created
exports.addAdmin = async (req, res) => {
    try {

        signed = jwt.sign(req.body.password, secretOrPrivateKey=process.env.JWT_TOKEN)
        const {role, email} = req.body

        const admin = await Admin.create({
            role,
            password : signed,
            email
        });
        // sendToken(admin, 201, res)

        res.status(201).json({
            success: true,
            admin
        });

    } catch (err) {
        res.send(err.message)
    }
}

exports.isAuthenticatedUser = async (req, res, next) => {
    try {
        // const { internit } = req.cookies;
        const internit = req.body.token
        console.log(internit);
        
        if (!internit) {
            return res.status(401).json({
                success: false,
                message: "Please login to access this Resource",
            })
        }
        
        const decodedData = jwt.verify(internit, process.env.JWT_SECRET);
        req.user = await Admin.findById(decodedData.id);
        next();

    } catch (err) {
        res.send(err.message);
    }
}


//login
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        //checkng if user has entered both email and password
        if (!email || !password) {
            return res.status(500).json({
                success: false,
                message: "Please Enter Email and Password"
            })
        }

        console.log("done");

        const admin = await Admin.findOne({ role: "admin" }).select("+password");

        const token = jwt.sign(password,process.env.JWT_TOKEN)

        if (admin.email !== email || token !== admin.password) {
            return res.status(401).json({
                success: false,
                message: "Invalid Enter Email or Password"
            })
        }

        console.log("done");

        res.status(201).json(admin)

    } catch (err) {
        res.send(err.message);
    }

}

//logout user
exports.logout = async (req, res, next) => {
    try {
        res.cookie("internit", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });
        res.status(200).json({
            success: true,
            message: "Logged Out",
        });

    } catch (err) {
        res.send(err.message);
    }

}


sendToken = (user, ststusCode, res) => {
    const token = user.getJWTToken();

    //options for cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
        ),
        httpOnly: true,
    }

    res.status(ststusCode).cookie("internit",token,options).json({
        success: true,
        user,
        token,
    })
}