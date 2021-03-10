import { useEffect, useState } from 'react';

import '../styles/tasklist.scss';
import '../styles/alertmodal.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

interface Alert{
    title: string;
    description: string;
    show: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [alert, setAlert] = useState<Alert>({ title: '', description: '', show: false });

  function getRandomId(){
    return Math.round(Math.random() * 1000000);
  }

  function handleCreateNewTask() {
    // Check if the task has title
    if(newTaskTitle.length == 0){
      // Return error
      setAlert({title: 'Erro!', description: 'Favor informe a descrição da tarefa!', show: true});
    }else{
      // Create a new task
      const task = {
        id: getRandomId(),
        title: newTaskTitle,
        isComplete: false
      }

      // Set the new task to the collection
      setTasks([...tasks, task]);

      // Clean the title
      setNewTaskTitle('');
    }
  }

  function handleToggleTaskCompletion(id: number) {
    let newTasks:Task[] = [];
    
    // Search for the task with the same id
    tasks.forEach(function(task, index, key){
      if(task.id == id)
        task.isComplete = !task.isComplete;

      // Add the new task
      // newTasks = [ ...newTasks, task ];
      newTasks.push(task);
    });

    // Update the state of tasks
    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    let newTasks:Task[] = [];
    
    // Search for the task without the same id
    tasks.forEach(function(task, index, key){
      if(task.id != id)
        newTasks.push(task);
    });

    // Update the state of tasks
    setTasks(newTasks);
  }

  function handleCloseModal(){
    // Remove erro
    setAlert({title: '', description: '', show: false});
  }

  return (
    <>
      <section className="task-list container">
        <header>
          <h2>Minhas tasks</h2>

          <div className="input-group">
            <input 
              type="text" 
              placeholder="Adicionar novo todo" 
              onChange={(e) => setNewTaskTitle(e.target.value)}
              value={newTaskTitle}
            />
            <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
              <FiCheckSquare size={16} color="#fff"/>
            </button>
          </div>
        </header>

        <main>
          <ul>
            {tasks.map(task => (
              <li key={task.id}>
                <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                  <label className="checkbox-container">
                    <input 
                      type="checkbox"
                      readOnly
                      checked={task.isComplete}
                      onClick={() => handleToggleTaskCompletion(task.id)}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <p>{task.title}</p>
                </div>

                <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                  <FiTrash size={16}/>
                </button>
              </li>
            ))}
            
          </ul>
        </main>
      </section>
      <div className={"modal-bg" + (alert.show ? " modal-show" : "")}>
        <div className="modal-content">
          <span className="modal-close" onClick={handleCloseModal}>&times;</span>
            <h1>{alert.title}</h1>
            <p>{alert.description}</p>
        </div>
      </div>
    </>
  )
}