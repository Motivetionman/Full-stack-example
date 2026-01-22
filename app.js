const express = require('express');
const { z } = require('zod');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();

app.use(cors()); // อนุญาตให้ Frontend เข้าถึงได้
app.use(express.json());

// --- Config MySQL (แก้รหัสผ่านตรงนี้ถ้ามี) ---
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'task_manager'
};

const pool = mysql.createPool(dbConfig);

// เช็คการเชื่อมต่อ
pool.getConnection()
    .then(conn => {
        console.log('✅ MySQL Connected!');
        conn.release();
    })
    .catch(err => {
        console.error('❌ MySQL Connection Error:', err.message);
    });

// --- Schema Validation (Zod) ---
const taskSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    status: z.enum(['pending', 'in_progress', 'completed']).optional(),
    categoryId: z.number().int().optional(),
});

// --- API Routes ---

// 1. ดึงงานทั้งหมด
app.get('/tasks', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM tasks ORDER BY id DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. เพิ่มงานใหม่
app.post('/tasks', async (req, res) => {
    try {
        const result = taskSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({ errors: result.error.format() });
        }

        const { title, description, status, categoryId } = result.data;
        const [resultDb] = await pool.query(
            'INSERT INTO tasks (title, description, status, categoryId) VALUES (?, ?, ?, ?)',
            [title, description || '', status || 'pending', categoryId || null]
        );

        res.status(201).json({
            id: resultDb.insertId,
            ...result.data
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- Start Server ---
if (require.main === module) {
    app.listen(3000, () => {
        console.log('🚀 Server running on port 3000');
    });
}

module.exports = app;
