const { faker } = require('@faker-js/faker')

const generateProduct = async () => {
    return {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        stock: faker.number.int({ min: 0, max: 100000 }),
        thumbnail: faker.image.avatar(),
        description: faker.commerce.productDescription()
    }
}

const generateUser = async () => {
    return {
        id: faker.database.mongodbObjectId(),
        name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        gender: faker.person.gender(),
        phone: faker.phone.number(),
        image: faker.image.avatarGitHub()
    }
}

module.exports = {
    generateProduct,
    generateUser
}



