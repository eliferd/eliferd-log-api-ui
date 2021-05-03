<template>
    <div class="login-container">
        <h1>Connexion</h1>
        <div class="error-stack" v-if="errors.length > 0">
          <ul>
            <li v-for="err in errors" v-bind:key="err">
              {{ err }}
            </li>
          </ul>
        </div>
        <form id="login_form" method="post" v-on:submit="authUser">
            <EliInput class="login-input"
                      :inputType="inputType.TEXT"
                      inputName="username"
                      inputLabel="Identifiant"
                      v-model="username"
                      :isFullWidth="true"/>
            <EliInput class="login-input"
                      :inputType="inputType.PASSWORD"
                      inputName="password"
                      inputLabel="Mot de passe"
                      v-model="password"
                      :isFullWidth="true"/>
        </form>
        <input type="submit" form="login_form" class="login-btn" value="Se connecter">
    </div>
</template>
<style scoped>
h1 {
  font-weight: normal;
  text-align: center;
}
.login-container {
  padding-top: 25px;
  max-width: 640px;
  width: 100%;
  margin: 20vh auto;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 0 40px 90px;
}
#login_form {
  padding: 0 80px;
  margin-bottom: 70px;
}
.login-input {
  margin-top: 35px;
}

.login-btn {
  width: 100%;
  border-radius: 0px 0px 10px 10px;
  background-color: #13B470;
  color: white;
  border: none;
  padding: 8px 24px;
  font-size: 24px;
  font-family: 'Montserrat', Helvetica, sans-serif;
  user-select: none;
}
.login-btn:hover {
  cursor: pointer;
  background-color: #0FCD7D;
}
.login-btn:focus {
  background-color: #1B9662;
  outline: none;
  box-shadow: 0 0 0 0.2rem #13b47159;
}
.login-btn:disabled {
  background-color: #13b47193;
  cursor: default;
}

.error-stack {
  background-color: rgb(177, 87, 87);
  padding: 2px 0;
  color: white;
}
</style>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import EliButton from '@/components/EliButton.vue';
import EliInput, { EliInputTypeEnum } from '@/components/EliInput.vue';

@Component({
  components: {
    EliButton,
    EliInput
  }
})
export default class Login extends Vue {
    inputType = EliInputTypeEnum;
    errors: string[] = [];
    username = '';
    password = '';

    authUser (e: Event) {
      this.errors = []
      if (!this.username || !this.password) {
        this.errors.push('Champs requis manquant.');
      }
      if (this.username && this.password) {
        try {
          this.$store.dispatch('login', { loginForm: { username: this.username, password: this.password } });
          if (this.$store.getters.isAuthenticated) {
            this.$router.push('/')
          }
        } catch (e) {
          this.errors.push(e)
        }
      }
      e.preventDefault()
    }
}
</script>
