<template>
  <div>
    <CreatePostForm />
    <PostList />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CreatePostForm from "./components/CreatePostForm.vue";
import PostList from "./components/PostList.vue";

@Component({
  components: {
    CreatePostForm,
    PostList,
  },
})
export default class App extends Vue {}
</script>
