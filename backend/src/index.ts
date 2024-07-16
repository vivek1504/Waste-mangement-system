import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { adminHandler } from "./routes/adminRoutes";
import { userHandler } from "./routes/userRoutes";
import { cleanerHandler } from "./routes/cleanerRoutes";
import mime from 'mime-types'
import { v2 as cloudinary } from 'cloudinary';

const app = express();
app.use(express.json());
app.use(cors());

app.use("/user", userHandler);
app.use("/cleaner", cleanerHandler);
app.use("/admin", adminHandler);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'dist/uploads/');
    },
    filename: (req, file, cb) => {
      const ext = mime.extension(file.mimetype);
      cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
    },
  });
  
  const upload = multer({ storage: storage });
  
  app.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
  
    const fileLocation = path.join(__dirname, "uploads", req.file.filename);
    const upload = (async function() {
        cloudinary.config({ 
            cloud_name: 'dj7gqjguy', 
            api_key: '364846129256229', 
            api_secret: '7vYGQuB57AVGM_LHZ3t-r5GbiyA'
        });
        
         const uploadResult = await cloudinary.uploader.upload(fileLocation)
         .then(uploadResult => {
            console.log('Upload Result:', uploadResult.url);
            res.status(200).json({url: uploadResult.url});

         })
         .catch(error => {
            console.error('Upload Error:', error);
            res.status(500).json({message: 'Error uploading file'});
         });   
    })();
  });

  const api_key = "6257fd3e07dd4faeb12b794a326ef911";


  app.get("/address", async (req, res) => {
    const { lat, lon } = req.body;
    const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=6257fd3e07dd4faeb12b794a326ef911 `;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  })


app.listen(3000, () => {
  console.log("listening on port 3000");
});