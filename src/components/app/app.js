import React from 'react';
import SearchPanel from '../search-panel';
import AppHeader from '../app-header';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';

const App = () => {

  const todoData = [
      {label: 'drink coffee', important: false, id: 1},
      {label: 'make awesome app', important: true, id: 2},
      {label: 'have a lunch', important: false, id: 3},
      {label: 'super puper', important: false, id: 4}
  ]
  return (
      <div>
          <AppHeader />
          <div className="top-panel d-flex">
              <SearchPanel />
              <ItemStatusFilter />
          </div>

          <TodoList todos={todoData} />
      </div>
  )
}

export default App;