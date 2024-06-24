const Admin = require("../models/admin"); //schema
const jwt = require("jsonwebtoken");


// No need to call this function, offical admin is already created
exports.addAdmin = async (req, res) => {
    try {

        const {role, email, password} = req.body
        const signed = jwt.sign({email, password}, secretOrPrivateKey=process.env.JWT_SECRET)

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
        const token = req.cookies.internit;
        // const token = req.body.token
        const email = token?jwt.verify(token, process.env.JWT_SECRET).email:'';
        
        const user = await Admin.findOne({ email: email }).select('+password');
        console.log(user);
        
        if (!token || !user || token !== user.password) {
            return res.status(401).json({
                success: false,
                message: "Please login to access this Resource",
            })
        }

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

        // console.log("done");

        const admin = await Admin.findOne({ email: email }).select("+password");
        const token_db = jwt.verify(admin.password,process.env.JWT_SECRET)
        
        if (admin.email !== email || token_db.password !== password) {
            return res.status(401).json({
                success: false,
                message: "Invalid Enter Email or Password"
            })
        }

        // console.log("done");
        res.cookie("internit", admin.password, {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        });

        res.status(201).json({
            success: true,
            admin
        })

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