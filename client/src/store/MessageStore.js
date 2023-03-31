import {makeAutoObservable} from "mobx";

export default class MessageStore {
    constructor() {
        this._message = {show: false, text: '', variant: 'danger'}
        makeAutoObservable(this)
    }

    setMessage(message) {
        this._message = message
    }

    get message() {
        return this._message
    }


}