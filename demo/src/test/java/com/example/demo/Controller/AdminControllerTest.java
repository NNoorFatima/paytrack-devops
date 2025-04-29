package com.example.demo.Controller;
import com.example.demo.controller.AdminController;
//model
import com.example.demo.model.Admin;
import com.example.demo.model.User;
import com.example.demo.model.HR;
import com.example.demo.model.Manager;
//service
import com.example.demo.service.AdminService;
import com.example.demo.service.UserService;
import com.example.demo.service.HRService;
import com.example.demo.service.ManagerService;

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
public class AdminControllerTest {
    @Mock
    private AdminService adminService;

    @Mock
    private UserService userService;

    @Mock
    private ManagerService managerService;

    @Mock
    private HRService hrService;

    @InjectMocks
    private AdminController adminController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllAdmins() {
        List<Admin> admins = Arrays.asList(new Admin(), new Admin());
        when(adminService.getAllAdmins()).thenReturn(admins);
    }

    @Test
    void testGetAdminById_Found() {
        int adminId = 1;
        Admin admin = new Admin();
        //setting up a mock behavior for the adminservice object ---
        //so instead of going to DB actually just return what u created above
        when(adminService.getAdminById(adminId)).thenReturn(admin);
        //here testing admin controller function 
        ResponseEntity<Admin> response = adminController.getAdminById(adminId);
        //200 is ccode for success
        assertEquals(200, response.getStatusCodeValue());
        assertNotNull(response.getBody());
    }

    @Test
    void testGetAdminById_NotFound() {
        
        when(adminService.getAdminById(1)).thenReturn(null);
        //here testing admin controller function 
        ResponseEntity<Admin> response = adminController.getAdminById(1);
        assertEquals(404, response.getStatusCodeValue());

    }

    @Test
    void testCreateAdmin() {
        Admin admin = new Admin();
        when(adminService.createAdmin(admin)).thenReturn(admin);
        ResponseEntity<Admin> response = adminController.createAdmin(admin);
        assertEquals(201, response.getStatusCodeValue());
    }   

