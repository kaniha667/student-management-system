const db = require("../db");

const getStudents = (req, res) => {
    const sql = "SELECT * FROM students ORDER BY id DESC";

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Failed to fetch students"
            });
        }

        res.json(results);
    });
};


const addStudent = (req, res) => {
    const { name, email, phone, course, year } = req.body;

    if (!name || !email || !course || !year) {
        return res.status(400).json({
            message: "Name, email, course and year are required"
        });
    }

    const sql = `
        INSERT INTO students (name, email, phone, course, year)
        VALUES (?, ?, ?, ?, ?)
    `;

    const values = [name, email, phone, course, year];

    db.query(sql, values, (err, result) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                return res.status(400).json({
                    message: "Email already exists"
                });
            }

            return res.status(500).json({
                message: "Failed to add student"
            });
        }

        res.status(201).json({
            message: "Student added successfully",
            studentId: result.insertId
        });
    });
};


const updateStudent = (req, res) => {
    const { id } = req.params;
    const { name, email, phone, course, year } = req.body;

    if (!name || !email || !course || !year) {
        return res.status(400).json({
            message: "Name, email, course and year are required"
        });
    }

    const sql = `
        UPDATE students
        SET name = ?, email = ?, phone = ?, course = ?, year = ?
        WHERE id = ?
    `;

    const values = [name, email, phone, course, year, id];

    db.query(sql, values, (err) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                return res.status(400).json({
                    message: "Email already exists"
                });
            }

            return res.status(500).json({
                message: "Failed to update student"
            });
        }

        res.json({
            message: "Student updated successfully"
        });
    });
};


const deleteStudent = (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM students WHERE id = ?";

    db.query(sql, [id], (err) => {
        if (err) {
            return res.status(500).json({
                message: "Failed to delete student"
            });
        }

        res.json({
            message: "Student deleted successfully"
        });
    });
};


module.exports = {
    getStudents,
    addStudent,
    updateStudent,
    deleteStudent
};