package com.example.demo.controller;

import com.example.demo.model.Employee;
import com.example.demo.model.Leave;
import com.example.demo.service.LeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/leaves")
public class LeaveController {

    @Autowired
    private LeaveService leaveService;

    // Retrieve all leaves
    @GetMapping
    public List<Leave> getAllLeaves() {
        return leaveService.getAllLeaves();
    }

    // Retrieve a leave by id
    @GetMapping("/{id}")
    public ResponseEntity<Leave> getLeaveById(@PathVariable int id) {
        Leave leave = leaveService.getLeaveById(id);
        if (leave != null) {
            return ResponseEntity.ok(leave);
        }
        return ResponseEntity.notFound().build();
    }

    // Create a new leave
    @PostMapping
    public ResponseEntity<Leave> createLeave(@RequestBody Leave leave) {
        Leave createdLeave = leaveService.createLeave(leave);
        return new ResponseEntity<>(createdLeave, HttpStatus.CREATED);
        
    }
    


    // Update an existing leave by id
    @PutMapping("/{id}")
    public ResponseEntity<Leave> updateLeave(@PathVariable int id, @RequestBody Leave leaveDetails) {
        Leave updatedLeave = leaveService.updateLeave(id, leaveDetails);
        if (updatedLeave != null) {
            return ResponseEntity.ok(updatedLeave);
        }
        return ResponseEntity.notFound().build();
    }

    // **New: Update only the status of an existing leave**
    @PutMapping("/{id}/status")
    public ResponseEntity<Leave> updateLeaveStatus(@PathVariable int id, @RequestBody Map<String, String> statusUpdate) {
        String newStatus = statusUpdate.get("status");
        Leave updatedLeave = leaveService.updateLeaveStatus(id, newStatus);
        if (updatedLeave != null) {
            return ResponseEntity.ok(updatedLeave);
        }
        return ResponseEntity.notFound().build();
    }

    // Delete a leave by id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLeave(@PathVariable int id) {
        leaveService.deleteLeave(id);
        return ResponseEntity.noContent().build();
    }

    //Get leaves with Approved status
    @GetMapping("/approved")
    public ResponseEntity<List<Leave>> getApprovedLeaves(@RequestParam int userId) {
        List<Leave> approvedLeaves = leaveService.getApprovedLeavesByUserId(userId);
        return ResponseEntity.ok(approvedLeaves);
    }

    // Get leaves of any given status
    @GetMapping("/allStatus")
    public ResponseEntity<List<Leave>> getAllStatusLeave(@RequestParam int userId, @RequestParam String status) {
        List<Leave> leaveRequests = leaveService.getAllStatusLeave(userId, status); // Use the dynamic status
        return ResponseEntity.ok(leaveRequests);
    } // curl -X GET "http://localhost:8080/leaves/allStatus?userId=5&status=APPROVED"


    @GetMapping("/byDeptAndStatus")
    public ResponseEntity<List<Object[]>> getLeavesByDeptAndStatus(
            @RequestParam int deptId,
            @RequestParam String status
    ) {
        List<Object[]> result = leaveService.getLeavesWithUserNameByDeptAndStatus(deptId, status);
        return ResponseEntity.ok(result);
    }


    @GetMapping("/byUserAndMonthYear")
    public ResponseEntity<List<Leave>> getLeavesByUserMonthYear(
        @RequestParam int userId,
        @RequestParam int month,
        @RequestParam int year
    ) {
        List<Leave> leaves = leaveService.getLeavesByUserMonthYear(userId, month, year);
        if (leaves.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(leaves);
    }
    // example : curl -X GET "http://localhost:8080/leaves/byUserAndMonthYear?userId=1&month=1&year=2024"

    
    @GetMapping("/byUserAndMonthYear/count")
    public ResponseEntity<Long> getApprovedLeaveCountByUserMonthYear(
        @RequestParam int userId,
        @RequestParam int month,
        @RequestParam int year
    ) {
        long count = leaveService.getApprovedLeaveCount(userId, month, year);
        if (count == 0) {
            // 204 No Content if none approved
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(count);
    } 
    // example :- 
    // curl -X GET "http://localhost:8080/leaves/byUserAndMonthYear/count?userId=1&month=5&year=2024" 









}
