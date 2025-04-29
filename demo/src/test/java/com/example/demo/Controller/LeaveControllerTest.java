package com.example.demo.Controller;

import com.example.demo.controller.LeaveController;
import com.example.demo.model.Leave;
import com.example.demo.service.LeaveService;

import org.apache.tomcat.util.http.parser.MediaType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class LeaveControllerTest {

    @Mock
    private LeaveService leaveService;

    @InjectMocks
    private LeaveController leaveController;

    private MockMvc mockMvc;
    private Leave leave;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(leaveController).build();
        
        leave = new Leave();
        leave.setId(1);
        leave.setUserId(1);
        leave.setStatus("APPROVED");
    }

    @Test
    void testGetAllLeaves() throws Exception {
        List<Leave> leaves = Arrays.asList(leave);

        when(leaveService.getAllLeaves()).thenReturn(leaves);

        mockMvc.perform(get("/leaves"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].status").value("APPROVED"));
    }

    @Test
    void testGetLeaveById() throws Exception {
        when(leaveService.getLeaveById(1)).thenReturn(leave);

        mockMvc.perform(get("/leaves/{id}", 1))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.status").value("APPROVED"));
    }

    @Test
    void testCreateLeave() throws Exception {
        Leave newLeave = new Leave();
        newLeave.setId(2);
        newLeave.setUserId(2);
        newLeave.setStatus("PENDING");

        when(leaveService.createLeave(any(Leave.class))).thenReturn(newLeave);

        mockMvc.perform(post("/leaves")
                        .contentType("application/json")
                        .content("{\"id\":2,\"userId\":2,\"status\":\"PENDING\"}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(2))
                .andExpect(jsonPath("$.status").value("PENDING"));
    }

    @Test
    void testUpdateLeaveStatus() throws Exception {
        Map<String, String> statusUpdate = Map.of("status", "REJECTED");

        Leave updatedLeave = new Leave();
        updatedLeave.setId(1);
        updatedLeave.setUserId(1);
        updatedLeave.setStatus("REJECTED");

        when(leaveService.updateLeaveStatus(1, "REJECTED")).thenReturn(updatedLeave);

        mockMvc.perform(put("/leaves/{id}/status", 1)
                        .contentType("application/json")
                        .content("{\"status\":\"REJECTED\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("REJECTED"));
    }

    @Test
    void testDeleteLeave() throws Exception {
        doNothing().when(leaveService).deleteLeave(1);

        mockMvc.perform(delete("/leaves/{id}", 1))
                .andExpect(status().isNoContent());
    }

    @Test
    void testGetApprovedLeaves() throws Exception {
        List<Leave> approvedLeaves = Arrays.asList(leave);

        when(leaveService.getApprovedLeavesByUserId(1)).thenReturn(approvedLeaves);

        mockMvc.perform(get("/leaves/approved")
                        .param("userId", "1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].status").value("APPROVED"));
    }

    @Test
    void testGetAllStatusLeave() throws Exception {
        List<Leave> leaveRequests = Arrays.asList(leave);

        when(leaveService.getAllStatusLeave(1, "APPROVED")).thenReturn(leaveRequests);

        mockMvc.perform(get("/leaves/allStatus")
                        .param("userId", "1")
                        .param("status", "APPROVED"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].status").value("APPROVED"));
    }

    @Test
    public void testGetLeavesByDeptAndStatus() throws Exception {
        // Prepare test data
        int deptId = 1;
        String status = "Approved";

        // Mock the service method call
        List<Object[]> mockLeaves = new ArrayList<>();
        Object[] leave1 = new Object[]{"John Doe", "2024-05-01", "Sick leave"};
        Object[] leave2 = new Object[]{"Jane Doe", "2024-05-02", "Vacation"};
        mockLeaves.add(leave1);
        mockLeaves.add(leave2);

        // Mock the service method
        when(leaveService.getLeavesWithUserNameByDeptAndStatus(deptId, status)).thenReturn(mockLeaves);

        // Perform the GET request
        mockMvc.perform(get("/leaves/byDeptAndStatus")
                .param("deptId", String.valueOf(deptId))
                .param("status", status))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0][0]").value("John Doe"))
                .andExpect(jsonPath("$[1][0]").value("Jane Doe"));

        // Verify that the service method was called
        verify(leaveService, times(1)).getLeavesWithUserNameByDeptAndStatus(deptId, status);
    }





    
    @Test
    void testGetLeavesByUserAndMonthYear() throws Exception {
        List<Leave> leaves = Arrays.asList(leave);

        when(leaveService.getLeavesByUserMonthYear(1, 1, 2024)).thenReturn(leaves);

        mockMvc.perform(get("/leaves/byUserAndMonthYear")
                        .param("userId", "1")
                        .param("month", "1")
                        .param("year", "2024"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].status").value("APPROVED"));
    }

    @Test
    void testGetApprovedLeaveCountByUserMonthYear() throws Exception {
        when(leaveService.getApprovedLeaveCount(1, 5, 2024)).thenReturn(2L);

        mockMvc.perform(get("/leaves/byUserAndMonthYear/count")
                        .param("userId", "1")
                        .param("month", "5")
                        .param("year", "2024"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value(2));
    }
}