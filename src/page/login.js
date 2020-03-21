import React from 'react'
import { Form, Input, Button } from 'antd'
import 'antd/dist/antd.css'

export default function Login() {
  return (
    <div style={{ display: 'flex', flex: 1, height: '100vh', backgroundColor: '#f0f2f5', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: 'white', width: '30%', height: '50%', justifyContent: 'center', 
      alignItems: 'center', display:'flex', borderRadius:'5px' }}>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
        </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
