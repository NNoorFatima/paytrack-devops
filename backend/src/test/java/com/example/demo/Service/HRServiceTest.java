package com.example.demo.Service;

import com.example.demo.model.HR;
import com.example.demo.repository.HRRepository;
import com.example.demo.service.HRService;
import com.example.demo.service.UserService;
import com.example.demo.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.List;
import java.util.Optional;

class HRServiceTest {

    @Mock
    private HRRepository hrRepository;

    @Mock
    private UserService userService;

    @InjectMocks
    private HRService hrService;

    private HR hr;
    private User user;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        user = new User();
        user.setUserid(1);

        hr = new HR();
        hr.setUserid(1);
        hr.setDeptid(10);
        hr.setUser(user);
    }

    @Test
    void testGetAllHRs() {
        when(hrRepository.findAll()).thenReturn(List.of(hr));

        List<HR> hrList = hrService.getAllHRs();
        assertNotNull(hrList);
        assertFalse(hrList.isEmpty());
        assertEquals(1, hrList.size());
    }

    @Test
    void testGetHRById() {
        when(hrRepository.findById(1)).thenReturn(Optional.of(hr));

        HR result = hrService.getHRById(1);
        assertNotNull(result);
        assertEquals(1, result.getUserid());
    }

    @Test
    void testCreateHR() {
        when(hrRepository.save(any(HR.class))).thenReturn(hr);

        HR createdHR = hrService.createHR(hr);
        assertNotNull(createdHR);
        assertEquals(1, createdHR.getUserid());
    }

    @Test
    void testUpdateHR() {
        when(hrRepository.findById(1)).thenReturn(Optional.of(hr));
        when(hrRepository.save(any(HR.class))).thenReturn(hr);

        HR updatedHR = hrService.updateHR(1, hr);
        assertNotNull(updatedHR);
        assertEquals(10, updatedHR.getDeptid());
    }

    @Test
    void testDeleteHR() {
        when(hrRepository.existsById(1)).thenReturn(true);

        boolean result = hrService.deleteHR(1);
        assertTrue(result);

        verify(hrRepository, times(1)).deleteById(1);
    }

    @Test
    void testDeleteHRWithUser() {
        when(hrRepository.findById(1)).thenReturn(Optional.of(hr));
        when(userService.deleteUser(1)).thenReturn(false);

        boolean result = hrService.deleteHRWithUser(1);
        assertTrue(result);

        verify(hrRepository, times(1)).deleteById(1);
        verify(userService, times(1)).deleteUser(1);
    }

    @Test
    void testDeleteHRWithUser_HRNotFound() {
        when(hrRepository.findById(1)).thenReturn(Optional.empty());

        boolean result = hrService.deleteHRWithUser(1);
        assertFalse(result);
    }

    @Test
    void testDeleteHRWithUser_Error() {
        when(hrRepository.findById(1)).thenReturn(Optional.of(hr));
        doThrow(new RuntimeException("Error")).when(userService).deleteUser(anyInt());

        boolean result = hrService.deleteHRWithUser(1);
        assertFalse(result);

        verify(hrRepository, times(1)).deleteById(1);
        verify(userService, times(1)).deleteUser(1);
    }
}