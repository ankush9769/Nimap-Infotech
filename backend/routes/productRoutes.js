import express from "express";
const router = express.Router();

router.get("/",async (req,res)=>{
    try{
        const db = req.app.locals.db;
        const page= parseInt(req.query.page);
        const pageSize = parseInt(req.query.pageSize);
        const offset = (page-1)*pageSize;
        const [rows]=await db.query("select p.productid,p.productname,c.categoryid,categoryname from product p join category c on p.categoryid = c.categoryid ORDER BY p.productid ASC limit ? offset ?",[pageSize,offset]);
        res.json(rows);
    }catch(err){
        res.json({error:err.message});
    }
});

router.post("/",async (req,res)=>{
    try{
        const db = req.app.locals.db;
        const {productname,categoryid} = req.body;
        await db.query("insert into product (productname,categoryid) values (?,?)",[productname,categoryid]);
        res.json({message:"product added successfully"});
    }catch(err){
        res.json({error:err.message});
    }
});

router.put("/:id",async (req,res)=>{
    try{
        const db = req.app.locals.db;
        const {productname,categoryid}=req.body;
        if(!productname || !categoryid){
            return res.json({message:"productname and categoryid is required"});
        }
        const [result] = await db.query("update product set productname=?, categoryid=? where productid=? ",[productname,categoryid,req.params.id]);
        if(result.affectedRows === 0){
            return res.json({message:"product not found for update"});
        }
        res.json({message:"product updated successfully"});
    }catch(err){
        res.json({error:err.message});
    }
})

router.delete("/:id",async (req,res)=>{
    try{
        const db = req.app.locals.db;
        const [result]=await db.query("delete from product where productid = ?",[req.params.id]);
        if(result.affectedRows === 0){
            return res.json({message:"product not found"})
        }
        res.json({message:"product deleted successfully"})
    }catch(err){
        res.json({error:err.message});
    }
});

export default router;