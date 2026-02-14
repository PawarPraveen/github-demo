// Load students from localStorage
let students = JSON.parse(localStorage.getItem('students')) || [];

// Display students on page load
displayStudents();

// Form submission
document.getElementById('studentForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const student = {
        id: document.getElementById('studentId').value,
        name: document.getElementById('studentName').value,
        email: document.getElementById('studentEmail').value,
        phone: document.getElementById('studentPhone').value,
        class: document.getElementById('studentClass').value,
        section: document.getElementById('studentSection').value
    };

    // Check if student ID already exists
    if (students.some(s => s.id === student.id)) {
        alert('Student ID already exists!');
        return;
    }

    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
    showSuccessMessage('Student added successfully!');
    this.reset();
});

// Display all students
function displayStudents() {
    const tableBody = document.getElementById('studentTableBody');
    
    if (students.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7" class="no-data">No students added yet. Add a student to get started!</td></tr>';
        return;
    }

    tableBody.innerHTML = students.map((student, index) => `
        <tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td>${student.class}</td>
            <td>${student.section}</td>
            <td>
                <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Delete student
function deleteStudent(index) {
    if (confirm('Are you sure you want to delete this student?')) {
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        displayStudents();
        showSuccessMessage('Student deleted successfully!');
    }
}

// Show success message
function showSuccessMessage(message) {
    const messageDiv = document.getElementById('successMessage');
    messageDiv.textContent = message;
    messageDiv.style.display = 'block';
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 3000);
}