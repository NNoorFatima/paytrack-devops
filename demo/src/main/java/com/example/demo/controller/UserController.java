package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable int id) {
        return userService.getUserById(id);
    }

    @PostMapping("/create") // Corrected endpoint
    public Map<String, Integer> createUserWithId(@RequestBody User user) {
        User savedUser = userService.createUser(user);
        Map<String, Integer> response = new HashMap<>();
        response.put("userid", savedUser.getUserid()); // Ensure `User` model has `userid`
        return response;
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable int id, @RequestBody User userDetails) {
        return userService.updateUser(id, userDetails);
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable int id) {
        return userService.deleteUser(id) ? "User deleted successfully" : "User not found";
    }

    //change password
    @PutMapping("/{id}/change-password")
    public ResponseEntity<?> changePassword(@PathVariable int id, @RequestBody Map<String, String> payload) {
        String currentPassword = payload.get("currentPassword");
        String newPassword = payload.get("newPassword");

        try {
            userService.changePassword(id, currentPassword, newPassword);
            return ResponseEntity.ok("Password updated successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // New login endpoint to validate user credentials
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("username");
        String password = loginData.get("password");

        // Check if user exists and the password is correct
        if (userService.validateCredentials(username, password)) {
            // Return HTTP 200 if login is successful
            return ResponseEntity.ok("Login successful");
        } else {
            // Return HTTP 401 Unauthorized if credentials are incorrect
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect username or password");
        }
    }
}
