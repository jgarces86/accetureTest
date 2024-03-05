# Proyecto con json-server

Este proyecto utiliza json-server para simular un servidor RESTful con datos mockeados. json-server es una herramienta útil para desarrolladores que necesitan prototipar rápidamente una API REST durante el desarrollo de su aplicación.

## Configuración

1. **Instalación de dependencias**: Antes de comenzar, asegúrate de tener Node.js y npm instalados en tu sistema. Puedes instalar json-server ejecutando el siguiente comando:

   ```bash
   npm install -g json-server

2. **Ejecución del proyecto**: ejecuta el siguiente comando para la ejecución del proyecto:

   ```bash
   npm run start:jsonserver

## Endpoints

1. **GET Users**: Endpoint para obtener todos los usuarios:

   ```bash
   http://localhost:3000/users

2. **GET Tasks**: Endpoint para obtener todas las tareas:

   ```bash
   http://localhost:3000/tasks

3. **GET Tasks by User**: Endpoint para obtener todas las tareas de un usuario:

   ```bash
   http://localhost:3000/tasks?userId=1

4. **POST User**: Endpoint para agregar un nuevo usuario:

   ```bash
   {
      "name": "Pepito",
      "lastname": "Perez",
      "email": "pepito@email.com"
   }

   http://localhost:3000/users

5. **POST Task**: Endpoint para agregar una nueva tarea:

   ```bash
    {
        "title": "Comprar pan",
        "description": "Ir al supermercado",
        "completed": false,
        "userId": 2
    }

   http://localhost:3000/tasks

6. **PUT Task**: Endpoint para editar una tarea:

   ```bash
    {
        "title": "Comprar pan",
        "description": "Ir al supermercado",
        "completed": false,
        "userId": 2
    }

   http://localhost:3000/tasks/1

7. **DELETE Task**: Endpoint para eliminar una tarea:

   ```bash
   http://localhost:3000/tasks/1
