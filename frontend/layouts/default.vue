<template>
  <div class="container">
    <div class="page">
      <header class="header">
        <div class="header_content">
          <div class="header_section">
            <NuxtLink to='/' class="header_section_text">
                  <img src='icon.png' class="popup_image">
                  Nuxt-Forum
            </NuxtLink>
          </div>
          <div class="header_section">
            <NuxtLink to='/search' class="header_section_text">
                <img src="search.png" alt="search" id="search" class="popup_image">
                Поиск
            </NuxtLink>
          </div>
          <div class="header_section"
          v-if='!$store.state.user'
          >
            <NuxtLink to='/login' class="header_section_text">
              Войти
            </NuxtLink>
          </div>
          <div class="header_section"
          v-if='!$store.state.user'
          >
            <NuxtLink to='/register' class="header_section_text">
              Зарегистрироваться
            </NuxtLink>
          </div>
          <div class="header_section" v-if="$store.state.user">
            <NuxtLink class="header_section_text" :to="'/users/' + $store.state.user.id">
              {{ $store.state.user.login }}
            </NuxtLink>
          </div>
          <div class="header_section"
          id="logout_section"
          v-if='$store.state.user'
          >
            <span class="header_section_text" @click.prevent='logout'>
              Выйти
            </span>
          </div>
          <div class="header_section">
            <NuxtLink to='/dashboard' >
            dash </NuxtLink>
          </div>
        </div>
      </header>


      <div class="content">
        <Nuxt />
      </div>


    </div>
  </div>
</template>
<script>
  export default {
    methods:{
      logout() {
        this.$store.dispatch('logout')
      },
    }
  }
</script>
<style>
  .header {
    height: 50px;
    background-color:rgb(35, 119, 139);
    border-radius: 15px;
  }
  .header,.content {
    width:1280px;
    margin-left: auto;
    margin-right: auto;
  }
  .content {
    display : flex;
    justify-content: center;
    margin-top: 10px;
  }
  .header_content {
    margin: 10px;
    padding:10px;
    display: flex;
    justify-content: space-between;
  }
  .header_section {
    font-size: 22px;
    padding-bottom : 5px;
  }
  .header_section_text {
    text-decoration: none;
    color : white;
  }
  .header_section:hover,.header_section:active {
    border-bottom : 2px solid rgb(117, 188, 221);
  }
  #logout_section {
    cursor : pointer;
  }
  .popup_image {
    width :25px;
    height :25px;
    display : none;
  }
</style>
