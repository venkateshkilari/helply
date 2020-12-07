<template>
	<input :id="id" :name="name" :class="mainClass" :type="inputType" v-model="cntrlValue" v-validate="validations" :placeholder="placeholder" @input="$emit('input',cntrlValue)" :disabled='disabled' />
</template>

<script>
export default {
  name: "TextBox",
  props: {
    id: {
      type: String
    },
    name: {
      type: String
    },
    mainClass: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String
    },
    value: {},
    validations: {
      type: String,
      default: ""
    },
    inputType: {
      type: String,
      default: "text"
    }
  },
  data() {
    return {
      cntrlValue: this.value
    };
  },
  watch: {
    value: function(value) {
      this.cntrlValue = value;
    }
  }
};
</script>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
