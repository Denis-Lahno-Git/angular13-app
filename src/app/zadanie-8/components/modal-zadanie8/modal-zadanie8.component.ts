import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToDo } from '../../services/zadanie8.service';

@Component({
  selector: 'app-modal-zadanie8',
  templateUrl: './modal-zadanie8.component.html',
  styleUrls: ['./modal-zadanie8.component.css']
})
export class ModalZadanie8Component implements OnInit {

  id!: number
  title: string = ''
  content: string = ''
  isPrivate: boolean = true
  isAdmin: boolean = false
  isCreater: string = ''

  @Input() todo: ToDo = {
    id: Date.now(),
    title: '',
    content: '',
    check: false,
    prioriti: 1,
    isPrivate: true,
    isCreater: '',
    dateAndTime: Date.now(),
    likeUsers: []
  }
  @Output() save = new EventEmitter<ToDo>()
  @Output() close = new EventEmitter<void>()

  constructor() { }

  ngOnInit(): void {
    this.id = this.todo.id
    this.title = this.todo.title
    this.content = this.todo.content
    this.isPrivate = this.todo.isPrivate
    // this.isCreater = this.todo.isCreater
  }

  add(){
    if(this.title.trim() === '' || this.content.trim() === ''){
      alert('Заполните оба поля верно')
      return
    }

    const newTodo: ToDo = {
      id: this.id,
      title: this.title.trim(),
      content: this.content.trim(),
      check: false,
      prioriti: 1,
      isPrivate: this.isPrivate,
      isCreater: this.isCreater,
      dateAndTime: Date.now(),
      likeUsers: []
    }

    this.save.emit(newTodo)

    this.title = ''
    this.content = ''
    this.close.emit()
  }

  closeWindow(){
    this.close.emit()
  }

}
