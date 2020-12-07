<template>
	<div :class="rootClass">
			<input type="radio" :name="name" :id="id"  v-model="cntrlValue"  @change="$emit('change',cntrlValue)">
			<label :for="id">
				{{label}}
			</label>
	</div>
</template>
<script>
export default {
  name: "RadioButtonComponent",
  props: {
    id: { type: String},
    name: { type: String },
    label: { type: String },
    options: { type: Array },
    rootClass: { type: String},
    value: { type: String },
  },
   data :function(){
        return{
            cntrlValue: this.value,
        }
    },
  watch: {
    value: function(newVal) {
      this.cntrlValue = newVal;
    }
  },
};
</script>
<style scoped>
</style>