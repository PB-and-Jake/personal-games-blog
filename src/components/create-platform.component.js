import React, {Component} from 'react';
import axios from 'axios';

export default class CreatePlatform extends Component{
    constructor(props){
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCompany = this.onChangeCompany.bind(this);
        this.onChangeAbbreviation = this.onChangeAbbreviation.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name:'',
            company:'',
            abbreviation:''
        }
    }

    onChangeName(e){
        this.setState({
            name:e.target.value
        })
    }
    onChangeCompany(e){
        this.setState({
            company:e.target.value
        })
    }
    onChangeAbbreviation(e){
        this.setState({
            abbreviation:e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();

        const platform ={
            name:this.state.name,
            company:this.state.company,
            abbreviation:this.state.abbreviation
        }

        axios.post('http://localhost:5000/platforms/add', platform)
            .then(res => console.log(res.data));
        
        this.setState({
            name:'',
            company:'',
            abbreviation:''
        })
    }

    render(){
        return(
            <div>
                <h3>Create New Platform</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text"
                            required className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeName}/>
                    </div>
                    <div className="form-group">
                        <label>Company:</label>
                        <input type="text" required className="form-control"
                                value={this.state.company} onChange={this.onChangeCompany}/>
                    </div>
                    <div className="form-group">
                        <label>Abbreviation:</label>
                        <input type="text" required className="form-control"
                                value={this.state.abbreviation} onChange={this.onChangeAbbreviation}
                                placeholder="e.g. PS4, NSW, XBONE, etc..."/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Platform" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}