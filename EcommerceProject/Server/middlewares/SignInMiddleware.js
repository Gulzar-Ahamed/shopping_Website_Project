
const {DB} =require("../Database");
const SignInMiddleware=(req,res,next)=>{
    const {email} =req.body;   

    console.log(email);
    console.log("this is current email of user..");
    try {
        // check if the user is presented or not if not presented means user information not available.
        // here i'm not going to get the password  value due to  security concern
        const isUserExist="SELECT * FROM userinformation WHERE email=?"     
                DB.query(isUserExist,[email],(error,result)=>{
                           
                            if(error){
                              return  res.status(500).json({success:false,message:"internal server error"})
                            }
                            else if(result.length===0){
                               return res.status(404).json({success:false,message:"User not found"});
                                
                            }console.log("//////////////////////////////");
                            console.log(result);// this returns an array
                            console.log(result[0]);
                            console.log("this is the result that i have taken from the DB from signin request");
                                req.userDataFromDB=result[0];
                                next();
                        }
                )
             
    } catch (error) {
        console.log(error);
        console.log("this is an error in try catch block in sign in middleware");
    }
   

}   
            
       


module.exports.SignInMiddleware = SignInMiddleware;