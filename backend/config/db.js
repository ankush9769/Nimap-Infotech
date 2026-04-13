import mysql from "mysql2/promise";

async function dbsetup(){
    let connection;
    try{
        connection = await mysql.createConnection({
            host:"localhost",
            user:"root",
            password:"@ankush@9769"
        });

        console.log("connected to mysql");
        await connection.query("create database if not exists nimap_infotech");
        await connection.end();

        const db= await mysql.createPool({
            host:"localhost",
            user:"root",
            password:"@ankush@9769",
            database:"nimap_infotech",
            waitForConnections:true,
            connectionLimit:10,
        });
        console.log("connected to nimap_infotech");

        await db.query(`create table if not exists category(
            categoryid int auto_increment primary key,
            categoryname varchar(100))`
        );
        await db.query(`create table if not exists product(
            productid int auto_increment primary key,
            productname varchar(100),
            categoryid int,
            foreign key (categoryid) references category(categoryid) on delete cascade)`
        );
         
        console.log("rable ready!!!!");
        return db;

    }catch(err){
        console.log(`failed in database connection or creation => ${err}`);
        throw err;
    }
}

export default dbsetup;