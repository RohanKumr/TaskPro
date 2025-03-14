# TaskPro
Task pro will provide features like:
1.	User Authentication & Authorization
 - Secure login and role-based access (e.g., Admin, User).
2.	Task Creation & Management
- Create, update, delete, and view tasks.
- Assign tasks to users.
3.	Task Status Updates
- Mark tasks as "To Do," "In Progress," or "Completed."
4.	Task Categories
- Categorize tasks (e.g., Work, Personal, Urgent).
5.	Due Dates & Reminders
- Add due dates to tasks and send reminders.
6.	Dashboard
- Display tasks based on status, priority, or deadlines.
7.	Search and Filter
- Search tasks by title, description, or category.
- Filter by status, due date, or assigned user.

### Database
create database TaskManagementSystemDB;

use TaskManagementSystemDB;

show tables;

###### USER TABLE

select * from user_table;

INSERT INTO user_table (name, gender, department, email, password, contact, role)

VALUES ('John Doe', 'Male', 'IT', 'john.doe@example.com', 'password123', '9876543210', 'Tester');
 
INSERT INTO user_table (name, gender, department, email, password, contact, role)

VALUES ('Jane Smith', 'Female', 'HR', 'jane.smith@example.com', 'password456', '9123456789', 'Manager');
 
INSERT INTO user_table (name, gender, department, email, password, contact, role)

VALUES ('Alice Johnson', 'Female', 'Marketing', 'alice.johnson@example.com', 'password789', '9876123456', 'Employee');
 
INSERT INTO user_table (name, gender, department, email, password, contact, role)

VALUES ('Bob Brown', 'Male', 'Finance', 'bob.brown@example.com', 'password101', '9876987654', 'Manager');
 
INSERT INTO user_table (name, gender, department, email, password, contact, role)

VALUES ('Charlie Lee', 'Male', 'Sales', 'charlie.lee@example.com', 'password202', '9123981234', 'Employee');

 

###### TASK TABLE

select * from task_table;

INSERT INTO task_table (category, subcategory, name, description, priority, startDate, endDate, assignedTo, assignedBy, remarks, progress, status, taskAssignedTime)

VALUES ('Development', 'Frontend', 'Implement Login Page', 'Design and implement the login page for the application', 'High', '2025-03-14', '2025-03-20', 1, 101, 'Initial task setup', 20.0, 'In Progress', CURRENT_TIMESTAMP);
 
INSERT INTO task_table (category, subcategory, name, description, priority, startDate, endDate, assignedTo, assignedBy, remarks, progress, status, taskAssignedTime)

VALUES ('Development', 'Backend', 'Create API for User Management', 'Develop RESTful API for user CRUD operations', 'Medium', '2025-03-15', '2025-03-25', 2, 102, 'API structure defined', 40.0, 'In Progress', CURRENT_TIMESTAMP);
 
INSERT INTO task_table (category, subcategory, name, description, priority, startDate, endDate, assignedTo, assignedBy, remarks, progress, status, taskAssignedTime)

VALUES ('Testing', 'Unit Test', 'Test User Registration API', 'Write unit tests for the user registration API', 'Low', '2025-03-16', '2025-03-22', 3, 103, 'Tests written and ready to execute', 50.0, 'Pending', CURRENT_TIMESTAMP);
 
INSERT INTO task_table (category, subcategory, name, description, priority, startDate, endDate, assignedTo, assignedBy, remarks, progress, status, taskAssignedTime)

VALUES ('Design', 'UI/UX', 'Redesign Dashboard', 'Create a modern and responsive dashboard design for users', 'High', '2025-03-17', '2025-03-24', 4, 104, 'Mockups created', 60.0, 'In Progress', CURRENT_TIMESTAMP);
 
INSERT INTO task_table (category, subcategory, name, description, priority, startDate, endDate, assignedTo, assignedBy, remarks, progress, status, taskAssignedTime)

VALUES ('Development', 'Mobile', 'Develop Mobile App for Android', 'Develop an Android version of the app with basic features', 'High', '2025-03-18', '2025-03-30', 5, 105, 'Initial setup completed', 10.0, 'Pending', CURRENT_TIMESTAMP);

 