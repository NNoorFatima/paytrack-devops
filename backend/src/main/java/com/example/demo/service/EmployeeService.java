package com.example.demo.service;

import com.example.demo.model.Employee;
import com.example.demo.model.HR;
import com.example.demo.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
// import java.util.Optional;


@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private UserService userService;

    // Retrieve all employees
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // Retrieve an employee by userid
    public Employee getEmployeeById(int userid) {
        return employeeRepository.findById(userid).orElse(null);
    }

    // Create a new employee
    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    // Update an existing employee (only salary and deptid can be updated)
    public Employee updateEmployee(int userid, Employee employeeDetails) {
        Employee existingEmployee = employeeRepository.findById(userid).orElse(null);
        if (existingEmployee != null) {
            existingEmployee.setSalary(employeeDetails.getSalary());
            existingEmployee.setDeptid(employeeDetails.getDeptid());
            return employeeRepository.save(existingEmployee);
        }
        return null;
    }

    // Delete an employee by userid
    public boolean deleteEmployee(int userid) {
        if (employeeRepository.existsById(userid)) {
            employeeRepository.deleteById(userid);
            return true;
        }
        return false;
    }


    
}
