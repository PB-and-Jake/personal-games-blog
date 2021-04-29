import Ract, {Component, useReducer} from 'react';
import axios from 'axios';

export default class EditPlatform extends Component{
    constructor(props){
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCompany = this.onChangeCompany.bind(this);
        this.onChangeAbbreviation = this.onChangeAbbreviation.bind(this);

        this.state ={
            name:'',
            company:'',
            abbreviation:''
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
            })
            .catch(function(error){
                console.log(error);
            })
    }

    onChangeName(e){
        this.setState({
            name:e.target.name
        })
    }
    onChangeCompany(e){
        this.setState({
            company:e.target.company
        })
    }
    onChangeAbbreviation(e){
        this.setState({
            abbreviation:e.target.abbreviation
        })
    }

    onSubmit(e){
        e.preventDefault();

        const platform ={
            name:this.state.name,
            company:this.state.company,
            abbreviation:this.state.abbreviation
        }

        console.log(platform);

        axios.post('http://localhost:5000/platforms/update/'+this.props.match.params.id, platform)
            .then(res=> console.log(res.data));

        window.location='/';
    }

    render(){
        return(
            <div>
                <h3>Edit Platform</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" required className="form-control" 
                                value={this.state.name} onChange={this.onChangeName}/>
                    </div>
                    <div className="form-group">
                        <label>Company:</label>
                        <input type="text" required className="form-control"
                                value={this.state.company} onChange={this.onChangeCompany}/>
                    </div>
                    <div className="form-group">
                        <label>Abbreviation:</label>
                        <input type="text" required className="form-control"
                                value={this.state.abbreviation} onChange={this.onChangeAbbreviation}/>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Save Edits" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }

}