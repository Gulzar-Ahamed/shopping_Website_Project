const express =require("express");
const Router=express.Router();
const { SignUpMiddleware } =require("../middlewares/SignUpMiddleware.js");
const {SignInMiddleware}= require("../middlewares/SignInMiddleware.js")
const {DB} =require("../Database.js")
const bcrypt= require("bcrypt");
const { ResetPasswordMiddleware } = require("../middlewares/ResetPasswordMiddleware.js");
// this is for register or SignUp  routes 

Router.post('/register',SignUpMiddleware, async(req, res)=>{
    
    try {
        const {name,password,email}=req.body;
             console.log('i am currently in  register route after the middlwware  ');
    const hashPassword=  await bcrypt.hash(password,10);
       // i faced an error later i understood that this bcrypt.hash returns an promise so we need to use await keyword. 
      //    and moreover error may comes because if u set condition as not null when u insert any record into DB at one time we need to fill all the columns data that's the true working of not null
     //  but we are sending partial values so don't SET as NOT NULL   
    console.log(hashPassword);
    console.log('im inside and above the hash password value');
        const  insertQuery="INSERT INTO userinformation (name,password,email) VALUES (?,?,?)"
   
       await DB.query(insertQuery,[name,hashPassword,email],(error, result)=>{

                    if(error) {
                        res.status(500).json({success:false,message:"internal server error while inserting data into DB need to check"})
                    }

                    else{
                      // the result data is not containing sufficient information so better use SELECT statement and atttach the result.. new idea
                      //  problem resolved i used () in selecting the columns so after debug its working..
                      const getUserQuery="SELECT userId,name,email,shoppingCartList,userAddress,wishList FROM userinformation WHERE email=? AND password=?"
                          // if i use SELECT * statement it will also returns password so better type manually columns that u want. for security concern.
                      DB.query(getUserQuery,[email,hashPassword],(error, result)=>{

                            if(error){
                              console.log(error);
                              console.log("this is error message in register route getting data after inserted.");
                              res.status(500).json({success:false,message:"errror while getting data to attach the user information  internal server error "})
                            }

                            res.status(200).json({success:true,userData:result,message:"user successfully created (or) added in DB "})
                        }
                    )
                     
                    }
                      // i need to handle error keep an eye on it.
            }
        )
 } catch (error) {
    console.log(error);
console.log("this is the error message in try catch block");
 }
       
});
// 

// SignIn route starts here..

  Router.post("/signin",SignInMiddleware,async(req,res)=>{

    const { password } = req.body;
    const { userDataFromDB } = req;
  
    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, userDataFromDB.password);
  
    if (passwordMatch) {
      // Passwords match, user is authenticated
      res.status(200).json({ success: true,userData:userDataFromDB, message: 'User authenticated' });
    } else {
      // Passwords do not match
      res.status(401).json({ success: false, message: 'Email or  password Invalid' });
    }
     }
)
// here sign in route ends

//  here reset password starts
     /**  my plan to reset password.
     *  1) here i'm going to use post axios method that may contain only email as post data to backend  this is  frontend approach
     *  2) take it and pass it on to DB if email exist  or not if matched in DB then .
     */
    Router.post("/resetpassword",ResetPasswordMiddleware, (req, res) => {
                    const {userData}=req;
                    console.log(userData);
                    console.log('this is the userdata which i have taken fom post route in request obj only');
                    // why the above shows undefined..
                res.status(200).json({ success:true,userData:userData,message: 'going to reset password final step'})
         }
    )
// here reset password ends

// new password route starts here.
      
         Router.put('/resetpassword2/:email', async(req, res) => {
              const email=req.params.email;
              console.log(email);
              console.log("this is email resetpassword2 route");

              console.log(req.body);
              console.log('tihs is the reqeust body that i am going to check');
                 const {newPassword}=  req.body;
                 console.log(newPassword);
                 console.log(email);
                //  this is undefined don't know why..
                 console.log("this is new password and exist email please i am going to update it..");

                 try {
                   const hashedPassword= await bcrypt.hash(newPassword,10)
                   console.log(hashedPassword);
                   console.log('encrypted password ');
                  const query="UPDATE userinformation SET password=? WHERE email=?"
                     DB.query(query,[hashedPassword,email],(error,result)=>{

                      if (error) {
                        console.log(error);
                       return res.status(500).json({success:false,message:'internal server error while working with query'})
                      }

                     return res.status(200).json({success:true,message:"password reset successfully"})
                     })
                 } catch (error) {
                      console.log(error);
                      console.log('this is error in backend routing..');
                 }
         })

// new password route ends here.

module.exports =Router;