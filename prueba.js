// Tiene errores y mezclas de conceptos


// Importar express
const express = require('express');
// Instanciar el boostrap de express
const app = express();
// Definir el puerto
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

let tasks = [
    {id: 1, title: 'Tarea de ejemplo', completed: false},
    {id: 2, title: 'Otra tarea', completed: true}
];
// Raz del API
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API de Gestión de Tareas!');
});

// Ruta de ejemplo
app.get('/tasks', (req, res) => {
    res.json([
        {id: 1, title: 'Tarea de ejemplo', completed: false},
        {id: 2, title: 'Otra tarea', completed: true}
    ]);
});

// Post /tasks para crear una nueva tarea
app.post('/tasks', (req, res) => {
    const {name} = req.body;
    if (!name) {
        return res.status(400).json({error: 'El nombre de la tarea es obligatorio'});
    }
    const newTask = {id: tasks.length + 1, name: name, completed: false};
    tasks.push(newTask);
    res.status(201).json({message: 'Task created successfully', task: newTask});
});


app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});

// PUT /tasks/:id: Actualiza una tasca
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const { name } = req.body;
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex >= 0) {
        tasks[tasksIndex].name = name;
        res.json(tasks[taskIndex]);
    } else {
        res.status(404).json({ message: 'Tasca no trobada' });
    }
});

// DELETE /tasks/:id: Elimina una tasca
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex >= 0){
        tasks.splice(taskIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Tasca no trobada' });
    }
});

// Simulando una función que retorna una promesa
function obtenirDades(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve({ id, dades: '..' }), 500);
    });
}

obtenirDades(1) 
    .then(resultat => {
        console.log(resultat);
    })
    .catch(error =>{
        console.error(error);
    });

app.set('view engine', 'ejs');
app.render('index')