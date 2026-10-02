import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export interface UserInfoPublik {
  idUser: number
  nameUser: string
  image: string
  oSebe: string
  birthday: string
  city: string
}

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private userSubj = new BehaviorSubject<UserInfoPublik[]>([])

  streamUserSubj$ = this.userSubj.asObservable()

  allUsers: UserInfoPublik[] = []

    userPublikDB: UserInfoPublik[] = [
      {idUser: 1, nameUser: 'Pol_MC', image: 'pol.jpeg', oSebe: 'HSDSKDSJijnjknvjdijsd', birthday: '10052000' ,city: 'Ms'},
      {idUser: 2, nameUser: 'John_LN', image: 'lenon.jpg', oSebe: '', birthday: '' ,city: ''},
      {idUser: 3, nameUser: 'Ringo_ST', image: 'ringo.jpg', oSebe: '', birthday: '' ,city: ''},
      {idUser: 4, nameUser: 'Admin', image: 'administrator.jpg', oSebe: 'ssssssssssssssssssssssssssss', birthday: '' ,city: ''},
      {idUser: 5, nameUser: 'unknownUser', image: 'tabor.jpg', oSebe: 'Все незарегестрированные шныри', birthday: '' ,city: ''}
    ]

  private STORAGE_KEY = 'usersStorage'
  
  constructor() {
    const raw = localStorage.getItem(this.STORAGE_KEY)
    if(raw){
      this.allUsers = JSON.parse(raw)
    }else{
      this.allUsers = this.userPublikDB
    }
    this.userSubj.next(this.allUsers)
  }

  get(){
    this.userSubj.next(this.allUsers)
  }

  private saveToStorage(){
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.allUsers))
  }

  saveUserinfo(creater: string, city: string, birthday: string, oSebe: string){
    const value = this.userSubj.getValue()

      const index = value.findIndex(item => item.nameUser === creater)

      const editUser = [...value]
      
      editUser[index] = {
        ...value[index],
        city: city,
        birthday: birthday,
        oSebe: oSebe
      }

      this.saveToStorage()
      this.userSubj.next([...value])
  }
}
