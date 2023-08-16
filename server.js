const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const QRCode = require('qrcode');

const app = express();
const port = 5500;

app.use(cors());
app.use(bodyParser.json());

const products = [
    { id: 1, name: '상품1', price: 10000 },
    { id: 2, name: '상품2', price: 20000 },
    // ...
];

app.get('/api/products/:productId', (req, res) => {
    const productId = parseInt(req.params.productId);
    const product = products.find(p => p.id === productId);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
});

app.post('/api/generateQRCode', async (req, res) => {
    const checkoutInfo = req.body;

    const qrCodeData = JSON.stringify(checkoutInfo);

    try {
        const qrCode = await QRCode.toDataURL(qrCodeData);
        res.json({ qrCode });
    } catch (error) {
        console.error('QR 코드 생성 에러:', error);
        res.status(500).json({ error: 'QR 코드 생성 중 오류가 발생했습니다.' });
    }
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});