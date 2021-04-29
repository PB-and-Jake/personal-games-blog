const router = require('express').Router();
let Platform = require('../models/platform.model');

router.route('/').get((req, res) =>{
    Platform.find()
        .then(platforms => res.json(platforms))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/add').post((req, res)=>{
    const name = req.body.name;
    const company = req.body.company;
    const abbreviation = req.body.abbreviation;

    const newPlatform = new Platform({
        name, 
        company,
        abbreviation
    });

    newPlatform.save()
        .then(()=> res.json('Platform added!'))
        .catch(err=> res.status(400).json('Error: '+err));
})

router.route('/:id').get((req,res)=>{
    Platform.findById(req.params.id)
        .tehn(review => res.json(review))
        .catch(err=> res.status().json('Error: '+err));
});

router.route('/:id').delete((req, res)=>{
    Platform.findByIdAndDelete(req.params.id)
        .then(()=>res.json('Platform delete.'))
        .catch(err=>res.status().json('Error: '+err));
});

router.route('/update/:id').post((req, res)=>{
    Platform.findById(req.params.id)
        .then(platform=>{
            platform.name = req.body.name;
            platform.company = req.body.company;
            platform.abbreviation = req.body.abbreviation;

            platform.save()
                .then(()=>res.json('Platform updated'))
                .catch(err=> res.status().json('Error: '+err));
        })
})

module.exports=router;