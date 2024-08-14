document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = 'https://66bc35ed24da2de7ff699ed7.mockapi.io/api/v1/StudentNames';
  const form = document.getElementById('studentForm');
  const studentList = document.getElementById('studentList');

  // Function to get and display the list of students
  const fetchStudentList = async () => {
      const response = await fetch(apiUrl);
      const data = await response.json();
      studentList.innerHTML = '';
      data.forEach(student => {
          const li = document.createElement('li');
          li.textContent = `${student.name} - Course ${student.courseNumber}: ${student.courseName}`;
          studentList.appendChild(li);
      });
  };

  // Function to add a new student
  const addStudent = async (student) => {
      await fetch(apiUrl, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(student)
      });
      fetchStudentList();
  };

  // Handle form submission
  form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const courseNumber = document.getElementById('courseNumber').value;
      const courseName = document.getElementById('courseName').value;

      const student = {
          name,
          courseNumber,
          courseName
      };

      addStudent(student);
      form.reset();
  });

  // Fetch the list of students on page load
  fetchStudentList();
});
