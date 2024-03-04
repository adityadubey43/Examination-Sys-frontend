import React from 'react';
import { connect } from 'react-redux';
import './portal.css';
import user_icon from './user.png'

function Trainee(props) {
    return (
        <div className="loggedin-trainee-container">
            <div className="loggedin-trainee-inner">
                {/* <span><img alt="User Icon" src={user_icon} className="loggedin-trainee-logo"/></span> */}
                <span className="loggedin-trainee-details-container highLighter ">&#9775;&nbsp;&nbsp;&nbsp;<p className='pStyle'>{props.trainee.traineeDetails.name}</p></span>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    trainee : state.trainee
});




export default connect(mapStateToProps,null)(Trainee);