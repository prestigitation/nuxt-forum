<template>
  <div>
    <span id="register_text"> Вход :</span>
    <div class="auth_form">
      <input type="text" placeholder="Введите логин" v-model="login">
      <input type="password" placeholder="Введите пароль" v-model="password">
      <input type="submit"  @click.prevent="auth" value="Отправить" id="submit_button">
    </div>
    <div v-if="authorized==false" class='notification_error'>
      Не удалось войти. Проверьте введенные вами данные
    </div>
  </div>
</template>

<script>
import * as forms from "../assets/forms.css"
export default {
  data() {
    return {
      login: '',
      password: '',
      authorized : undefined
    }
  },
  methods : {
    async auth() {
      await this.$axios.post('http://localhost:4000/api/login',{
        login : this.login,
        password : this.password
      }).then(({data}) => {
        this.$store.dispatch('authentificate',data)
        setTimeout(this.$router.push('/'),2000)
      })
      .catch(error => {
        this.authorized = false
      })
    }
  }
}
</script>

<style>

</style>
