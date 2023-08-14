const socket = io()

socket.emit("prod-activate", "")

socket.emit("req-products", "pido prods")

socket.on("clear-np-screen", (data) => {

    let title = document.getElementById("title")
    title.innerText = "My Products"

    let div_button = document.getElementById("div-button")
    div_button.setAttribute("class", "mt-5")

    let btn = document.createElement("button")
    btn.setAttribute("class", "btn btn-primary")
    btn.innerText = "New Product"
    btn.onclick = () => {
        createProduct()
    }
    div_button.appendChild(btn)

    let div_products = document.getElementById("div-products")
    div_products.innerHTML = ""

    let ul = document.createElement("ul")
    ul.setAttribute("id", "ul-products")

    div_products.appendChild(ul)
})

socket.on("res-products", (data) => {
    console.log(data)
    data = data.products
    render(data)
})

function render(data) {

    const html = data.map((elem) => {
        return (
            `
            <li class="row m-5">
            <div class="card">
                <div class="card-details">
                    <p class="text-title">${elem.title}</p>
                    <p class="text-body"> - Description: ${elem.description}</p>
                    <p class="text-body"> - Code: ${elem.code}</p>
                    <p class="text-body"> - Stock: ${elem.stock}</p>
                    <p class="text-body"> - Category: ${elem.category}</p>
                </div>
                <button class="card-button"> $ ${elem.price}</button>
            </div>
        </li>
            `
        )
    }).join(' ')

    document.getElementById("ul-products").innerHTML = html
}

function createProduct() {
    let div_products = document.getElementById("div-products")
    div_products.innerHTML = ""

    let button = document.getElementById("div-button")
    button.innerHTML = ""

    let title = document.getElementById("title")
    title.innerText = "New Product"

    const form = document.createElement("form")
    form.setAttribute("id", "form")
    form.setAttribute("class", "col-3 ms-2")

    //
    // TITLE
    const title__label = document.createElement("label")
    title__label.setAttribute("class", "form-label")
    title__label.setAttribute("for", "product__title")
    title__label.innerText = "Title"

    form.appendChild(title__label)

    const title__input = document.createElement("input")
    title__input.setAttribute("id", "product__title")
    title__input.setAttribute("type", "text")
    title__input.setAttribute("class", "form-control")
    title__input.setAttribute("required", true)

    form.appendChild(title__input)

    //
    //DESCRIPTION
    const description__label = document.createElement("label")
    description__label.setAttribute("class", "form-label")
    description__label.setAttribute("for", "product__description")
    description__label.innerText = "Description"

    form.appendChild(description__label)

    const description__input = document.createElement("input")
    description__input.setAttribute("id", "product__description")
    description__input.setAttribute("type", "text")
    description__input.setAttribute("class", "form-control")
    description__input.setAttribute("required", true)

    form.appendChild(description__input)

    //
    //PRICE
    const price__label = document.createElement("label")
    price__label.setAttribute("class", "form-label")
    price__label.setAttribute("for", "product__price")
    price__label.innerText = "Price"

    form.appendChild(price__label)

    const price__input = document.createElement("input")
    price__input.setAttribute("id", "product__price")
    price__input.setAttribute("type", "number")
    price__input.setAttribute("class", "form-control")
    price__input.setAttribute("required", true)

    form.appendChild(price__input)

    //
    //CODE
    const code__label = document.createElement("label")
    code__label.setAttribute("class", "form-label")
    code__label.setAttribute("for", "product__code")
    code__label.innerText = "Code"

    form.appendChild(code__label)

    const code__input = document.createElement("input")
    code__input.setAttribute("id", "product__code")
    code__input.setAttribute("type", "text")
    code__input.setAttribute("class", "form-control")
    code__input.setAttribute("required", true)

    form.appendChild(code__input)

    //
    //STOCK
    const stock__label = document.createElement("label")
    stock__label.setAttribute("class", "form-label")
    stock__label.setAttribute("for", "product__stock")
    stock__label.innerText = "Stock"

    form.appendChild(stock__label)

    const stock__input = document.createElement("input")
    stock__input.setAttribute("id", "product__stock")
    stock__input.setAttribute("type", "number")
    stock__input.setAttribute("class", "form-control")
    stock__input.setAttribute("required", true)

    form.appendChild(stock__input)

    //
    //CATEGORY
    const category__label = document.createElement("label")
    category__label.setAttribute("class", "form-label")
    category__label.setAttribute("for", "product__category")
    category__label.innerText = "Category"

    form.appendChild(category__label)

    const category__input = document.createElement("input")
    category__input.setAttribute("id", "product__category")
    category__input.setAttribute("type", "text")
    category__input.setAttribute("class", "form-control")
    category__input.setAttribute("required", true)

    form.appendChild(category__input)
    //

    const submit__button = document.createElement("button")
    submit__button.setAttribute("id", "submit__button")
    submit__button.setAttribute("class", "btn btn-primary mt-2")
    submit__button.setAttribute("type", "submit")
    submit__button.innerText = "submit"

    form.appendChild(submit__button)

    const cancel_button = document.createElement("button")
    cancel_button.setAttribute("id", "cancel_button")
    cancel_button.setAttribute("class", "btn btn-danger mt-2")
    cancel_button.onclick = () => {
        socket.emit("np-cancel", {})
    }
    cancel_button.innerText = 'Cancelar'

    form.appendChild(cancel_button)

    div_products.innerHTML = ''
    div_products.append(form)

    form.addEventListener('submit', (e) => {

        e.preventDefault()

        let form = e.target

        let name
        title = form.children[1].value

        let description
        description = form.children[3].value

        let price
        price = parseFloat(form.children[5].value)

        let code
        code = form.children[7].value

        let stock
        stock = form.children[9].value

        let category
        category = form.children[11].value

        const new_product = { title: title, description: description, price: price, thumbnail: "", code: code, status: true, stock: stock, category: category }

        socket.emit("add-product", new_product)
    })
}