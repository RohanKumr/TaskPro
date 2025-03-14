package com.example.taskmanagementsystem.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.taskmanagementsystem.Models.SelfTask;

@Repository
public interface SelfTaskRepository extends JpaRepository<SelfTask,Long> {

}
