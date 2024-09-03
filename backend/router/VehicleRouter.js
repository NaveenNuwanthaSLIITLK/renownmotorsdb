import express from 'express';
import Vehical from '../modle/Vehical.js'
import jwt from 'jsonwebtoken'



const router = express.Router()

router.post('/', async (req, res) => {
    const { number_plate, model, brand,contact_number } = req.body;
    const num_plate = await Vehical.findOne({number_plate });
    if (num_plate) {
        return res.json({ message: "User already exists" });
        
    }
    
    const newNumPlate = new Vehical({
        number_plate,
        model,
        brand,
        contact_number
    });

    await newNumPlate.save();
    return res.json({ message: "number plate registerd" });
});

router.get('/', async(req,res)=>{ // view all vehicals

    try{

        const vehicals = await Vehical.find({})

        return res.status(200).json({
            
            data: vehicals
        })

    }catch(err){
        console.log(err.message)
        res.status(500).send({message: err.message})
    }
}) 

router.get('/:id', async(req,res)=>{ // view one vehical

    try{

        const {id} = req.params;
        const vehical = await Vehical.findById(id)

        return res.status(200).json({
            
            data: vehical
        })

    }catch(err){
        console.log(err.message)
        res.status(500).send({message: err.message})
    }
}) 

router.put('/:id', async(req, res)=>{ // update vehical

    try {

      

        const {id} = req.params;
        const result = await Vehical.findByIdAndUpdate(id, req.body)

        if(!result){
            return res.status(404).json({message: 'Vehical not found'})
        }

        return res.status(200).send({message: 'Vehical update successfully'})
        
    } catch (error) {

        console.log(error.message)
        res.status(500).send({message: error.message})
        
    }
})

router.delete('/:id', async(req,res)=>{ // delete one vehical

    try{

        const {id} = req.params;
        const result = await Vehical.findByIdAndDelete(id)

        if(!result){
            return res.status(404).send({message:'vehical not found'})
        }

        return res.status(200).send({message: "vehical deleted successfuly"})

        
    }catch(err){
        console.log(err.message)
        res.status(500).send({message: err.message})
    }
}) 

router.post('/login', async (req, res) => { //login
    const { number_plate } = req.body;
    try {
        const user = await Vehical.findOne({number_plate });
        if (!user) {
            return res.status(401).json({ message: "Invalid email" });
        }
        
        
        
        const {id} = user
        const token = jwt.sign({ userId: user._id }, process.env.JWT, { expiresIn: '1h' });
        
        res.cookie('token', token, {
            httpOnly: true,
            // Secure: true, // Uncomment in production if served over HTTPS
            maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
            // SameSite: 'Lax' // Consider setting same-site policy based on your requirements
        });
        
        return res.json({ token ,id,number_plate,status: true, message: "Login successful" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/number_plate/:number_plate', async (req, res) => {
    const number_plate = req.params.number_plate;
    try {
        const service = await Vehical.find({ number_plate });
        return res.status(200).json({
            data: service
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});



export default router
