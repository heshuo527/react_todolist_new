import React, { useEffect, useState } from 'react'
import { Layout, Table, Button, Input, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import './home.css'

const { Header, Content } = Layout;

interface TodoListProps {
    key: number
    id: number
    content: string
    done: boolean
    time: number
}

const Home: React.FC = () => {

    let [inpOnChange, setOnChange] = useState('')
    const [todoList, setTodoList] = useState<Array<TodoListProps>>([])

    const columns: ColumnsType<TodoListProps> = [
        {
            title: '事项',
            dataIndex: 'name',
            key: 'name',
            render: (_, { content, done }) => (
                <div className={done ? 'todo-content-true' : 'todo-content-false'}>{content}</div>
            ),
        },
        {
            title: '时间',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { time }) => (
                <span>{getTime(time)}</span>
            ),
        },
        {
            title: '操作',
            key: 'action',
            render: (_, { id }) => (
                <>
                    <Button onClick={() => todoDone(id)} className='home-button-done' type='primary'>完成</Button>
                    <Button onClick={() => deleteTodo(id)} danger>删除</Button>
                </>
            ),
        },
    ];

    const getTime = (time: number | Date) => {
        const d = new Date(time)
        const year = d.getFullYear()
        const mont = d.getMonth() + 1
        const day = d.getDate()
        const hour = d.getHours()
        const minute = d.getMinutes()
        const second = d.getSeconds()
        return year + '-' + mont + '-' + day + ' ' + hour + ':' + minute + ':' + second
    }
    /**
     * 增加一个todo
     */
    const addTodo = () => {
        if (inpOnChange === '') {
            message.error('输入不能为空')
            return
        }
        let timestamp = new Date().getTime()
        const todo = {
            key: timestamp,
            id: timestamp,
            content: inpOnChange,
            done: false,
            time: timestamp
        }
        setTodoList([...todoList, todo])
        saveTodo([...todoList, todo])
        message.success('添加成功')
    }
    /**
     * 删除一个todo
     */
    const deleteTodo = (id: number) => {
        const todo = [...todoList]
        const newTodo = todo.filter(item => item.id !== id)
        setTodoList([...newTodo])
        saveTodo(newTodo)
        message.error('删除成功')
    }
    /**
   * 更新一个todo
   */
    const todoDone = (id: number) => {
        const todo = [...todoList]
        todo.forEach(item => {
            if (item.id === id) {
                if (item.done === false) {
                    item.done = true
                    message.warning('已完成')
                } else {
                    item.done = false
                    message.warning('已取消')
                }
            }
        })
        setTodoList([...todo])
        saveTodo([...todo])
    }

    const saveTodo = (arr: Array<TodoListProps>) => {
        localStorage.todoList = JSON.stringify(arr)
    }
    const loadTodo = () => {
        const todo = localStorage.todoList
        if (todo) {
            setTodoList(JSON.parse(todo))
        } else {
            setTodoList([])
        }
    }

    useEffect(() => {
        loadTodo()
    })

    return (
        <Layout>
            <Header className="header">
                <div className="logo"><h2>TodoList数据管理</h2></div>
            </Header>
            <Layout>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <Input className='todo-home-inp' value={inpOnChange} placeholder='请输入事项' onChange={(e) => setOnChange(e.target.value)} />
                        <Button type='primary' onClick={() => addTodo()}>增加</Button>
                        <Table className='todo-home-tab' columns={columns} dataSource={todoList} />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default Home