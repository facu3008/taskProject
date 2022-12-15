import { defineStore } from "pinia";
import { supabase } from "../supabase";

import { ref } from "vue";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    profile: null,
  }),
  actions: {
    async fetchUser() {
      const user = await supabase.auth.user();
      if (user) {
        this.user = user;
        // const { data: profile } = await supabase
        // .from('profiles')
        // .select()
        // .match({ user_id: this.user.id })

        // if (profile) this.profile = profile[0];
        // console.log('user in store: ', this.user);
        // console.log('profile in store: ', this.profile);
      }
    },

    async signUp(email, password) {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (user) {
        this.user = user;
        console.log(this.user);
      }
    },

    async signIn(email, password) {
      const { user, error } = await supabase.auth.signIn(
        {
          email: email,
          password: password,
        },
        {
          shouldCreateUser: false,
        }
      );
      if (error) throw error;
      if (user) {
        this.user = user;
      }
    },

    // Logeo con GITHUB

    async signInWithGitHub() {
      const { data, error, user } = await supabase.auth.signIn({
        provider: "github",
      });
      if (error) throw error;
      if (user) {
        this.user = user;
      }
    },

    // Logeo con GOOGLE
    async signInWithGoogle() {
      const { data, error, user } = await supabase.auth.signIn(
        {
          provider: "google",
        }
        // {
        //   redirectTo: "https://task-project-ashy.vercel.app",
        // }
      );
      if (error) throw error;
      if (user) {
        this.user = user;
      }
    },

    // Logeo con DISCORD
    async signInWithDiscord() {
      const { data, error, user } = await supabase.auth.signIn({
        provider: "discord",
      });
      if (error) throw error;
      if (user) {
        this.user = user;
      }
    },

    async signOut() {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: "user",
        storage: localStorage,
      },
    ],
  },
});
