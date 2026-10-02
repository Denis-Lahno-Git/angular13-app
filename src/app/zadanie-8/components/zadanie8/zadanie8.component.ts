import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToDo, Zadanie8Service} from '../../services/zadanie8.service';
import { Subscription } from 'rxjs';
import { UserInfoPublik, UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-zadanie8',
  templateUrl: './zadanie8.component.html',
  styleUrls: ['./zadanie8.component.css']
})
export class Zadanie8Component implements OnInit, OnDestroy {

  private podpiska!: Subscription

  private podpiskaOnUserStream!: Subscription

  dataTodo: ToDo[] = []

  isOpenModal: boolean = false

  logWindowOpen: boolean = false

  isAdmin: boolean = false

  isHoverLike: number | null = null

  isCreaterUser: string = ''

  public currentEditId: number | null = null

  search: string = ''

  isSearchByUser: boolean = false

  isSortOpen: boolean = false

  userInfo: UserInfoPublik[] = []

  constructor(
    private service: Zadanie8Service, 
    private userService: UserServiceService
    ) { }

  ngOnInit(): void {
    this.podpiska = this.service.streamSabj$.subscribe({
      next: (value) => {
        this.dataTodo = value
      }
    })
    this.service.get()

    this.podpiskaOnUserStream = this.userService.streamUserSubj$.subscribe({
      next: (value) => {
        this.userInfo = value
      }
    })
    this.userService.get()

    this.isCreaterUser = this.service.isCreaterUser
    this.isAdmin = this.service.isAdmin
  }

  modalOpen(){
    this.isOpenModal = true
  }

  modalClose(){
    this.currentEditId = null
    this.isOpenModal = false
  }

  deleteTodo(id: number){
    this.service.deleteTodo(id)
  }

  add(newTodo: ToDo){
    this.service.addTodo(newTodo.id, newTodo.title, newTodo.content, newTodo.check, newTodo.prioriti, newTodo.isPrivate)
  }

  edit(todo: ToDo){
   this.currentEditId = todo.id
  }

  logWindow(){
    this.logWindowOpen = !this.logWindowOpen
  }

  // logInAdmin(){
  //   this.service.adminTrue()
  //   this.logWindowOpen = !this.logWindowOpen
  //   this.isAdmin = this.service.isAdmin
  //   this.isCreaterUser = this.service.isCreaterUser
  // }

  // logOutAdmin(){
  //   this.service.adminFalse()
  //   this.buttonLogIn = !this.buttonLogIn
  //   this.isAdmin = this.service.isAdmin
  //   this.isCreaterUser = this.service.isCreaterUser
  // }

  logInUser(user: string){
    this.service.userTrue(user)
    this.logWindowOpen = !this.logWindowOpen
    this.isCreaterUser = this.service.isCreaterUser
    this.isAdmin = this.service.isAdmin
  }

  logOutUser(){
    this.service.userFalse()
    // this.logWindowOpen = !this.logWindowOpen
    this.isCreaterUser = this.service.isCreaterUser
    this.isAdmin = this.service.isAdmin
  }

  logModalClose(){
    this.logWindowOpen = !this.logWindowOpen
  }

  filterOnLitteral(search: string){
    this.service.filterOnLitteral(search, this.yaSlojniyCallBack.bind(this))
  }
  
  yaSlojniyCallBack(value: boolean){
    this.isSearchByUser = value
  }

  sortOpen(){
    this.isSortOpen = ! this.isSortOpen
  }

  sortOnDataNew(){
    let value = [...this.dataTodo]

    let sortRes = value.sort((a,b) => a.dateAndTime - b.dateAndTime)

    this.dataTodo = sortRes
  }

  sortOnDataOld(){
    let value = [...this.dataTodo]

    let sortRes = value.sort((a,b) => b.dateAndTime - a.dateAndTime)

    this.dataTodo = sortRes
  }

  sortOnDataReset(){
    this.service.get()

    this.isSortOpen = false
    // this.dataTodo = [...this.service.allTodo]
  }

  sortOnUser(creater: string){
    let value = [...this.dataTodo]

    let sortUser = value.filter(item => {
      return item.isCreater === creater
    })

    this.dataTodo = sortUser

    this.search = ''

    this.isSortOpen = true

    this.isSearchByUser = false
  }

  likeByUser(id:number){
    this.service.like(id, this.isCreaterUser)
  }

  onHoverLike(id: number){
    this.isHoverLike = id
  }

  leaveHoverLike(){
    this.isHoverLike = null
  }

  ngOnDestroy(): void {
    if(this.podpiska){
      this.podpiska.unsubscribe()
    }

    if(this.podpiskaOnUserStream){
      this.podpiskaOnUserStream.unsubscribe()
    }
  }

}
