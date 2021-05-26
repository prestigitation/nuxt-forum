<template>
  <div>
    <span id="register_text"> Регистрация на форуме :</span>
    <!-- IP бэкэнда брать из env -->
    <div class="auth_form">
      <input type="text" placeholder="Введите логин" v-model="login">
      <input type="email" placeholder="Введите действующий адрес электронной почты" v-model="email">
      <input type="password" placeholder="Придумайте пароль(от 6 символов)" v-model="password">
      <input type="password" placeholder="Повторите пароль" v-model="password_confirmation">
      <input type="submit" v-if="registered==false || registered==undefined" @click.prevent="register" value="Отправить" id="submit_button">
    </div>
    <transition name="fade">
      <div v-if="registered==true" class="notification_success">
        Вы зарегистрировались!
      </div>
      <div v-else-if="registered==false" class="notification_error">
        Не удалось зарегистрироваться. Проверьте введенные вами данные
      </div>
    </transition>
  </div>
</template>

<script>
import * as styles from '../assets/alerts.css'
import * as forms from '../assets/forms.css'
export default {
  data() {
    return {
      login: '',
      email: '',
      password : '',
      password_confirmation : '',
      registered : undefined
    }
  },
  methods : {
    async register() {
      await this.$axios.post('http://localhost:4000/api/register',{
        login : this.login,
        email : this.email,
        password : this.password,
        password_confirmation : this.password_confirmation
      }).then(({data}) => {
        this.$store.dispatch('authentificate',data)
        this.registered = true
        setTimeout(this.$router.push('/'),2000)
      })
      .catch(error => {
        console.log(error)
        this.registered = false
      })
    }
  },
  async mounted() {
    console.log(this.$store)
  }
}
</script>

<style>

</style>
