// Ejemplo de cursos
const courses = [
  { id: "MAT101", name: "Cálculo I", prerequisites: [] },
  { id: "MAT201", name: "Cálculo II", prerequisites: ["MAT101"] },
  { id: "FIS101", name: "Física I", prerequisites: [] },
  { id: "FIS201", name: "Física II", prerequisites: ["FIS101"] },
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
