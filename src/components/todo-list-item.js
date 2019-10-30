import React from 'react';

const TodoListItem = ({label, important}) => {
  const style = important ? 'tomato' : 'black';
  return <span style={{ color: style}}>{label}</span>
}

export default TodoListItem;