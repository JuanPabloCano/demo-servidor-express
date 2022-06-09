const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, (error) => {
    if (error) {
        console.log(`Hubo un error: ${error}`);
    } else {
        console.log('Servidor iniciado en el puerto', port);
    }
})

const fs = require('fs');
const data = require('./Products.json')

class Contenedor {

    getAll() {
        app.get('/productos', (req, res) => {
            try {
                res.status(200).json(data);
                console.log('Productos cargados con éxito');
            } catch (error) {
                console.log(`Error: ${error}`);
            }
        })
    }
    getRandomProduct() {
        app.get('/productoRandom', (req, res) => {
            try {
                const randomProducts = data[(Math.random() * data.length) | 0]
                res.status(200).json(randomProducts)
            } catch (error) {
                console.log(`Error: ${error}`);
            }
        })
    }
    getProductById() {
        app.get('/producto/:id', (req, res) => {
            try {
                const id = Number(req.params.id)
                if (isNaN(id)) {
                    console.log('Id erroneo');
                    res.status(404).json({ error: 'El parametro no es un número' });
                    return;
                }
                const product = data.find(data => data.id === id);

                if (!product) {
                    console.log('El producto no existe');
                    res.status(404).json({ error: 'El producto no existe' });
                    return;
                }
                res.status(200).json(product);
                console.log('Producto encontrado');
            } catch (err) {
                console.log(`Error: ${error}`);
            }
        })
    }
}

const contenedor = new Contenedor();

contenedor.getAll()
contenedor.getRandomProduct()
contenedor.getProductById()
