const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

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

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
