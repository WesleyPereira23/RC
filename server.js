const express = require('express');
const app = express();
app.use(express.json());

const port = 4200;
const products = [];
let nextId = 1;

app.get('/', (req, res) => {
    res.send('Bem vindo à loja de móveis!');
});

app.get('/products', (req, res) => {
    res.status(200).send(products);
});

app.post('/products', (req, res) => {
    const product = {
        id: nextId++,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
    };
    products.push(product);
    res.status(201).send(product);
});

app.put('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    if (!product) {
        return res.status(404).send('Produto não encontrado');
    }
    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    res.status(200).send(product);
});

app.delete('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
        return res.status(404).send('Produto não encontrado');
    }
    products.splice(index, 1);
    res.status(204).send();
});

app.patch('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    if (!product) {
        return res.status(404).send('Produto não encontrado');
    }
    if (req.body.name) {
        product.name = req.body.name;
    }
    if (req.body.description) {
        product.description = req.body.description;
    }
    if (req.body.price) {
        product.price = req.body.price;
    }
    if (req.body.category) {
        product.category = req.body.category;
    }
    res.status(200).send(product);
});

app.options('/products', (req, res) => {
    res.setHeader('Allow', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.status(200).send();
});

app.head('/products', (req, res) => {
    res.setHeader('X-Total-Count', products.length);
    res.status(200).send();
});

app.listen(port, () => {
    console.log(`Servidor executando na porta ${port}`);
});