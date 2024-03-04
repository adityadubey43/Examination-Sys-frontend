import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Badge, Icon,Button,Row,Col  } from 'antd';
import './portal.css';
import {switchQuestion} from '../../../actions/traineeAction';
import '../examPortal/questionstyles/question.css'

class Operations extends Component {
    render() {
        return (
            <div className="question-list-wrapper operationDetails">
                <table className='tbStyle'>
                    <tr>
                        <td><div className='box green'></div></td>
                        <td>Answered</td>
                        <td ><div className='box red'></div></td>
                        <td >Not Answered</td>
                    </tr>
                    <tr>
                        <td><div className='box purple'></div></td>
                        <td>Marked for review</td>
                        <td><div className='box white'></div></td>
                        <td>Not Visited</td>
                    </tr>
                    <tr>
                        <td><div className='box yellow'></div></td>
                        <td colSpan={3}>Answered and Marked for review ( will be considered for evaluation )</td>
                    </tr>
                </table>
                

                <div className="question-list-inner scrollableQuestionList ">
                    <Row style={{padding:'5px'}}>
                        {this.props.trainee.answers.map((d,i)=>{
                            return(
                                <Col key={i} span={6} style={{padding:'10px'}}>
<                                       Mark qid={d.questionid} ans={d.isAnswered}  mark={d.isMarked} visited={d.isVisited} no={i}/>                                </Col>
                            )
                        })}
                    </Row>
                    
                </div>
            </div>
        )
    }
}























function mark(props){
     if(props.visited && !props.mark && !props.ans){
        return(
                    <Button onClick={()=>props.switchQuestion(props.no)} className="red"style={{color:'#000'}}>{props.no+1}</Button>
            )
    }
    if(props.mark){
        if(props.ans){
            return(
                    <Button onClick={()=>props.switchQuestion(props.no)} className="yellow"style={{color:'#000'}}>{props.no+1}</Button>
            )
        }
        else{
            return(
                 <Button onClick={()=>props.switchQuestion(props.no)} className="purple"style={{color:'#000'}}>{props.no+1}</Button>
            )
        }
        
    }
    else{
        if(props.ans){
            return(
                 <Button onClick={()=>props.switchQuestion(props.no)} className="green"style={{color:'#000'}}>{props.no+1}</Button>
            )
        }
        else{
            return(
                <Button onClick={()=>props.switchQuestion(props.no)} className="white"style={{color:'#000'}}>{props.no+1}</Button>
            )
        }
        
        
    }    
}







const mapStateToProps = state => ({
    trainee : state.trainee
});



let Mark=connect(mapStateToProps,{
    switchQuestion
})(mark);

export default connect(mapStateToProps,null)(Operations);