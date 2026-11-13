import { listCourses, createCourse, updateCourse } from './services/coursesService.js';

if (!sessionStorage.getItem('session')) window.location.replace('index.html');

const body = document.getElementById('courses-body');
const statusEl = document.getElementById('status');
const form = document.getElementById('course-form');
const fields = ['name', 'description', 'capacity'];
let courses = [];

document.getElementById('logout').addEventListener('click', () => {
  sessionStorage.removeItem('session');
  window.location.href = 'index.html';
});

function cell(text, className) {
  const td = document.createElement('td');
  td.textContent = text;
  if (className) td.className = className;
  return td;
}

function render() {
  body.replaceChildren();
  for (const c of courses) {
    const tr = document.createElement('tr');
    tr.append(cell(c.name), cell(c.description), cell(c.capacity, 'num'), cell(c.enrolled, 'num'),
      cell(c.vacancies === 0 ? 'Completo' : c.vacancies, c.vacancies === 0 ? 'num full' : 'num'));
    const actions = document.createElement('td');
    const edit = document.createElement('button');
    edit.type = 'button';
    edit.className = 'ghost';
    edit.textContent = 'Editar';
    edit.addEventListener('click', () => startEdit(c));
    actions.append(edit);
    tr.append(actions);
    body.append(tr);
  }
  statusEl.textContent = courses.length ? '' : 'Ainda não existem cursos. Crie o primeiro no formulário abaixo.';
}

function showErrors(errors = {}) {
  for (const f of fields) document.getElementById(`${f}-error`).textContent = errors[f] || '';
}

function startEdit(course) {
  document.getElementById('course-id').value = course.id;
  for (const f of fields) form[f].value = course[f];
  document.getElementById('form-title').textContent = 'Editar curso';
  document.getElementById('submit-btn').textContent = 'Guardar alterações';
  document.getElementById('cancel-btn').hidden = false;
  showErrors();
  form.name.focus();
}

function resetForm() {
  form.reset();
  document.getElementById('course-id').value = '';
  document.getElementById('form-title').textContent = 'Novo curso';
  document.getElementById('submit-btn').textContent = 'Criar curso';
  document.getElementById('cancel-btn').hidden = true;
  showErrors();
}

document.getElementById('cancel-btn').addEventListener('click', resetForm);

async function load() {
  try {
    courses = await listCourses();
    render();
  } catch {
    statusEl.textContent = 'Não foi possível carregar os cursos. Tente novamente dentro de instantes.';
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = { name: form.name.value, description: form.description.value, capacity: form.capacity.value };
  const id = Number(document.getElementById('course-id').value);
  try {
    if (id) await updateCourse(id, data); else await createCourse(data);
    resetForm();
    await load();
  } catch (err) {
    showErrors(err.errors);
  }
});

load();
