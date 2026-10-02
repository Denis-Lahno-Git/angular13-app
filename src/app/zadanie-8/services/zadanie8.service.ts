import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToDo {
  id: number,
  title: string,
  content: string,
  check: boolean,
  prioriti: 1| 2| 3,
  isPrivate: boolean
  isCreater: string
  dateAndTime: number
  likeUsers: string[]
}

export interface User {
  idUser: number
  loginUser: string
  passwordUser: string
  nameUser: string
  isAdmin: boolean
}

@Injectable({
  providedIn: 'root'
})
export class Zadanie8Service {

  private todoSabj = new BehaviorSubject<ToDo[]>([])

  streamSabj$ = this.todoSabj.asObservable()

  isAdmin: boolean = false

  userDB: User[] = [
    {idUser: 1, loginUser: 'Pol', passwordUser: 'Pol', nameUser: 'Pol_MC', isAdmin: false},
    {idUser: 2, loginUser: 'John', passwordUser: 'John', nameUser: 'John_LN', isAdmin: false},
    {idUser: 3, loginUser: 'Ringo', passwordUser: 'Ringo', nameUser: 'Ringo_ST', isAdmin: false},
    {idUser: 4, loginUser: 'admin', passwordUser: 'admin', nameUser: 'Admin', isAdmin: true}
  ]

  forLocalCreater: string = 'unknownUser'

  forLocalAdmin: boolean = false

  isCreaterUser: string = 'unknownUser'

  allTodo: ToDo[] = []

  defoltToDo: ToDo[] = [
      {id: 11, title: 'Admin title', content: 'Admin content', check: false, prioriti: 3, isPrivate: true, isCreater: 'Admin', dateAndTime: 0, likeUsers: []},
      {id: 2, title: 'Ringo title', content: 'Ringo content', check: false, prioriti: 3, isPrivate: true, isCreater: 'Ringo_ST', dateAndTime: 0, likeUsers: []},
      {id: 3, title: 'user title', content: 'user content', check: false, prioriti: 3, isPrivate: true, isCreater: 'unknownUser', dateAndTime: 0, likeUsers: []},
      {id: 4, title: 'Pol title', content: 'Pol content', check: false, prioriti: 3, isPrivate: true, isCreater: 'Pol_MC', dateAndTime: 0, likeUsers: []},
      {id: 5, title: 'John title', content: 'John content', check: false, prioriti: 3, isPrivate: true, isCreater: 'John_LN', dateAndTime: 0, likeUsers: []},
    ]

  private STORAGE_KEY = 'todos'

  private CREATER_KEY = 'createrLocal'

  private ADMIN_KEY = 'adminLocal'
  
  constructor() {
    const raw = localStorage.getItem(this.STORAGE_KEY)
    if(raw){
      this.allTodo = JSON.parse(raw)
    }else{
      this.allTodo = this.defoltToDo
    }
    this.todoSabj.next(this.allTodo)

    const user = localStorage.getItem(this.CREATER_KEY)
    if(user){
      this.isCreaterUser = JSON.parse(user)
    } else {
      this.isCreaterUser = this.forLocalCreater
    }

    const admin = localStorage.getItem(this.ADMIN_KEY)
    if(admin){
      this.isAdmin = JSON.parse(admin)
    } else {
      this.isAdmin = this.forLocalAdmin
    }
  }

  private saveToStorage(){
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.allTodo))
  }

  private saveCreaterLocal(){
    localStorage.setItem(this.CREATER_KEY, JSON.stringify(this.isCreaterUser))
  }

  private saveAdminLocal(){
    localStorage.setItem(this.ADMIN_KEY, JSON.stringify(this.isAdmin))
  }

  get(){
    this.todoSabj.next(this.allTodo)
  }

  deleteTodo(id: number){
    const value = this.todoSabj.getValue()
    const res = value.filter(todo => todo.id !==id)
    
    this.allTodo = res
    this.saveToStorage()
    this.todoSabj.next(this.allTodo)
  }

  addTodo(id: number, title: string, content: string, check: boolean, prioriti: 1| 2| 3, isPrivate: boolean){
    const value = this.todoSabj.getValue()
    
    if(value.some(item => item.id === id)){

      const index = value.findIndex(item => item.id === id)

      const editTodo = {
        ...value[index],
        // isCreater: isCreater,
        title: title,
        content: content,
        isPrivate: isPrivate,
        dateAndTime: Date.now(),
      }
      
      value[index] = editTodo

      // this.allTodo = value
      this.saveToStorage()
      this.todoSabj.next([...value])

    } else {

    const newTodo = {
      id: id,
      title: title,
      content: content,
      check: check,
      prioriti: prioriti,
      isPrivate: isPrivate,
      isCreater: this.isCreaterUser,
      dateAndTime: Date.now(),
      likeUsers: []
        
    }

    this.allTodo = [...value, newTodo]
    this.saveToStorage()
    this.todoSabj.next(this.allTodo)
  }
}

  // adminTrue(){
  //   this.isAdmin = true
  //   this.isCreaterUser = 'admin'
  //   this.saveCreaterLocal()
  // }

  // adminFalse(){
  //   this.isAdmin = false
  //   this.isCreaterUser = 'unknownUser'
  //   this.saveCreaterLocal()
  // }

  userTrue(user: string){
    this.isCreaterUser = user

    let resUser = this.userDB.filter(item => item.nameUser === user)
    this.isAdmin = resUser[0].isAdmin

    this.saveCreaterLocal()
    this.saveAdminLocal()
  }

  userFalse(){
    this.isCreaterUser = 'unknownUser'
    this.isAdmin = false
    this.saveCreaterLocal()
    this.saveAdminLocal()
  }

  filterOnLitteral(search: string, callBack: any){
    if(search === '@'){
      callBack(true)
    } else {
      callBack(false)
    const searchRes = search.trim().toLowerCase()

    if(searchRes === ''){
      this.todoSabj.next(this.allTodo)
      return
    }
    const res = this.allTodo.filter(item =>{
      return item.title.toLowerCase().includes(searchRes)
      || item.content.toLowerCase().includes(searchRes)
      || item.isCreater.toLowerCase().includes(searchRes)
    })

    this.todoSabj.next(res)
  }
  }

  like(id: number, creater: string){
    if(creater === 'unknownUser' || creater === '' || creater === ""){
      alert('Пройдите авторизацию')
    } else {
    let copy = [...this.allTodo]
    copy.map(item => {
      if(item.id === id){
        if(item.likeUsers.includes(creater)){
          let value = item.likeUsers.filter( item=>{
            return item !== creater
          })
          item.likeUsers = value
        } else {
          item.likeUsers.push(creater)
        }
      }
    })

    this.allTodo = copy
    this.saveToStorage()
    }
  }

}



