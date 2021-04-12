<template>
    <div class="login-container">
        <h1>Connexion</h1>
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
        <EliButton form="login_form" class="login-btn" :isSubmit="true" label="Se connecter" />
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
  margin: auto;
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
}
</style>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import EliButton from '@/components/EliButton.vue'
import EliInput, { EliInputTypeEnum } from '@/components/EliInput.vue'

@Component({
  components: {
    EliButton,
    EliInput
  }
})
export default class Login extends Vue {
    inputType = EliInputTypeEnum;
    @Prop({ default: () => [] }) errors!: Array<string>;
    username = null;
    password = null;

    authUser (e: Event) {
      if (this.username && this.password) {
        return true
      }
      this.errors = []
      if (!this.username) {
        this.errors.push('Veuillez entrer un nom d\'utilisateur avant de continuer.')
      }
      e.preventDefault()
    }
}
</script>
