import fs from "fs";

export class CartsManager {

    constructor (){
        this.path = "./src/data/cart.json"
    };

    async getCarts(){
        try {
            if(fs.existsSync(this.path)) {
               const cartsJSON = await fs.promises.readFile(this.path, 'utf-8');
               return JSON.parse(cartsJSON);
            } else return [];
        } catch (error) {
            console.log(error);
        };
    };

    #newIdCart(carts){
        let idMax = 0;
         carts.map((cart)=>{
            if(parseInt(cart.id) > idMax){
                idMax = parseInt(cart.id);
            };
        });
        return idMax + 1;   
    };

    async addCart(){
        try{
            const carts = await this.getCarts();
            const newCart= { 
                id : this.#newIdCart(carts),
                products : []
             };
             carts.push(newCart);
             await fs.promises.writeFile(this.path, JSON.stringify(carts));
             return newCart;
        }catch (error) {
            console.log(error);
        };
    };

    async getCartById(idCart){
        try{
            const carts = await this.getCarts();
            const cartById = carts.find((cart)=>cart.id===idCart);
            if(cartById){
                return cartById;
             }else{
                return "Not found"
             };
        }catch(error) {
            console.log(error);
        };
    };

    async saveProductToCart(IdCart, IdProduct){
        const cartById = await this.getCartById(IdCart);
        if (cartById != "Not found"){
            const checkProductoById = cartById.products.find((product) => product.id === IdProduct);
            if (checkProductoById) {
                cartById.quantity + 1;
            } else{
                const newProduct ={
                    id: productById,
                    quantity: 1
                };
                cartById.products.push(newProduct);
            };
            return cartById;
        }else return "Not found cart by id";
    };

};