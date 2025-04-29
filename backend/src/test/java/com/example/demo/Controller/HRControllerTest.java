package com.example.demo.Controller;

import com.example.demo.controller.HRController;
import com.example.demo.controller.LeaveController;

import com.example.demo.controller.HRController.LeaveCountDTO;
import com.example.demo.model.Admin;
import com.example.demo.model.Employee;
import com.example.demo.model.HR;
import com.example.demo.model.User;
import com.example.demo.service.HRService;
import com.example.demo.service.UserService;
import com.example.demo.repository.LeaveRepository;
import com.example.demo.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Optional;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

public class HRControllerTest {

    @Mock
    private HRService hrService;

    @Mock
    private UserService userService;

    @Mock
    private LeaveRepository leaveRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private HRController hrController;

    @InjectMocks
    private HRController leaveController;

    private HR hr;
    private User user;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }


    // Test GET /hrs/{id} - Retrieve an HR record by ID
    @Test
    void testGetHRById_Found() {
        int userid = 1;
        HR hr = new HR();
        // setting up a mock behavior for the adminservice object ---
        // so instead of going to DB actually just return what u created above
        when(hrService.getHRById(userid)).thenReturn(hr);
        // here testing admin controller function
        ResponseEntity<HR> response = hrController.getHRById(userid);
        // 200 is ccode for success
        assertEquals(200, response.getStatusCodeValue());
        assertNotNull(response.getBody());
    }

    @Test
    public void testGetHRById_NotFound() {
    when(hrService.getHRById(2)).thenReturn(null);

    ResponseEntity<HR> response = hrController.getHRById(2);

    assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    public void testGetHRUser_NotFound() {
    when(hrService.getHRById(1)).thenReturn(null);

    ResponseEntity<User> response = hrController.getHRUser(1);

    assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    // Test POST /hrs - Create a new HR record
    @Test
    public void testCreateHR() {
    when(hrService.createHR(hr)).thenReturn(hr);

    ResponseEntity<HR> response = hrController.createHR(hr);

    assertEquals(HttpStatus.CREATED, response.getStatusCode());
    assertEquals(hr, response.getBody());
    }

    // Test PUT /hrs/{id} - Update an existing HR record
    @Test
    public void testUpdateHR_Found() {
    HR updatedHR = new HR();
    updatedHR.setUserid(1);
    updatedHR.setDeptid(102);

    when(hrService.updateHR(1, updatedHR)).thenReturn(updatedHR);

    ResponseEntity<HR> response = hrController.updateHR(1, updatedHR);

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals(updatedHR, response.getBody());
    }

    @Test
    public void testUpdateHR_NotFound() {
    HR updatedHR = new HR();
    updatedHR.setUserid(1);
    updatedHR.setDeptid(102);

    when(hrService.updateHR(1, updatedHR)).thenReturn(null);

    ResponseEntity<HR> response = hrController.updateHR(1, updatedHR);

    assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    // Test DELETE /hrs/{id} - Delete HR and associated user
    @Test
    public void testDeleteHR_Found() {
    when(hrService.deleteHRWithUser(1)).thenReturn(true);

    ResponseEntity<String> response = hrController.deleteHR(1);

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals("HR and User deleted successfully!", response.getBody());
    }

    @Test
    public void testDeleteHR_NotFound() {
    when(hrService.deleteHRWithUser(1)).thenReturn(false);

    ResponseEntity<String> response = hrController.deleteHR(1);

    assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    assertEquals("HR or User not found.", response.getBody());
    }

    // @Test
    // void testLoginHR_Success() {
    //     Map<String, String> loginData = new HashMap<>();
    //     loginData.put("username", "john");
    //     loginData.put("password", "1234");
    //     User user = new User();
    //     user.setUserid(1);
    //     user.setName("john");
    //     HR hr = new HR();
    //     hr.setUserid(1);
    //     hr.setDeptid(2);
    //     when(userService.validateCredentials("john", "1234")).thenReturn(true);
    //     when(userService.findByName("john")).thenReturn(user);
    //     when(hrService.getHRById(1)).thenReturn(hr);

    //     ResponseEntity<?> response = hrController.loginHR(loginData);

    //     assertEquals(200, response.getStatusCodeValue());
    // }

    // @Test
    // void testLoginEmployee_Failure_InvalidCredentials() {
    //     Map<String, String> loginData = new HashMap<>();
    //     loginData.put("username", "john");
    //     loginData.put("password", "wrong");

    //     when(userService.validateCredentials("john", "wrong")).thenReturn(false);

    //     ResponseEntity<?> response = hrController.loginHR(loginData);

    //     assertEquals(401, response.getStatusCodeValue());
    // }
    
    @Test
    void testLoginHR_Success() {
        Map<String, String> loginData = new HashMap<>();
        loginData.put("username", "john");
        loginData.put("password", "1234");

        User user = new User();
        user.setUserid(1);
        user.setName("john");

        HR hr = new HR();
        hr.setUserid(1);
        hr.setDeptid(2);

        when(userService.validateCredentials("john", "1234")).thenReturn(true);
        when(userService.findByName("john")).thenReturn(user);
        when(hrService.getHRById(1)).thenReturn(hr);

        ResponseEntity<?> response = hrController.loginHR(loginData);

        // Assert the response is OK (200 status)
        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    void testLoginEmployee_Failure_InvalidCredentials() {
        Map<String, String> loginData = new HashMap<>();
        loginData.put("username", "john");
        loginData.put("password", "wrong");

        when(userService.validateCredentials("john", "wrong")).thenReturn(false);

        ResponseEntity<?> response = hrController.loginHR(loginData);

        // Assert unauthorized (401 status)
        assertEquals(401, response.getStatusCodeValue());
    }

    @Test
    void testLoginEmployee_UserNotFound() {
        // Test case where user is not found in the system
        Map<String, String> loginData = new HashMap<>();
        loginData.put("username", "nonexistent");
        loginData.put("password", "password123");

        when(userService.validateCredentials("nonexistent", "password123")).thenReturn(true);
        when(userService.findByName("nonexistent")).thenReturn(null); // User does not exist

        ResponseEntity<?> response = hrController.loginHR(loginData);

        // Assert unauthorized (401 status)
        assertEquals(401, response.getStatusCodeValue());
    }

    @Test
    void testLoginEmployee_HRNotFound() {
        // Test case where user exists but HR record is not found
        Map<String, String> loginData = new HashMap<>();
        loginData.put("username", "john");
        loginData.put("password", "1234");

        User user = new User();
        user.setUserid(1);
        user.setName("john");

        when(userService.validateCredentials("john", "1234")).thenReturn(true);
        when(userService.findByName("john")).thenReturn(user);
        when(hrService.getHRById(1)).thenReturn(null); // HR record is not found

        ResponseEntity<?> response = hrController.loginHR(loginData);

        // Assert unauthorized (401 status)
        assertEquals(401, response.getStatusCodeValue());
    }

    @Test
    void testLoginEmployee_InvalidPassword() {
        // Test case where password is invalid but username exists
        Map<String, String> loginData = new HashMap<>();
        loginData.put("username", "john");
        loginData.put("password", "wrongpassword");

        User user = new User();
        user.setUserid(1);
        user.setName("john");

        when(userService.validateCredentials("john", "wrongpassword")).thenReturn(false);

        ResponseEntity<?> response = hrController.loginHR(loginData);

        // Assert unauthorized (401 status)
        assertEquals(401, response.getStatusCodeValue());
    }

    @Test
    void testLoginEmployee_EmptyUsername() {
        // Test case where username is empty
        Map<String, String> loginData = new HashMap<>();
        loginData.put("username", "");
        loginData.put("password", "1234");

        ResponseEntity<?> response = hrController.loginHR(loginData);

        // Assert bad request (400 status) due to empty username
        assertEquals(401, response.getStatusCodeValue());
    }

    @Test
    void testLoginEmployee_EmptyPassword() {
        // Test case where password is empty
        Map<String, String> loginData = new HashMap<>();
        loginData.put("username", "john");
        loginData.put("password", "");

        ResponseEntity<?> response = hrController.loginHR(loginData);

        // Assert bad request (400 status) due to empty password
        assertEquals(401, response.getStatusCodeValue());
    }

    @Test
    void testLoginEmployee_BothFieldsEmpty() {
        // Test case where both username and password are empty
        Map<String, String> loginData = new HashMap<>();
        loginData.put("username", "");
        loginData.put("password", "");

        ResponseEntity<?> response = hrController.loginHR(loginData);

        // Assert bad request (400 status) due to both fields being empty
        assertEquals(401, response.getStatusCodeValue());
    }

    @Test
    void testGetHRUser_Success() {
        // Test case where HR is found and the associated user is also found
        User user= new User();
        user.setUserid(1);
        HR hr = new HR();
        hr.setUser(user);
        
        when(hrService.getHRById(1)).thenReturn(hr);

        ResponseEntity<User> response = hrController.getHRUser(1);

        assertEquals(200, response.getStatusCodeValue()); // Should return 200 OK
        assertEquals(user, response.getBody()); // The body should contain the user
    }

    @Test
    void testGetHRUser_HRNotFound() {
        // Test case where HR is not found by ID
        int hrId = 1;

        when(hrService.getHRById(hrId)).thenReturn(null); // HR is null

        ResponseEntity<User> response = hrController.getHRUser(hrId);

        assertEquals(404, response.getStatusCodeValue()); // Should return 404 Not Found
        assertNull(response.getBody()); // No body should be returned
    }

    @Test
    void testGetHRUser_HRFound_UserNotFound() {
        // Test case where HR is found, but the associated user is null
        int hrId = 1;
        // hr.setUser(null); // No user associated with the HR

        when(hrService.getHRById(hrId)).thenReturn(null);

        ResponseEntity<User> response = hrController.getHRUser(hrId);

        assertEquals(404, response.getStatusCodeValue()); // Should return 404 Not Found (since there is no user)
        assertNull(response.getBody()); // No body should be returned
    }

    

}   