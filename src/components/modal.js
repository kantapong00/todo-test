import React, { useState } from 'react'
import { Button, Modal, Form, Input } from 'antd'
import { TextArea } from 'semantic-ui-react'
import { styles } from './style'

export default function MyModal(props) {
  var [title, setTitle] = useState('')
  var [description, setDescription] = useState('')

  const getTodoTitle = (e) => {
    var { detail } = props
    detail.title = e.target.value
  }

  const getTodoDescription = (e) => {
    var { detail } = props
    detail.description = e.target.value
  }

  const onChangeTitles = (e) => {
    setTitle(title = e.target.value)
  }

  const onChangeDescriptions = (e) => {
    setDescription(description = e.target.value)
  }

  return (
    <div>
      <Modal
        title={props.title}
        visible={props.visible}
        footer={null}
        destroyOnClose
      >
        <Form
          onFinish={props.detail === null ?
            () => props.handleOk(title, description)
            : () => props.onEdit(props.detail)
          }
          name="basic"
          initialValues={{ remember: true }}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <Form.Item
            style={{ ...styles.formItemStyle }}
            label="Title"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            {props.detail === null ?
              <Input onChange={onChangeTitles} placeholder='Todo Title' />
              : <Input onChange={getTodoTitle} defaultValue={props.detail.title} placeholder='Todo Title' />
            }
          </Form.Item>

          <Form.Item
            style={{ ...styles.formItemStyle }}
            label="Description"
            name="description"
          >
            {props.detail === null ?
              <TextArea style={{ ...styles.textAreaStyle }} onChange={onChangeDescriptions} />
              : <TextArea style={{ ...styles.textAreaStyle }} onChange={getTodoDescription}
                defaultValue={props.detail.description} />
            }
          </Form.Item>

          <Form.Item>
            <div style={{ ...styles.modalBtn }}>
              <div style={{ paddingRight: '16px' }}>
                <Button type="ghost" onClick={props.handleCancel}>
                  Cancel
              </Button>
              </div>
              <div>
                <Button type="primary" htmlType="submit">
                  {props.buttonText}
                </Button>
              </div>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}