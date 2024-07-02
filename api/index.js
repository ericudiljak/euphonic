import express from "express";
const app = express();
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import likeRoutes from "./routes/likes.js";
import relationshipRoute from "./routes/relationships.js";
import commentRoutes from "./routes/comments.js";
import cors from "cors";
import multer from "multer";
import cookieParser from "cookie-parser";
import { verifyToken, verifyRole } from "./controllers/auth.js";
import uploadRouter from "./routes/upload.js";
import { db } from "./connect.js";

//middlewares
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
}));
app.use(cookieParser());

app.use("/api/upload", uploadRouter);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/upload');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
});

app.use("/api/users", verifyToken, verifyRole(['registered', 'admin', 'artist']), userRoutes);
app.use("/api/posts", verifyToken, verifyRole(['registered', 'admin', 'artist']), postRoutes);
app.use("/api/comments", verifyToken, verifyRole(['registered', 'admin', 'artist']), commentRoutes);
app.use("/api/likes", verifyToken, verifyRole(['registered', 'admin', 'artist']), likeRoutes);
app.use("/api/relationships", verifyToken, verifyRole(['registered', 'admin', 'artist']), relationshipRoute);
app.use("/api/auth", authRoutes);

app.get("/api/admin", verifyToken, verifyRole(['admin']), (req, res) => {
    res.send("Admin content");
});

app.get('/api/users', (req, res) => {
    const query = 'SELECT * FROM users'; // SQL upit za dohvat svih korisnika

    // Izvršavanje SQL upita
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            res.status(500).json({ error: 'Error fetching users' });
            return;
        }

        // Uspješan odgovor s podacima korisnika
        res.json(results);
    });
});

app.listen(8800, () => {
    console.log("API working!")
});
