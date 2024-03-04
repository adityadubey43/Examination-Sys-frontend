import React ,{useState } from 'react'
import { connect } from 'react-redux';
import { Button ,Modal,Input   } from 'antd';
import {ProceedtoTest,fetchTestdata} from '../../../actions/traineeAction';
import './portal.css';

function Instruction(props) {


const [isModalOpen, setIsModalOpen] = useState(false);
  const [passCode, setPassCode] = useState(''); 
    const [passCodeIsValid, setPassCodeIsValid] = useState(false); 
const [msg, setMsg] = useState(''); 


  const showModal = () => {
    setMsg('');
    setIsModalOpen(true);
   
  };

  const handleOk = () => {
    if(passCodeIsValid){
        props.ProceedtoTest(props.trainee.testid,props.trainee.traineeid,()=>{props.fetchTestdata(props.trainee.testid,props.trainee.traineeid)});  
         setIsModalOpen(false);
    }else{
        setMsg("Please Enter Valid PassCode");
    }
    
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  
  const handlePassCodeChange = e => {
    setPassCode(e.target.value); 
  };

  const handleValidate = () => {
    console.log(passCode);
    setMsg("");
    if(passCode=='admin@123'){
        setPassCodeIsValid(true);
        setMsg("PassCode is Valid");
    }else{
        setPassCodeIsValid(false);
        setMsg("PassCode is In-Valid");
    }
  };


    return (
        <div>
            <div className="instaruction-page-wrapper">
                <div className="instruction-page-inner">
                <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12" style={{ height: '80vh', overflow: 'auto' }}>
            <h3 className="text-center"><u>General Instructions</u></h3>
            <p><b>Read the following instructions carefully</b></p>
            <div className="col-lg-12" style={{ marginBottom: '1em' }}>
                <p>1. Total duration of the examination is [Total Time] minutes. There are total [Section Count] sections in an exam. Total duration of each section is [Section Time] minutes.</p>
                <p>2. The clock will be set at the server. The countdown timer at the top, right-hand side of the screen will display the time available for you to complete the examination. When the timer reaches zero, the examination will end automatically. You will not be required to end or submit your examination.</p>
                <p>3. The Question Palette displayed on the right-hand side of the screen will show the status of each question using one of the following symbols:</p>
                <table>
                    <tbody>
                        <tr>
                            <td><button className="btn btn-default" type="button" style={{ width: '25px', height: '25px' }}></button></td>
                            <td>This question has not been visited yet.</td>
                        </tr>
                        <tr>
                            <td><button className="btn btn-not-answered" type="button" style={{ width: '25px', height: '25px' }}></button></td>
                            <td>This question has been visited but not answered.</td>
                        </tr>
                        <tr>
                            <td><button className="btn btn-answered" type="button" style={{ width: '25px', height: '25px' }}></button></td>
                            <td>This question has been answered and will be considered for evaluation.</td>
                        </tr>
                        <tr>
                            <td><button className="btn btn-review" type="button" style={{ width: '25px', height: '25px' }}></button></td>
                            <td>This question has been marked for review and has not been answered.</td>
                        </tr>
                        <tr>
                            <td><button className="btn btn-review-ans" type="button" style={{ width: '25px', height: '25px' }}></button></td>
                            <td>This question has been answered and marked for review, which will be considered for evaluation.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p><b>Navigating to a Question:</b></p>
            <div className="col-lg-12">
                <p>4. Click on the question number in the Question Palette to go to that particular question directly.</p>
                <p>5. You can view all the questions by clicking on the Question Paper button that appears at the top, right-hand side of the screen.</p>
            </div>
            <p><b>Answering a Question :</b></p>
            <div className="col-lg-12">
                <p>6. Procedure for answering a multiple-choice type question (MCQ):</p>
                <ul style={{ listStyle: 'lower-alpha' }}>
                    <li>To select your answer, click on the button of the corresponding option.</li>
                    <li>To deselect your chosen answer, click on the button of the chosen option once again or click on the Clear Response button.</li>
                    <li>To change your chosen answer, click on the button of the newly identified answer.</li>
                </ul>
                <p>7. Procedure for answering a numerical answer type (NAT) question:</p>
                <ul style={{ listStyle: 'lower-alpha' }}>
                    <li>A fractional number in decimal notation (e.g., -0.3 or -.3) can be entered as an answer with or without '0' before the decimal point.</li>
                    <li>To clear your answer, click on the Clear Response button.</li>
                </ul>
                <p>8. To change your answer to a question that has already been answered, first select that question and then follow the usual procedure for answering any question.</p>
            </div>
            <p><b>Saving your answer :</b></p>
            <div className="col-lg-12">
                <p>9. To save your answer, you MUST click on the Save & Next button. To mark the question for review, click on the Mark for Review & Next button.</p>
                <p>10. After the elapse of the time scheduled for the examination (180 minutes), all the answers (including those “Answered and Marked for Review”) will be automatically submitted.</p>
            </div>
            <p><b>Navigating through sections:</b></p>
            <div className="col-lg-12">
                <p>11. Sections in this question paper are displayed above the Question Area. Questions in a section can be viewed by clicking on the section name. The section you are currently viewing is highlighted.</p>
                <p>12. After clicking the Save & Next button on the last question of any section, you will automatically be taken to the first question of the next section.</p>
                <p>13. You can shuffle between sections and questions anytime during the examination.</p>
                <p>14. You can see the section summary as a part of the legend appearing above the Question Palette of every section.</p>
                <hr />
            </div>
        </div>
                   
                        <h4><b>NOTE :</b>To save answers,click on the 'Save & Next' button.</h4>
                        <div className="proceed-to-test-button">
                            <Button style={{ float: 'right' }} type="primary" icon="caret-right" onClick={() => { props.ProceedtoTest(props.trainee.testid, props.trainee.traineeid, () => { props.fetchTestdata(props.trainee.testid, props.trainee.traineeid) }) }} loading={props.trainee.proceedingToTest}>
                                Proceed To Test
                            </Button>
                        </div>
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    trainee: state.trainee
});




export default connect(mapStateToProps, {
    ProceedtoTest,
    fetchTestdata
})(Instruction);