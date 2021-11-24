import React, {Component} from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar, faStarHalfAlt} from '@fortawesome/free-solid-svg-icons'

export default class ViewReview extends Component{
    constructor(props){
        super(props);

        this.state = {
            title:'',
            platform:'',
            details:'',
            review:'',
            score:0,
            date: new Date(),
            completed:false,
            users:[],
            platforms:[]
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/reviews/'+this.props.match.params.id)
            .then(response=>{
                this.setState({
                    title:response.data.title,
                    platform: response.data.platform,
                    details:response.data.details,
                    review: response.data.review,
                    score: response.data.score,
                    date: response.data.date,
                    completed: response.data.completed
                })
            })
            .catch(function(error){
                console.log(error);
            })
    }

    render(){
        var reviewDate = this.state.date,
            reviewDateStr = (new Date(reviewDate)).toLocaleDateString();

        var rows = [];
        var fullStars = this.state.score / 2;
        for(var i=1; i<=fullStars;i++){
            rows.push(<FontAwesomeIcon className="text-warning" icon={faStar}/>);
        }
        if(this.state.score%2>0){
            rows.push(<FontAwesomeIcon className="text-warning" icon={faStarHalfAlt}/>);
        }

        var completedString = "Not Completed";
        if(this.state.completed){
            completedString = "Completed";
        }

        return(
            <div>
                <h2 className="mb-3">{this.state.title}</h2>
                <div className="col-12 mb-3">
                    <div className="row mb-2">
                        {rows}
                    </div>
                    <div className="row">
                        {reviewDateStr} | {this.state.platform} | {completedString}
                    </div>
                </div>
                <div className="row">
                    <div className="col-8">
                        <h5>REVIEW</h5>
                        <div style={{whitespace:"pre-line"}}>
                            {this.state.review.split('\n').map(function(item, key){
                                return(
                                    <span key={key}>
                                        {item}
                                        <br/>
                                    </span>
                                )
                            })}
                        </div>
                    </div>
                    <div className="col-4">
                        <h6>details</h6>
                        <div>
                            {this.state.details}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}