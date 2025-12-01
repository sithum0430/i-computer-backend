import Order from '../models/order.js';    
import { isAdmin} from '../controllers/userController.js';
import Product from '../models/product.js';



export async function createOrder(req, res) {
//mulin balanna one cutomer kenek widihata log wela da inne kiyala
    if(isAdmin){
        res.json({
             message : "login as customer to place order"

        })
       
    }

    //cbc001 me wage thama order id eka denna hithan inne
    // order id eka danna kalin order eke id eka hoyaganna one.

    try {
        const latestOrder = await Order.find().sort({ date:-1 }).limit(1);//date:-1 kiyala dunnama orders.fin d eken thiyana order okkoma aragena sort karanne date eka wadi eke indan adu ekata. e kiyanne latestma order eka thama mulinma enne.+1 dunna nm mulinma dapu order eka tama mulinma enne.limit(1) eken sort wela enne eka order ekai
        //latest order eke thiyenne array ekak. limit eken array eke elements ekakata limit karala thiyenne
        //mulinma blanna one array eka empty ekak da kiyal
        let orderId
        if(latestOrder.length == 0){
            orderId = "CBC0001";//mulinma order ekak nm order id eka 1 kiyanne
    }
        else{
            const currentOrderId = latestOrder[0].orderId;//latest order array eke(palaweni element eka) thiyana order id eka gannawa
            const numberString = currentOrderId.replace("CBC","");//cbc eka replace karala nathuwa number eka gannawa
            const number = parseInt(numberString);//string eka number ekakata convert karanawa
            const newNumber = (number + 1).toString().padStart(4,'0');//number eka 1 ekak wada wadi karanawa. e number eka string ekakata convert karanawa. e string eka length eka 4 wenna pad karanawa. e nisa 1 kiyanne 0001 kiyana widiyata pennanawa
            orderId = "CBC" + newNumber;//cbc eka athulata danna
        }
        const newOrderData = req.body;
        //api ape request body eke ewanne product id ekai quantity ekai witharai. methanadi api ordermodel ekata awashya widihata data tika organaize karaganna one, productname eka price eka dala

        const newProductArray = [];

        for(let i =0;i<newOrderData.orderedItems.length;i++){
            const product = await Product.findOne(
                { productId: newOrderData.orderedItems[i].productId }
            )
            //waaradi product id ekak ewwoth null kiyala thama product id eka findone() eken enne. postman eken danagathe
            if(product == null){
                res.json({
                    message: "Product with id " + newOrderData.orderedItems[i].productId + " not found"
                });
                return;
            }
            newProductArray[i]={
                
                name: product.productName,
                price: product.price,
                quantity: newOrderData.orderedItems[i].quantity,
                image: product.image[0]
            }
            //quantity eka adu wenna hadanna one?????????????????
        }
        newOrderData.orderedItems = newProductArray;//ordered items eka productid,quantity thiyena eka productid,name,price,quantity,image thiyena widihata replace karanawa
            

        newOrderData.orderId = orderId;//order id eka new order data athulata danna
        newOrderData.email = req.user.email;//login wela inna user ekage email eka order data athulata danna

        const order = new Order(newOrderData);
        await order.save();

        res.json({
            message: "Order created successfully",
            orderId: orderId
        })
    }
    catch (error) {
        res.status(500).json({
            message: "Error creating order",
            error: error.message
        }); 

    }
}

export async function getOrders(req, res) {
    try {
        const orders = await Order.find(
            { email: req.user.email }
        );
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({
            message: "Error fetching orders",
            error: error.message
        });
    }
}


