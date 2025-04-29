package com.example.demo.repository;

import com.example.demo.model.Leave;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LeaveRepository extends JpaRepository<Leave, Integer> {
        List<Leave> findByUserIdAndStatus(int userId, String status);

        @Query("SELECT l.userId, COUNT(l) FROM Leave l WHERE l.status = 'Approved' GROUP BY l.userId")
        List<Object[]> countAcceptedLeavesGroupedByUserId();

        @Query("SELECT u.name, l FROM Leave l JOIN User u ON l.userId = u.userid JOIN Employee e ON u.userid = e.userid WHERE e.deptid = :deptId AND l.status = :status")
        List<Object[]> findLeavesWithUserNameByDeptAndStatus(@Param("deptId") int deptId, @Param("status") String status);

        @Query("SELECT l FROM Leave l WHERE l.userId = :userId AND FUNCTION('MONTH', l.leaveDate) = :month AND FUNCTION('YEAR', l.leaveDate) = :year")
        List<Leave> findByUserIdAndMonthAndYear(@Param("userId") int userId, @Param("month") int month, @Param("year") int year);
    
        @Query(
        "SELECT COUNT(l) "
        + "FROM Leave l "
        + "WHERE l.userId    = :userId "
        + "  AND l.status    = :status "
        + "  AND FUNCTION('MONTH', l.leaveDate) = :month "
        + "  AND FUNCTION('YEAR',  l.leaveDate) = :year"
        )
        long countByUserIdAndStatusAndMonthAndYear(
            @Param("userId") int userId,
            @Param("status") String status,
            @Param("month") int month,
            @Param("year") int year
        );

}

