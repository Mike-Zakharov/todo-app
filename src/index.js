import React, { Component } from "react";
import ReactDOM from 'react-dom/client';

import AppHeader from './components/app-header';
import SearchPanel from './components/search-panel';
import TodoList from './components/todo-list';
import ItemStatusFilter from './components/item-status-filter';
import ItemAddForm from './components/item-add-form';

import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));


export default class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffe'),
            this.createTodoItem('Learn React'),
            this.createTodoItem('Build React App'),
        ],
        term: '',
        filter: 'all'     // all, active, done 
    };



// Создание нового элемента списка
    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    };


// Добавление элемента списка
    addItem = (text) => {

        if(text === ''){
            return false;
        } else {
            const newItem = this.createTodoItem(text);

            this.setState (({ todoData }) => {
                
                const newArr = [
                    ...todoData,
                    newItem
                ]

                return {
                    todoData: newArr
                }
            });
        }
    };


// Удаление  элемента списка
    deliteItem = (id) => {
        this.setState (({ todoData }) => {
           const idx = todoData.findIndex((el) => el.id === id);

           const beforeElement = todoData.slice(0, idx);
           const afterElement = todoData.slice(idx + 1);

           const newArray = [ ...beforeElement, ...afterElement ];

           return {
            todoData: newArray
           }
        });
    };


// Изменение статуса элемента списка Done и Important

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);

        // Обновляем объект и меняем значение done
        const oldItem = arr[idx];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};

        // Возвращаем новый массив
        return [ 
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1) ];   
    }

    onToggleDone = (id) => {
        this.setState(({ todoData }) =>{
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            } 
        });    
    };

    onToggleImportant = (id) => {
        this.setState(({ todoData }) =>{
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            } 
        }); 
    };

    // Реализуем поиск
    search(items, term) {
        if( term.length === 0 ) {
            return items;
        }

        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        });
    };

    onSearchChange = (term) => {
        this.setState({ term });
    };

    onFilterChange = (filter) => {
        this.setState({ filter });
    };


    // Реализуем фильтр отображения айтемов all, active, done

    filter (items, filter) {
        switch(filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                return items;
        }
    }




// Рендеринг
    render() {

        const { todoData, term, filter } = this.state;

        const visibleItems = this.filter(this.search(todoData, term), filter);

        // Считаем количество элементов которые выполнены
        const doneCount = todoData.filter((el) => el.done).length;

        // Считаем количество элементов которые ещё не выполнены
        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader toDo={ todoCount } done={ doneCount }/>
                <div className="search-filter">
                    <SearchPanel 
                    onSearchChange = {this.onSearchChange}/> 
                    <ItemStatusFilter
                        filter={ filter }
                        onFilterChange= {this.onFilterChange}/>
                </div>
                <TodoList todos={visibleItems} 
                onDelited = { this.deliteItem }
                onToggleDone = { this.onToggleDone }
                onToggleImportant = { this.onToggleImportant }/>
                <ItemAddForm
                onAdded = { this.addItem } />
            </div>
        )
    };
}
    

root.render(<App />);

