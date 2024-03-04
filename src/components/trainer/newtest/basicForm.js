import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Form, Upload, Input, Button,Select } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import { changeStep,changeBasicNewTestDetails } from '../../../actions/testAction';
import { SecurePost } from '../../../services/axiosCall';
import './newtest.css';
import apis from '../../../services/Apis'
const { Option } = Select;


class BasicTestFormO extends Component {
    constructor(props){
        super(props);
        this.state={
            checkingName:""
        }
    }
    handleChange = ({ fileList }) => this.setState({ fileList });
    // handleSubmit = async () => {
    //     const { fileList } = this.state;
    //     if (fileList.length === 0) {
    //       message.error('Please select a file to upload');
    //       return;
    //     }
    
    //     const formData = new FormData();
    //     fileList.forEach(file => {
    //       formData.append('file', file.originFileObj);
    //     });
    
    //     try {
    //       const response = await axios.post('https://127.0.0.1:5000/api/upload', formData, {
    //         headers: {
    //           'Content-Type': 'multipart/form-data',
    //         },
    //       });
    //       message.success('File uploaded successfully');
    //       console.log(response.data);
    //     } catch (error) {
    //       message.error('File upload failed');
    //       console.error(error);
    //     }
    //   };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values)
                this.props.changeBasicNewTestDetails({
                    testType:values.type,
                    testTitle: values.title,
                    testDuration : values.duration,
                    OrganisationName:values.organisation,
                    testSubject:values.subjects
                })
                this.props.changeStep(1);
            }
        });
    };

    validateTestName = (rule, value, callback) => {
        if(value.length>=5){
            this.setState({
                checkingName:"validating"
            })
            SecurePost({
                url:apis.CHECK_TEST_NAME,
                data:{
                    testname:value
                }
            }).then((data)=>{
                console.log(data);
                if(data.data.success){
                    if(data.data.can_use){
                        this.setState({
                            checkingName:"success"
                        })
                        callback();
                    }
                    else{
                        this.setState({
                            checkingName:"error"
                        })
                        callback('Another test exist with same name.');
                    }
                }
                else{
                    this.setState({
                        checkingName:"success"
                    })
                    callback()
                }
            }).catch((ee)=>{
                console.log(ee);
                this.setState({
                    checkingName:"success"
                })
                callback()
            })
        }
        else{
            callback();
        }
    };


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="basic-test-form-outer">
                <div className="basic-test-form-inner">
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item label="Test Type"  hasFeedback>
                            {getFieldDecorator('type', {
                                initialValue : this.props.test.newtestFormData.testType,
                                rules: [{ required: true, message: 'Please select a test type' }],
                            })(
                                <Select
                                    placeholder="Test Type"
                                >
                                    <Option value="pre-test">Pre Test</Option>
                                    <Option value="post-test">Post Test</Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="Test Title"  hasFeedback validateStatus={this.state.checkingName}>
                            {getFieldDecorator('title', {
                                initialValue : this.props.test.newtestFormData.testTitle,
                                rules: [
                                    { required: true, message: 'Please give the test title' },
                                    { min:5, message: 'Title should be atleast 5 character long' },
                                    { validator: this.validateTestName }
                                ],

                            })(
                                <Input placeholder="Test Title" />
                            )}
                        </Form.Item>
                        <Form.Item label="Subjects"  hasFeedback>
                            {getFieldDecorator('subjects', {
                                initialValue : this.props.test.newtestFormData.testSubject,
                                rules: [{ required: true, message: 'Please select a test type' }],
                            })(
                                <Select
                                    mode="multiple"
                                    placeholder="Select one or more subjects"
                                    style={{ width: '100%' }}
                                    allowClear={true}
                                    optionFilterProp="s"
                                >
                                    {this.props.admin.subjectTableData.map(item => (
                                        <Select.Option key={item._id} value={item._id} s={item.topic}>
                                            {item.topic}
                                        </Select.Option>
                                    ))}
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="Subjects Durations in Minutes" hasFeedback>
                            {getFieldDecorator('duration', {
                                rules: [{ required: true, message: 'Please give test duration' }],
                            })(
                                <Input placeholder="Subjects Durations (30,60)"/>
                            )}
                        </Form.Item>
                        <Form.Item label="Organisation Name"  hasFeedback>
                            {getFieldDecorator('organisation', {
                                initialValue : this.props.test.newtestFormData.OrganisationName
                            })(
                                <Input placeholder="Organisation Name" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Upload
                                action=""
                                listType="text"
                                fileList={this.state.fileList}
                                onChange={this.handleChange}
                            >
                                <Button icon={<UploadOutlined />}>Upload</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Next
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}
const BasicTestForm = Form.create({ name: 'Basic Form' })(BasicTestFormO);

const mapStateToProps = state => ({
    test : state.test,
    admin:state.admin
});

export default connect(mapStateToProps,{
    changeStep,
    changeBasicNewTestDetails
})(BasicTestForm);