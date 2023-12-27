// UserTodoPage.js

import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/UserTodoPage.css'; // CSS 파일을 import

const UserTodoPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  // 가상의 사용자 데이터 (Django 서버와의 통합 후에는 서버에서 받은 데이터를 사용)
  const userData = {
    1: { id: 1, name: 'User1', color: '#FF5733', todos: ['Todo 1', 'Todo 2'] },
    2: { id: 2, name: 'User2', color: '#33FF57', todos: ['Todo 3', 'Todo 4'] },
  };

  const user = userData[userId];

  if (!user) {
    // 사용자가 없으면 홈 페이지로 이동
    navigate('/');
    return null;
  }

  const TodoList = () => {
    const [completedTodos, setCompletedTodos] = React.useState([]);

    const handleCompleteClick = (index) => {
      setCompletedTodos((prevCompletedTodos) => {
        const isAlreadyCompleted = prevCompletedTodos.includes(index);

        if (isAlreadyCompleted) {
          // 이미 완료된 상태이면 제거
          return prevCompletedTodos.filter((completedIndex) => completedIndex !== index);
        } else {
          // 아직 완료되지 않은 상태이면 추가
          return [...prevCompletedTodos, index];
        }
      });
    };

    return (
      <ul>
        {user.todos.map((todo, index) => (
          <li key={index} className={`todo-item ${completedTodos.includes(index) ? 'completed' : ''}`}>
            <label>{todo}</label>
            <button onClick={() => handleCompleteClick(index)}>완료</button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h1>{user.name}'s Todo List</h1>
      <TodoList />

      <button onClick={() => console.log('Edit')}>수정</button>
      <button onClick={() => console.log('Delete')}>삭제</button>
    </div>
  );
};

export default UserTodoPage;
