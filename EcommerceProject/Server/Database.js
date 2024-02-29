const mysql=require("mysql");

const pool=mysql.createPool(
    {
        database:"ecommerceproject",
        connectionLimit:3,
        user:"root",
        password:"Gulzar_123",
         host:"localhost",
    }
)

module.exports.DB=pool;