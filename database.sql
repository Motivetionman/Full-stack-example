-- 1. สร้าง Database
CREATE DATABASE IF NOT EXISTS task_manager;
USE task_manager;

-- 2. สร้างตารางงาน (Tasks)
CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('pending', 'in_progress', 'completed') DEFAULT 'pending',
    categoryId INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. ข้อมูลตัวอย่าง (Mock Data)
INSERT INTO tasks (title, description, status) 
VALUES ('ส่งงานอาจารย์', 'รวบรวมโค้ดทั้งหมดแล้วส่ง', 'in_progress');
