// src/test/java/com/example/demo/controller/ManagerControllerTest.java
package com.example.demo.Controller;

import com.example.demo.controller.ManagerController;
import com.example.demo.model.Manager;
import com.example.demo.model.User;
import com.example.demo.service.ManagerService;
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

class ManagerControllerTest {

    @Mock
    private ManagerService managerService;

    @Mock
    private UserService userService;

    @InjectMocks
    private ManagerController managerController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllManagers() {
        Manager m1 = new Manager();
        Manager m2 = new Manager();
        when(managerService.getAllManagers()).thenReturn(Arrays.asList(m1, m2));

        List<Manager> result = managerController.getAllManagers();

        assertEquals(2, result.size());
    }

    @Test
    void testGetManagerById_Found() {
        Manager m = new Manager();
        when(managerService.getManagerById(1)).thenReturn(m);

        ResponseEntity<Manager> resp = managerController.getManagerById(1);

        assertEquals(200, resp.getStatusCodeValue());
        assertNotNull(resp.getBody());
    }

    @Test
    void testGetManagerById_NotFound() {
        when(managerService.getManagerById(1)).thenReturn(null);

        ResponseEntity<Manager> resp = managerController.getManagerById(1);

        assertEquals(404, resp.getStatusCodeValue());
    }

    @Test
    void testGetManagerUser_Found() {
        Manager m = new Manager();
        User u = new User();
        m.setUser(u);
        when(managerService.getManagerById(1)).thenReturn(m);

        ResponseEntity<User> resp = managerController.getManagerUser(1);

        assertEquals(200, resp.getStatusCodeValue());
        assertNotNull(resp.getBody());
    }

    @Test
    void testGetManagerUser_NotFound() {
        when(managerService.getManagerById(1)).thenReturn(null);

        ResponseEntity<User> resp = managerController.getManagerUser(1);

        assertEquals(404, resp.getStatusCodeValue());
    }

    @Test
    void testCreateManager_Success() {
        Manager m = new Manager(); m.setUserid(1);
        when(userService.getUserById(1)).thenReturn(new User());

        ResponseEntity<String> resp = managerController.createManager(m);

        assertEquals(200, resp.getStatusCodeValue());
        assertTrue(resp.getBody().contains("Manager added successfully"));
    }

    @Test
    void testCreateManager_UserNotFound() {
        Manager m = new Manager(); m.setUserid(1);
        when(userService.getUserById(1)).thenReturn(null);

        ResponseEntity<String> resp = managerController.createManager(m);

        assertEquals(400, resp.getStatusCodeValue());
        assertTrue(resp.getBody().contains("User not found"));
    }

    @Test
    void testUpdateManager_Found() {
        Manager details = new Manager();
        when(managerService.updateManager(1, details)).thenReturn(details);

        ResponseEntity<Manager> resp = managerController.updateManager(1, details);

        assertEquals(200, resp.getStatusCodeValue());
    }

    @Test
    void testUpdateManager_NotFound() {
        Manager details = new Manager();
        when(managerService.updateManager(1, details)).thenReturn(null);

        ResponseEntity<Manager> resp = managerController.updateManager(1, details);

        assertEquals(404, resp.getStatusCodeValue());
    }

    @Test
    void testDeleteManager_Found() {
        when(managerService.deleteManager(1)).thenReturn(true);

        ResponseEntity<Void> resp = managerController.deleteManager(1);

        assertEquals(204, resp.getStatusCodeValue());
    }

    @Test
    void testDeleteManager_NotFound() {
        when(managerService.deleteManager(1)).thenReturn(false);

        ResponseEntity<Void> resp = managerController.deleteManager(1);

        assertEquals(404, resp.getStatusCodeValue());
    }

    @Test
    void testDeleteManagerWithUser_Found() {
        when(managerService.deleteManagerWithUser(1)).thenReturn(true);

        ResponseEntity<Void> resp = managerController.deleteManagerWithUser(1);

        assertEquals(204, resp.getStatusCodeValue());
    }

    @Test
    void testDeleteManagerWithUser_NotFound() {
        when(managerService.deleteManagerWithUser(1)).thenReturn(false);

        ResponseEntity<Void> resp = managerController.deleteManagerWithUser(1);

        assertEquals(404, resp.getStatusCodeValue());
    }

    @Test
    void testManagerLogin_Success() {
        Map<String,String> loginData = new HashMap<>();
        loginData.put("username","bob"); loginData.put("password","pass");
        User u = new User(); u.setUserid(1); u.setName("bob");
        Manager m = new Manager(); m.setUserid(1); m.setDeptid(10);

        when(userService.validateCredentials("bob","pass")).thenReturn(true);
        when(userService.findByName("bob")).thenReturn(u);
        when(managerService.getManagerById(1)).thenReturn(m);

        ResponseEntity<?> resp = managerController.managerLogin(loginData);
        assertEquals(200, resp.getStatusCodeValue());
    }

    @Test
    void testManagerLogin_InvalidCredentials() {
        Map<String,String> loginData = new HashMap<>();
        loginData.put("username","bob"); loginData.put("password","wrong");
        when(userService.validateCredentials("bob","wrong")).thenReturn(false);

        ResponseEntity<?> resp = managerController.managerLogin(loginData);
        assertEquals(401, resp.getStatusCodeValue());
    }

    @Test
    void testManagerLogin_UserNotFound() {
        Map<String,String> loginData = new HashMap<>();
        loginData.put("username","bob"); loginData.put("password","pass");
        when(userService.validateCredentials("bob","pass")).thenReturn(true);
        when(userService.findByName("bob")).thenReturn(null);

        ResponseEntity<?> resp = managerController.managerLogin(loginData);
        assertEquals(401, resp.getStatusCodeValue());
    }

    @Test
    void testManagerLogin_NotAManager() {
        Map<String,String> loginData = new HashMap<>();
        loginData.put("username","bob"); loginData.put("password","pass");
        User u = new User(); u.setUserid(1);
        when(userService.validateCredentials("bob","pass")).thenReturn(true);
        when(userService.findByName("bob")).thenReturn(u);
        when(managerService.getManagerById(1)).thenReturn(null);

        ResponseEntity<?> resp = managerController.managerLogin(loginData);
        assertEquals(401, resp.getStatusCodeValue());
    }
}