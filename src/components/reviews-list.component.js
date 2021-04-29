import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import reviewFunctions from '../helpers/viewReviewFunctions'

        
const Review = props =>(
    <tr>
        <td>{props.review.title}</td>
        <td>{props.review.platform}</td>
        <td className="text-center">{reviewFunctions.getRows(props.review.score)}</td>
        <td className="text-right">{props.review.date.substring(0,10)}</td>
        <td className="text-center">
            <Link to={"/viewReview/"+props.review._id}>View</Link> |
            <Link to={"/edit/"+props.review._id}>Edit</Link> | 
            <a href="#" onClick={()=>{props.deleteReview(props.review._id)}}>Delete</a>
        </td>
    </tr>
)

export default class ReviewsList extends Component {
    constructor(props){
        super(props);

        this.deleteReview = this.deleteReview.bind(this);

        this.state = {reviews:[]};
    }

    componentDidMount(){
        axios.get('http://localhost:5000/reviews/')
            .then(response => {
                this.setState({reviews:response.data})
            })
            .catch((error)=>{
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

    reviewList(){
        return this.state.reviews.map(currentreview=>{
            return <Review review = {currentreview} deleteReview={this.deleteReview} key={currentreview._id}/>;
        })
    }

    render(){
        return (
            <div>
                <h3>Recent Reviews</h3>
                <table className="mainReviewsTable col-12 table table-dark table-striped table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th>Title</th>
                            <th>Platform</th>
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
        );
    }
}