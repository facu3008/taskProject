<template>
    <!-- <div class="container-newTask"> -->

        <h1>Add a new Task</h1>
        <div v-if="showErrorMessage">
            <p class="error-text">{{ errorMessage }}</p>
        </div>
        <div class="container-newTask">
            <div class="input-field-task">
                <input class="input-field-task-text" type="text" placeholder="Add a Task Title - Listen to Kendrick Lamar" v-model="name">
                <input class="input-field-task-text" type="text" placeholder="Add a Task Description - Look up Kendrick Lamar's FEAR album on spotify and listen to the whole album." v-model="description">
            </div>
            <button @click="addTask" class="btn-add"></button>
        </div>
    <!-- </div> -->
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task"   

const taskStore = useTaskStore();

const emit = defineEmits(["getTaskHijo"])

// variables para los valors de los inputs
const name = ref('');
const description = ref('');

// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty
const showErrorMessage = ref(false);

// const constant to save a variable that holds the value of the error message
const errorMessage = ref(null);

// Arrow function para crear tareas.
const addTask = async () => {
if(name.value.length === 0 || description.value.length === 0){
    
    // Primero comprobamos que ningún campo del input esté vacío y lanzamos el error con un timeout para informar al user.

    showErrorMessage.value = true;
    errorMessage.value = 'The task title or description is empty';
    setTimeout(() => {
        showErrorMessage.value = false;
    }, 5000);

} else {
    // Aquí mandamos los valores a la store para crear la nueva Task. Esta parte de la función tenéis que refactorizarla para que funcione con emit y el addTask del store se llame desde Home.vue.
    console.log("ESte", name.value)

    await taskStore.addTask(name.value, description.value);
    name.value = '';
    description.value = '';
    emit ("getTaskHijo");
}
};

</script>

<style>

.container-newTask{
    display: flex;
    justify-content: center;

}

.input-field-task{
    width: 40vw;
    border-top: 1px solid #272727;
    border-bottom: 1px solid #272727;
    border-radius: 10px;
}

.input-field-task-text{
    width: 90%;
    /* background-color: var(--colorFondo); */
    background-color: none;
    margin: 10px auto;
    padding: 0 5px;
    outline: none;
    border: none;
    /* border-radius: 10px;
    border-bottom: 1px solid #272727; */
    text-align: center;
    

}

.btn-add{
        background-image:url('../assets/img/add.png');
        background-repeat:no-repeat;
        background-color: var(--colorFondo);
        height:30px;
        width:30px;
        background-size: cover;
        background-position:center;
        margin: auto 10px;
        border: none;
    }
     
.btn-add:hover{
        height:40px;
        width:40px;
    }


    /* VERSION MOBILE */

@media (max-width: 767px) {

    .container-newTask{
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
}

/* .input-field-task input:hover{
    padding: 10px 0;
    margin: 15px;
} */

.input-field-task{
    width: 70vw;
    background-color: none;
    padding: 0 5px;
    outline: none;
    border: none;
    border-radius: 10px;
    border-top: 1px solid #272727;
    border-bottom: 1px solid #272727;
    margin: 0 auto;
    text-align: center;

}
.input-field-task-text{
    width: 90%;
/* background: aquamarine; */
    margin: 10px auto;
    padding: 0 5px;
    outline: none;
    border: none;
    /* border-radius: 10px;
    border-bottom: 1px solid #272727; */
    text-align: center;
}


.btn-add{
        background-image:url('../assets/img/add.png');
        background-repeat:no-repeat;
        background-color: var(--colorFondo);
        height:30px;
        width:30px;
        background-size: cover;
        background-position:center;
        margin: auto 10px;
        border: none;
    }
     
.btn-add:hover{
        height:40px;
        width:40px;
    }

}



</style>
  