const router = require('express').Router();
let Review = require('../models/review.model');

router.route('/').get((req, res)=>{
    Review.find()
        .then(reviews => res.json(reviews))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:platform').get((req, res)=>{
    Review.find({"platform":req.params.platform})
        .then(reviews => res.json(reviews))
        .catch(err=> res.status(400).json('Error: '+err));
})

router.route('/add').post((req, res)=>{
    const title = req.body.title;
    const platform = req.body.platform;
    const details = req.body.details;
    const review = req.body.review;
    const score = Number(req.body.score);
    const date = Date.parse(req.body.date);
    const completed = req.body.completed;

    const newReview = new Review({
        title, platform, details, review, score, date, completed
    });

    newReview.save()
        .then(() => res.json('Review added!'))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').get((req, res)=>{
    Review.findById(req.params.id)
        .then(review => res.json(review))
        .catch(err => res.status().json('Error: '+err));
});

router.route('/:id').delete((req, res)=>{
    Review.findByIdAndDelete(req.params.id)
        .then(()=>res.json('Review deleted.'))
        .catch(err => res.status().json('Error: '+err));
});

router.route('/update/:id').post((req, res)=>{
    Review.findById(req.params.id)
        .then(review=>{
            review.title = req.body.title;
            review.platform = req.body.platform;
            review.details = req.body.details;
            review.date = Date.parse(req.body.date);
            review.review = req.body.review;
            review.score = Number(req.body.score);
            review.completed = req.body.completed;

            review.save()
                .then(() => res.json('Review updated'))
                .catch(err => res.status(400).json('Error: '+err));
        })
        .catch(err=>res.status(400).json('Error: '+err));
})

module.exports = router;