import React, { useState } from 'react'
import { Form, Input, Button, message } from 'antd'
import 'antd/dist/antd.css'
import { useHistory } from "react-router-dom"

const axios = require('axios').default
export default function Login () {
  let history = useHistory();
  let [username, setUername] = useState('')
  let [password, setPassword] = useState('')
  let [token, setToken] = useState('')

  const handleSubmit = () => {
    axios.post('https://candidate.neversitup.com/todo/users/auth', { username, password })
      .then(response => {
        setToken(token = response.data)
        history.push('/main', token)
      })
      .catch(error => {
        console.log('error', error)
        message.error('Fail! wrong username and password')
      })
  }

  const getUsername = (e) => {
    setUername(username = e.target.value)
  }

  const getPassword = (e) => {
    setPassword(password = e.target.value)
  }

  return (
    <div style={{ display: 'flex', flex: 1, height: '100vh', backgroundColor: '#f0f2f5', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: 'white', width: '30%', height: '50%', justifyContent: 'center', 
      alignItems: 'center', display:'flex', borderRadius:'5px' }}>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input onChange={getUsername} />
          </Form.Item>

          <Form.Item
            label="Password"
            onChange={getPassword}
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
