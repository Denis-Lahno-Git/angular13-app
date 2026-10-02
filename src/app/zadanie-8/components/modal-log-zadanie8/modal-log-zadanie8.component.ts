import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Zadanie8Service } from '../../services/zadanie8.service';

@Component({
  selector: 'app-modal-log-zadanie8',
  templateUrl: './modal-log-zadanie8.component.html',
  styleUrls: ['./modal-log-zadanie8.component.css']
})
export class ModalLogZadanie8Component implements OnInit {

  login: string = ''
  password: string = ''

  // @Output() logIn = new EventEmitter<void>()
  @Output() close = new EventEmitter<void>()
  @Output() userIn = new EventEmitter<string>()
  @Output() userLogOut = new EventEmitter<void>()
  
  constructor(private service: Zadanie8Service) { }

  ngOnInit(): void {
  }

  loginInit(){
    if (this.service.userDB.some(item => item.loginUser === this.login.trim()) 
      && this.service.userDB.some(item => item.passwordUser === this.password.trim())){
        let user = this.service.userDB.filter(item => item.loginUser === this.login.trim())
        let userName = user[0].nameUser
        this.userIn.emit(userName)
    } 
    else {
    alert('Неверный логин или пароль')
    }
  }

  closeForm(){
      this.userLogOut.emit()
  }

}


// import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// import { Zadanie8Service } from '../../services/zadanie8.service';

// @Component({
//   selector: 'app-modal-log-zadanie8',
//   templateUrl: './modal-log-zadanie8.component.html',
//   styleUrls: ['./modal-log-zadanie8.component.css']
// })
// export class ModalLogZadanie8Component implements OnInit {

//   login: string = ''
//   password: string = ''

//   @Output() logIn = new EventEmitter<void>()
//   @Output() close = new EventEmitter<void>()
//   @Output() userOut = new EventEmitter<string>()
//   @Output() userLogOut = new EventEmitter<void>()
  
//   constructor(private service: Zadanie8Service) { }

//   ngOnInit(): void {
//   }

//   loginInit(){
//     if(this.login.trim() === 'admin' && this.password.trim() === 'admin'){
//       this.logIn.emit()
//       return
//     }
//     if (this.service.userDB.some(item => item.loginUser === this.login.trim()) 
//       && this.service.userDB.some(item => item.passwordUser === this.password.trim())){
//         let user = this.service.userDB.filter(item => item.loginUser === this.login.trim())
//         let userName = user[0].nameUser
//         this.userOut.emit(userName)
//     } 
//     else {
//     alert('Неверный логин или пароль')
//     }
//   }

//   closeForm(){
//     if(this.service.isAdmin === true){
//     this.close.emit()
//     } else {
//       this.userLogOut.emit()
//     }
//   }

// }

