import { db } from "../connect.js";
import jwt from "jsonwebtoken";


export const getUser = (req, res)=>{
    const userId = req.params.userId;
    const q = "SELECT * FROM users WHERE id=?"

    db.query(q, [userId], (err,data)=>{
        if(err) return res.status(500).json(err)
        const { password, ...info} = data[0];
        return res.json(info);
    })
}

export const updateUsers = (req, res)=>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "secretkey", (err, userInfo)=>{
        if(err) return res.status(403).json("Token is not valid!");

        const q = "SELECT * FROM users WHERE id=?";
        db.query(q, [userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            const userRole = data[0].role;

            if (userRole !== 'admin' && userInfo.id !== parseInt(req.params.userId)) {
                return res.status(403).json("You can update only your profile");
            }
    
        const q = "UPDATE users SET `name`=?, `city`=?, `website`=?, `profilePic`=?, `coverPic`=? WHERE id=?";

        db.query(q, [
            req.body.name,
            req.body.city,
            req.body.website,
            req.body.coverPic,
            req.body.profilePic,
            userInfo.id
        ], (err,data)=>{
            if(err) res.status(500).json(err)
            if(data.affectedRows > 0) return res.json("Updated!")
            return res.status(403).json("You can update only your profile")
        });

        })
    })
}

export const deleteUser = (req, res) => {
  const userId = req.params.userId;

  const query = "DELETE FROM users WHERE id = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error deleting user:", err);
      return res.status(500).json({ message: "Error deleting user", error: err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  });
};

export const updateUser = (req, res)=>{
  const token = req.cookies.access_token
  if(!token) return res.status(401).json("Not authentificated!")

 jwt.verify(token,"secretkey", (err, userInfo)=>{
      if(err) return res.status(403).json("Invalid token!")
  const userIdToEdit = req.params.id;

    const q = "UPDATE users SET `username`=?, `email`=?, `role`=?, `userId`=? WHERE id=?";

    const values = [
      req.body.username,
      req.body.email,
      req.body.role,
    ]

    db.query(q,[...values,[userIdToEdit]],(err,data)=>{
        if(err) return res.status(500).json(err)

        return res.json("User updated!");
    })
 })
}