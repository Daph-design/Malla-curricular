// Ejemplo de cursos
const courses = [
  { id: "CC1101", name: "Cálculo de una Variable", prerequisites: [] },
  { id: "BI1001", name: "Introducción a la Bioingeniería", prerequisites: [] },
  { id: "CS1111", name: "Programación I", prerequisites: [] },
  { id: "PI1101", name: "Proyectos Interdisciplinarios 1", prerequisites: [] },
  { id: "HH1101", name: "Laboratorio de Comunicación 1", prerequisites: [] },
  { id: "CC1142", name: "Laboratorio de Química General", prerequisites: [] },
  { id: "CC1141", name: "Química General", prerequisites: [] },
  { id: "CC1103", name: "Álgebra lineal", prerequisites: ["CC1101"] },
  { id: "BI1002", name: "Introducción a la Bioingeniería", prerequisites: ["BI1001"] },
  { id: "CC1104", name: "Cálculo vectorial", prerequisites: ["CC1101"] },
  { id: "CC1121", name: "Introducción a la Mecánica", prerequisites: ["CC1101"] },
  { id: "HH1102", name: "Laboratorio de Comunicación 2", prerequisites: ["HH1101"] },
  { id: "BI1003", name: "Química Aplicada", prerequisites: ["CC1141", "CC1142"] },
];

// Recupera cursos aprobados del almacenamiento local
let approved = JSON.parse(localStorage.getItem("approvedCourses")) || [];

const container = document.getElementById("courses-container");

function renderCourses() {
  container.innerHTML = "";
  courses.forEach(course => {
    const div = document.createElement("div");
    div.className = "course";

    const isApproved = approved.includes(course.id);
    const isUnlocked = course.prerequisites.every(p => approved.includes(p));

    if (isApproved) {
      div.classList.add("approved");
    } else if (!isUnlocked) {
      div.classList.add("locked");
    }

    div.innerText = course.name;

    if (isUnlocked) {
      div.addEventListener("click", () => toggleApproved(course.id));
    }

    container.appendChild(div);
  });
}

function toggleApproved(id) {
  if (approved.includes(id)) {
    approved = approved.filter(cid => cid !== id);
  } else {
    approved.push(id);
  }
  localStorage.setItem("approvedCourses", JSON.stringify(approved));
  renderCourses();
}

renderCourses();
