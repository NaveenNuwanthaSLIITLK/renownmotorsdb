import express from 'express'
import Item from '../modle/Item.js'


const router = express.Router()

router.post('/', async(req,res)=>{

    const {item_name, quantity} = req.body

    const newItem = new Item({
        item_name,
        quantity,
      
    });

    await newItem.save();
    return res.json({ message: "Item registerd" });
})


router.get('/', async(req,res)=>{
    try{

        const items = await Item.find({})

        return res.status(200).json({
            
            data: items
        })

    }catch(err){
        console.log(err.message)
        res.status(500).send({message: err.message})
    }
})

router.get('/:id', async(req,res)=>{
    try{

        const {id} = req.params;
        const item = await Item.findById(id)

        return res.status(200).json({
            
            data: item
        })

    }catch(err){
        console.log(err.message)
        res.status(500).send({message: err.message})
    }
})

router.put('/:id', async (req, res) => { //update usind id
    try {
        const { id } = req.params;
        const result = await Item.findByIdAndUpdate(id, req.body, { new: true });

        if (!result) {
            return res.status(404).json({ message: 'Item not found' });
        }

        return res.status(200).send({ message: 'Item updated successfully', item: result });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

router.delete('/:id', async(req,res)=>{
    try{

        const {id} = req.params;
        const result = await Item.findByIdAndDelete(id)

        if(!result){
            return res.status(404).send({message:'vehical not found'})
        }

        return res.status(200).send({message: "vehical deleted successfuly"})

        
    }catch(err){
        console.log(err.message)
        res.status(500).send({message: err.message})
    }
})

router.get('/item_name/:item_name', async (req, res) => {
    const item_name = req.params.item_name;
    try {
        const item = await Item.findOne({ item_name });
        return res.status(200).json({
            data: item
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});


export default router