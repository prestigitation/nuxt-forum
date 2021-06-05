<template>
  <div class='section_container'>
    <div class="section_page_header">
      <span> <span id="section_head"> Раздел </span> {{$route.params.slug}} </span>
      <button class='section_add_button' @click.prevent='isPostAdding = !isPostAdding' v-if="!isPostAdding"> Добавить пост </button>
      <button class='section_add_button' @click.prevent='isPostAdding = !isPostAdding' v-else> Выйти из режима редактирования </button>
    </div>
    <hr id="section_line">
    <div>

      <div v-if="isPostAdding">
        <div class="section_post_form">
          <form enctype="multipart/form-data">
            <input type="text" class='section_form_input' v-model="section_title" placeholder="Введите название поста">
            <vue-editor class="section_form_textarea" v-model="section_content"></vue-editor>
            <div>
              <div> Вы можете прикрепить файлы(макс.5)</div>
              <input class='section_form_files' multiple type="file" ref="files" accept='image/*' name="files[]">
              <input type="submit" placeholder='Добавить пост' @click.prevent='addPost'>
            </div>
          </form>
        </div>
      </div>

      <div v-else>
        <div class="posts_container">
          <div v-for="post in section_posts" :key="post.id">
            <div class="post">
              <div class="post_left_side">
                <div class="post_image">
                  <img src="../../../static/post_logo.jpg" width="50" height="50">
                </div>
                <div class='post_description'>
                    <div class="post_title">
                      <NuxtLink :to="'/sections/'+ $route.params.slug + '/' + post.id + '-' + post.slug">
                        {{ post.title }}
                      </NuxtLink>
                    </div>
                  <div class='post_content' v-html="post.content"></div>
                </div>
              </div>
              <div class="post_right_side">
                <div> Последнее сообщение</div>
                <div> Иван, 19:00 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import '../../../assets/section_forms.css'
import '../../../assets/posts.css'
export default {
  components : {VueEditor},
  async fetch() {
    await this.$axios.get('http://localhost:4000/api/sections/' + this.$route.params.slug).then(({data}) => {
      this.section_posts = data
    })
  },
  data() {
    return {
      section_posts : '',
      isPostAdding : false,
      section_title : '',
      section_content : 'Текст статьи',
    }
  },
  methods : {
    async addPost() {
      let files = this.$refs.files.files
      let formData = new FormData()
      formData.append('userId',Number(this.$store.state.user.id))
      formData.append('title',this.section_title)
      formData.append('content',this.section_content)
      formData.append('section',this.$route.params.slug)
      for(let i=0;i<files.length;i++) {
        let file = files[i]
        formData.append(i, file);
      }
      await this.$axios.post('http://localhost:4000/api/posts', formData,{
          headers: {
            'Content-Type': 'multipart/form-data'
        }
      }).then(msg => {console.log(msg)}).catch(err => {console.log(err)})
      }
    }
  }
</script>

<style>
  .section_container {
    width: 1260px;
    margin-left: auto;
    margin-right: auto;
  }
  .section_page_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .section_add_button {
    padding : 10px;
    border-radius : 10px;
    background-color : rgb(35, 119, 139);
    color : white;
    cursor : pointer;
  }
  .section_post_form {
    margin-top : 20px;
  }
  #section_line {
    color : rgb(35, 119, 139);
  }
  #section_head {
    font-size : 22px;
    font-weight : bold;
    margin-left: 10px;
    margin-right: 10px;
  }
</style>
