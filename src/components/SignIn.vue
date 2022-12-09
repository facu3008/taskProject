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
        <div class="form-input">
          <label class="form-input-field-label">Password</label>
          <input type="password"
          class="form-input-field-input"
          placeholder="**********"
          id="password"
          v-model="password"
          required/>
        </div>
          
        <button class="button-log" type="submit" >Log In</button>

        <p>Dont have an account? <span><PersonalRouter :route="route" :buttonText="buttonText" class="log-in-link"/></span></p>
      </div>
    </form>  
  </div>
</div>
</template>

<script setup>
import PersonalRouter from "./PersonalRouter.vue";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";

// Route Variables
const route = "/auth/signup";
const buttonText = "Sign Up";

// Input Fields
const email = ref("");
const password = ref("");
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

</script>

<style></style>
