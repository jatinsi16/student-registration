document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("studentForm");
  const studentTable = document.getElementById("studentTable").querySelector("tbody");
  const addStudentBtn = document.getElementById("submitBtn");

  let students = JSON.parse(localStorage.getItem("students")) || [];

  function saveToLocalStorage() {
      localStorage.setItem("students", JSON.stringify(students));
  }

  function renderTable() {
      studentTable.innerHTML = "";
      students.forEach((student, index) => {
          const row = document.createElement("tr");
          row.innerHTML = `
              <td>${student.name}</td>
              <td>${student.id}</td>
              <td>${student.email}</td>
              <td>${student.contact}</td>
              <td>
                  <button onclick="editStudent(${index})">Edit</button>
                  <button onclick="deleteStudent(${index})">Delete</button>
              </td>
          `;
          studentTable.appendChild(row);
      });
  }

  function validateInput(name, id, email, contact) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return (
          name.trim() !== "" &&
          id.trim() !== "" &&
          emailPattern.test(email) &&
          contact.trim() !== ""
      );
  }

  submitBtn.addEventListener("click", () => {
      const name = form.studentName.value.trim();
      const id = form.studentID.value.trim();
      const email = form.emailID.value.trim();
      const contact = form.contactNo.value.trim();

      if (validateInput(name, id, email, contact)) {
          students.push({ name, id, email, contact });
          saveToLocalStorage();
          renderTable();
          form.reset();
      } else {
          alert("Please fill all fields correctly.");
      }
  });

  window.editStudent = (index) => {
      const student = students[index];
      form.studentName.value = student.name;
      form.studentID.value = student.id;
      form.emailID.value = student.email;
      form.contactNo.value = student.contact;

      students.splice(index, 1);
      saveToLocalStorage();
      renderTable();
  };

  window.deleteStudent = (index) => {
      students.splice(index, 1);
      saveToLocalStorage();
      renderTable();
  };

  renderTable();
});
