import React, { useState } from 'react'
import { Empty, Button, Modal, Form, Input } from 'antd'
import 'antd/dist/antd.css'


export default function Main() {
  var [visible, setVisible] = useState(false)

  const showModal = () => setVisible(visible = true)

  const handleOk = e => setVisible(visible = false)

  const handleCancel = e => setVisible(visible = false)

  const { TextArea } = Input

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
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form
            name="basic"
            initialValues={{ remember: true }}
            style={{ display: 'flex', flexDirection: 'column' }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          >
            <Form.Item
              style={{display:'block', flexDirection:'column',alignItems:'flex-start'}}
              label="Title"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              style={{display:'block', flexDirection:'column',alignItems:'flex-start'}}
              label="Description"
              name="password"
            >
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{paddingRight:'16px'}}>
                  <Button type="ghost" htmlType="submit">
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
