import React, { useState } from 'react'
import { Form, Input, Button, message } from 'antd'
import 'antd/dist/antd.css'
import { useHistory } from "react-router-dom"
import { styles } from '../components/style'

const axios = require('axios').default
export default function Login() {
  var history = useHistory();
  var [username, setUername] = useState('')
  var [password, setPassword] = useState('')
  var [token, setToken] = useState('')

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
    <div style={{ ...styles.backGroundFlex }}>
      <div style={{ ...styles.backgroundContent }}>
        <Form
          style={{paddingTop:'16px'}}
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
            label={<div style={{paddingRight:'3px'}}>Password</div>}
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password onChange={getPassword} />
          </Form.Item>

          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button block type="primary" htmlType="submit">
                Submit
            </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
