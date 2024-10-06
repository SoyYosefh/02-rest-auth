const { ref, get, set, push } = require("firebase/database");
const { db } = require('../conexion'); // Importa la conexión a Firebase

// Obtener todos los proyectos
async function getAllProjects() {
    const dbRef = ref(db, 'projects');
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
        return snapshot.val();
    } else {
        return [];
    }
}

// Crear un nuevo proyecto con nombre dinámico tipo "Proyecto 1", "Proyecto 2", etc.
async function createProject(project) {
    const dbRef = ref(db, 'projects');
    const snapshot = await get(dbRef);
    let lastProjectNumber = 0;

    // Verificar si existen proyectos y obtener el último número de proyecto
    if (snapshot.exists()) {
        const projects = snapshot.val();
        const projectKeys = Object.keys(projects);
        
        projectKeys.forEach(key => {
            const projectName = projects[key].name;
            const match = projectName.match(/Proyecto (\d+)/);  // Extrae el número del nombre (ejemplo: Proyecto 1)
            if (match) {
                const currentProjectNumber = parseInt(match[1], 10);
                if (currentProjectNumber > lastProjectNumber) {
                    lastProjectNumber = currentProjectNumber;
                }
            }
        });
    }

    // Asignar el nombre del nuevo proyecto incrementando el número
    const newProjectNumber = lastProjectNumber + 1;
    const newProjectName = `Proyecto ${newProjectNumber}`;
    
    const newProject = {
        id: `proyecto-${newProjectNumber}`,  // Usar un ID similar al nombre
        name: newProjectName,  // Nombre dinámico basado en el número
        description: project.description,
        startDate: project.startDate,
        endDate: project.endDate,
        status: project.status,
        budget: project.budget
    };

    // Guardar el nuevo proyecto en Firebase
    await set(ref(db, `projects/${newProjectName}`), newProject);  // Usar el nuevo nombre como clave en Firebase
    return newProject;
}

module.exports = {
    getAllProjects,
    createProject
};

