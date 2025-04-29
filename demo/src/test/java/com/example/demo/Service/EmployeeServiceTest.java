package com.example.demo.Service;

import com.example.demo.model.Employee;
import com.example.demo.repository.EmployeeRepository;
import com.example.demo.service.EmployeeService;
import com.example.demo.service.UserService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Optional;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class EmployeeServiceTest {

    @Mock
    private EmployeeRepository employeeRepository;

    @Mock
    private UserService userService;

    @InjectMocks
    private EmployeeService employeeService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllEmployees() {
        Employee emp1 = new Employee();
        Employee emp2 = new Employee();
        when(employeeRepository.findAll()).thenReturn(Arrays.asList(emp1, emp2));

        List<Employee> result = employeeService.getAllEmployees();

        assertEquals(2, result.size());
        verify(employeeRepository, times(1)).findAll();
    }

    @Test
    void testGetEmployeeById_Existing() {
        Employee emp = new Employee();
        when(employeeRepository.findById(1)).thenReturn(Optional.of(emp));

        Employee result = employeeService.getEmployeeById(1);

        assertNotNull(result);
        verify(employeeRepository, times(1)).findById(1);
    }

    @Test
    void testGetEmployeeById_NotExisting() {
        when(employeeRepository.findById(1)).thenReturn(Optional.empty());

        Employee result = employeeService.getEmployeeById(1);

        assertNull(result);
    }

    @Test
    void testCreateEmployee() {
        Employee emp = new Employee();
        when(employeeRepository.save(emp)).thenReturn(emp);

        Employee result = employeeService.createEmployee(emp);

        assertNotNull(result);
        verify(employeeRepository, times(1)).save(emp);
    }

    @Test
    void testUpdateEmployee_Existing() {
        Employee existingEmp = new Employee();
        Employee newDetails = new Employee();
        newDetails.setSalary(BigDecimal.valueOf(50000.0));
        // newDetails.setSalary(50000.0);
        newDetails.setDeptid(2);

        when(employeeRepository.findById(1)).thenReturn(Optional.of(existingEmp));
        when(employeeRepository.save(existingEmp)).thenReturn(existingEmp);

        Employee result = employeeService.updateEmployee(1, newDetails);

        assertNotNull(result);
        // assertEquals(50000.0, existingEmp.getSalary());
        assertEquals(50000.0, existingEmp.getSalary().doubleValue(), 0.001);
        assertEquals(2, existingEmp.getDeptid());
    }

    @Test
    void testUpdateEmployee_NotExisting() {
        Employee newDetails = new Employee();
        when(employeeRepository.findById(1)).thenReturn(Optional.empty());

        Employee result = employeeService.updateEmployee(1, newDetails);

        assertNull(result);
    }

    @Test
    void testDeleteEmployee_Existing() {
        when(employeeRepository.existsById(1)).thenReturn(true);

        boolean result = employeeService.deleteEmployee(1);

        assertTrue(result);
        verify(employeeRepository, times(1)).deleteById(1);
    }

    @Test
    void testDeleteEmployee_NotExisting() {
        when(employeeRepository.existsById(1)).thenReturn(false);

        boolean result = employeeService.deleteEmployee(1);

        assertFalse(result);
    }
}
