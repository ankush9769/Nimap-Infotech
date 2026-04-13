import express from "express";
const router = express.Router();

router.get("/",async (req,res)=>{
    try{
        const db = req.app.locals.db;
        const [rows] = await db.query("select * from category");
        res.json(rows);
    }catch(err){
        res.json({error:err.message});
    }
});

router.post("/",async (req,res)=>{
    try{
        const db = req.app.locals.db;
        const {categoryname} = req.body;
        await db.query("insert into category (categoryname) values (?)",[categoryname]);
        res.json({message:"category added successfully"});
    }catch(err){
        res.json({error:err.message});
    }
});

router.put("/:id",async (req,res)=>{
    try{
        const db = req.app.locals.db;
        const {categoryname} = req.body;
        if(!categoryname){
            return res.json({error:"categoryname is required"});
        }
        const [result]=await db.query("update category set categoryname=? where categoryid=?",[categoryname,req.params.id]);
        if(result.affectedRows === 0){
            return res.json({message:"category not found!!"});
        }
        res.json({message:"category updated successfully"});
    }catch(err){
        res.json({error:err.message});
    }
});

router.delete("/:id",async (req,res)=>{
    try{
        const db = req.app.locals.db;
        await db.query("delete from category where categoryid=?",[req.params.id]);
        res.json({message:"delete successfully"});
    }catch(err){
        res.json({error:err.message});
    }
});

export default router;