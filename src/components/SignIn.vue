<!-- COMPONENTE BOILERPLATE -->
 
  <template>
<div class="container-form">


  <div class="container-sign">
    <h3 class="header-title">Log In to To-Do App</h3>
    
    <form @submit.prevent="signIn" class="form-sign-in">
      <div class="form">
        <div class="form-input">
          <label class="form-input-field-label">E-mail</label>
          <input type="email" class="form-input-field-input" placeholder="example@gmail.com" id="email"
          v-model="email" required />
        </div>
        <div class="form-input-passwword">
          <label class="form-input-field-label">Password</label>
          <input :type="passwordType"
          class="form-input-field-input"
          placeholder="**********"
          id="password"
          v-model="password"
          required/>
          <button :class="showIcon" @click.prevent="hidePassword = !hidePassword" ></button>
        </div>
          
        <button class="button-log" type="submit" >Log In</button>
        
        
        <p>Dont have an account? <span><PersonalRouter :route="route" :buttonText="buttonText" class="log-in-link"/></span></p>
      </div>
    </form>  
    <div>
      <button class="button-gitHub" type="submit" @click="gitHub" ></button>
      <button class="button-google" type="submit" @click="google" ></button>
      <button class="button-discord" type="submit" @click="discord" ></button>

      <p v-if="isSigningIn">Please wait...</p>
                <button v-else @click="signInGithub">Sign in via Github</button>
    </div>
  </div>
</div>
</template>

<script setup>
import PersonalRouter from "./PersonalRouter.vue";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { supabase } from "../supabase";

// Route Variables
const route = "/auth/signup";
const buttonText = "Sign Up";

// Input Fields
const email = ref("");
const password = ref("");
const provider = ref("")
// const route1 = "/home";
// const buttonText1 = "Log In";

// Error Message
const errorMsg = ref("");

// Router to push user once LogIn to Home
const redirect = useRouter();

// Arrow function to Signin user to supaBase
const signIn = async () => {
  // if (email.value > 0)
  try {
    await useUserStore().signIn(email.value, password.value);
    redirect.push({ path: "/" });
  } catch (error) {
    // displays error message
    errorMsg.value = error.message;
      // hides error message
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
    errorMsg.value = "error";
};
//Logica para mostrar contraseña
const hidePassword = ref(true);
const passwordType = computed(() =>
  hidePassword.value ? "password" : "text"
);
const showIcon = computed(() =>
  hidePassword.value ? "passwordIcon" : "passwordIconShow");
  // setTimeout(() => {
  //   hidePassword.value = !hidePassword.value;
  //     }, 3000);
  
  // Log In With Third Party OAuth

  const gitHub= async () => {
  
  try {
    console.log("Funciona?");
    await useUserStore().signInWithGitHub();
    // redirect.push({ path: "/" });

    
  } catch (error) {
    // displays error message
    errorMsg.value = error.message;
    // hides error message
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
    errorMsg.value = "error";
};
  // Log In With Third Party Goolge

  const google= async () => {
  
  try {
    console.log("Funciona?");
    await useUserStore().signInWithGoogle();
    redirect.push({ path: "/" });

    
  } catch (error) {
    // displays error message
    errorMsg.value = error.message;
    // hides error message
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
    errorMsg.value = "error";
};


// Discord

const discord= async () => {
  
  try {
    console.log("Funciona Discord");
    
    await useUserStore().signInWithDiscord();
    // redirect.push({ path: "/" });

    
  } catch (error) {
    // displays error message
    errorMsg.value = error.message;
      // hides error message
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
    errorMsg.value = "error";
};


const isSigningIn = ref(false);
// Arrow functon sign n github - IT WORKS HERE
const signInGithub = async () => {
  //await useUserStore().signInGithub();
  try {
    isSigningIn.value = true;
    const { error } = await supabase.auth.signIn({ provider: "github", options: {redirectTo: "https://task-project-ashy.vercel.app"}} 
  );
    redirect.push({ path: "/" });
    if (error) {
      throw error;
    }
  } catch (error) {
    localStorage.removeItem("redirectRoute");
    console.error(error);
    alert("Something went wrong! Check the console for more details");
  } finally {
    isSigningIn.value = false;
  }
};


//   let { data, error } = await supabase.auth.signInWithOAuth({
//   provider: 'github'
// })


</script>

<style>







</style>
