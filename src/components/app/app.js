import React, { Component } from 'react';
import AppHeader from '../app-header';
import ItemStatusFilter from '../item-status-filter';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemAddForm from '../item-add-form';

export default class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make awesome app'),
            this.createTodoItem('Have a lunch'),
            {
                label: 'hello',
                important: false,
                done: true,
                id: this.maxId++
            }
        ],
        term: '',
        filter: 'all' //active all done
    };

    createTodoItem(label) {
        return {            
            label: label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    deleteItem = (id) => {
        // return old state with destructuring
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id);
            const newArray = [ 
                ...todoData.slice(0, idx), 
                ...todoData.slice(idx + 1)
            ];

            return {
                todoData: newArray
            }
        })
    };

    addItem = (text) => {
        const newItem = this.createTodoItem(text);

        this.setState(({todoData}) => {
            return {
                todoData: [
                    ...todoData,
                    newItem
                ]
            };
        });
    };

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex(el => el.id === id);

        const oldItem = arr[idx];
        const newItem = {
            ...oldItem, 
            [propName]: !oldItem[propName]
        };
        return [ 
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
    }

    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        })
    };

    onToggleDone = (id) => {       
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        })
    };

    onSearchChange = (term) => {
        this.setState({term})
    };

    search(items, term) {
        if(term.length === 0) {
            return items;
        }
        return items.filter(item => {
            return item.label
                .toLowerCase()
                .includes(term.toLowerCase());
        })
    };

    filterItems(items, filter) {
        if(filter === 'active') {
            return items.filter(item => !item.done);
        }
        if(filter === 'done') {
            return items.filter(item => item.done);
        }
        if(filter === 'all') {
            return items;
        }
        return items;
    };

    onFilterChange = (filter) => {
        this.setState({filter})
    };

    render () {
        const {todoData, term, filter} = this.state;
        const visibleItems = this.filterItems(
            this.search(todoData, term), filter);
        const doneCount = todoData.filter(el => el.done).length;
        const todoCount = todoData.length - doneCount;
        return (
            <div>
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter
                        filter={filter}
                        onFilterChange={this.onFilterChange}/>
                </div>
                <ItemAddForm onItemAdded={ this.addItem } />
                <TodoList 
                  todos={visibleItems}
                  onDeleted={ this.deleteItem }
                  onToggleDone={ this.onToggleDone }
                  onToggleImportant={ this.onToggleImportant }
                 />
            </div>
        )
    }  
}