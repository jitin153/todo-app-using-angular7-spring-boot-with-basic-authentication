package com.jitin.todoappapi.model;

public class AuthenticationBO {
	private String message;

	public AuthenticationBO(String message) {
		this.message = message;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}
