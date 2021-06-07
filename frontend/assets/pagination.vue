<template>
  <div>
    <slot name="content">
      <div>
        <div class="pagination_wrapper">
          <div class="pagination_last" @click='setPage(1)'> В начало </div>
          <div v-for="number in pagePositions" :key='number'>
            <div class='pagination_page' @click="setPage(number)" :class="currentPage==number ? 'page_active' : ''">
              {{number}}
            </div>
          </div>
          <div class="pagination_last" @click="setPage(Number(total_length-1))">В конец </div>
      </div>
      </div>
      <div v-for="post in section_posts" :key="post.id">
            <div class="post">
              <div class="post_left_side">
                <div class="post_image">
                  <img src="../static/post_logo.jpg" width="50" height="50">
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
    </slot>
  </div>
</template>

<script>
export default {
  components: { pageSelector },
  data() {
    return {
      currentPage : 1,
      perPage : 10,
      step : 3,
    }
  },
  methods : {
    setPage(pageNumber) {
      this.currentPage = pageNumber
    }
  },
  computed : {
    section_posts() {
      return this.items.slice(this.perPage * (this.currentPage - 1),this.perPage * this.currentPage)
    },
    total_length() { // количество страниц для расчетов в пагинации
      return Math.ceil(this.items.length / this.perPage)
    },
    pagePositions() {
      let result = new Array()
      if(this.currentPage < this.step) {
        for(let i = 1; i < this.step*2;i++) {
          result.push(i)
        }
      } else {
        if(this.currentPage + this.step > this.total_length) {
          for(let i = this.currentPage - this.step;i < this.total_length;i++) {
          result.push(i)
        }
        } else
          for(let i = this.currentPage - this.step + 1;i < this.currentPage + this.step;i++) {
          result.push(i)
        }
      }

        return result
    }
  },
  props : {
    items : Array
  }
}
</script>

<style>
  .post {
    border-radius: 15px;
    border: 2px solid rgb(35, 119, 139);
    margin: 20px;
    display: flex;
    align-items: center;
}

.post_left_side {
    display: flex;
    width: 40%;
    text-overflow: ellipsis;
    overflow: hidden;
}

.post_description {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 8px;
}

.post_image {
    margin: 13px;
}

.post_content>p {
    margin: 0;
}

.post_right_side {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    flex-basis: 100%;
    padding: 15px 15px 15px 0px;
}

.pagination_wrapper {
    display: flex;
    width:500px;
    margin-left: auto;
    margin-right: auto;
    justify-content:center;
  }
  .pagination_page,.pagination_last {
    padding : 10px;
    margin : 5px;
    cursor : pointer;
    border : 1px solid rgb(35, 119, 139);
  }
  .page_active {
    font-weight: bold;
    text-decoration: underline;
  }
</style>
