<template>
  <div>
    <CreatePostForm />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CreatePostForm from "./components/CreatePostForm.vue";

@Component({
  components: {
    CreatePostForm,
  },
})
export default class App extends Vue {}
</script>
