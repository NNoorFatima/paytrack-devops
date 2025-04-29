package com.example.demo.repository;

import com.example.demo.model.HR;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HRRepository extends JpaRepository<HR, Integer> {
}
