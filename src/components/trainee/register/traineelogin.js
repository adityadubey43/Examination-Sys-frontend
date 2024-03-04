import React, { Component } from 'react';
import { Form, Icon, Input, Button, Typography } from 'antd';
import apis from '../../../services/Apis';
import { Post } from '../../../services/axiosCall';
import Alert from '../../common/alert';
import './trainerRegister.css';
import logo from '../../../assets/logo.png'

const { Title } = Typography;

class LoginForm extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                Post({
                    url: apis.LOGIN_ENDPOINT,
                    data: {
                        emailid: values.email,
                        password: values.password
                    }
                }).then((data) => {
                    console.log(data);
                    const user = data.data.user;
                    if (data.data.success) {
                        // Handle successful login, redirect or set state accordingly
                        const testLink = `${window.location.protocol}//${window.location.host}/trainee/taketest?testid=${user.testid._id}&traineeid=${user._id}`;
                        console.log(testLink)
                        window.location.replace(testLink);
                    } else {
                        this.props.form.resetFields();
                        Alert('error', 'Error!', data.data.message);
                    }
                }).catch((error) => {
                    console.log(error);
                    this.props.form.resetFields();
                    Alert('error', 'Error!', "Server Error");
                })
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="">
                <div style={{width:'100px',height:'100%' ,marginLeft:'40%'}}>
                    <img src={logo} alt="" style={{width:'200px',height:'100%' ,marginLeft:'50%',marginTop:'50px',marginBottom:'15px'}} />
                </div>
                <div style={{width:'400px',height:'400px', border:'1px solid grey',marginLeft:'auto',marginRight:'auto'}}>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <p style={{textAlign:'center',backgroundColor:'#ededed',color:'#0066b2',fontWeight:'bold',height:'60px',paddingTop:'20px'}} >Login</p>
                    <div style={{margin:'10px'}}>
                        <Form.Item style={{fontWeight:'bold'}}  label="User Name">
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Please input your email!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                        )}
                    </Form.Item>
                    <Form.Item style={{fontWeight:'bold'}}  label="Password">
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{width:'100%',backgroundColor:'#002D62'}}>
                            Log in
                        </Button>
                        <p style={{ color:'black',fontWeight:'bold',fontSize:'12px',textAlign:'center'}}>Do not click multiple times on Login Button</p>
                    </Form.Item>

                    </div>
                    
                </Form>
                </div>
                
            </div>
        );
    }
}

const Login = Form.create({ name: 'login' })(LoginForm);
export default Login;
