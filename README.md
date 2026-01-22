
1. ติดตั้ง Dependencies

Bash
# Backend
cd my-backend
npm install express zod cors mysql2
npm install -D jest supertest

# Frontend
cd web-app
npm install
npm install -D tailwindcss@3.4.17 postcss autoprefixer
2. วิธี Run

Database: เปิด XAMPP > Start MySQL

Backend: node app.js (Port 3000)

Frontend: npm run dev (Port 5173)

Test: npx jest
