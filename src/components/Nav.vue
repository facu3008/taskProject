<template>
  <nav class="main-nav">
    <div id="toggle-menu" class="toggle-menu">
    <img src="../assets/img/burgerMenu.svg" alt="hamburguer Menu" @click="showMenu = !showMenu" >
    <!-- @click="toggle" :class="main-menu--show" -->
  </div>
  <div class="iconTask">

    <img src="../assets/img/logoTaskList.svg" alt="Icono de pagina"  >
  </div>
    <!-- <PersonalRouter :route="route" :buttonText="buttonText" class="logo-link"/> -->
    

    <ul id="main-menu" :class="showMenu? `main-menu--show` : `main-menu`" v-if="showMenu"  >
        <li class="main-menu_item">
          <router-link to="/" class="main-menu_link">Home</router-link>
        </li>
        <li class="main-menu_item">
          <router-link to="/" class="main-menu_link">Task Manager</router-link>
        </li>

        <li class="main-menu_item">
          <router-link to="/account" class="main-menu_link">Your Account</router-link>
        </li>
    </ul>
    <ul id="main-menu" class="showMenu">
        <li class="main-menu_item">
          <router-link to="/" class="main-menu_link">
      Home
    </router-link>
        </li>
        <li class="main-menu_item">
          <router-link to="/" class="main-menu_link">Task Manager</router-link>
        </li>
        <li class="main-menu_item">
          <router-link to="/account" class="main-menu_link">Your Account</router-link>
        </li>
        <li class="main-menu_item">
          <button @click="signOut" class="button-logOut"></button>
        </li>
        <!-- <li class="main-menu_item">
          <button @click="signOut" class="button-log">Log out</button>
        </li> -->
    </ul>

    <div>
      <ul id="main-menu" :class="showMenu? `main-menu-user--show` : `main-menu-user`" v-if="showMenu" >
      <!-- <ul class="main-menu-user" id="main-menu"> -->
        <!-- <li class="main-menu_item">
          <p >Welcome, user <span>{{userEmail}} </span> </p>
        </li> -->
        <li class="main-menu_item">
        </li>
        <button @click="signOut" class="button-logOut"></button>
      </ul>
    </div>
  </nav>
</template>


<script setup>
import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { ref } from 'vue';

//constant to save a variable that will hold the use router method
const route = "/";
const buttonText = "Todo app";

// constant to save a variable that will get the user from store with a computed function imported from vue
// const getUser = computed(() => useUserStore().user);
const getUser = useUserStore().user;

// constant that calls user email from the useUSerStore
const userEmail = getUser.email;

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
const redirect = useRouter();

const signOut = async () => {
  try{
    await useUserStore().signOut();
      // redirects user to the homeView
      redirect.push({ path: "/auth/login" });
    // call the user store and send the users info to backend to signOut
    // then redirect user to the homeView
  } catch (error) {
    errorMsg.value = error.message;
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
  }
  return;
  errorMsg.value = "error";
};

// Funcionalidad al menu hamburguesa

const showMenu = ref(false)

</script>

<style>




</style>
