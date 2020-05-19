package com.example.demo.controller;

import com.example.demo.fallback.OrderStatetimeFallback;
import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(value = "order-service",fallback = OrderStatetimeFallback.class)
public interface IOrderStatetimeController {
}
