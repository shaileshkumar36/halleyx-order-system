package com.halleyx.ordersystem.repository;

import com.halleyx.ordersystem.model.CustomerOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface CustomerOrderRepository extends JpaRepository<CustomerOrder, UUID> {

}