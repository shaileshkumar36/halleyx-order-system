package com.halleyx.ordersystem.service;

import com.halleyx.ordersystem.model.CustomerOrder;
import com.halleyx.ordersystem.repository.CustomerOrderRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
public class CustomerOrderService {

    private final CustomerOrderRepository repository;

    public CustomerOrderService(CustomerOrderRepository repository) {
        this.repository = repository;
    }

    // Create Order
    public CustomerOrder createOrder(CustomerOrder order) {

        BigDecimal total = order.getUnitPrice()
                .multiply(BigDecimal.valueOf(order.getQuantity()));

        order.setTotalAmount(total);

        return repository.save(order);
    }

    // Get All Orders
    public List<CustomerOrder> getAllOrders() {
        return repository.findAll();
    }

    public CustomerOrder getOrderById(UUID id) {
        return repository.findById(id).orElse(null);
    }

    public void deleteOrder(UUID id) {
        repository.deleteById(id);
    }
}