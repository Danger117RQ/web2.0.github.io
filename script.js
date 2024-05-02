document.addEventListener('DOMContentLoaded', function () {
 const form = document.getElementById('task-form')
 const taskInput = document.getElementById('task-input')
 const taskList = document.getElementById('task-list')
 const clearBtn = document.getElementById('clear-tasks')

 form.addEventListener('submit', addTask)
 taskList.addEventListener('click', removeTask)
 clearBtn.addEventListener('click', clearTasks)

 // Cargar tareas del localStorage
 loadTasks()

 function addTask(e) {
  e.preventDefault()
  const taskText = taskInput.value

  if (taskText.trim() === '') {
   alert('Por favor ingresa una tarea')
   return
  }

  const li = document.createElement('li')
  li.textContent = taskText

  const deleteLink = document.createElement('a')
  deleteLink.textContent = 'X'
  deleteLink.setAttribute('href', '#')
  li.appendChild(deleteLink)

  taskList.appendChild(li)

  // Guardar tarea en localStorage
  saveTask(taskText)

  taskInput.value = ''
 }

 function removeTask(e) {
  if (e.target.tagName === 'A') {
   if (confirm('¿Estás seguro de querer eliminar esta tarea?')) {
    e.target.parentElement.remove()

    // Eliminar tarea de localStorage
    removeTaskFromLocalStorage(e.target.parentElement)
   }
  }
 }

 function clearTasks() {
  if (confirm('¿Estás seguro de querer eliminar todas las tareas?')) {
   // Limpiar tareas de la lista
   while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild)
   }

   // Limpiar tareas de localStorage
   localStorage.clear()
  }
 }

 function saveTask(task) {
  let tasks
  if (localStorage.getItem('tasks') === null) {
   tasks = []
  } else {
   tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.push(task)
  localStorage.setItem('tasks', JSON.stringify(tasks))
 }

 function removeTaskFromLocalStorage(taskItem) {
  let tasks
  if (localStorage.getItem('tasks') === null) {
   tasks = []
  } else {
   tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  const taskIndex = tasks.indexOf(taskItem.textContent)
  tasks.splice(taskIndex, 1)
  localStorage.setItem('tasks', JSON.stringify(tasks))
 }

 function loadTasks() {
  let tasks
  if (localStorage.getItem('tasks') === null) {
   tasks = []
  } else {
   tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(function (task) {
   const li = document.createElement('li')
   li.textContent = task

   const deleteLink = document.createElement('a')
   deleteLink.textContent = 'X'
   deleteLink.setAttribute('href', '#')
   li.appendChild(deleteLink)

   taskList.appendChild(li)
  })
 }
})
