package com.example.demo.service;

import com.example.demo.model.HR;
import com.example.demo.repository.HRRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class HRService {

    @Autowired
    private HRRepository hrRepository;

    @Autowired
    private UserService userService;

    // Retrieve all HR records
    public List<HR> getAllHRs() {
        return hrRepository.findAll();
    }

    // Retrieve an HR record by userid
    public HR getHRById(int userid) {
        return hrRepository.findById(userid).orElse(null);
    }

    // Create a new HR record
    public HR createHR(HR hr) {
        return hrRepository.save(hr);
    }

    // Update an existing HR record (only deptid is updateable)
    public HR updateHR(int userid, HR hrDetails) {
        HR existingHR = hrRepository.findById(userid).orElse(null);
        if (existingHR != null) {
            existingHR.setDeptid(hrDetails.getDeptid());
            return hrRepository.save(existingHR);
        }
        return null;
    }

    // Only deletes the HR record
    public boolean deleteHR(int userid) {
        if (hrRepository.existsById(userid)) {
            hrRepository.deleteById(userid);
            return true;
        }
        return false;
    }

    public boolean deleteHRWithUser(int userid) {
        // Find the HR record by userid
        HR hr = hrRepository.findById(userid).orElse(null);

        // Check if HR and associated user exist
        if (hr != null && hr.getUser() != null) {
            int userId = hr.getUser().getUserid(); // Get the associated user ID
            try {
                // Delete the HR record
                hrRepository.deleteById(userid);

                // Delete the associated user
                userService.deleteUser(userId);

                // Return true if both HR and User were deleted successfully
                return true;
            } catch (Exception e) {
                // Log any errors for debugging
                System.out.println("Error while deleting HR and User: " + e.getMessage());
                e.printStackTrace();
                return false; // Return false if an error occurs
            }
        } else {
            // Return false if HR or User not found
            return false;
        }
    }

      
}
