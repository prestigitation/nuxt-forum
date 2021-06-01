<template>
  <div class='dashboard_container'>


    <!-- admin ------------------------------------------------------------------------------------ -->

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


    <!-- moderator------------------------------------------------------------------------------------ -->

    <div class="dashboard_moderator" v-else-if="Number($store.state.user.role)==2">
      <div> Ваши модерируемые секции: </div>
      <div class="dashboard_moder_sections">
            <div v-for='section in moderatorSections' :key="section.id">
      <div class="section">
        <div>
          <div class="section_header">
            <NuxtLink :to="'/sections/'+section.slug">
              {{section.name}}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
      </div>
    </div>



  </div>
</template>

<script>
import '../assets/forms.css'
import '../assets/sections.css'
export default {
  data() {
    return {
      admin_newSection : '',
      admin_newSectionModerator : '',
      admin_newSectionModeratorSelect : undefined,
      newModeratorId : '',
      moderatorSections : '',
    }
  },
  async mounted() {
    if(Number(this.$store.state.user.role) < 2) {
      return this.$router.push('/')
    } else if(Number(this.$store.state.user.role) == 2) { // если вошел модератор
        await this.$axios.get('http://localhost:4000/moderator/sections/' + Number(this.$store.state.user.id)).then(({data}) => {
         this.moderatorSections = data
        }).catch(() => { console.log('Не удалось загрузить данные о модерирумых каналах')})
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
