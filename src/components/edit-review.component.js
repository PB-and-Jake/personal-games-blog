import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import Switch from 'react-switch';
import moment from 'moment';
import { faMonument } from '@fortawesome/free-solid-svg-icons';

export default class EditReview extends Component {
    constructor(props){
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangePlatform = this.onChangePlatform.bind(this);
        this.onChangeDetails = this.onChangeDetails.bind(this);
        this.onChangeReview = this.onChangeReview.bind(this);
        this.onChangeScore = this.onChangeScore.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeCompleted = this.onChangeCompleted.bind(this);

        this.state = {
            title:'',
            platform:'',
            details:'',
            review:'',
            score:0,
            date:new Date(),
            completed:false,
            users:[],
            platforms:[]
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/reviews/'+this.props.match.params.id)
            .then(response=>{
                this.setState({
                    title: response.data.title,
                    platform:response.data.platform,
                    details: response.data.details,
                    review: response.data.review,
                    score: response.data.score,
                    date: new Date(response.data.date),
                    completed: response.data.completed
                })
            })
            .catch(function(error){
                console.log(error);
            })

            axios.get('http://localhost:5000/users/')
                .then(response=>{
                    if(response.data.length >0){
                        this.setState({
                            users:response.data.map(user=>user.username),
                            username:response.data[0].username
                        })
                    }
                })
                .catch((error)=>{
                    console.log(error);
                })
            axios.get('http://localhost:5000/platforms/')
                .then(response=>{
                    if(response.data.length>0){
                        this.setState({
                            platforms:response.data.map(platform=>platform.name),
                            name:response.data[0].name
                        })
                    }
                })
                .catch((error)=>{
                    console.log(error);
                })
    }

    onChangeTitle(e){
        this.setState({
            title:e.target.title
        });
    }
    
    onChangePlatform(e){
        this.setState({
            platform:e.target.platform
        });
    }
    onChangeDetails(e){
        this.setState({
            details:e.target.details
        });
    }
    onChangeReview(e){
        this.setState({
            review:e.target.review
        });
    }
    onChangeScore(e){
        this.setState({
            score:e.target.score
        });
    }
    onChangeDate(e){
        this.setState({
            date:e.target.date
        });
    }
    onChangeCompleted(e){
        this.setState({
            completed:!this.state.completed
        });
    }

    onSubmit(e){
        e.preventDefault();

        const review = {
            title: this.state.title,
            platform:this.state.platform,
            details: this.state.details,
            review: this.state.review,
            score: this.state.score,
            data: this.state.date,
            completed: this.state.completed
        }

        console.log(review);

        axios.post('http://localhost:5000/reviews/update/'+this.props.match.params.id, review)
            .then(res => console.log(res.data));

        window.location='/';
    }

    render(){
        return(
            <div>
                <h3>Edit Review</h3>
                <form onSubmit ={this.onSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" required className="form-control"
                            value={this.state.title} onChange={this.onChangeTitle}/>
                    </div>
                    <div className="form-group">
                        <label>Platform</label>
                        <select ref="platformInput" required className="form-control"
                            value={this.state.platform} onChange={this.onChangePlatform}>
                                {
                                    this.state.platforms.map(function(platform){
                                        return <option key={platform} value={platform}>{platform}</option>
                                    })
                                }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Details </label>
                        <textarea type="text" required class="form-control" style={{resize:"none"}}
                            value={this.state.details} onChange={this.onChangeDetails}/>
                    </div>
                    <div className="form-group">
                        <label>Review </label>
                        <textarea type="text" required class="form-control" style={{resize:"none"}}
                            value={this.state.review} onChange={this.onChangeReview}/>
                    </div><div className="form-group">
                        <label>Score </label>
                        <input type="text" class="form-control" required
                            value={this.state.score} onChange={this.onChangeScore}/>
                    </div><div className="form-group">
                        <label>Date </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>
                            <span>Completed?</span>
                            <Switch onChange={this.onChangeCompleted} checked={this.state.completed}/>
                        </label>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Save Edits" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}