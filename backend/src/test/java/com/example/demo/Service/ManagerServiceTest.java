// src/test/java/com/example/demo/service/ManagerServiceTest.java
package com.example.demo.Service;

import com.example.demo.model.Manager;
import com.example.demo.model.User;
import com.example.demo.repository.ManagerRepository;
import com.example.demo.service.ManagerService;
import com.example.demo.service.UserService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.Optional;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ManagerServiceTest {

    @Mock
    private ManagerRepository managerRepository;

    @Mock
    private UserService userService;

    @InjectMocks
    private ManagerService managerService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllManagers() {
        Manager m1 = new Manager();
        Manager m2 = new Manager();
        when(managerRepository.findAll()).thenReturn(Arrays.asList(m1, m2));

        List<Manager> result = managerService.getAllManagers();

        assertEquals(2, result.size());
        verify(managerRepository).findAll();
    }

    @Test
    void testGetManagerById_Existing() {
        Manager m = new Manager();
        when(managerRepository.findById(1)).thenReturn(Optional.of(m));

        Manager result = managerService.getManagerById(1);

        assertNotNull(result);
        verify(managerRepository).findById(1);
    }

    @Test
    void testGetManagerById_NotExisting() {
        when(managerRepository.findById(1)).thenReturn(Optional.empty());

        Manager result = managerService.getManagerById(1);

        assertNull(result);
    }

    @Test
    void testCreateManager() {
        Manager m = new Manager();
        when(managerRepository.save(m)).thenReturn(m);

        Manager result = managerService.createManager(m);

        assertNotNull(result);
        verify(managerRepository).save(m);
    }

    @Test
    void testUpdateManager_Existing() {
        Manager existing = new Manager();
        existing.setDeptid(1);
        Manager details = new Manager();
        details.setDeptid(5);

        when(managerRepository.findById(1)).thenReturn(Optional.of(existing));
        when(managerRepository.save(existing)).thenReturn(existing);

        Manager result = managerService.updateManager(1, details);

        assertNotNull(result);
        assertEquals(5, existing.getDeptid());
    }

    @Test
    void testUpdateManager_NotExisting() {
        Manager details = new Manager();
        when(managerRepository.findById(1)).thenReturn(Optional.empty());

        Manager result = managerService.updateManager(1, details);

        assertNull(result);
    }

    @Test
    void testDeleteManager_Existing() {
        when(managerRepository.existsById(1)).thenReturn(true);

        boolean result = managerService.deleteManager(1);

        assertTrue(result);
        verify(managerRepository).deleteById(1);
    }

    @Test
    void testDeleteManager_NotExisting() {
        when(managerRepository.existsById(1)).thenReturn(false);

        boolean result = managerService.deleteManager(1);

        assertFalse(result);
    }

    @Test
    void testDeleteManagerWithUser_Existing() {
        Manager m = new Manager();
        m.setUserid(1);
        User dummyUser = new User();
        dummyUser.setUserid(1);
        m.setUser(dummyUser);
        when(managerRepository.findById(1)).thenReturn(Optional.of(m));

        boolean result = managerService.deleteManagerWithUser(1);

        assertTrue(result);
        verify(managerRepository).deleteById(1);
        verify(userService).deleteUser(1);
    }

    @Test
    void testDeleteManagerWithUser_NotExisting() {
        when(managerRepository.findById(1)).thenReturn(Optional.empty());

        boolean result = managerService.deleteManagerWithUser(1);

        assertFalse(result);
    }
}