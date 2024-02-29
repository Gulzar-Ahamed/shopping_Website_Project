const {DB} = require("../Database.js")

const ResetPasswordMiddleware=async(req,res,next)=>{
        const {email} = req.body;
    const searchQuery="SELECT userId,name,email,shoppingCartList,userAddress,wishList FROM userinformation WHERE email=?"
    try {
            await DB.query(searchQuery,[email],(error,result)=>{
                if(error){
                    res.status(500).json({success:false,message:"internal server error while searching for data.."})
                }
                else if(result.length > 0){
                    // if it's true then the user is exist in the database.
                    console.log(result[0]);
                    console.log(result);
                    console.log('this is the result taken from the database currently i am in resetpasswordmiddlware');
                    req.userData=result[0];
                    // i can pass the value but check if i can also receive it
                    next();
                }
                // if both conditions are not true then say  the user is not exist in database.
                else{
                    res.status(404).json({success:false,message:"user is not exist in database"})
                }
            }
        )
    } catch (error) {
        console.log(error);
        console.log("there is an error in try catch block of reset password ");
    }
  
}

module.exports.ResetPasswordMiddleware=ResetPasswordMiddleware;
