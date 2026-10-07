const API_URL = "http://localhost:5000/api/students";

let allStudents = [];

document.addEventListener("DOMContentLoaded", loadStudents);

document.getElementById("studentForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const id = document.getElementById("studentId").value;
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const course = document.getElementById("course").value.trim();
    const year = document.getElementById("year").value;

    if (!name || !email || !course || !year) {
    alert("Please fill all required fields.");
    return;
}

if (name.length < 3) {
    alert("Name must contain at least 3 characters.");
    return;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
}

if (phone && !/^\d{10}$/.test(phone)) {
    alert("Phone number must contain exactly 10 digits.");
    return;
}

    const student = {
        name,
        email,
        phone,
        course,
        year: Number(year)
    };

    try {
        let response;

        if (id) {
            response = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(student)
            });
        } else {
            response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(student)
            });
        }

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Something went wrong.");
            return;
        }

        alert(id ? "Student updated successfully!" : "Student added successfully!");

        resetForm();
        loadStudents();

    } catch (error) {
        alert("Cannot connect to server. Make sure the backend is running.");
        console.error(error);
    }
});


async function loadStudents() {
    try {
        const response = await fetch(API_URL);
       allStudents = await response.json();

document.getElementById("studentCount").textContent = allStudents.length;
document.getElementById("activeCount").textContent = allStudents.length;

const uniqueCourses = new Set(
    allStudents.map(student => student.course.trim().toLowerCase())
);

document.getElementById("courseCount").textContent = uniqueCourses.size;

displayStudents(allStudents);

    } catch (error) {
        console.error("Error loading students:", error);
    }
}


function displayStudents(students) {
   
    const tableBody = document.getElementById("studentTableBody");

    tableBody.innerHTML = "";

    if (students.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center;">
                    No students found
                </td>
            </tr>
        `;
        return;
    }

    students.forEach(student => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.phone || "-"}</td>
            <td>${student.course}</td>
            <td>${student.year}</td>
            <td>
                <button class="edit-btn" onclick="editStudent(${student.id})">
                    Edit
                </button>

                <button class="delete-btn" onclick="deleteStudent(${student.id})">
                    Delete
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}


function searchStudents() {
    const searchText = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const filteredStudents = allStudents.filter(student =>
        student.name.toLowerCase().includes(searchText) ||
        student.email.toLowerCase().includes(searchText) ||
        student.course.toLowerCase().includes(searchText)
    );

    displayStudents(filteredStudents);
}


function editStudent(id) {
    const student = allStudents.find(student => student.id === id);

    if (!student) return;

    document.getElementById("studentId").value = student.id;
    document.getElementById("name").value = student.name;
    document.getElementById("email").value = student.email;
    document.getElementById("phone").value = student.phone || "";
    document.getElementById("course").value = student.course;
    document.getElementById("year").value = student.year;

    document.getElementById("formTitle").textContent = "Edit Student";
    document.getElementById("submitBtn").textContent = "Update Student";
    document.getElementById("cancelBtn").style.display = "inline-block";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


async function deleteStudent(id) {
    const confirmDelete = confirm("Are you sure you want to delete this student?");

    if (!confirmDelete) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Failed to delete student.");
            return;
        }

        alert("Student deleted successfully!");

        loadStudents();

    } catch (error) {
        alert("Cannot connect to server.");
        console.error(error);
    }
}


function cancelEdit() {
    resetForm();
}


function resetForm() {
    document.getElementById("studentForm").reset();

    document.getElementById("studentId").value = "";

    document.getElementById("formTitle").textContent = "Add Student";

    document.getElementById("submitBtn").textContent = "Add Student";

    document.getElementById("cancelBtn").style.display = "none";
}

function sortStudents() {
    const sortValue = document.getElementById("sortSelect").value;

    if (!sortValue) {
        displayStudents(allStudents);
        return;
    }

    const sortedStudents = [...allStudents].sort((a, b) => {
        if (sortValue === "year" || sortValue === "id") {
            return a[sortValue] - b[sortValue];
        }

        return String(a[sortValue]).localeCompare(String(b[sortValue]));
    });

    displayStudents(sortedStudents);
}

function showPage(page, clickedItem) {

    document.getElementById("dashboardPage").style.display = "none";
    document.getElementById("studentsPage").style.display = "none";
    document.getElementById("addStudentPage").style.display = "none";

    if (page === "dashboard") {
        document.getElementById("dashboardPage").style.display = "block";
    }

    if (page === "students") {
        document.getElementById("studentsPage").style.display = "block";
    }

    if (page === "addStudent") {
        document.getElementById("addStudentPage").style.display = "block";
    }

    document.querySelectorAll(".nav-item").forEach(item => {
        item.classList.remove("active");
    });

    clickedItem.classList.add("active");
}