import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';

export class Todo {
  constructor(public id: number, public description: string, public targetDate: Date, public isComplete: boolean) {

  }
}

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})

export class TodolistComponent implements OnInit {
  todos:Todo[];
  message:string;
  // todos = [
    // new Todo(1, 'Java exercise', new Date(), true),
    // new Todo(2, 'Singing class', new Date(), false),
    // new Todo(3, 'Visit market', new Date(), false)
    // { id: 1, description: 'Java exercise' },
    // { id: 2, description: 'Singing class' },
    // { id: 3, description: 'Visit market' }
  //]
  constructor(private todoDataService:TodoDataService, private router:Router) { }

  ngOnInit() {
    this.loadTodos();
  } 
  loadTodos(){
    this.todoDataService.getAllTodos('jitin').subscribe(response=>{
      console.log(response);
      this.todos=response;
    })
  }

  deleteTodo(id){
    this.todoDataService.deleteTodo('jitin',id).subscribe(response=>{
      console.log(response);
      this.message=`Todo ${id} has been successfully deleted!`;
      this.loadTodos();
    })
  }

  updateTodo(id){
    this.router.navigate(['todos',id]);
  }
  createNewTodo(){
    this.router.navigate(['todos',0]);
  }
}
