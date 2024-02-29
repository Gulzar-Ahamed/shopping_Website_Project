const express=require("express")
const Router=express.Router();
// const Router=Express.Router();
const {DB} =require("../Database.js")

Router.post("/usersComment", (req, res) => {

   
    const {userName,userComment,commentDate,commentTime}=req.body;
console.log(req.body);
console.log("this is frontend data");
       const postQuery="INSERT INTO userscomment (userName,userComment,commentDate,CommentTime) VALUES (?,?,?,?)"
        DB.query(postQuery,[userName,userComment,commentDate,commentTime],(error,result)=>{
                    if(error){
                        res.status(500).json({message:"error while inserting data into DB"})
                    }
                    console.log('below is the result from DB');
                    console.log(result);

                    res.status(200).json({message:"userComment added successfully"})
        //    i can post the data into DB. working correctly
                }
      )
})


Router.get("/usersComment", (req, res) => {

       const getQuery="SELECT * FROM userscomment"
        DB.query(getQuery,(error,result)=>{
                    if(error){
                        res.status(500).json({message:"error while getting data from DB"})
                    }

                    else if(result.length > 0){
                        console.log(result.length);
                        console.log('this is result length in get comment function');
                    }
                    res.status(200).json( { message:"usersComment received successfully",backendData:result } )
            }
      )
})




module.exports = Router;