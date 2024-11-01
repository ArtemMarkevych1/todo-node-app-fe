import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchTodosRequest,
  addTodoRequest,
  toggleTodoRequest,
  deleteTodoRequest,
} from './store/slices/todoSlice'
import {
  Layout,
  List,
  Checkbox,
  Input,
  Button,
  Typography,
  Space,
  Alert,
  Card,
  Spin,
  notification
} from 'antd'
import { DeleteOutlined, PlusOutlined, CheckCircleOutlined } from '@ant-design/icons'
import './App.css'
import { getRandomCongrats } from './constants/congratsMessages'

const { Header, Content } = Layout
const { Title } = Typography

function App() {
  const dispatch = useDispatch()
  const { todos, loading, error } = useSelector((state) => state.todos)
  const [newTodoText, setNewTodoText] = useState('')
  const [api, contextHolder] = notification.useNotification()

  useEffect(() => {
    dispatch(fetchTodosRequest())
  }, [dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newTodoText.trim()) return
    dispatch(addTodoRequest(newTodoText))
    setNewTodoText('')
  }

  const handleToggle = (id, completed) => {
    dispatch(toggleTodoRequest({ id, completed: !completed }))
  }

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodoRequest(id))
    api.success({
      message: 'Task Completed!',
      description: getRandomCongrats(),
      icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
      placement: 'topRight',
      duration: 3,
    })
  }

  return (
    <Layout className="layout">
      {contextHolder}
      <Header className="header">
        <Title level={2} style={{ color: 'white', margin: 0 }}>
          Todo List
        </Title>
      </Header>

      <Content className="content">
        <Card>
          {error && (
            <Alert
              message="Error"
              description={error}
              type="error"
              showIcon
              style={{ marginBottom: 16 }}
            />
          )}

          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <form onSubmit={handleSubmit} className="add-todo-form">
              <Space 
                direction={{ xs: 'vertical', sm: 'horizontal' }} 
                style={{ width: '100%', display: 'flex' }} 
                size={8}
              >
                <Input
                  value={newTodoText}
                  onChange={(e) => setNewTodoText(e.target.value)}
                  placeholder="Enter new todo"
                  size="large"
                  style={{ flex: 1 }}
                />
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleSubmit}
                  size="large"
                  style={{ width: { xs: '100%', sm: 'auto' } }}
                >
                  Add
                </Button>
              </Space>
            </form>

            <Spin spinning={loading}>
              <List
                dataSource={todos}
                renderItem={(todo) => (
                  <List.Item
                    key={todo._id}
                    actions={[
                      <Button
                        key="delete"
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDeleteTodo(todo._id)}
                      />
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <Checkbox
                          checked={todo.completed}
                          onChange={() => handleToggle(todo._id, todo.completed)}
                        />
                      }
                      title={
                        <span style={{
                          textDecoration: todo.completed ? 'line-through' : 'none',
                          color: todo.completed ? '#888' : 'inherit'
                        }}>
                          {todo.text}
                        </span>
                      }
                    />
                  </List.Item>
                )}
              />
            </Spin>
          </Space>
        </Card>
      </Content>
    </Layout>
  )
}

export default App
