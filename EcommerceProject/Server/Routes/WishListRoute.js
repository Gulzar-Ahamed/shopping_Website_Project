const Router = require('express').Router();
const {DB}= require("../Database.js")
Router.put("/addwishlist",async(req,res)=>{
                const {wishList,userId}= req.body;
                console.log(wishList);  
                console.log('product data taken from backend');
              
                console.log(userId);
                console.log('userID taken from backend');
    try {
        // const query = 'UPDATE userinformation SET wishList = JSON_SET(wishList, "$", ?) WHERE userId = ?';
        const query = 'UPDATE userinformation SET wishList = (?) WHERE userId = ?';
        
        await DB.query(query, [JSON.stringify(wishList), userId], (error, result) => {
            if (error) {
                console.error(error);
                res.status(500).json({ success: false, message: "Internal server error" });
            } 
// this working as exprected we fix it on 4/1/24
            console.log(result);
                res.status(200).json({ data: wishList, message: "Product added to wishlist gulzar", result: result });
            
        });
    } catch (error) {
        console.error(error);
        res.status(403).json({ success: false, message: "There is some problem in the try-catch block" });
    }
});

             

Router.put("/removewishlist",async(req,res)=>{
    const {wishList,userId}= req.body;
    console.log(wishList);  
    console.log('product data of wishList after delete  taken from backend');
  
    console.log(userId);
    console.log('userID taken from backend');

    try {
        // const query = 'UPDATE userinformation SET wishList = JSON_SET(wishList, "$", ?) WHERE userId = ?';
        const query = 'UPDATE userinformation SET wishList = (?) WHERE userId = ?';
        
        await DB.query(query, [JSON.stringify(wishList), userId], (error, result) => {
            if (error) {
                console.error(error);
                res.status(500).json({ success: false, message: "Internal server error" });
            } 
// this working as exprected we fix it on 4/1/24
            console.log(result);
                res.status(200).json({ data: wishList, message: "Product removed from the wishlist gulzar", result: result });
            
        });
    } catch (error) {
        console.error(error);
        res.status(403).json({ success: false, message: "There is some problem in the try-catch block" });
    }
   }
)

module.exports =Router;