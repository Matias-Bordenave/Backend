

const express = require('express');
const app = express();
const ProductManager = require('./productManager');

const productManager = new ProductManager('./productos.json');


app.get('/', (req, res) => {
    if (req.query.limit) {
        let prod_array = []
        let i = 1
        while (i <= parseInt(req.query.limit)) {
            prod_array.push(cart.getProductById(i))
            i++
        }
        res.json(prod_array)
    } else {
        res.json(cart.getProducts())
    }
})

// Endpoint para obtener todos los productos
app.get('/products', async (req, res) => {
    try {
        const products = await productManager.getAllProducts();
        res.json(products);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al obtener los productos');
    }
});

// Endpoint para obtener un producto por ID
app.get('/products/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await productManager.getProductById(productId);
        if (typeof product === 'string') {
            res.status(404).send(product);
        } else {
            res.json(product);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(`Error al obtener el producto con ID: ${productId}`);
    }
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});