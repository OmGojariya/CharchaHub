package com.CharchaHub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.Environment;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		ConfigurableApplicationContext context = SpringApplication.run(Application.class, args);
		Environment env = context.getEnvironment();
		
		String port = env.getProperty("server.port", "8080");
		String profile = String.join(", ", env.getActiveProfiles());
		
		System.out.println("🚀 CharchaHub Backend is running successfully!");
		System.out.println("📊 Active Profile: " + (profile.isEmpty() ? "default" : profile));
		System.out.println("🌐 Port: " + port);
		System.out.println("✅ Health Check: /api/health");
		System.out.println("📡 WebSocket Ready: /ws");
	}

}
