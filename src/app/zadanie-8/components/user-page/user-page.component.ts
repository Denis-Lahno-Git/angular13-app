import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Zadanie8Service, ToDo } from '../../services/zadanie8.service';
import { UserInfoPublik, UserServiceService } from '../../services/user-service.service';
import { Subscription, switchMap, map } from 'rxjs';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent implements OnInit, OnDestroy {

  constructor(
    private routeUser: ActivatedRoute, 
    private service: Zadanie8Service, 
    private userService: UserServiceService) { }

    private podpiska!: Subscription

    private podpiskaOnUserStream!: Subscription

    dataTodo: ToDo[] = []

    allUsersInfo: UserInfoPublik[] = []

    isCreaterUser: string = ''

    isHoverLike: number | null = null

    isOpenModal: boolean = false

    public currentEditId: number | null = null

    oSebe: string = ''

    city: string = ''

    birthday: string = ''

    image: string = ''

    isEdit: boolean = false

    isAdmin: boolean = false

ngOnInit(): void {
  this.routeUser.paramMap.pipe(
    switchMap(params => {
      const creater = params.get('creater')

      this.podpiskaOnUserStream = this.userService.streamUserSubj$.subscribe({
        next: (value) => {
          this.allUsersInfo = value.filter(item => item.nameUser === creater)

          if (this.allUsersInfo.length > 0) {
            this.oSebe = this.allUsersInfo[0].oSebe
            this.city = this.allUsersInfo[0].city
            this.birthday = this.allUsersInfo[0].birthday
            this.image = this.allUsersInfo[0].image
          }
        }
      })

      return this.service.streamSabj$.pipe(
        map(value => value.filter(item => item.isCreater === creater))
      )
    })
  ).subscribe({
    next: (filteredTodo) => {
      this.dataTodo = filteredTodo
    }
  })

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

  likeByUser(id:number){
    this.service.like(id, this.isCreaterUser)
  }

  onHoverLike(id: number){
    this.isHoverLike = id
  }

  leaveHoverLike(){
    this.isHoverLike = null
  }

  editInfoUser(){
    this.isEdit = true
  }

  saveInfoUser(){
    this.isEdit = false
    this.userService.saveUserinfo(this.isCreaterUser, this.city, this.birthday, this.oSebe)
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
