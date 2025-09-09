import express from 'express';
import dotenv from 'dotenv';
import connectToDB from './src/config/db.js';
import productRoute from './src/routes/porductRoute.js';

dotenv.config();

const app = express();
app.use(express.json());

connectToDB(); 

app.use('/product', productRoute);

app.get('/', (_req, res) => {
    res.send('Hello from Express!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