    @Test
    void testUpdateAdmin_Found() {
        int adminId = 1;
        Admin admin = new Admin();
        when(adminService.updateAdmin(adminId, admin)).thenReturn(admin);
        ResponseEntity<Admin> response = adminController.updateAdmin(adminId, admin);
        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    void testUpdateAdmin_NotFound() {
        Admin admin = new Admin();
        when(adminService.updateAdmin(1, admin)).thenReturn(null);
        ResponseEntity<Admin> response = adminController.updateAdmin(1, admin);
        assertEquals(404, response.getStatusCodeValue());
    }

    @Test
    void testDeleteAdmin_Found() {
        int adminId = 1;
        adminController.deleteAdmin(adminId);
        verify(adminService, times(1)).deleteAdmin(adminId);
    }

    @Test
    void testDeleteAdmin_NotFound() {
        int adminId = 1;
        when(adminService.deleteAdmin(adminId)).thenReturn(false);
        ResponseEntity<Void> response = adminController.deleteAdmin(adminId);
        assertEquals(404, response.getStatusCodeValue());
    }   

    @Test
    void testAddManager_Done() {
        Manager manager = new Manager();
        manager.setUserid(1);
    
        // Mock the user service to return a user object
        User user = new User();
        when(userService.getUserById(1)).thenReturn(user);
    
        // Mock the manager service to create the manager
        when(managerService.createManager(manager)).thenReturn(manager);
    
        ResponseEntity<String> response = adminController.addManager(manager);
    
        assertEquals(201, response.getStatusCodeValue());
        assertEquals("Manager added successfully by Admin!", response.getBody());
    }

    @Test
    void testAddManager_UserNotFound() {
        Manager manager = new Manager();
        manager.setUserid(1);
    
        // Mock the user service to return null
        when(userService.getUserById(1)).thenReturn(null);
    
        ResponseEntity<String> response = adminController.addManager(manager);
    
        assertEquals(400, response.getStatusCodeValue());
        assertEquals("User not found for ID: 1", response.getBody());
    }

    @Test
    void testRemoveHRWithUser_Done() {
        int id = 1;

        // Mock the hrService to return true when deleteHRWithUser is called
        when(hrService.deleteHRWithUser(id)).thenReturn(true);

        ResponseEntity<String> response = adminController.removeHRWithUser(id);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("HR and User deleted successfully!", response.getBody());
    }

    @Test
    void testRemoveHRWithUser_NotFound() {
        int id = 1;

        // Mock the hrService to return false when deleteHRWithUser is called
        when(hrService.deleteHRWithUser(id)).thenReturn(false);

        ResponseEntity<String> response = adminController.removeHRWithUser(id);

        assertEquals(404, response.getStatusCodeValue());
        assertEquals("HR or User not found.", response.getBody());
    }
        

    @Test
    void testAddHR_Done() {
        HR hr = new HR();

        // Mock the hrService to create the HR
        when(hrService.createHR(hr)).thenReturn(hr);

        ResponseEntity<String> response = adminController.addHR(hr);

        assertEquals(201, response.getStatusCodeValue());
        assertEquals("HR added successfully by Admin!", response.getBody());
    }

    @Test
    void testRemoveManagerWithUser_Done() {
        int id = 1;

        // Mock the managerService to return true when deleteManagerWithUser is called
        when(managerService.deleteManagerWithUser(id)).thenReturn(true);

        ResponseEntity<String> response = adminController.removeManagerWithUser(id);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Manager and User deleted successfully!", response.getBody());
    }

    @Test
    void testRemoveManagerWithUser_NotFound() {
        int id = 1;

        // Mock the managerService to return false when deleteManagerWithUser is called
        when(managerService.deleteManagerWithUser(id)).thenReturn(false);

        ResponseEntity<String> response = adminController.removeManagerWithUser(id);

        assertEquals(404, response.getStatusCodeValue());
        assertEquals("Manager or User not found.", response.getBody());
    }

    @Test
    void testLogin_ValidCredentials() {
        String name = "admin";
        String password = "password";

        // Mock the userService to return true when validateCredentials is called
        when(userService.validateCredentials(name, password)).thenReturn(true);

        String response = adminController.login(name, password);

        assertEquals("Login successful!", response);
    }

    @Test
    void testLogin_InvalidCredentials() {
        String name = "admin";
        String password = "wrongpassword";

        // Mock the userService to return false when validateCredentials is called
        when(userService.validateCredentials(name, password)).thenReturn(false);

        String response = adminController.login(name, password);

        assertEquals("Invalid credentials or not an admin.", response);
    }

    @Test
    void testGetUserDataByAdminId_Done() {
        int id = 1;

        // Mock the adminService to return an Admin object
        Admin admin = new Admin();
        User user = new User();
        admin.setUser(user);
        when(adminService.getAdminById(id)).thenReturn(admin);

        ResponseEntity<User> response = adminController.getUserDataByAdminId(id);

        assertEquals(200, response.getStatusCodeValue());
        assertNotNull(response.getBody());
        assertEquals(user, response.getBody());
    }

    @Test
    void testGetUserDataByAdminId_AdminNotFound() {
        int id = 1;

        // Mock the adminService to return null
        when(adminService.getAdminById(id)).thenReturn(null);

        ResponseEntity<User> response = adminController.getUserDataByAdminId(id);

        assertEquals(404, response.getStatusCodeValue());
        assertNull(response.getBody());
    }

    @Test
    void testGetUserDataByAdminId_UserNotFound() {
        int id = 1;

        // Mock the adminService to return an Admin object with no User
        Admin admin = new Admin();
        when(adminService.getAdminById(id)).thenReturn(admin);

        ResponseEntity<User> response = adminController.getUserDataByAdminId(id);

        assertEquals(404, response.getStatusCodeValue());
        assertNull(response.getBody());
    }
}
