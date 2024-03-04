import React, { Component, useState } from "react";
import { connect } from "react-redux";
import "./portal.css";
import SingleQuestion from "./singleQuestion";
import { Tabs } from "antd";
import {
  fetchTraineeTestQuestions,
  fetchTraineeTestAnswerSheet,
  fetchSubjectList,
} from "../../../actions/traineeAction";

const { TabPane } = Tabs;
class Question extends Component {
  subList = [];
  subjectId = null;

  mystyle = {
    width: "40%",
    color: "DodgerBlue",
    fontWeight: "bold",
    textDecoration: "underline",
    display: "inline-block",
  };
  timeStyle = {
    width: "40%",
    color: "DodgerBlue",
    fontWeight: "bold",
    textDecoration: "underline",
    display: "inline-block",
  };

  handleTabChnage = (subId) => {
    this.props.fetchTraineeTestQuestions(this.props.trainee.testid, subId);

    this.props.fetchTraineeTestAnswerSheet(
      this.props.trainee.testid,
      this.props.trainee.traineeid,
      subId
    );
  };

  render() {
    const subjects =
      this.props.trainee &&
      this.props.trainee.subjects &&
      Array.isArray(this.props.trainee.subjects)
        ? this.props.trainee.subjects
        : [];

    console.log(subjects);

    return (
      <div className="question-holder">
        <Tabs defaultActiveKey="1" onChange={this.handleTabChnage}>
          {subjects.map((sub, index) => (
            <TabPane tab={sub["topic"]} key={sub["_id"]}>
              <div>
                {this.props.trainee.answers.length > 0 &&
                this.props.trainee.questions.length > 0 ? (
                  <SingleQuestion
                    mode={this.props.mode}
                    triggerSidebar={this.props.triggerSidebar}
                    key={this.props.trainee.activeQuestionIndex}
                  />
                ) : (
                  "Question Not Found"
                )}
              </div>
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  trainee: state.trainee,
});

export default connect(mapStateToProps, {
  fetchTraineeTestQuestions,
  fetchTraineeTestAnswerSheet,
  fetchSubjectList,
})(Question);

/*
 <div className="single-question-container">
                    {this.props.trainee.answers.length>0 && this.props.trainee.questions.length>0 ?
                        <SingleQuestion mode={this.props.mode} triggerSidebar={this.props.triggerSidebar}  key={this.props.trainee.activeQuestionIndex} />:null
                    }
                    
                </div>


                 subList.map((item)=>
          {
            <TabPane tab="Maths" key="1">
              <div>
                {this.props.trainee.answers.length > 0 &&
                this.props.trainee.questions.length > 0 ? (
                  <SingleQuestion
                    mode={this.props.mode}
                    triggerSidebar={this.props.triggerSidebar}
                    key={this.props.trainee.activeQuestionIndex}
                  />
                ) : null}
              </div>
            </TabPane>
          }
          )

                <TabPane tab="Maths" key="1">
            <div>
              {this.props.trainee.answers.length > 0 &&
              this.props.trainee.questions.length > 0 ? (
                <SingleQuestion
                  mode={this.props.mode}
                  triggerSidebar={this.props.triggerSidebar}
                  key={this.props.trainee.activeQuestionIndex}
                />
              ) : null}
            </div>
          </TabPane>
*/
