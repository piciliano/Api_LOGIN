import * as yup from "yup"

const makeCreateUserSchema = () => {
    return yup.object().shape({
        name: yup.string().required("nome obrigatório"),
        email: yup.string().required("email obrigatório"),
        password: yup.string().required("senha obrigatória"),
        age: yup.number().required("idade é obrigatória"),
        birth: yup.string().required("idade obrigatória")
    })
}

export { makeCreateUserSchema }