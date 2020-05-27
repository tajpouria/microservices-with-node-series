<template>
  <div class="grid grid-cols-4 gap-2">
    <post-card v-for="p in posts" :key="p._id" :post="p" />
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import { getPostAndComments } from "../http";
import PostCard from "./elements/PostCard.vue";

@Component({
  data() {
    return {
      posts: [],
    };
  },
  components: {
    "post-card": PostCard,
  },
  async created() {
    try {
      const response = await getPostAndComments();
      this.posts = await response.json();
    } catch (error) {
      console.error(error);
    }
  },
})
export default class PostList extends Vue {}
</script>
