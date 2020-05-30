<template>
  <button
    v-bind="$props"
    type="submit"
    class="bg-teal-500 hover:bg-teal-700 rounded-sm text-white py-1 my-2 lg:py-2 w-16 md:w-20 lg-24"
  >
    Submit
  </button>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component
export default class SubmitBtn extends Vue {}
</script>
