<template>
  <div
    class="col-span-4 sm:col-span-2 lg:col-span-1 rounded overflow-hidden shadow-lg my-2"
  >
    <div class="px-6 py-4">
      <div class="font-bold mb-2 text-sm sm:text-base md:text-lg">
        {{ post.title }}
      </div>
      <ul class="border border-purple-500 rounded">
        <li
          v-for="c in post.comments"
          :key="c._id"
          class="text-sm md:text-base"
        >
          <span v-if="c.status === 'approved'" class="text-gray-600 "
            >> {{ c.content }}</span
          >
          <span v-else-if="c.status === 'pending'" class="text-blue-600"
            >> Pending for moderation...</span
          >
          <span v-else class="text-red-600">> Rejected</span>
        </li>
      </ul>
    </div>
    <form
      @submit.prevent="handleSubmit"
      class="flex flex-col items-center py-1 px-2"
    >
      <text-field
        :inputProps="{ placeholder: `Leave a Comment...`, required: true }"
        v-model="values.content"
        label="Comment"
      />
      <submit-btn />
    </form>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import TextField from "./TextField.vue";
import SubmitBtn from "./SubmitBtn.vue";
import { createComment, getPostComment } from "../../http";

@Component({
  props: { post: Object },
  data() {
    return {
      values: {
        content: "",
      },
    };
  },
  components: { "text-field": TextField, "submit-btn": SubmitBtn },
  methods: {
    async handleSubmit(e) {
      try {
        await createComment({
          postId: this.post._id,
          content: this.values.content,
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
})
export default class PostCard extends Vue {}
</script>
