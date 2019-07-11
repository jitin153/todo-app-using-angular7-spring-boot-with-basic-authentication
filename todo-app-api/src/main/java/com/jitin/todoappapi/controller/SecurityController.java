package com.jitin.todoappapi.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jitin.todoappapi.model.AuthenticationBO;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class SecurityController {

	@GetMapping(path = "/basicauth")
	public AuthenticationBO basicAuthentication() {
		return new AuthenticationBO("You are authenticated!");
	}
}
