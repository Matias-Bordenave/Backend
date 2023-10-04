const { Command } = require("commander")
const env = require("../.env")
console.log(env)

start = () => {
    const program = new Command()
    program
        .option('-d', 'Variable para hacer debug', false)
        .option('-p <port>', 'Server Port', 3000)
        .option('-m <mode>', 'Ambiente de trabajo', 'produccion')
        .option('-s <datasource>', 'Data source', "MONGO")
        .requiredOption('-u <user>', 'User', 'No se declaro el usuario')
    program.parse()


    return program.opts()
}

module.exports = {
    start
}