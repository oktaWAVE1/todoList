import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._authData = {name: '', email: '', password:''}
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    setAuthData(authData) {
        this._authData = authData
    }

    setUser(user) {
        this._user = user
    }
    get isAuth() {
        return this._isAuth
    }

    get authData() {
        return this._authData
    }

    get user() {
        return this._user
    }


}