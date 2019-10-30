import React from 'react';
import ReactDOM from 'react-dom';
import SearchPanel from './components/search-panel';
import AppHeader from './components/app-header';
import TodoList from './components/todo-list';

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
            <SearchPanel />
            <TodoList todos={todoData} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));