import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from 'src/app/todolist/todolist.component';
import { BASE_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(private http:HttpClient) { }

  getAllTodos(username){
    return this.http.get<Todo[]>(`${BASE_URL}/users/${username}/todos`); 
  }

  deleteTodo(username,id){
    return this.http.delete(`${BASE_URL}/users/${username}/todos/${id}`);
  }

  getTodo(username,id){
    return this.http.get<Todo>(`${BASE_URL}/users/${username}/todos/${id}`);
  }

  updateTodo(username, id, todo){
    return this.http.put(`${BASE_URL}/users/${username}/todos/${id}`,todo);
  }

  createNewTodo(username, todo){
    return this.http.post(`${BASE_URL}/users/${username}/todos`,todo);
  }
}
