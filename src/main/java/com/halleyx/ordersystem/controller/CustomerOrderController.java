package com.halleyx.ordersystem.controller;

import com.halleyx.ordersystem.model.CustomerOrder;
import com.halleyx.ordersystem.service.CustomerOrderService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/orders")
public class CustomerOrderController {

    private final CustomerOrderService service;

    public CustomerOrderController(CustomerOrderService service) {
        this.service = service;
    }

    // Create Order
    @PostMapping
    public CustomerOrder createOrder(@RequestBody CustomerOrder order) {
        return service.createOrder(order);
    }

    // Get All Orders
    @GetMapping
    public List<CustomerOrder> getAllOrders() {
        return service.getAllOrders();
    }

    @GetMapping("/{id}")
    public CustomerOrder getOrderById(@PathVariable UUID id) {
        return service.getOrderById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable UUID id) {
        service.deleteOrder(id);
    }

}