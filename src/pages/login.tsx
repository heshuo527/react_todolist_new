import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import './login.css'


const Login: React.FC = () => {

    const navigate = useNavigate();

    const onFinish = (values: any) => {
        console.log('Success:', values);
        navigate('/home')
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='login-pages'>
            <header className='todo-header'>
                <h1>TodoLost后台管理系统</h1>
            </header>
            <nav className='todo-nav'>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className='login-from'
                >
                    <Form.Item
                        label="用户"
                        name='useName'
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name='password'
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                        <Checkbox>记住密码</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type='primary' htmlType='submit' >
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </nav>
            <footer className='todo-foot'>
            </footer>
        </div>
    )
}

export default Login