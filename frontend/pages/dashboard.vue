<template>
  <div class='dashboard_container'>
    <div class="dashboard_admin" v-if="Number($store.state.user.role)==3">
      <div id="new_section">
        Добавить новый раздел :
      </div>
      <div class='auth_form'>
        <input type="text" v-model="admin_newSection" placeholder="Введите название раздела">
        <input type="text" v-model="admin_newSectionModerator" @change="searchUser" placeholder="Введите логин модератора нового раздела">
        <select v-for="user in admin_newSectionModeratorSelect" :key="user.id" v-model="newModeratorId">
            <option :value="user.id"> {{user.login}}</option>
        </select>
        <input type="submit" value="Отправить" id="submit_button" @click.prevent='createSection'>
      </div>
    </div>
    <div class="dashboard_moderator" v-if="Number($store.state.user.role)==2">
      moder
    </div>
  </div>
</template>

<script>
import '../assets/forms.css'
export default {
  data() {
    return {
      admin_newSection : '',
      admin_newSectionModerator : '',
      admin_newSectionModeratorSelect : undefined,
      newModeratorId : '',
    }
  },
  mounted() {
    if(Number(this.$store.state.user.role) <= 2) {
      return this.$router.push('/')
    }
  },
  methods : {
    async createSection() {
      await this.$axios.post('/sections', {
        userId : Number(this.newModeratorId),
        name : this.admin_newSection,
      })
    },
    async searchUser() {
      await this.$axios.post('http://localhost:4000/api/filter',{
        name : this.admin_newSectionModerator
      }).then(({data}) => {
        this.admin_newSectionModeratorSelect = data
      })
    }
  }
}
</script>

<style>
  #new_section {
    text-align: center;
  }
</style>
