import data from "../data/productos"

const pedirProductos = () =>{
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            resolve(data)
        }, 500)
    })
}
export default pedirProductos