import React, {Component, useReducer} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import reviewFunctions from '../helpers/viewReviewFunctions'

const Review = props =>(
    <tr>
        <td>{props.review.title}</td>
        <td className="text-center">{reviewFunctions.getRows(props.review.score)}</td>
        <td className="text-right">{props.review.date.substring(0,10)}</td>
        <td className="text-center">
            <Link to={"/viewReview/"+props.review._id}>View</Link> |
            <Link to={"/edit/"+props.review._id}>Edit</Link> | 
            <a href="#" onClick={()=>{props.deleteReview(props.review._id)}}>Delete</a>
        </td>
    </tr>
)

export default class PlatformDetails extends Component{
    constructor(props){
        super(props);

        this.deleteReview = this.deleteReview.bind(this);

        this.state = {
            name:'',
            company:'',
            abbreviation:'',
            reviews:[]
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/platforms/'+this.props.match.params.id)
            .then(response=>{
                this.setState({
                    name:response.data.name,
                    company:response.data.company,
                    abbreviation:response.data.abbreviation
                })
                axios.get('http://localhost:5000/reviews/'+this.state.name)
                .then(response=>{
                    this.setState({
                        reviews:response.data
                    })
                })
                .catch((error)=>{
                    console.log(error);
                })
            })
            .catch(function(error){
                console.log(error);
            })
       
    }

    deleteReview(id){
        axios.delete('http://localhost:5000/reviews/'+id)
            .then(res=>console.log(res.data));

        this.setState({
            reviews:this.state.reviews.filter(el=>el._id!==id)
        })
    }

    averageReviews(){
        var totalScore = 0;
        var currentReviews = this.state.reviews;
        for(var i = 0; i<currentReviews.length; i++){
            totalScore+=currentReviews[i].score;
        }
        var average = totalScore/currentReviews.length;
        return average;
    }

    getGamesFinished(){
        var finished = 0;
        for(var i=0; i<this.state.reviews.length; i++){
            if(this.state.reviews[i].completed){
                finished++;
            }
        }
        return finished;
    }

    getConsistencyRating(){
        var average = this.averageReviews();
        var count = this.state.reviews.length;
        var stdDevSum = 0;
        for(var i=0; i<count; i++){
            stdDevSum+=Math.pow((this.state.reviews[i].score-average), 2);
        }
        var stdDeviation = stdDevSum/(count-1);
        var consistencyRating = (1 - stdDeviation/average).toFixed(3);

        return consistencyRating;
    }

    reviewList(){
        return this.state.reviews.map(currentreview=>{
            return <Review review = {currentreview} deleteReview = {this.deleteReview} key={currentreview._id}/>;
        })
    }

    render(){
        return(
            <div>
                <h3>{this.state.company} {this.state.name}({this.state.abbreviation}) Details</h3>

                <h6>Platform Stats</h6>
                <table className="platformStatesTable col-12 mb-0 table table-dark table-striped table-bordered">
                    <tr>
                        <td>Total Reviews</td>
                        <td class="text-center">{this.state.reviews.length}</td>
                        <td>Average Score</td>
                        <td class="text-center">{reviewFunctions.getRows(this.averageReviews())}</td>
                    </tr>
                    <tr>
                        <td>Games Finished</td>
                        <td class="text-center">{this.getGamesFinished()}</td>
                        <td>Consistency</td>
                        <td class="text-center">{this.getConsistencyRating()}</td>
                    </tr>
                </table>
                <div class="col-12 mb-2">
                    <small><i>NOTE: The 'Consistency' metric is simply the standard deviation divided by the mean, then subtracting that value from 1. The higher the number, the more consistent my scores have been for this platform.</i></small>
                </div>

                <h6 class="mt-2">Games List</h6>
                <table className="platformReviewsTable col-12 table table-dark table-striped table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th style={{width:"33%"}}>Title</th>
                            <th className="text-center">Score</th>
                            <th className="text-right">Date</th>
                            <th className="text-center">Actions</th>
                        </tr>    
                    </thead>
                    <tbody>
                        {this.reviewList()}    
                    </tbody>    
                </table>
            </div>
        )
    }

}