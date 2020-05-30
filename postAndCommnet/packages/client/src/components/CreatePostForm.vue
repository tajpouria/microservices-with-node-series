<template>
  <form
    @submit.prevent="handleSubmit"
    class="flex flex-col items-center mt-4 sm:mt-5 md:mt-7 lg:mt-8"
  >
    <text-field
      v-model="values.title"
      label="Post Title"
      :inputProps="{
        placeholder: 'My Awesome Post!',
        required: true,
      }"
    />
    <submit-btn />
  </form>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

import TextField from "./elements/TextField";
import SubmitBtn from "./elements/SubmitBtn";

import { createPost } from "../http";

@Component({
  components: {
    "text-field": TextField,
    "submit-btn": SubmitBtn,
  },
  data() {
    return {
      values: {
        title: null,
      },
    };
  },
  methods: {
    async handleSubmit() {
      try {
        await createPost({ title: this.values.title });
      } catch (error) {
        console.error(error);
      }
    },
  },
})
export default class CreatePostForm extends Vue {}
</script>
