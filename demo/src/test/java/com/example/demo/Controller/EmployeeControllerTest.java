package com.example.demo.Controller;

import com.example.demo.controller.EmployeeController;
import com.example.demo.model.Employee;
import com.example.demo.model.User;
import com.example.demo.service.EmployeeService;
import com.example.demo.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class EmployeeControllerTest {

    @Mock
    private EmployeeService employeeService;

    @Mock
    private UserService userService;

    @InjectMocks
    private EmployeeController employeeController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllEmployees() {
        Employee emp1 = new Employee();
        Employee emp2 = new Employee();
        when(employeeService.getAllEmployees()).thenReturn(Arrays.asList(emp1, emp2));

        List<Employee> result = employeeController.getAllEmployees();

        assertEquals(2, result.size());
    }

    @Test
    void testGetEmployeeById_Found() {
        Employee emp = new Employee();
        when(employeeService.getEmployeeById(1)).thenReturn(emp);

        ResponseEntity<Employee> response = employeeController.getEmployeeById(1);

        assertEquals(200, response.getStatusCodeValue());
        assertNotNull(response.getBody());
    }

    @Test
    void testGetEmployeeById_NotFound() {
        when(employeeService.getEmployeeById(1)).thenReturn(null);

        ResponseEntity<Employee> response = employeeController.getEmployeeById(1);

        assertEquals(404, response.getStatusCodeValue());
    }

    @Test
    void testCreateEmployee() {
        Employee emp = new Employee();
        when(employeeService.createEmployee(emp)).thenReturn(emp);

        ResponseEntity<Employee> response = employeeController.createEmployee(emp);

        assertEquals(201, response.getStatusCodeValue());
    }

    @Test
    void testUpdateEmployee_Found() {
        Employee emp = new Employee();
        when(employeeService.updateEmployee(1, emp)).thenReturn(emp);

        ResponseEntity<Employee> response = employeeController.updateEmployee(1, emp);

        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    void testUpdateEmployee_NotFound() {
        Employee emp = new Employee();
        when(employeeService.updateEmployee(1, emp)).thenReturn(null);

        ResponseEntity<Employee> response = employeeController.updateEmployee(1, emp);

        assertEquals(404, response.getStatusCodeValue());
    }

    @Test
    void testDeleteEmployee_Found() {
        when(employeeService.deleteEmployee(1)).thenReturn(true);

        ResponseEntity<Void> response = employeeController.deleteEmployee(1);

        assertEquals(204, response.getStatusCodeValue());
    }

    @Test
    void testDeleteEmployee_NotFound() {
        when(employeeService.deleteEmployee(1)).thenReturn(false);

        ResponseEntity<Void> response = employeeController.deleteEmployee(1);

        assertEquals(404, response.getStatusCodeValue());
    }

    @Test
    void testGetUserDataByEmployeeId_Found() {
        Employee emp = new Employee();
        User user = new User();
        emp.setUser(user);

        when(employeeService.getEmployeeById(1)).thenReturn(emp);

        ResponseEntity<User> response = employeeController.getUserDataByEmployeeId(1);

        assertEquals(200, response.getStatusCodeValue());
        assertNotNull(response.getBody());
    }

    @Test
    void testGetUserDataByEmployeeId_NotFound() {
        when(employeeService.getEmployeeById(1)).thenReturn(null);

        ResponseEntity<User> response = employeeController.getUserDataByEmployeeId(1);

        assertEquals(404, response.getStatusCodeValue());
    }

    @Test
    void testLoginEmployee_Success() {
        Map<String, String> loginData = new HashMap<>();
        loginData.put("username", "john");
        loginData.put("password", "1234");

        User user = new User();
        user.setUserid(1);
        user.setName("john");

        Employee emp = new Employee();
        emp.setUserid(1);
        emp.setDeptid(2);

        when(userService.validateCredentials("john", "1234")).thenReturn(true);
        when(userService.findByName("john")).thenReturn(user);
        when(employeeService.getEmployeeById(1)).thenReturn(emp);

        ResponseEntity<?> response = employeeController.loginEmployee(loginData);

        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    void testLoginEmployee_Failure_InvalidCredentials() {
        Map<String, String> loginData = new HashMap<>();
        loginData.put("username", "john");
        loginData.put("password", "wrong");

        when(userService.validateCredentials("john", "wrong")).thenReturn(false);

        ResponseEntity<?> response = employeeController.loginEmployee(loginData);

        assertEquals(401, response.getStatusCodeValue());
    }

   //EmpUserdepid test
   @Test
void testGetEmployeeUsersByDeptId_Found() {
    // Given
    User user1 = new User();
    user1.setName("John Doe");
    user1.setUserid(1);
    User user2 = new User();
    user2.setName("Jane Doe");
    user2.setUserid(02);
    User user3 = new User();
    user3.setName("Umema Ashar");
    user3.setUserid(03);
    //emp1
    Employee emp1 = new Employee();
    emp1.setUserid(01);
    emp1.setUser(user1);
    emp1.setDeptid(101);
    //emp2
    Employee emp2 = new Employee();
    emp2.setUserid(02);
    emp2.setUser(user2);
    emp2.setDeptid(102);
    //emp3
    Employee emp3 = new Employee();
    emp3.setUserid(03);
    emp3.setUser(user3);
    emp3.setDeptid(101);

    List<Employee> employees = Arrays.asList(emp1, emp2, emp3);

    // Mocking the service call
    when(employeeService.getAllEmployees()).thenReturn(employees);

    // When
    ResponseEntity<List<User>> response = employeeController.getEmployeeUsersByDeptId(101);

    // Then
    assertEquals(200, response.getStatusCodeValue());
    assertNotNull(response.getBody());
    assertEquals(2, response.getBody().size());  // Expecting 2 users for department 101
    assertEquals("John Doe", response.getBody().get(0).getName());
    assertEquals("Umema Ashar", response.getBody().get(1).getName());

    // Verifying the service method was called once
    verify(employeeService, times(1)).getAllEmployees();
}

@Test
void testGetEmployeeUsersByDeptId_NotFound() {
    // Given
    List<Employee> employees = Arrays.asList();

    // Mocking the service call to return an empty list
    when(employeeService.getAllEmployees()).thenReturn(employees);

    // When
    ResponseEntity<List<User>> response = employeeController.getEmployeeUsersByDeptId(101);

    // Then
    assertEquals(200, response.getStatusCodeValue());  // Expecting 200 OK, even if no users are found
    assertTrue(response.getBody().isEmpty());  // Expecting an empty list of users

    // Verifying the service method was called once
    verify(employeeService, times(1)).getAllEmployees();
}



}
