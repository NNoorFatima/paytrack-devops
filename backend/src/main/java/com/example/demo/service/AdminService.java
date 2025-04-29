package com.example.demo.service;

import com.example.demo.model.Admin;
import com.example.demo.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    // Retrieve all admins
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    // Retrieve an admin by userid
    public Admin getAdminById(int userid) {
        return adminRepository.findById(userid).orElse(null);
    }

    // Create a new admin record
    public Admin createAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    // Update an existing admin record (since there's only userid, this might be trivial)
    public Admin updateAdmin(int userid, Admin adminDetails) {
        Admin existingAdmin = adminRepository.findById(userid).orElse(null);
        if (existingAdmin != null) {
            // In this basic example, there's nothing to update except the userid itself,
            // which should remain unchanged. In a more complete model you might update admin-specific fields.
            return adminRepository.save(existingAdmin);
        }
        return null;
    }

    // Delete an admin record by userid
    public boolean deleteAdmin(int userid) {
        if (adminRepository.existsById(userid)) {
            adminRepository.deleteById(userid);
            return true;
        }
        return false;
    }

    
    
}
