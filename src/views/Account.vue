<template>
  <div class="wrapper">
  <Nav />

  
  <h2>Name: {{username}}</h2>
  
  
  <div class="account-update" >
    <div class="containerAvatar">

      <img class="imgAvatar" :src="avatar_url ? avatar_url : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'" alt="Profile picture">
      
      <div class="avatar-upload">
        <Avatar v-model:path="avatar_url" @upload="updateProfile" class="avatar"/>
      </div>  
      
    </div>

    <form class="form-widget" @submit.prevent="updateProfile">

    <!-- Cargar imagen -->  
    <!-- Actualizar datos -->


    <div class="updateData">
        <div class="data">
          <label class="form-input-field-label" for="username">Name</label>
          <input class="form-input-field-input2" id="username" type="text" v-model.lazy="username" />
        </div>

        <div class="data">
          <label  class="form-input-field-label" for="usersurname">Surname</label>
          <input class="form-input-field-input2" id="usersurname" type="text" v-model="usersurname" />
        </div>

        <div class="data">
          <label class="form-input-field-label" for="email">Email</label>
          <input class="form-input-field-input2" id="email" type="email" v-model="email" />
        </div>

        <div class="btn-account">
        <input
        type="submit"
        class="btn-updateData"
        :value="loading ? 'Loading ...' : 'Update'"
        :disabled="loading"
          />
        </div>
    </div>

    </form>

  </div>
  <Footer/>
</div>
</template>

<script setup>
  import { supabase } from '../supabase'
  import { onMounted, ref, toRefs } from 'vue'
  import { useUserStore } from "../stores/user";
  import Nav from "../components/Nav.vue";
  import Avatar from "../components/Avatar.vue";
import Footer from '../components/Footer.vue';
  const userStore = useUserStore();

  const loading = ref(false);
  // const website = ref(null);
  const username = ref(null);
  const usersurname = ref(null);
  const avatar_url = ref(null);
  const email = ref ();

  onMounted(() => {
    getProfile();
  });

  async function getProfile() {
    await userStore.fetchUser();
    username.value = userStore.profile.username;
    usersurname.value = userStore.profile.usersurname;
    email.value = userStore.profile.email;
    avatar_url.value = userStore.profile.avatar_url;
  }


  async function updateProfile() {
    try {
      loading.value = true
      
      let { data, error } = await supabase.from('profiles').update({
        username: username.value,
        usersurname: usersurname.value,
        email: email.value,
        avatar_url: avatar_url.value,      
      }).match({user_id: useUserStore().user.id})
      if (error) throw error
     
    } catch (error) {
      alert(error.message)
    } finally {
      loading.value = false
    }
  } 

  // SEGUN ALEIX ESTO SE BORRA
  async function signOut() {
    try {
      loading.value = true
      let { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      alert(error.message)
    } finally {
      loading.value = false
    }
  }
</script>

<style>



/* img {
  width: 200px;
  border-radius: 50%;
} */
</style>


