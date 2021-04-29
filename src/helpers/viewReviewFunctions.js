
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar, faStarHalfAlt} from '@fortawesome/free-solid-svg-icons';

const ReviewFunctions ={
getRows:function(score){
    var rows = [];
    var fullStars = score / 2;
    for(var i=1; i<=fullStars;i++){
        rows.push(<FontAwesomeIcon className="text-warning" icon={faStar}/>);
    }
    if(score%2>0){
        rows.push(<FontAwesomeIcon className="text-warning" icon={faStarHalfAlt}/>);
    }
    return rows;
},

getDate:function(date){

}
}

export default ReviewFunctions;