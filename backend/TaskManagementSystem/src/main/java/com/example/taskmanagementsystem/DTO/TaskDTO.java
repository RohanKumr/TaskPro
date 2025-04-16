package com.example.taskmanagementsystem.DTO;

import java.sql.Blob;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

public class TaskDTO {
	
	private Long progressid;
	private Long taskid;
	
    private String category;
    private String name;
    private String description;
    private String priority;

    private double progress;
    public String getRemarks() {
		return remarks;
	}



	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	private int updatedBy;

    private Blob progressfile;
    private LocalDateTime progressUpdatedTime;
    
    private String remarks;
    

    private String reviewstatus;
    
    
    

	public TaskDTO(Long progressid, Long taskid, String category, String name, String description, String priority) {
		super();
		this.progressid = progressid;
		this.taskid = taskid;
		this.category = category;
		this.name = name;
		this.description = description;
		this.priority = priority;
	}

	

	public Long getProgressid() {
		return progressid;
	}

	public void setProgressid(Long progressid) {
		this.progressid = progressid;
	}

	public Long getTaskid() {
		return taskid;
	}

	public void setTaskid(Long taskid) {
		this.taskid = taskid;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getPriority() {
		return priority;
	}

	public void setPriority(String priority) {
		this.priority = priority;
	}

	public double getProgress() {
		return progress;
	}

	public void setProgress(double progress) {
		this.progress = progress;
	}

	public int getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(int updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Blob getProgressfile() {
		return progressfile;
	}

	public void setProgressfile(Blob progressfile) {
		this.progressfile = progressfile;
	}

	public LocalDateTime getProgressUpdatedTime() {
		return progressUpdatedTime;
	}

	public void setProgressUpdatedTime(LocalDateTime progressUpdatedTime) {
		this.progressUpdatedTime = progressUpdatedTime;
	}



	public String getReviewstatus() {
		return reviewstatus;
	}

	public void setReviewstatus(String reviewstatus) {
		this.reviewstatus = reviewstatus;
	}

	@Override
	public String toString() {
		return "TaskDTO [progressid=" + progressid + ", taskid=" + taskid + ", category=" + category + ", name=" + name
				+ ", description=" + description + ", priority=" + priority + ", progress=" + progress + ", updatedBy="
				+ updatedBy + ", progressfile=" + progressfile + ", progressUpdatedTime=" + progressUpdatedTime
				+ ", remarks=" + remarks + ", reviewstatus=" + reviewstatus + "]";
	}
    
    
    
    

}
