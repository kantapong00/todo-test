/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Empty, Button, Modal, message, Card } from 'antd'
import 'antd/dist/antd.css'
import { ExclamationCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import _ from 'lodash'
import moment from 'moment'
import MyModal from '../components/modal'
import { styles } from '../components/style'

const axios = require('axios').default

export default function Main(props) {
  var [visible, setVisible] = useState(false)
  var [todos, setTodos] = useState([])
  var [selectTodo, setSelectedTodos] = useState({})

  useEffect(() => { getTodos() }, [...todos])

  const onCreate = (title, description) => {
    const vars = { title, description }
    axios.post('https://candidate.neversitup.com/todo/todos', vars,
      { headers: { Authorization: "Bearer " + props.location.state.token } })
      .then(response => {
        const newID = response.data._id
        const newData = {
          ...vars,
          _id: newID,
          createdAt: response.data.createdAt,
          updatedAt: response.data.updatedAt,
          user_id: response.data.user_id,
        }
        setTodos([...todos, newData])
        message.success('Create todo successful')
      })
      .catch(error => {
        console.log('error', error)
        message.error('Fail! something wrong')
      })
  }

  const getTodos = async () => {
    const result = await axios.get('https://candidate.neversitup.com/todo/todos',
      { headers: { Authorization: "Bearer " + props.location.state.token } })
      .then(response => {
        return response.data
      })
      .catch(e => {
        console.log(e)
        return []
      })
    setTodos(result)
  }

  const onDelete = (item) => {
    axios.delete(`https://candidate.neversitup.com/todo/todos/${item}`,
      { headers: { Authorization: "Bearer " + props.location.state.token } })
      .then((response) => {
        message.success('Delete todo successful')
        return setTodos(_.filter(todos, (each) => each._id !== item))
      })
      .catch(function (error) {
        message.success('Delete fail, something wrong')
        console.log('error', error)
      })
  }

  const onEdit = (item) => {
    axios.put(`https://candidate.neversitup.com/todo/todos/${item._id}`, { ...item },
      { headers: { Authorization: "Bearer " + props.location.state.token } })
      .then((response) => {
        const newID = response.data._id
        const newData = {
          ...item,
          _id: newID,
          createdAt: response.data.createdAt,
          updatedAt: response.data.updatedAt,
          user_id: response.data.user_id,
        }
        const editArr = todos.map((each) => item._id === each._id ? { ...newData } : each)
        setTodos(editArr)
        setVisible(visible = false)
        message.success('Edit todo successful')
      })
      .catch(function (error) {
        message.success('Edit fail, something wrong')
        console.log('error', error)
      })
  }

  const showModal = (isEdit, item) => {
    setVisible(visible = true)
    if (!!isEdit) {
      setSelectedTodos(item)
    }
  }

  const handleOk = (title, description) => {
    onCreate(title, description)
    setVisible(visible = false)
  }

  const handleCancel = e => setVisible(visible = false)

  const { confirm } = Modal
  const showConfirm = (item) => {
    confirm({
      title: `Are you sure delete this ${item.title}?`,
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        onDelete(item._id)
      },
      onCancel() {
      }
    })
  }

  const callTodoCard = () => {
    return todos.map((todoItem) => (
      <div style={{ ...styles.cardStyle }}>
        <Card title={todoItem.title} extra={moment(todoItem.updatedAt).format("DD MMM YYYY")} style={{ width: '80%' }}
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

  return (
    <div style={{ ...styles.backgrondMain }}>
      <div style={{ ...styles.mainContent }}>
        {todos.length !== 0 ? <div style={{ width: '80%' }}>{callTodoCard()}</div> :
          <Empty style={{ display:'content', paddingBottom:'24px' }} description="Empty press 'Create' for add new todo" />}
        <div style={{ ...styles.createStyle }} >
          <Button style={{ width: '300px' }} type="primary" onClick={showModal}>Create</Button>
        </div>
      </div>
      <MyModal
        detail={!selectTodo ? null : selectTodo}
        title={!selectTodo ? 'Create Todo' : 'Edit Todo'}
        visible={visible}
        handleOk={handleOk}
        onEdit={onEdit}
        handleCancel={handleCancel}
        buttonText={
          !selectTodo ? 'Create' : 'Edit'
        }
      />
    </div>
  )
}
