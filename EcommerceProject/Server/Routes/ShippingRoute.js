const express= require('express')
const {DB}= require("../Database.js")
 const Router=express.Router();

 Router.post("/storeshippingaddress",(req, res) => {

  const {userAddress,userId} = req.body;

  console.log(userAddress);
  console.log(userId);
  console.log('this is user address and userId taken from backend...');
 
        try {
            const query='UPDATE userinformation SET userAddress=? WHERE userId=?'
            
            DB.query(query,[JSON.stringify(userAddress),userId],(error,result)=>{

                        if (error) {
                                 console.log(error);
                           return res.status(500).json({ success: false, message: "Internal server error" });
                        }
                    console.log(result);// this result contains nothing so leave this don't take it as serious
                 return res.status(200).json({ message: "user address updated  gulzar", result: result });
            } )
// this working as exprected we fix it on 4/1/24


        } 
        catch (error)
         {
                    console.log(error);
                return res.status(500).json({ success: false, message: "there was an error in try catch block" });
         }
});


// get the suer address if the address is already available and send it to user.

// Router.get()

module.exports=Router;




