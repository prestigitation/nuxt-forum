<template>
  <div class="index">
    <div v-for='section in sections' :key="section.id">
      <div class="section">
        <img src="sign.png">
        <div id="section_main">
          <div class="section_header">
            <NuxtLink :to="'/sections/'+section.section.slug">
              {{section.section.name}}
            </NuxtLink>
          </div>
          <div class="section_moderator">
            <span> Модератор : </span>
            <NuxtLink :to="'/users/' + section.user.id">
              {{section.user.login}}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async fetch() {
      this.sections = await fetch(
        'http://localhost:4000/api/sections'
      ).then(res => res.json())

    },
    fetchOnServer : true,
    data() {
      return {
        sections : ''
      }
    },
    async mounted() {
      console.log(this.sections)
    }


}
</script>

<style scoped>
  .section {
    display : flex;
    width: 1240px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 20px;
    border: 2px groove rgb(35, 119, 139);
    margin: 10px;
    padding: 20px;
}

.section_header {
    margin: 5px;
    text-decoration: underline;
    display: block;
    font-size: 20px;
}

.section_moderator {
    display: block;
    font-size: 13px;
    color: rgb(20, 153, 20);
}

#section_main {
  margin-left: 20px;
}

</style>
