package com.jitin.todoappapi.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.jitin.todoappapi.model.Todo;
import com.jitin.todoappapi.service.TodoService;
import com.jitin.todoappapi.model.AuthenticationBO;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TodoController {

	@Autowired
	private TodoService todoService;

	@GetMapping(path = "/users/{username}/todos")
	public List<Todo> getTodos(@PathVariable("username") String username) {
		return todoService.findAll();
	}

	@GetMapping(path = "/users/{username}/todos/{id}")
	public Todo getTodo(@PathVariable("username") String username, @PathVariable("id") int id) {
		return todoService.findById(id);
	}

	@DeleteMapping(path = "/users/{username}/todos/{id}")
	public ResponseEntity<Void> deleteTodo(@PathVariable String username, @PathVariable int id) {
		if (todoService.deleteById(id)) {
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@PutMapping(path = "/users/{username}/todos/{id}")
	public ResponseEntity<Todo> updateTodo(@PathVariable String username, @PathVariable int id,
			@RequestBody Todo todo) {
		Todo updatedTodo = todoService.save(todo);
		return new ResponseEntity<Todo>(updatedTodo, HttpStatus.OK);
	}

	@PostMapping(path = "/users/{username}/todos")
	public ResponseEntity<Todo> saveTodo(@PathVariable String username, @RequestBody Todo todo) {
		Todo savedTodo = todoService.save(todo);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(savedTodo.getId())
				.toUri();
		return ResponseEntity.created(uri).build();
	}

	@GetMapping(path = "/sayhello")
	public AuthenticationBO sayHello() {
		return new AuthenticationBO("Hello, Jitin!");
	}

	@GetMapping(path = "/sayhello/{name}")
	public AuthenticationBO sayHelloWithName(@PathVariable("name") String name) {
		return new AuthenticationBO("Hello, " + name);
	}
}
