<template>
  <nav class="main-nav">
    <div id="toggle-menu" class="toggle-menu">
    <img src="../assets/img/burgerMenu.svg" alt="" @click="showMenu = !showMenu" >
    <!-- @click="toggle" :class="main-menu--show" -->
    </div>
    <!-- <PersonalRouter :route="route" :buttonText="buttonText" class="logo-link"/> -->
    

    <ul id="main-menu" :class="showMenu? `main-menu--show` : `main-menu`" v-if="showMenu"  >
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
          <button @click="signOut" class="button-logOut">Log out</button>
        </li>
        <!-- <li class="main-menu_item">
          <button @click="signOut" class="button-log">Log out</button>
        </li> -->
    </ul>

    <div>
      <ul id="main-menu" :class="showMenu? `main-menu-user--show` : `main-menu-user`" v-if="showMenu" >
      <!-- <ul class="main-menu-user" id="main-menu"> -->
        <li class="main-menu_item">
          <p >Welcome, user <span>{{userEmail}} </span> </p>
        </li>
        <li class="main-menu_item">
          <button @click="signOut" class="button-logOut">Log out</button>
        </li>
      </ul>
    </div>
    <!-- <div>
      <ul>
        <li class="log-out-welcome">
          <p>Welcome, user <span>{{userEmail}}</span> </p>
        </li>
        <li>
          <button @click="signOut" class="button-log">Log out</button>
        </li>
      </ul>
    </div> -->
  </nav>
</template>
<!-- <template>
  <nav>
    <PersonalRouter :route="route" :buttonText="buttonText" class="logo-link"/>
    <router-link to="/">
      Home
    </router-link>

    <ul>
        <li>
          <router-link to="/">Task Manager</router-link>
        </li>

        <li>
          <router-link to="/account">Your Account</router-link>
        </li>
    </ul>

    <div>
      <ul>
        <li class="log-out-welcome">
          <p>Welcome, user <span>{{userEmail}}</span> </p>
        </li>
        <li>
          <button @click="signOut" class="button-log">Log out</button>
        </li>
      </ul>
    </div>
  </nav>
</template> -->

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

img{
    max-width: 100%;
  }
 .toggle-menu{
    display: none;
    /* position: absolute;
    top: 0.5rem;
    right: 1.5rem;
    cursor: pointer;
    filter: invert(-1);
    width: 40px;
    z-index: 1; */

  }

  .main-menu--show{
    display:none
  }
/* .main-menu{ */
  /* display:block;
  list-style: none;
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center; */



.showMenu{
  display: flex;
    background-color: var(--colorTask);
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    align-items: center;
    width: 100%;
    padding:2rem
    /* padding-top: 50px */
}

.main-menu_item{
    list-style: none;
    padding: 0.5em;
  }



.main-menu_link{
  color:white;
  text-transform: uppercase;
  
}

@media (max-width: 767px) {
 
  img{
    max-width: 100%;
  }

  .toggle-menu{
    display: block;
    position: absolute;
    top: 0.5rem;
    right: 1.5rem;
    cursor: pointer;
    filter: invert(-1);
    width: 40px;
    z-index: 1;
  }

  /* .main-menu {
    list-style: none;
    background-color: var(--colorTask);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%; 
  } */
  .main-menu_item{
    list-style: none;
    padding: 0.5em;
  }

  .main-menu--show{
    background-color: var(--colorTask);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    padding-top: 50px

    /* transform: translateY(0); */
  }

  .showMenu{
 display: none;
}





}




/* de acapara abajo era lo original */
.navbar-img {
  width: 90px;
}

/* nav {
  background-color: var(--colorTask);
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
}

nav ul {
  list-style: none;
  padding-inline-start: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
} */

/* @media (max-width: 767px) {
  nav {
  background-color: var(--colorTask);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  transform: translateY(-100%);
}
} */





</style>
