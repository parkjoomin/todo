import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';

const TodoPage = ({ onClose, date }) => {
  const [todoText, setTodoText] = useState('');
  const [todos, setTodos] = useState([]); // 추가: 투두리스트 상태 추가
  const [attachedFiles, setAttachedFiles] = useState([]);
  // 요일
  const daysOfWeekKorean = ['일', '월', '화', '수', '목', '금', '토'];
  // 월
  const monthsKorean = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

  // Date 객체에서 한글 요일과 월을 가져오는 함수
  const getKoreanDateInfo = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const dayOfWeek = daysOfWeekKorean[currentDate.getDay()];
    const day = currentDate.getDate();

    return `${year}년 ${monthsKorean[month]} ${day}일 (${dayOfWeek})`;
  };

  const handleSaveTodo = () => {
    // 투두리스트 저장 로직 추가
    const newTodo = {
      id: new Date().getTime(), // 간단한 방법으로 고유 ID 생성
      text: todoText,
      date: date.toDateString(),
      files: attachedFiles, // 파일 첨부 기능
    };

    setTodos([...todos, newTodo]);
    setTodoText('');
    setAttachedFiles([]); // 파일 첨부 기능
  };

  const handleDeleteTodo = (id) => {
    // 특정 투두리스트 삭제 로직 추가
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const onDrop = (acceptedFiles) => {
    // 추가: 파일을 상태에 추가
    setAttachedFiles([...attachedFiles, ...acceptedFiles]);
  };

 const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="modal-overlay">
      <div className="todo-modal">
        <h2>{getKoreanDateInfo()} To-do List</h2>
        <textarea value={todoText} onChange={(e) => setTodoText(e.target.value)} />
        <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
          <input {...getInputProps()} />
          <p>파일을 여기에 끌어 놓거나 클릭하세요.</p>
        </div>
        {attachedFiles.length > 0 && (
          <div>
            <h3>첨부된 파일:</h3>
            <ul>
              {attachedFiles.map((file) => (
                <li key={file.name}>
                  {file.name} ({file.size} bytes)
                </li>
              ))}
            </ul>
          </div>
        )}
        <button onClick={handleSaveTodo}>저장</button>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <span>{todo.text}</span>
              <button onClick={() => handleDeleteTodo(todo.id)}>삭제</button>
            </li>
          ))}
        </ul>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default TodoPage;
