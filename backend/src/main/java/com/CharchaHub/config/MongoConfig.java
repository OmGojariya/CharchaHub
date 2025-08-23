package com.CharchaHub.config;

import org.springframework.context.annotation.Configuration;

@Configuration
public class MongoConfig {
    // Transaction management disabled for standalone MongoDB
    // Transactions require replica sets or sharded clusters
}
