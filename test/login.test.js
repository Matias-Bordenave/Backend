const user = {
    email: "coderUser",
    password: "123"
}

const login = (us, pass) => {
    try {

        if ((!us) || (us == "")) {
            console.log("No se ha proporcionado un usuario")
        } else {
            if ((!pass) || (pass == "")) {
                console.log("No se ha proporcionado un password")
            } else {
                if (us != user.email) {
                    console.log("credenciales incorrectas")
                } else {
                    if (pass != user.password) {
                        console.log("Contraseña incorrecta")
                    } else {
                        console.log("test aprobado")
                    }
                }
            }
        }



    } catch (err) {
        console.log("Err: " + err)
    }
}

login(coderUser, "123")