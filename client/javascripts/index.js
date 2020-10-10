const host = "localhost:3000";

document
  .getElementById("search-student-btn")
  .addEventListener("click", getStudentDetails);

function getStudentDetails() {
  let rollno = document.getElementById("rollno").value;
  var xmlHttpRequest = new XMLHttpRequest();
  xmlHttpRequest.open("GET", "http://" + host + "/student/" + rollno, true);
  xmlHttpRequest.setRequestHeader("Content-Type", "application/json");
  xmlHttpRequest.setRequestHeader("Access-Control-Allow-Origin", "*");
  xmlHttpRequest.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        addStudentDetails(JSON.parse(this.responseText).student);
        addCourseDetails(JSON.parse(this.responseText).courses);
        document.getElementById("details").classList.remove("hidden");
      } else {
        console.log(this.status);
        console.log(this.responseText);
      }
    }
  };
  xmlHttpRequest.send();
}

function addStudentDetails(student) {
  document.getElementById("student-details-row").innerHTML = "";

  let rollno = document.createElement("td");
  let name = document.createElement("td");
  let phone = document.createElement("td");
  let email = document.createElement("td");

  rollno.innerText = student.rollno;
  name.innerText = student.name;
  phone.innerText = student.phone;
  email.innerText = student.email;

  document.getElementById("student-details-row").appendChild(rollno);
  document.getElementById("student-details-row").appendChild(name);
  document.getElementById("student-details-row").appendChild(phone);
  document.getElementById("student-details-row").appendChild(email);
}

function addCourseDetails(courses) {
  document.getElementById("course-details-body").innerHTML = "";
  for (i = 0; i < courses.length; i++) {
    let name = document.createElement("td");
    let duration = document.createElement("td");
    let marks = document.createElement("td");
    let teacher = document.createElement("td");

    name.innerText = courses[i].course.name;
    duration.innerText = courses[i].course.duration;
    marks.innerText = courses[i].course.marks;
    teacher.innerText = courses[i].teacherName;

    let row = document.createElement("tr");
    row.appendChild(name);
    row.appendChild(duration);
    row.appendChild(marks);
    row.appendChild(teacher);

    document.getElementById("course-details-body").appendChild(row);
  }
}
