<template>
  <div class="index">
    <div v-for='section in sections' :key="section.id">
      <div class="section">
        <div>
          <div class="section_header">
            <NuxtLink :to="'/sections/'+section.section.slug">
              {{section.section.name}}
            </NuxtLink>
          </div>
          <div class="section_moderator">
            Модератор : {{section.user.login}}
          </div>
        </div>
        <div class="section_content">
          csdasdsad
          asdsadsadasd
          asdsadsada
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import  '../assets/sections.css'
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

<style>

</style>
