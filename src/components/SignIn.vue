<!-- COMPONENTE BOILERPLATE -->
 
  <template>

  <div class="container">
    <h3 class="header-title">Log In to ToDo App</h3>
    <!-- <p class="header-subtitle">Estamos en la ruta de login. Aquí deberíais crear un form con la lógica correspondiente para que este permita al usuario loguearse con su email y su contraseña. Miraros la lógica de SignUp si necesitáis inspiración :)</p> -->
    <h4>Logueate con tu email y password personal</h4>
    <form @submit.prevent="signUp" class="form-sign-in">
      <div class="form">
        <div class="form-input">
          <label class="input-field-label">E-mail</label>
          <input
            type="email"
            class="input-field"
            placeholder="example@gmail.com"
            id="email"
            v-model="email"
            required
            />
          </div>
          <div class="form-input">
            <label class="input-field-label">Password</label>
            <input
            type="password"
            class="input-field"
            placeholder="**********"
            id="password"
            v-model="password"
            required
            />
          </div>
          
          <button class="button" type="submit">Log In</button>
          <p>Dont have an account? <PersonalRouter :route="route" :buttonText="buttonText" class="log-in-link"/></p>
          <!-- <p>
            Have an account?
            <PersonalRouter :route="route" :buttonText="buttonText"
            class="sign-up-link" />
          </p> -->
      </div>
    </form>  
  </div>

</template>

<script setup>
import PersonalRouter from "./PersonalRouter.vue";

// Route Variables
const route = "/auth/signup";
const buttonText = "Sign Up";

// Arrow function to Signin user to supaBase
const signIn = async () => {
  try {} catch (error) {}
};
</script>

<style>




</style>
