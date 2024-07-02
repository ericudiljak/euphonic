import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res)=>{
    
    //CHECK USER IF EXISTS

    const q = "SELECT * FROM users WHERE username = ?"

    db.query(q, [req.body.username], (err, data)=>{
        if(err) return res.status(500).json(err)
        if(data.length) return res.status(409).json("User already exists!")

    //CREATE A NEW USER
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt)

    const q = "INSERT INTO users (`username`, `email`, `password`, `name`, `role`) VALUES (?)"

    const values = [req.body.username, req.body.email, hashedPassword, req.body.name, 'registered']

    db.query(q, [values], (err,data)=>{
        if(err) return res.status(500).json(err)
            return res.status(200).json("User has been created!");
    })

})
}


export const login = (req, res)=>{

    const q = "SELECT * FROM users WHERE username = ?"

    db.query(q, [req.body.username], (err,data)=>{
        if(err) return res.status(500).json(err);
        if(data.length === 0 ) return res.status(404).json("User not found! ");

        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password)

        if(!checkPassword) return res.status(400).json("Wrong password or username!")

        const token = jwt.sign({id:data[0].id, role: data[0].role}, "secretkey");

        const {password, ...others} = data[0]

        res.cookie("accessToken", token, {
            httpOnly : true,
        }).status(200).json(others)
    })

}



export const logout = (req, res)=>{

    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json("User has been logged out.")
    
}

export const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        req.user = userInfo;
        next();
    });
};

export const verifyRole = (allowedRoles) => {
    return (req, res, next) => {
        const token = req.cookies.accessToken;
        if (!token) return res.status(401).json("Not authenticated!");

        jwt.verify(token, "secretkey", (err, userInfo) => {
            if (err) return res.status(403).json("Token is not valid!");

            if (!allowedRoles.includes(userInfo.role)) {
                return res.status(403).json("You are not allowed to access this resource!");
            }

            req.user = userInfo;
            next();
        });
    };
};
