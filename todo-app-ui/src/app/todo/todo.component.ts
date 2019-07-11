import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Todo } from '../todolist/todolist.component';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  id: number;
  todo: Todo;
  constructor(private todoDataService: TodoDataService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    //--Way to get the id from url
    this.id = this.route.snapshot.params['id'];
    // Just to resolve the loading issues.
    // Subscribe means the call is asyncronous, it may take some time to get the data from backend
    // but init means render will be done immediately therefore it will display an error in console.
    // That's why we are initialiazing the todo here with dummy data.
    this.todo = new Todo(this.id, '', new Date(), false);
    if (this.id >= 1) {
      this.todoDataService.getTodo('jitin', this.id).subscribe(
        response => {
          this.todo = response;
        })
    }
  }
  saveTodo() {
    if (this.id >= 0) {
      this.todoDataService.updateTodo('jitin', this.id, this.todo).subscribe(
        response => {
          console.log(response);
          this.router.navigate(['todos']);
        }
      )
    }else{
      this.todoDataService.createNewTodo('jitin', this.todo).subscribe(
        response => {
          console.log(response);
          this.router.navigate(['todos']);
        }
      )
    }
  }
}
