import Product from "../models/product.js";


export function createProduct(req, res) {

    if(!isAdmin(req)){// 403 error ekak kiyanne  Forbidden Error happens when the web page (or another resource) that you're trying to open in your web browser is a resource that you're not allowed to access
        res.status(403).json({
            message: "Admin access required to add products"
        });
        return;
    }

    const newProductData = req.body;

    const product = new Product(newProductData)

    product.save().then(
        ()=>{
            res.json({
                message: "Product created successfully"
            })
        }).catch((error)=>{
            res.status(500).json({
                message: error // error ela frontend ekata yawanna  
            })
            console.log(error);// error ekka backend terminal eke print karaganna 
        })
  
}

export function getProducts(req, res) {
    Product.find().then(
        (products)=>{
            res.json(products);
        })
    }






