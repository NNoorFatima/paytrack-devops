package com.example.demo.Service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    private User user;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        user = new User();
        user.setUserid(1);
        user.setName("John");
        user.setPassword("password123");
        user.setEmail("john@example.com");
        user.setPhone_no("1234567890");
        user.setGender("Male");
        user.setAddress("123 Main St");
        user.setDate_of_join("2025-04-27");
    }

    @Test
    public void testGetAllUsers() {
        when(userRepository.findAll()).thenReturn(List.of(user));

        assertEquals(1, userService.getAllUsers().size());
        verify(userRepository, times(1)).findAll();
    }

    @Test
    public void testGetUserById() {
        when(userRepository.findById(1)).thenReturn(Optional.of(user));

        User foundUser = userService.getUserById(1);

        assertNotNull(foundUser);
        assertEquals(user.getUserid(), foundUser.getUserid());
        verify(userRepository, times(1)).findById(1);
    }

    @Test
    public void testCreateUser() {
        when(userRepository.save(user)).thenReturn(user);

        User createdUser = userService.createUser(user);

        assertNotNull(createdUser);
        assertEquals(user.getName(), createdUser.getName());
        verify(userRepository, times(1)).save(user);
    }

    @Test
    public void testUpdateUser_Success() {
        // Mock the repository to return the existing user
        when(userRepository.findById(1)).thenReturn(Optional.of(user));
    
        // Mock save to return the updated user
        User updatedUserDetails = new User();
        updatedUserDetails.setName("Updated Name");
        updatedUserDetails.setPassword("newPassword");
        updatedUserDetails.setEmail("newemail@example.com");
    
        when(userRepository.save(any(User.class))).thenReturn(updatedUserDetails);
    
        // Call the update method
        User result = userService.updateUser(1, updatedUserDetails);
    
        // Verify the results
        assertNotNull(result);
        assertEquals("Updated Name", result.getName());
        assertEquals("newPassword", result.getPassword());
        assertEquals("newemail@example.com", result.getEmail());
    
        // Verify that the repository methods were called
        verify(userRepository, times(1)).findById(1);
        verify(userRepository, times(1)).save(any(User.class));
    }
    @Test
    public void testUpdateUser_UserNotFound() {
        // Mock the repository to return an empty Optional (no user found)
        when(userRepository.findById(1)).thenReturn(Optional.empty());

        // Call the update method
        User result = userService.updateUser(1, new User());

        // Verify that the result is null when the user is not found
        assertNull(result);

        // Verify that the repository method was called
        verify(userRepository, times(1)).findById(1);
        verify(userRepository, times(0)).save(any(User.class));
    }





















    @Test
    public void testDeleteUser() {
        when(userRepository.existsById(1)).thenReturn(true);

        boolean isDeleted = userService.deleteUser(1);

        assertTrue(isDeleted);
        verify(userRepository, times(1)).deleteById(1);
    }

    @Test
    public void testDeleteUserNotFound() {
        when(userRepository.existsById(1)).thenReturn(false);

        boolean isDeleted = userService.deleteUser(1);

        assertFalse(isDeleted);
        verify(userRepository, times(0)).deleteById(1);
    }

    @Test
    public void testChangePassword() {
        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(userRepository.save(user)).thenReturn(user);

        userService.changePassword(1, "password123", "newPassword");

        assertEquals("newPassword", user.getPassword());
        verify(userRepository, times(1)).findById(1);
        verify(userRepository, times(1)).save(user);
    }

    @Test
    public void testChangePasswordIncorrectCurrentPassword() {
        when(userRepository.findById(1)).thenReturn(Optional.of(user));

        assertThrows(IllegalArgumentException.class, () -> {
            userService.changePassword(1, "wrongPassword", "newPassword");
        });

        verify(userRepository, times(0)).save(any(User.class));
    }

    @Test
    public void testValidateCredentials() {
        when(userRepository.findByName("John")).thenReturn(user);

        boolean isValid = userService.validateCredentials("John", "password123");

        assertTrue(isValid);
        verify(userRepository, times(1)).findByName("John");
    }

    @Test
    public void testValidateCredentialsIncorrectPassword() {
        when(userRepository.findByName("John")).thenReturn(user);

        boolean isValid = userService.validateCredentials("John", "wrongPassword");

        assertFalse(isValid);
        verify(userRepository, times(1)).findByName("John");
    }

    @Test
    public void testFindByName() {
        when(userRepository.findByName("John")).thenReturn(user);

        User foundUser = userService.findByName("John");

        assertNotNull(foundUser);
        assertEquals("John", foundUser.getName());
        verify(userRepository, times(1)).findByName("John");
    }
}