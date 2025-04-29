package com.example.demo.Service;

import com.example.demo.model.Admin;
import com.example.demo.repository.AdminRepository;
import com.example.demo.service.AdminService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.*;

class AdminServiceTest {

    @Mock
    private AdminRepository adminRepository;

    @InjectMocks
    private AdminService adminService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllAdmins() {
        Admin admin1 = new Admin();
        Admin admin2 = new Admin();
        when(adminRepository.findAll()).thenReturn(Arrays.asList(admin1, admin2));

        List<Admin> admins = adminService.getAllAdmins();

        assertEquals(2, admins.size());
        verify(adminRepository, times(1)).findAll();
    }

    @Test
    void testGetAdminById_Found() {
        Admin admin = new Admin();
        when(adminRepository.findById(1)).thenReturn(Optional.of(admin));

        Admin result = adminService.getAdminById(1);

        assertNotNull(result);
        verify(adminRepository, times(1)).findById(1);
    }

    @Test
    void testGetAdminById_NotFound() {
        when(adminRepository.findById(1)).thenReturn(Optional.empty());

        Admin result = adminService.getAdminById(1);

        assertNull(result);
        verify(adminRepository, times(1)).findById(1);
    }

    @Test
    void testCreateAdmin() {
        Admin admin = new Admin();
        when(adminRepository.save(admin)).thenReturn(admin);

        Admin result = adminService.createAdmin(admin);

        assertNotNull(result);
        verify(adminRepository, times(1)).save(admin);
    }

    @Test
    void testUpdateAdmin_Found() {
        Admin existingAdmin = new Admin();
        when(adminRepository.findById(1)).thenReturn(Optional.of(existingAdmin));
        when(adminRepository.save(existingAdmin)).thenReturn(existingAdmin);

        Admin updatedAdmin = adminService.updateAdmin(1, new Admin());

        assertNotNull(updatedAdmin);
        verify(adminRepository, times(1)).findById(1);
        verify(adminRepository, times(1)).save(existingAdmin);
    }

    @Test
    void testUpdateAdmin_NotFound() {
        when(adminRepository.findById(1)).thenReturn(Optional.empty());

        Admin updatedAdmin = adminService.updateAdmin(1, new Admin());

        assertNull(updatedAdmin);
        verify(adminRepository, times(1)).findById(1);
        verify(adminRepository, never()).save(any());
    }

    @Test
    void testDeleteAdmin_Found() {
        when(adminRepository.existsById(1)).thenReturn(true);

        boolean result = adminService.deleteAdmin(1);

        assertTrue(result);
        verify(adminRepository, times(1)).existsById(1);
        verify(adminRepository, times(1)).deleteById(1);
    }

    @Test
    void testDeleteAdmin_NotFound() {
        when(adminRepository.existsById(1)).thenReturn(false);

        boolean result = adminService.deleteAdmin(1);

        assertFalse(result);
        verify(adminRepository, times(1)).existsById(1);
        verify(adminRepository, never()).deleteById(anyInt());
    }
}
