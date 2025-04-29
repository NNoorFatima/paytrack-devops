package com.example.demo.service;

import com.example.demo.model.Leave;
import com.example.demo.repository.LeaveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Map;

@Service
public class LeaveService {

    @Autowired
    private LeaveRepository leaveRepository;

    // Retrieve all leaves
    public List<Leave> getAllLeaves() {
        return leaveRepository.findAll();
    }

    // Retrieve a leave by id
    public Leave getLeaveById(int id) {
        return leaveRepository.findById(id).orElse(null);
    }

    // Create a new leave
    public Leave createLeave(Leave leave) {
        return leaveRepository.save(leave);
    }

    // Update an existing leave
    public Leave updateLeave(int id, Leave leaveDetails) {
        Leave existingLeave = leaveRepository.findById(id).orElse(null);
        if (existingLeave != null) {
            existingLeave.setUserId(leaveDetails.getUserId());
            existingLeave.setLeaveDate(leaveDetails.getLeaveDate());
            existingLeave.setReason(leaveDetails.getReason());
            existingLeave.setStatus(leaveDetails.getStatus());
            return leaveRepository.save(existingLeave);
        }
        return null;
    }

       // **New: Update only the status of an existing leave**
       public Leave updateLeaveStatus(int id, String status) {
        Leave existingLeave = leaveRepository.findById(id).orElse(null);
        if (existingLeave != null) {
            existingLeave.setStatus(status);
            return leaveRepository.save(existingLeave);
        }
        return null;
    }

    // Delete a leave by id
    public void deleteLeave(int id) {
        leaveRepository.deleteById(id);
    }

    public List<Leave> getApprovedLeavesByUserId(int userId) {
        return leaveRepository.findByUserIdAndStatus(userId, "Approved");
    }
    public List<Leave> getAllStatusLeave(int userId) {
        return leaveRepository.findByUserIdAndStatus(userId, "Approved");
    }
    
    public List<Leave> getAllStatusLeave(int userId, String status) {
        return leaveRepository.findByUserIdAndStatus(userId, status);  // Pass status dynamically
    }

    
    public List<Object[]> getLeavesWithUserNameByDeptAndStatus(int deptId, String status) {
        return leaveRepository.findLeavesWithUserNameByDeptAndStatus(deptId, status);
    }
    

    public List<Leave> getLeavesByUserMonthYear(int userId, int month, int year) {
        return leaveRepository.findByUserIdAndMonthAndYear(userId, month, year);
    }

    // * Return the count of leaves with status="Approved" 
    // * for a given user in the given month & year.
    public long getApprovedLeaveCount(int userId, int month, int year) {
        return leaveRepository
                 .countByUserIdAndStatusAndMonthAndYear(userId, "Approved", month, year);
      }
    
  
    


    
}




