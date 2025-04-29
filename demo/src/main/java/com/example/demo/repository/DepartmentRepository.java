package com.example.demo.repository;

import com.example.demo.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository; // Correct import

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Integer> {
    // JpaRepository will automatically handle CRUD operations
}
