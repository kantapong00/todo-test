import React, { useState } from 'react'
import { Empty, Button, Modal, Form, Input, message, Card } from 'antd'
import 'antd/dist/antd.css'

const axios = require('axios').default
export default function Main(props) {
  var [visible, setVisible] = useState(false)
  var [title, setTitle] = useState('')
  var [description, setDescription] = useState('')

  const onCreate = () => {
    axios.post('https://candidate.neversitup.com/todo/todos', { title, description }, 
    {headers: { Authorization: "Bearer " + props.location.state.token }})
      .then(response => {
        console.log('yeah',response)
      })
      .catch(error => {
        console.log('error', error)
        message.error('Fail! wrong username and password')
      })
  }

  const showModal = () => setVisible(visible = true)

  const handleOk = e => {
    onCreate()
    setVisible(visible = false)
  }

  const handleCancel = e => setVisible(visible = false)

  const getTodoTitle = (e) => {
    setTitle(title = e.target.value)
  }

  const getTodoDescription = (e) => {
    setDescription(description = e.target.value)
  }

  const { TextArea } = Input
  console.log('props',props)
  console.log('description',description)
  return (
    <div style={{ display: 'flex', flex: 1, height: '100vh', backgroundColor: '#f0f2f5', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{
        backgroundColor: 'white', width: '80%', height: '80%', justifyContent: 'center',
        alignItems: 'center', display: 'flex', borderRadius: '5px', flexDirection: 'column'
      }}>
        <Empty style={{ position: 'absolute' }} description="Empty press 'Create for add new todo" />
        <div style={{ display: 'flex', flex: 1, alignItems: 'flex-end', paddingBottom: '24px' }} >
          <Button type="primary" onClick={showModal}>Create</Button>
        </div>
      </div>
      <div>
        <Modal
          title="Create Todo"
          visible={visible}
          footer={null}
          destroyOnClose
        >
          <Form
            onFinish={handleOk}
            name="basic"
            initialValues={{ remember: true }}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <Form.Item
              style={{display:'block', flexDirection:'column',alignItems:'flex-start'}}
              label="Title"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input onChange={getTodoTitle} />
            </Form.Item>

            <Form.Item
              style={{display:'block', flexDirection:'column',alignItems:'flex-start'}}
              label="Description"
              name="password"
            >
              <TextArea rows={4} onChange={getTodoDescription} />
            </Form.Item>

            <Form.Item>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{paddingRight:'16px'}}>
                  <Button type="ghost" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
                <div>
                  <Button type="primary" htmlType="submit">
                    Create
                  </Button>
                </div>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  )
}
