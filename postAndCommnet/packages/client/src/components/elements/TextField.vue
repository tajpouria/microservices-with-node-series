<template>
  <label :for="label">
    <span
      class="text-purple-600 text-sm sm:text-base md:text-lg lg:text-xl px-2"
    >
      {{ label }}
    </span>
    <input
      @input="handleInput"
      v-bind="$props.inputProps"
      :id="label"
      type="text"
      class="text-black-800 bg-white
    focus:outline-none focus:shadow-outline invalid:text-red-600 border
    border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none
    leading-normal"
    />
  </label>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

@Component({
  props: ["label", "inputProps"],
  data() {
    return {
      content: this.value,
    };
  },
  methods: {
    handleInput(e) {
      this.$emit("input", e.target.value);
    },
  },
})
export default class TextField extends Vue {}
</script>
