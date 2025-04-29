package com.example.demo.controller;

import com.example.demo.model.Admin;
import com.example.demo.model.HR;
import com.example.demo.model.User;
import com.example.demo.service.AdminService;
import com.example.demo.service.HRService;
import com.example.demo.service.ManagerService;
import com.example.demo.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.model.Manager;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000") // This allows requests from your React frontend
@RestController
@RequestMapping("/admins")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private HRService hrService;

    @Autowired
    private ManagerService managerService;

    @Autowired
    private UserService userService;

    // --- Admin CRUD Operations ---
    @GetMapping
    public ResponseEntity<List<Admin>> getAllAdmins() {
        return ResponseEntity.ok(adminService.getAllAdmins());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Admin> getAdminById(@PathVariable int id) {
        Admin admin = adminService.getAdminById(id);
        return admin != null ? ResponseEntity.ok(admin) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Admin> createAdmin(@RequestBody Admin admin) {
        Admin createdAdmin = adminService.createAdmin(admin);
        return new ResponseEntity<>(createdAdmin, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Admin> updateAdmin(@PathVariable int id, @RequestBody Admin adminDetails) {
        Admin updatedAdmin = adminService.updateAdmin(id, adminDetails);
        return updatedAdmin != null ? ResponseEntity.ok(updatedAdmin) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdmin(@PathVariable int id) {
        return adminService.deleteAdmin(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}/user")
    public ResponseEntity<User> getUserDataByAdminId(@PathVariable int id) {
        Admin admin = adminService.getAdminById(id);
        return (admin != null && admin.getUser() != null) ? ResponseEntity.ok(admin.getUser())
                : ResponseEntity.notFound().build();
    }

    // --- Admin Handling HR Operations ---

    // Add HR (Admin creates HR)
    @PostMapping("/hrs")
    public ResponseEntity<String> addHR(@RequestBody HR hr) {
        hrService.createHR(hr);
        return ResponseEntity.status(HttpStatus.CREATED).body("HR added successfully by Admin!");
    }

    // Remove HR with User (Admin deletes HR and associated User)
    @DeleteMapping("/hrs/{id}")
    public ResponseEntity<String> removeHRWithUser(@PathVariable int id) {
        // Call the service method to delete HR and User
        boolean deleted = hrService.deleteHRWithUser(id);

        // Return response based on the result of deletion
        if (deleted) {
            return ResponseEntity.ok("HR and User deleted successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("HR or User not found.");
        }
    }

    @PostMapping("/managers")
    public ResponseEntity<String> addManager(@RequestBody Manager manager) {
        int userId = manager.getUserid();

        // Fetch the user associated with the manager
        User user = userService.getUserById(userId);
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found for ID: " + userId);
        }

        // Link manager to the user object before saving
        manager.setUser(user);

        // Create the manager and save
        managerService.createManager(manager);

        return ResponseEntity.status(HttpStatus.CREATED).body("Manager added successfully by Admin!");
    }

    // Remove Manager with User (Admin deletes Manager and associated User)
    @DeleteMapping("/managers/{id}")
    public ResponseEntity<String> removeManagerWithUser(@PathVariable int id) {
        boolean deleted = managerService.deleteManagerWithUser(id);

        if (deleted) {
            return ResponseEntity.ok("Manager and User deleted successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Manager or User not found.");
        }
    }


    @PostMapping("/login")
    public String login(@RequestParam String name, @RequestParam String password) {
        System.out.println("Name: " + name + ", Password: " + password);
        boolean isValid = userService.validateCredentials(name, password);
        if (isValid) {
            return "Login successful!";  // Plain text response
        } else {
            return "Invalid credentials or not an admin.";  // Plain text error response
        }
    }




}