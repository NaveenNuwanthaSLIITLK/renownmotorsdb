import express from 'express'
import Service from '../modle/Service.js'


const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const newService = {
            number_plate: req.body.number_plate,
            model:req.body.model,
            brand:req.body.brand,
            services: req.body.services,
            price_of_service: req.body.price_of_service,
            total_price: req.body.total_price,
            discount:req.body.discount,
            product_prices: req.body.product_prices.map(product => ({
                product: product.product,
                price: product.price,
                quantity: product.quantity
            }))
        };

        const service = await Service.create(newService);
        res.status(201).send({ message: 'Service Successfully submitted', service });
    } 
    catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

router.get('/', async(req,res)=>{ // view all services

    try{

        const services = await Service.find({})

        return res.status(200).json({
            
            data: services
        })

    }catch(err){
        console.log(err.message)
        res.status(500).send({message: err.message})
    }
}) 

router.get('/:id', async(req,res)=>{ // view one service

    try{

        const {id} = req.params;
        const service = await Service.findById(id)

        return res.status(200).json({
            
            data: service
        })

    }catch(err){
        console.log(err.message)
        res.status(500).send({message: err.message})
    }
}) 

router.put('/:id', async(req, res)=>{ // update service

    try {

        

        const {id} = req.params;
        const result = await Service.findByIdAndUpdate(id, req.body)

        if(!result){
            return res.status(404).json({message: 'service not found'})
        }

        return res.status(200).send({message: 'service update successfully'})
        
    } catch (error) {

        console.log(error.message)
        res.status(500).send({message: error.message})
        
    }
})

router.delete('/:id', async(req,res)=>{ // delete one service

    try{

        const {id} = req.params;
        const result = await Service.findByIdAndDelete(id)

        if(!result){
            return res.status(404).send({message:'service not found'})
        }

        return res.status(200).send({message: "service deleted successfuly"})

        
    }catch(err){
        console.log(err.message)
        res.status(500).send({message: err.message})
    }
}) 


router.get('/number_plate/:number_plate', async(req,res)=>{ // view all complaints one 

    const number_plate = req.params.number_plate
try{

    const service = await Service.find({number_plate})

    return res.status(200).json({
        
        data: service
    })

}catch(err){
    console.log(err.message)
    res.status(500).send({message: err.message})
}
}) 


export default router