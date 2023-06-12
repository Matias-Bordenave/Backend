
const fs = require("fs");
const path_pkg = require('path')

class ProductManager {

    constructor(path) {
        this.products = []
        this.path = path_pkg.resolve(__dirname, path);

        this.readFS().then((res) => {
            this.products = res
        }).catch((err) => {
        })
    }


    //identificador unico de producto (autoincrementable)
    static id = 0;

    /* 
    /* 
    /* 
    /*  Metodos de gestion de productos
    */

    addProduct = (product) => {

        //Verifico si el codigo del producto ya se encuentra cargado
        let codes = this.products.map((x) => {
            return x.code;
        });

        if (codes.includes(product.code)) {
            console.log(
                "El producto con el codigo ingresado ya se encuentra cargado"
            );
        } else {
            ProductManager.id = this.products.length + 1;
            let item = { id: ProductManager.id, ...product };
            this.products.push(item);

            console.log("Despues de agregar")
            console.log(this.products)

            //Actualizo el archivo
            this.writeFS(this.products)
                .then((res) => {
                    console.log("Se agrego el producto " + item.id + " correctamente");
                })
                .catch((err) => {
                    console.log("Error al agregar el producto");
                });
        }
    };

    //Retorna todos los productos
    getProducts = () => {
        return this.products
    }

    //Retorna un producto 
    getProductById = (id) => {
        let res = this.products.filter((item) => item.id == id);

        if (res.length == 0) {
            return "404 NOT FOUND";
        } else {
            return res[0];
        }
    };

    //Elimina un producto del archivo de productos
    deleteProductById = (id) => {
        const obj = this.getProductById(id);

        if (obj == "404 NOT FOUND") {
            console.log(obj);
        } else {
            //Actualizo el archivo

            this.resetFS()
                .then((res) => {
                    let new_products = this.products.filter(
                        (item) => item.id != id
                    );

                    this.products = new_products;

                    this.writeFS(new_products)
                        .then((res) => {
                            console.log("Se elimino el producto " + id + " correctamente");
                        })
                        .catch((err) => {
                            console.log("Error elminando el producto");
                        });
                })
                .catch((err) => {
                    console.log("ERROR: ", err);
                });
        }
    };

    //Actualiza el valor de un atributo de un producto 
    updateProductById = (id, property, value) => {
        let product = this.getProductById(id);
        if (product != "404 NOT FOUND") {
            //Controlo que el Object.keys no de error, ya que es critico para la comparacion de la propiedad
            try {
                let properties = Object.keys(product);
                if (properties.includes(property)) {
                    //Controlo que el valor ingresado se haya asignado correctamente
                    try {
                        Object.defineProperty(product, property, {
                            value: value,
                        });
                        this.writeFS(this.products)
                            .then((res) => {
                                console.log(
                                    "Se actualizo el registro del producto"
                                );
                            })
                            .catch((err) => {
                                console.log("Error actualizando el producto");
                            });
                    } catch (err) {
                        console.log("Error al asignar el nuevo valor", err);
                    }
                } else {
                    console.log("La propiedad ingresada no existe");
                }
            } catch (err) {
                console.log("Error leyendo propiedades");
            }
        }
    };

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

module.exports = ProductManager 