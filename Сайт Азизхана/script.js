document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://66bc35ed24da2de7ff699ed7.mockapi.io/api/v1/StudentNames";
  const form = document.getElementById("studentForm");
  const studentList = document.getElementById("studentList");

  // Function to get and display the list of students
  const fetchStudentList = async () => {
    const response = await fetch(apiUrl);
    const data = await response.json();
    studentList.innerHTML = "";
    data.forEach((student) => {
      const li = document.createElement("li");
      li.textContent = `${student.name} - Course ${student.courseNumber}: ${student.courseName} - Hobby: ${student.hobby}`;
      studentList.appendChild(li);
    });
  };

  // Function to add a new student
  const addStudent = async (student) => {
    await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });
    fetchStudentList();
  };

  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const courseNumber = document.getElementById("courseNumber").value;
    const courseName = document.getElementById("courseName").value;
    const hobby = document.getElementById("hobby").value;

    const student = {
      name,
      courseNumber,
      courseName,
      hobby, // Add hobby to the student object
    };

    addStudent(student);
    form.reset();
  });

  // Fetch the list of students on page load
  fetchStudentList();
});

var words = [  'Ниже мои прикольные фото, добавил я эту галерею только потому, что она выглядела хорошо ','Дизайн текста выглядит не очень, но поверьте, я над ним мрачно запарился', 'Встречатся с людьми надо раз в полгода, иначе разговаривать с ними будет не о чем.', 'Уф, я устал так стоять!', 'Освободите меня отсюда!'],
    part,
    i = 0,
    offset = 0,
    len = words.length,
    forwards = true,
    skip_count = 0,
    skip_delay = 15,
    speed = 70;

var wordflick = function () {
  setInterval(function () {
    if (forwards) {
      if (offset >= words[i].length) {
        ++skip_count;
        if (skip_count == skip_delay) {
          forwards = false;
          skip_count = 0;
        }
      }
    } else {
      if (offset == 0) {
        forwards = true;
        i++;
        if (i >= len) {
          i = 0;
        }
      }
    }

    part = words[i].substr(0, offset);
    if (skip_count == 0) {
      if (forwards) {
        offset++;
      } else {
        offset--;
      }
    }

    $('.word').text(part);
  }, speed);
};

$(document).ready(function () {
  if ($('.word').length > 0) {
    wordflick();
  }
});