const express= require("express");
const Router=express.Router();
const crypto=require("crypto");
const Razorpay = require("razorpay");



// Router.post('/create-checkout-session',(req,res)=>{

//   console.log(req.body);
//     const{orderAmount,products}= req.body;

//     console.log(orderAmount);
//     console.log('this is order amount from backend');
//     console.log(products);
//     console.log('this is products value from backend');
// })


// what are all missing 
//  need to create razor object or instance  and add crypto package is useful to make random string for reciept no. in options property


Router.post('/create-order', async (req, res) => {
   

    const {orderAmount}= req.body;
    console.log(orderAmount);
    console.log('this is order amount taken rom frontend data');
    console.log(process.env.REACT_APP_RAZOR_PAY_KEY_ID) ;
    console.log('this is key value'); 
    console.log(process.env.REACT_APP_RAZOR_PAY_SECRET_KEY) ;
console.log('this s secret key');
  const options = {
      // get the amount dynamically from req.body and multiply by 100 razor pay accepts paise format
      amount: orderAmount * 100, // amount in paise (e.g., 1000 paise = ₹10)
      currency: 'INR',
      // receipt: 'order_receipt',
      receipt:crypto.randomBytes(10).toString("hex"),
      payment_capture: 1,
     };

    try {
// first create razor pay object or instance
// the error i was facing for 6days was i didn't create the frontend .env information but only done in backend..
        const razorPay = new Razorpay(
            {
              key_id:process.env.REACT_APP_RAZOR_PAY_KEY_ID,
              key_secret:process.env.REACT_APP_RAZOR_PAY_SECRET_KEY 
              // please check the above is available or not
      // console.log(key_id);
            } 
        )
// the create function take s (options,(error,response)=>{if(error)conslow.log(error); reutrn status as 500})
      // const order =
       await razorPay.orders.create(options,(error,order)=>{
       console.log(process.env.REACT_APP_RAZOR_PAY_KEY_ID) ;
       console.log('this is key value'); 
       console.log(process.env.REACT_APP_RAZOR_PAY_SECRET_KEY) ;
  console.log('this s secret key');
        if(error)
              {
                return res.status(500).json({message:'there is an error while getting order from api'});
             }

            return res.status(200).json({message:"receive order from backend",order:order,success:true});
       });
     
    }
     catch (error) {
   
      res.status(500).json({ error: 'Failed to create order' });
    }
  });


  Router.post("/verify",async(req,res)=>{
    // once payemtn is successful it will send all these values
// i think once the the checkout popup comes once enter details then we send it's response to this route and extracting the details.
console.log(req.body);
console.log('this is req.body');
            try {
              
               const {razorpay_order_id,razorpay_payment_id,razorpay_signature}= req.body;
console.log(razorpay_order_id,razorpay_payment_id,razorpay_signature);
             
const sign=razorpay_order_id + "|" + razorpay_payment_id;

                const expectedSign= crypto.createHmac("sha256",process.env.REACT_APP_RAZOR_PAY_SECRET_KEY)
                .update(sign.toString())
                .digest("hex");

                if(razorpay_signature===expectedSign){
                
                  return res.status(200).json({success:true,data:req.body,message:"paymemt verified successfully"});
                }else{
                    return res.status(400).json({success:false,message:"invalid signature send!"});
                }

            } catch (error) {

                console.log(error);
                res.status(500).json( { message: 'internal server error'} )
            }
       }
  )

  module.exports=Router;