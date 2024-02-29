const express= require('express')
const app = express();
 const Router=express.Router();
const {DB}=require("../Database.js")
 Router.get('/', (req, res)=>{
      
       try {
              const getProductQuery='SELECT * FROM products'
              
              DB.query(getProductQuery,(error,result)=>{

                     if(error){
                            res.status(500).json({message:'error while getting product information in DB'})
                     }
                 res.status(200).json(result)
              }
              )
       } catch (error) {
              res.status(304).json(error)
       }
 });

 Router.get("/search", (req, res)=>{

       const {category}=req.query;
       console.log(category);
       console.log('this is is category of frontend data ' );

              // it's better to use condition for thsirt value like user may give mistakenly as T-shirt or Tshirt or T shirt
       try {
              const searchQuery='SELECT * FROM products WHERE category=?';
              DB.query(searchQuery,[category],(error,result)=>{
                            if (error) {
                                   res.status(500).json({success:false,message:'internal server error'})
                            }

                            else if(result.length===0){
                                   res.status(404).json({success:false,message:'product not found..'})
                            }

                            else{
                                   console.log(result);
                                   console.log('this is the result from the search query value');
                                   res.status (200).json({success:true,searchData:result,message:'this is the result of search product'})
                            }
                  }
              )
       } 
       catch (error) {
              console.log(error);
              res.status(403).json({success:false,message:'error in try catch block'})

       }  
 })


 Router.post('/postProduct', (req, res)=>{
              try {
                     const {productimage,price,title,explaination,category,color,discount} = req.body;
                     console.log(color);
                     console.log(productimage);
                    console.log('this is color and productimage value from frontend');
                     const myQuery="INSERT INTO products (image,price,title,explaination,category,color,discount) VALUES (?,?,?,?,?,?,?)"
                                   // decide whether to use stringify method or not lets see
                                   DB.query(myQuery,[productimage,price,title,explaination,category,color,discount ],(error,result)=>{
                                          if (error) {// error is there in query
                                                 console.log("Error executing query:", error);
                                                 res.status(500).json({ message: "There was an error in the database query" });
                                               } else {
                                                 console.log(result);
                                                 res.status(200).json({ message: "Data successfully inserted into the database" });
                                               }
                                          }
                                   )
              } catch (error) {
                     res.status(500).json({message:"there was an error in the database query"+error})
              }
              
                     
     }
 )
 module.exports=Router;