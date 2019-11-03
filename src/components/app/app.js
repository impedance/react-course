import React, { Component } from 'react';
import AppHeader from '../app-header';
import ItemStatusFilter from '../item-status-filter';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemAddForm from '../item-add-form';

export default class App extends Component {

    maxId = 100;

    state = {
        todoData : [
            this.createTodoItem('Drink COffee'),
            this.createTodoItem('Make awesome app'),
            this.createTodoItem('Have a lunch')
        ]
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
    }

    addItem = (text) => {
        const newItem = this.createTodoItem(text)

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
        }
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
    }

    onToggleDone = (id) => {       
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        })
    }

    render () {
        const { todoData } = this.state;
        const doneCount = todoData.filter(el => el.done).length;
        const todoCount = todoData.length - doneCount;
        return (
            <div>
                
                <AppHeader toDo={todoCount} done={doneCount} />
                
                <div className="top-panel d-flex">
                    <SearchPanel />                    
                    <ItemStatusFilter />
                </div>
                <ItemAddForm onItemAdded={ this.addItem } />
                <TodoList 
                  todos={todoData}
                  onDeleted={ this.deleteItem }
                  onToggleDone={ this.onToggleDone }
                  onToggleImportant={ this.onToggleImportant }
                 />
                
            </div>
        )
    }  
}