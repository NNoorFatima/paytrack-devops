package com.example.demo.service;

import com.example.demo.model.Manager;
import com.example.demo.repository.ManagerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ManagerService {

    @Autowired
    private ManagerRepository managerRepository;

    @Autowired
    private UserService userService;

    // Retrieve all manager records
    public List<Manager> getAllManagers() {
        return managerRepository.findAll();
    }

    // Retrieve a manager record by userid
    public Manager getManagerById(int userid) {
        return managerRepository.findById(userid).orElse(null);
    }

    // Create a new manager record
    public Manager createManager(Manager manager) {
        return managerRepository.save(manager);
    }

    // Update manager (only deptid is updatable)
    public Manager updateManager(int userid, Manager managerDetails) {
        Manager existingManager = managerRepository.findById(userid).orElse(null);
        if (existingManager != null) {
            existingManager.setDeptid(managerDetails.getDeptid());
            return managerRepository.save(existingManager);
        }
        return null;
    }

    // Only deletes the manager record
    public boolean deleteManager(int userid) {
        if (managerRepository.existsById(userid)) {
            managerRepository.deleteById(userid);
            return true;
        }
        return false;
    }

    // Deletes both manager and corresponding user
    @Transactional
    public boolean deleteManagerWithUser(int userid) {
        Manager manager = managerRepository.findById(userid).orElse(null);
        if (manager != null) {
            int userId = manager.getUser().getUserid();
            managerRepository.deleteById(userid);
            userService.deleteUser(userId);
            return true;
        }
        return false;
    }
}
