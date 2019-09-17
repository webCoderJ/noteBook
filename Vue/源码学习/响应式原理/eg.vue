<template>
  <div class="block-wrapper">
    <p>
      <span>Info:</span>
      {{ info }}
    </p>
    <p>
      <span>Name:</span>
      {{ name }}
    </p>
    <p>
      <span>Age:</span>
      {{ age }}
    </p>
  </div>
</template>

<script>
import { value } from "vue";
export default {
  components: {},
  setup() {
    value;
  },
  data() {
    return {
      name: "xiaoming",
      age: 18
    };
  },
  computed: {
    info() {
      return `Name is: ${this.name}, Age is: ${age}`;
    }
  },
  async created() {},
  methods: {}
};
</script>

<style scoped lang="scss">
</style>
