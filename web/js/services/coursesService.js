// Camada de dados. Por agora devolve dados simulados em memória.
// Quando a API existir, só este ficheiro muda (fetch aos endpoints); o resto da app fica igual.

let courses = [
  { id: 1, name: 'Introdução à Programação', description: 'Lógica e algoritmos.', capacity: 20, enrolled: 18 },
  { id: 2, name: 'Bases de Dados', description: 'Modelação e SQL.', capacity: 15, enrolled: 15 },
  { id: 3, name: 'Redes de Computadores', description: 'Fundamentos de redes.', capacity: 25, enrolled: 4 },
];
let nextId = 4;

const withVacancies = (c) => ({ ...c, vacancies: c.capacity - c.enrolled });
const simulateLatency = (value) => new Promise((resolve) => setTimeout(() => resolve(structuredClone(value)), 150));

export function validateCourse(data, enrolled = 0) {
  const errors = {};
  if (!data.name || !data.name.trim()) errors.name = 'Indique o nome do curso.';
  if (!data.description || !data.description.trim()) errors.description = 'Indique uma descrição.';
  const capacity = Number(data.capacity);
  if (!Number.isInteger(capacity) || capacity < 1) {
    errors.capacity = 'A capacidade tem de ser um número inteiro maior que zero.';
  } else if (capacity < enrolled) {
    errors.capacity = `Já existem ${enrolled} inscritos. A capacidade não pode ser inferior.`;
  }
  return errors;
}

export function listCourses() {
  return simulateLatency(courses.map(withVacancies));
}

export function createCourse(data) {
  const errors = validateCourse(data);
  if (Object.keys(errors).length) return Promise.reject({ status: 400, errors });
  const course = { id: nextId++, name: data.name.trim(), description: data.description.trim(), capacity: Number(data.capacity), enrolled: 0 };
  courses.push(course);
  return simulateLatency(withVacancies(course));
}

export function updateCourse(id, data) {
  const course = courses.find((c) => c.id === id);
  if (!course) return Promise.reject({ status: 404, errors: { _: 'Curso não encontrado.' } });
  const errors = validateCourse(data, course.enrolled);
  if (Object.keys(errors).length) return Promise.reject({ status: 400, errors });
  Object.assign(course, { name: data.name.trim(), description: data.description.trim(), capacity: Number(data.capacity) });
  return simulateLatency(withVacancies(course));
}
