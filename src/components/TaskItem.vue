<template>
    <!-- <div class="mainContainer"> -->
        
        <div class="container-task">
            <div id="task-item">

                <div v-bind:class="task.is_complete ? `container-task-text-completed` : `container-task-text-not-completed`">
                    <h3 > {{task.title}}</h3>
                    <p >{{task.description}}</p>

                </div>
                <div class="task-item-btn">
                    <button @click="deleteTask" class="btn-delete"></button>
                    <button @click="editTaskFunction" class="btn-edit"></button>
                    <!-- <button @click="archiveTaskFunction">Store</button> -->
                    <button @click="statusTask"  v-bind:class="task.is_complete ? `btn-ready` : `btn-not-ready`"></button>
                </div>
                 <div v-show="editTask" class="task-item-input">
                <input class="task-item-input-field" type="text" :placeholder="task.title" v-model="name" />
                <input class="task-item-input-field" type="text" placeholder="Edit Description" v-model="description">
                <button @click="changeTask" class="btn-edit-ready">Guardar cambios</button>
            </div>
            </div>
            <!-- <div v-show="storeTask">
                <button @click="statusTask">Store</button>     
            </div> -->
            
           

        </div>
<!-- </div> -->
</template>

<script setup>
import { ref } from 'vue';
import { useTaskStore } from '../stores/task';
import { supabase } from '../supabase';

const taskStore = useTaskStore();

// Defino los emits a utilizar
// const emit = defineEmits(['deleteTasksHijo', 'editTasksHijo', 'archiveTasksHijo']);
const emit = defineEmits(['getTaskHijo']);

// Defino variables para valores de inputs
const name = ref(props.task.title);
const description = ref(props.task.description);



const props = defineProps({
    task: Object,
});

// Función para borrar la tarea a través de la store. El problema que tendremos aquí (y en NewTask.vue) es que cuando modifiquemos la base de datos los cambios no se verán reflejados en el v-for de Home.vue porque no estamos modificando la variable tasks guardada en Home. Usad el emit para cambiar esto y evitar ningún page refresh.
const deleteTask = async() => {
const { isConfirmed } = await Swal.fire({
    icon: "warning",
    title: "Deleting task",
    text: "this change is irreversible",
    confirmButtonText: "Please, remove it!!",
    showDenyButton: true,
    denyButtonText: "Keep it safe",
    width: "70%",
    
  })
  console.log(isConfirmed)
  if (isConfirmed) {
        
    await taskStore.deleteTask(props.task.id);
    emit ('getTaskHijo')
    Swal.fire({
        text: "Task deleted",
        icon: "success",
        width: "40%",
        height: "60%"
         })
  }
  else  {
        
    await 
    // taskStore.deleteTask(props.task.id);
    // emit ('getTaskHijo')
    Swal.fire({
        text: "Task conserved",
        // icon: "success",
        width: "50%",
         })
  }

};

// Función para  editar tarea.


const changeTask = async () => {
    await taskStore.changeTask(name.value, description.value, props.task.id);
    editTask.value = false;
    emit ('getTaskHijo');
    Swal.fire({
        text: "Task updated",
        // icon: "success",
        width: "50%",
         })
};

const editTask = ref (false);
const editTaskFunction = () => {
    console.log("prbando edit boton")
    editTask.value = !editTask.value
}

const status = ref("props.task.is_complete")

// Funcion archivar task
const statusTask = async () => {
    console.log("Click")
    await taskStore.statusTask(!status.value, props.task.id);
    
    status.value= !status.value
    // console.log(status.value)
    
    emit ('getTaskHijo')
    Swal.fire({
        text: "Status changed",
        // icon: "success",
        width: "50%",
         })
};




</script>

<style>




</style>

<!--
**Hints**
1. ref() or reactive() can be used here to store the following, think if you want to store them either individually or
like an object, up to you.

2. Data properties need here are the following: a boolean to store a false**Important variable, a string to store an error,
a string to store the value of the task that the user can edit, an initial false boolean to hide the inputFIeld used to edit
the new task detail or details[this is in reference of the task title and the task description].

3. Store the custom emit events that will be used to call the functions of the homeView for editing, deleting and toggling the
status[completed, not complted] of the taskItem.

4. Function to handle the error with the data properties used to control the error and the the boolean controlling the boolean
empty variable.

5. Function to handle the edit dialogue where the inputField is displayed and the string used to store the value of the
inputField will be used here to save the value as a prop on this function.

6. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be
send via the prop to the parent component. This function can control the toggle completion of the task on the homeview.

7. Function to edit the task information that you decided that the user can edit. This function's body takes in a conditional
that first checks if the value of the task [either title and description or just title] is empty which if true it runs the
function used to handle the error on hint4. Else, the conditional sets the first mentioned boolean data property on hint2
back to its inital boolean value to hide the error message and repeat the same for the data property mentioned 4th on hint2;
a constant that stores an object that holds the oldValue from the prop item and the value of the task coming from the data
property mentioned 3rd on hint2; a custom event emit() that takes 2 parameters a name for the custom event and the value
from the object used on this part of the conditional and lastly this part of the conditional sets the value of input field
to an empty string to clear it from the ui.

8. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be
send via the prop to the parent component. This function can control the removal of  the task on the homeview.
-->
