/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Empty, Button, Modal, Form, Input, message, Card } from 'antd'
import 'antd/dist/antd.css'
import { ExclamationCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import _ from 'lodash'

const axios = require('axios').default
export default function Main(props) {
  var [visible, setVisible] = useState(false)
  var [title, setTitle] = useState('')
  var [description, setDescription] = useState('')
  var [todos, setTodos] = useState([])
  var [selectTodo, setSelectedTodos] = useState({})

  const onCreate = () => {
    const vars = { title, description }
    axios.post('https://candidate.neversitup.com/todo/todos', vars,
      { headers: { Authorization: "Bearer " + props.location.state.token } })
      .then(response => {
        console.log('yeah', response)
        const newID = response.data._id
        const newData = {
          ...vars,
          _id: newID,
          createdAt: response.data.createdAt,
          updatedAt: response.data.updatedAt,
          user_id: response.data.user_id,
        }
        setTodos([...todos, newData])
      })
      .catch(error => {
        console.log('error', error)
        message.error('Fail! wrong username and password')
      })
  }

  useEffect(() => {
    getTodos()
  }, [...todos])

  const getTodos = async () => {
    const result = await axios.get('https://candidate.neversitup.com/todo/todos',
      { headers: { Authorization: "Bearer " + props.location.state.token } })
      .then(response => {
        // setTodos(todos = response.data)
        return response.data
      })
      .catch(e => {
        console.log(e)
        return []
      })
    setTodos(result)
  }

  console.log('todos', todos)

  const onDelete = (item) => {
    axios.delete(`https://candidate.neversitup.com/todo/todos/${item}`,
      { headers: { Authorization: "Bearer " + props.location.state.token } })
      .then((response) => {
        message.success('Delete transaction successful')
        return setTodos(_.filter(todos, (each)=> each._id !== item))
      })
      .catch(function (error) {
        console.log('error', error)
      })
  }

  const onEdit = (item) => {  
    console.log('newItem', item._id)
    // axios.put(`https://assignment-api.dev.witsawa.com/transactions/${selectedID}`, { ...newData })
    //   .then(() => {
    //     this.setState({ onClickEdit: false, selectedID: null })
    //     message.success('Edit transaction successful')
    //   })
    //   .catch(function (error) {
    //     console.log('error', error)
    //   })
  }

  const showModal = (isEdit, item) => {
    setVisible(visible = true)
    if (!!isEdit) {
      setSelectedTodos(item)
    }
  }

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

  const { confirm } = Modal

  const showConfirm = (item) => {
    confirm({
      title: 'Are you sure delete this task?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        onDelete(item._id)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const callTodoCard = () => {
    return todos.map((todoItem, todoIndex) => (
      <div style={{ paddingBottom: '16px', width: '80%', display: 'flex', justifyContent: 'center' }}>
        <Card title={todoItem.title} style={{ width: '80%' }}
          actions={[
            <EditOutlined key="edit" onClick={() => showModal(true, todoItem)} />,
            <DeleteOutlined key='delete' onClick={() => showConfirm(todoItem)} />,
          ]}>
          <p>{todoItem.description}</p>
        </Card>
      </div>
    )
    )
  }

  const { TextArea } = Input
  return (
    <div style={{ display: 'flex', flex: 1, height: '100vh', backgroundColor: '#f0f2f5', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{
        backgroundColor: 'white', width: '80%', height: '80%', justifyContent: 'center',
        alignItems: 'center', display: 'flex', borderRadius: '5px', flexDirection: 'column'
      }}>
        {todos.length !== 0 ? <div style={{ width: '80%' }}>{callTodoCard()}</div> :
          <Empty style={{ position: 'absolute' }} description="Empty press 'Create' for add new todo" />}
        <div style={{ display: 'flex', flex: 1, alignItems: 'flex-end', paddingBottom: '24px' }} >
          <Button type="primary" onClick={showModal}>Create</Button>
        </div>
      </div>
      <div>
        <Modal
          title={!selectTodo ? 'Create Todo' : 'Edit Todo'}
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
              style={{ display: 'block', flexDirection: 'column', alignItems: 'flex-start' }}
              label="Title"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              {!selectTodo ? <Input onChange={getTodoTitle} /> : <Input onChange={getTodoTitle} defaultValue={selectTodo.title} />}
            </Form.Item>

            <Form.Item
              style={{ display: 'block', flexDirection: 'column', alignItems: 'flex-start' }}
              label="Description"
              name="description"
            >
              {!selectTodo ? <TextArea rows={4} onChange={getTodoDescription} /> :
                <TextArea rows={4} onChange={getTodoDescription} defaultValue={selectTodo.description} />}
            </Form.Item>

            <Form.Item>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ paddingRight: '16px' }}>
                  <Button type="ghost" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
                <div>
                  {!selectTodo ?
                    <Button type="primary" htmlType="submit">
                      Create
                  </Button> :
                    <Button type="primary" onClick={onEdit}>
                      Edit
                </Button>}
                </div>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  )
}
