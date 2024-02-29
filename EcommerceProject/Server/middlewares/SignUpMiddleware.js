const {DB} =require("../Database.js")


 const SignUpMiddleware=(req,res,next)=>{
                try {
   
            const {name,password,email}=req.body;
            console.log(email);
            console.log('this is the email value from frontend currently in middleware');
        
                const checkingUserQuery="SELECT * FROM userinformation WHERE email=?"
            
                DB.query(checkingUserQuery,[email],(error,result)=>{
        
                console.log(result);// result i get is []
                console.log('this is the result value from the DB');
                //    if user presents means it has result value otherwise means user is not exist in DB that's what we want
        
                        if(result.length >0){
                            console.log(error);
                            console.log('this is error message in signup middlwere');
                            res.status(500).json({success:false,message:"User already exists"})

                        }
                        else{
                            console.log("i think u can execute next()");
                            next();
                            console.log("this is statement after next() execution");
                            // i think till here it works but throws errrr 500
                        }
            }
         )
      } 
      catch (error)
       {
          console.log(error);
             console.log( 'this is an error message in middleware try catch block')            
         }
  

}


module.exports.SignUpMiddleware = SignUpMiddleware;