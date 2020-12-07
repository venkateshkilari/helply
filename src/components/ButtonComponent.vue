<template>
	<button :id="id" type="button" :name="name" :class="buttonClass" @click="$emit('input',cntrlValue)" :disabled="disabled">
		{{label}}
	</button>
</template>

<script>
export default {
  name: "ButtonComponent",
  props: {
    id: { type: String },
    name: { type: String },
    label: { type: String },
    value: { type: String },
    buttonClass: { type: String },
    disabled: { type: Boolean, default: false }
  },
  data: function() {
    return {
      cntrlValue: this.value
    };
  }
};
</script>

<style>
</style>
