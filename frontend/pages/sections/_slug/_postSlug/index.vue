<template>
  <div class="post_container_page">

    <div class="post_title">
      <NuxtLink :to="'/sections/'+ $route.params.slug">
              <span class="section_redirect" v-text="'< Назад'"/>
      </NuxtLink>
      <h2 id="title">
        {{postData.title}}
      </h2>
      <span>
        От :
        <NuxtLink :to="'/users/'+ postData.user.id">
          {{ postData.user.login }}
        </NuxtLink>
      </span>
    </div>

    <div class="post_content" v-html='postData.content'/>

    <div>
      <span> Прикрепленные файлы: </span>
      <div class="post_files">
        <div v-for="index in [0,1,2,3,4]" :key="index" class="post_file">
          <img :src="'/sections/' + $route.params.slug + '/' + postId + '/' + index + '.jpeg'" width="250" height="250">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      postData : ''
    }
  },
  computed : {
    postId() {
      let postSlug = this.$route.params.postSlug
      return Number(postSlug.substring(0,postSlug.indexOf('-')))
    }
  },
  async asyncData(ctx) {
    let postSlug = ctx.params.postSlug
    let sectionSlug = ctx.params.slug
    let postId = postSlug.substring(0,postSlug.indexOf('-'))
    // формат строки запроса - /section_slug/ + /post_id/ +  /-/ + /post_slug/
    // обрезаем строку чтоб получить id поста и получить информацию с сервера
    let postData = await fetch('http://localhost:4000/api/sections/'+sectionSlug+'/' + postId).then((res) => res.json())
    return {postData}
  },
}
</script>

<style scoped>
  .post_container_page {
    width: 1240px;
    margin-left: auto;
    margin-right: auto;
  }
  #title {
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    margin-right: 50px;
    text-decoration : underline;
    padding : 5px;
    text-decoration-color: rgb(35, 119, 139);
  }
  .post_title {
    display: flex;
    align-items: center;
  }
  .post_files {
    display: flex;
    justify-content: space-around;
  }
  .section_redirect {
    padding : 15px;
    border : 2px solid rgb(35, 119, 139);
    margin-right : 15px;
  }
</style>
