import {makeAutoObservable} from "mobx";

export default class TaskStore {
    constructor() {
        this._tasks = []
        this._editTask = {show: false, name: '', email: '', text: ''}
        this._newTask = {show: false, name: '', email: '', text: ''}
        this._pagesCount = 1
        this._pages = []
        this._currentPage = 1
        this._order = 'name'
        this._orderDirection = 'ASC'
        makeAutoObservable(this)
    }


    setTasks(tasks) {
        this._tasks = tasks
    }


    setNewTask(newTask) {
        this._newTask = newTask
    }

    setEditTask(editTask) {
        this._editTask = editTask
    }

    setPagesCount(pagesCount) {
        this._pagesCount = pagesCount
    }

    setPages(pages) {
        this._pages = pages
    }

    setCurrentPage(currentPage) {
        this._currentPage = currentPage
    }

    setOrder(order) {
        this._order = order
    }

    setOrderDirection(orderDirection) {
        this._orderDirection = orderDirection
    }

    get tasks() {
        return this._tasks
    }

    get editTask() {
        return this._editTask
    }

    get newTask() {
        return this._newTask
    }

    get pagesCount() {
        return this._pagesCount
    }

    get pages() {
        return this._pages
    }

    get currentPage() {
        return this._currentPage
    }

    get order() {
        return this._order
    }

    get orderDirection() {
        return this._orderDirection
    }

}

