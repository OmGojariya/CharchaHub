package com.CharchaHub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
		System.out.println("🚀 CharchaHub Backend is running on http://localhost:8080");
		System.out.println("📡 WebSocket endpoint: ws://localhost:8080/ws");
	}

}
