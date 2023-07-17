const fs = require("fs");
const path_pkg = require('path')

class CartManager {
    constructor(path) {
        this.carts = []
        this.path = path_pkg.resolve(__dirname, path);

        this.readFS().then((res) => {
            this.carts = res
        }).catch((err) => {
        })

    }

    static id = 0

    //Retorna todos los carritos
    getCarts = () => {
        return this.carts
    }

    //agrega un carrito
    addCart = (name = "") => {

        let names = this.carts.map((x) => {
            return x.name;
        });

        console.log("names: ".names)

        if (!names.includes(name)) {
            CartManager.id = this.carts.length + 1
            this.carts.push({ id: CartManager.id, name: name, products: [] })


            //Actualizo el archivo
            this.writeFS(this.carts)
                .then((res) => {
                    console.log("Se agrego el cart " + name + " correctamente");
                })
                .catch((err) => {
                    console.log("Error al agregar el cart");
                });
        } else {
            return "El carrito con el nombre ingresado ya se encuentra cargado"
        }
    }

    //Retorna un carrito
    getCartById(id) {
        return this.carts.find((x) => x.id == id)
    }

    //Agrega un product id a un carrito
    addProductToCart(cartId, productId, quantity) {
        let cart = this.getCartById(cartId)

        let arrIds = cart.products.map((x) => {
            return x.product
        })

        if (arrIds.includes(parseInt(productId))) {
            let product = cart.products.find((x) => x.product == parseInt(productId))

            product.quantity = parseInt(quantity)
        } else {
            cart.products.push({ product: parseInt(productId), quantity: parseInt(quantity) })
        }

        //Actualizo el archivo
        this.writeFS(this.carts)
            .then((res) => {
                console.log("Se agrego el cart " + name + " correctamente");
            })
            .catch((err) => {
                console.log("Error al agregar el cart");
            });
    }

    /* 
/* 
/* 
/*  Metodos de gestion de archivo de productos
*/

    //Reescribe el archivo de productos
    writeFS = async (content) => {
        //Reescribe mi archivo de productos
        try {
            let res = await fs.promises.writeFile(
                this.path,
                JSON.stringify(content, null, 4),
                { encoding: "utf-8" }
            );
        } catch (err) {
            console.log("ERROR: ", err);
            return;
        }
    };

    //Elimina el contenido del archivo de productos
    resetFS = async () => {
        //Limpia mi archivo de productos
        //Reescribe mi archivo de productos
        try {
            let res = await fs.promises.writeFile(
                this.path,
                JSON.stringify([{ text: "Sin productos Cargados" }], null, 4),
                { encoding: "utf-8" }
            );
        } catch (err) {
            console.log("ERROR: ", err);
            return;
        }
    };

    //retorna el contenido del archivo de productos
    readFS = async () => {
        //Retorna el contenido del archivo en un string
        console.log(this.path)
        try {
            let res = await fs.promises.readFile(this.path, {
                encoding: "utf-8",
            });
            return JSON.parse(res);
        } catch (err) {
            console.log("ERROR: ", err);
        }
    };
}

module.exports = CartManager