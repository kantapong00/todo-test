import React, { useState } from 'react'
import { Button, Modal, Form, Input } from 'antd'

export default function MyModal(props) {
  const { TextArea } = Input
  return (
    <div>
    <Modal
      title="Create Todo"
      visible={props.visible}
      footer={null}
      destroyOnClose
    >
      <Form
        onFinish={props.handleOk}
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
          <Input onChange={props.getTodoTitle} />
        </Form.Item>

        <Form.Item
          style={{display:'block', flexDirection:'column',alignItems:'flex-start'}}
          label="Description"
          name="password"
        >
          <TextArea rows={4} onChange={props.getTodoDescription} />
        </Form.Item>

        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{paddingRight:'16px'}}>
              <Button type="ghost" onClick={props.handleCancel}>
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
  )
}