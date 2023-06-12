class Product {
    constructor(
        title = "",
        description = "",
        price = 0,
        thumbnail = "",
        code = "",
        status = true,
        stock = 0,
        category = ""
    ) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.status = status;
        this.stock = stock;
        this.category = category;
    }
}

module.exports = Product