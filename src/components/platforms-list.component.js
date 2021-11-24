import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Platform = props =>(
    <tr>
        <td>{props.platform.name}</td>
        <td>{props.platform.company}</td>
        <td>{props.platform.abbreviation}</td>
        <td className="text-center">
            <Link to={"/viewPlatformDetails/"+props.platform._id}>Details</Link> | 
            <Link to={"/editPlatform/"+props.platform._id}>Edit</Link> | 
            <a href="#" onClick={()=>{props.deletePlatform(props.platform._id)}}>Delete</a>
        </td>
    </tr>
)

export default class PlatformsList extends Component {
    constructor(props){
        super(props);

        this.deletePlatform = this.deletePlatform.bind(this);

        this.state={platforms:[]};
    }

    componentDidMount(){
        axios.get('http://localhost:5000/platforms/')
            .then(response => {
                this.setState({platforms:response.data})
            })
            .catch((error)=>{
                console.log(error);
            })
    }

    deletePlatform(id){
        axios.delete('http://localhost:5000/platforms/'+id)
            .then(res=>console.log(res.data));
        
        this.setState({
            platforms:this.state.platforms.filter(el=>el._id!==id)
        })
    }

    platformList(){
        return this.state.platforms.map(currentplatform=>{
            return <Platform platform = {currentplatform} deletePlatform={this.deletePlatform} key={currentplatform._id}/>;
        })
    }

    render(){
        return(
            <div>
                <h3>Platforms</h3>
                <table className="mainPlatformsTable col-12 table table-dark table-striped table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th style={{width:"40%"}}>Name</th>
                            <th style={{width:"20%"}}>Company</th>
                            <th style={{width:"20%"}}>Abbreviation</th>
                            <th className="text-center" style={{width:"20%"}}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.platformList()}
                    </tbody>
                </table>
            </div>
        )
    }
}