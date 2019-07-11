package com.jitin.todoappapi.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.jitin.todoappapi.model.Todo;

@Service("todoService")
public class TodoService {

	private static List<Todo> todos = new ArrayList<>();
	private static int idCounter = 0;

	static {
		todos.add(new Todo(++idCounter, "jitin", "Learn Java", new Date(), true));
		todos.add(new Todo(++idCounter, "jitin", "Singing Class", new Date(), true));
		todos.add(new Todo(++idCounter, "jitin", "Dancing Class", new Date(), true));
	}

	public List<Todo> findAll() {
		return todos;
	}

	public Todo save(Todo todo) {
		if (todo.getId() == -1 || todo.getId() ==0) {
			todo.setId(++idCounter);
			todos.add(todo);
		} else {
			deleteById(todo.getId());
			todos.add(todo);
		}
		return todo;
	}

	public Boolean deleteById(Integer id) {
		Todo todo = findById(id);
		if (null != todo) {
			todos.remove(todo);
			return Boolean.TRUE;
		} else {
			return Boolean.FALSE;
		}
	}

	public Todo findById(Integer id) {
		for (Todo todo : todos) {
			if (todo.getId() == id) {
				return todo;
			}
		}
		return null;
	}
}
