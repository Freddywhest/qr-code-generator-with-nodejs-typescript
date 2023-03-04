import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import validateInput from './controllers/validateInput';
import { reqBody } from './@types/reqBody';
import easyQr from 'easyqrcodejs-nodejs';

const app: Application = express();
app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const PORT: number = 10001;

app.get('/', (req: Request, res: Response) => {
    res.render('index', { title: "Home Page" });
});

app.post('/generate', validateInput, async (req: Request, res: Response) => {
    const {url, size }: reqBody = req.body;
    let options = {
        text: url,
        width: parseInt(size),
        height: parseInt(size),
        colorDark : "#000000",
        colorLight : "#ffffff",
    };
    const qrcode: easyQr = new easyQr(options);
    const qrcodeUrl = await qrcode.toDataURL();

    res.status(200).send({ status: true, data: qrcodeUrl });
    
});

app.listen(PORT, (): void => {
    console.log( `App running on port: ${PORT} \nhttp://localhost:${PORT} \nOR \nhttp://127.0.0.1:${PORT}`);
});