const express= require('express')
const cors=require('cors');
require('dotenv').config();// i think this is a short cut.
const app = express();

 app.use(express.json());
 app.use(cors());
 /**
 * how we handle api function in better way
 *  Example: in raltime application we may need to write loo's of route.it's hard to write all in as single file.so better to make a common file
 *    
 *   => common folder (i.e Routes) and give Individual file for different routes
 *              procedures:
 *              
 *      1.import express this will contain .Router() this will return Router object .use this app variable that we usaully make along with any http methods
 *         finally module.exports to make it visible
 *      2. import user defined outes in main server file assign it with object .importantly we need to let express.js know for that register in express
 *          const userRouter = require('../Rutes/userRoute.js')
 *           like app.use('/users',userRouter) that's it
                
            NOTE: this is main route all inside the individual router handler is SUB router for main*        
 */
   const product=require("./Routes/ProductRoute.js");
  const comments= require("./Routes/CommentRoute.js")
  const registerAndLogin = require("./Routes/RegisterAndLoginRoute.js"); 
  const wishList=require("./Routes/WishListRoute.js")
  const shoppingCartList=require("./Routes/ShoppingCartListRoute.js")
  const userAddress= require("./Routes/ShippingRoute.js");
  const paymentRoutes=require("./Routes/OrderPaymentRoute.js");
  
app.use("/",product)//note: /user is main route whatever in our inside router handler endpoint that is subrouter
app.use("/",comments)
app.use("/",registerAndLogin);
app.use("/",wishList)
app.use("/",shoppingCartList)//also known as shoppingCartList
app.use("/",userAddress)

app.use("/",paymentRoutes);
// app.get("/",(req,res)=>{

//        res.send("Welcome")
// })



app.listen(4000,()=>{
    console.log('server is running on port 4000');
})