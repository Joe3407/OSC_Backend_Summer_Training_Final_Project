import "dotenv/config";
import express from "express";
import {connectDB} from "./config/db";
import myRouter from "./routes/routes";
import swaggerUi from "swagger-ui-express";
import {specs} from "./config/swaggerdoc"

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(myRouter);
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(specs));

connectDB().then(()=>{
    app.listen(port,()=>console.log(`Server is listening on ${port}`));

}).catch((error)=>{
    console.log("Couldn't Connect to DB");
    console.log(error);
})