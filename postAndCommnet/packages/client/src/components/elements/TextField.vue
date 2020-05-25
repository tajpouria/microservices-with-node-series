<template>
  <label :for="label">
    <span
      class="text-purple-600 text-sm sm:text-base md:text-lg lg:text-xl px-2"
    >
      {{ label }}
    </span>
    <input
      v-bind="$props"
      :id="label"
      type="text"
      required
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
  props: {
    label: { type: String, required: true },
    placeholder: String,
  },
  data() {
    return {};
  },
})
export default class TextField extends Vue {}
</script>
