<template>
  <div> kek {{ postData }}</div>
</template>

<script>
export default {
  data() {
    return {
      postData : ''
    }
  },
  async fetch(ctx) {
    console.log(ctx)
    let postSlug = ctx.params.postSlug
    let sectionSlug = ctx.params.slug
    let postId = postSlug.substring(0,postSlug.indexOf('-'))
    // формат строки запроса - /section_slug/ + /post_id/ +  /-/ + /post_slug/
    // обрезаем строку чтоб получить id поста и получить информацию с сервера
    await ctx.$axios.$get('http://localhost:4000/api/sections/'+sectionSlug+'/' + postId).then(({data}) => {
      this.postData = data
     })
  },
}
</script>

<style>

</style>
