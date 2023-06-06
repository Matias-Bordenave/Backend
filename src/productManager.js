

const fs = require("fs");

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async getAllProducts() {
        try {
            const pr = await fs.promises.readFile(this.path, "utf-8");
            const prParse = JSON.parse(pr);
            if (prParse.length <= 0) {
                return "No hay productos en la base de datos";
            } else {
                return prParse;
            }
        } catch (error) {
            throw new Error("Error al leer el archivo: " + error);
        }
    }

    async getProductsWithLimit(limit) {
        try {
            const pr = await fs.promises.readFile(this.path, "utf-8");
            const prParse = JSON.parse(pr);
            if (prParse.length <= 0) {
                return "No hay productos en la base de datos";
            } else {
                return prParse.filter((item) => item.id <= limit);
            }
        } catch (error) {
            throw new Error("Error al leer el archivo: " + error);
        }
    }

    async getProductById(id) {
        try {
            const pr = await fs.promises.readFile(this.path, "utf-8");

            //Trae todos los productos
            const prParse = JSON.parse(pr);

            const product = prParse.find((ele) => ele.id == id);

            if (product) {
                return product;
            } else {
                return "No se encontró ningún producto con el ID proporcionado";
            }
        } catch (error) {
            throw new Error("Error al leer el archivo: " + error);
        }
    }

    async addProduct(product) {
        await this.getAllProducts().then(async (res) => {

            let codes = res.filter((item) => item.code == product.code)

            if (codes.length == 0) {
                res.push(product)
                console.log(res)
                await fs.promises.writeFile(this.path, JSON.stringify(res), { encoding: 'utf-8' }).then(
                    (res) => {
                        console.log("Productos cargados correctamente")
                    }
                ).catch((err) => {
                    console.log("Error guardando el producto: ", err)
                })
            } else {
                console.log("El producto con el codigo ingresado ya se encuentra cargado")
            }
        })
    }

    async updateProduct(id, infoNew) {
        let pr = await fs.promises.readFile(this.path, 'utf-8').then((res) => { })
        let prParse = JSON.parse(pr)

        let arrayUpdated = prParse.map((ele) => {
            if (ele.id == id) {
                return { ...ele, title: infoNew.title, price: infoNew.price }

            } else {
                return ele
            }
        })

        await fs.promises.writeFile(this.path, JSON.stringify(arrayUpdated, null, 2), 'utf-8')

    }
}
/* 
module.exports = ProductManager;  */

const cart = new ProductManager('../productos.json')

cart.addProduct({
    "id": "33",
    "code": "aaaaa123",
    "title": "prodaaaaucto prueba2",
    "description": "Esaaate es un producto prueba2",
    "thumbnail": "Sin imaaaagen2",
    "price": 242,
    "stock": 25
})