import express from "express"
import cors from "cors"
import { adminHandler } from "./routes/adminRoutes";
import { userHandler } from "./routes/userRoutes";
import { cleanerHandler } from "./routes/cleanerRoutes";
import multer from "multer";
import path from 'path'

const app = express()
app.use(express.json());
app.use(cors());

app.use("/user",userHandler);
app.use("/cleaner",cleanerHandler);
app.use("/admin",adminHandler);

const upload = multer({ dest: 'uploads/' })

app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
  
    // Simulate file location
    const fileLocation = path.join(__dirname, 'uploads', req.file.filename);
  
    res.json({ location: fileLocation });
  });
  

app.listen(3000,()=>{
    console.log("listening on port 3000");
})