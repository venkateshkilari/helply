<template>
    <label :class="labelClass">
      <input ref="checkBox" :id="id" type="checkbox" :checked="cntrlValue"
            :name="name"
             @change="$emit('input', cntrlValue)"
             :class="checkboxClass"
             v-model="cntrlValue" >
      <span :class="customClass">
        
      </span>
      <slot name="slot"></slot>
    </label>
</template>

<script>
export default {
    name:"CheckBox",
    props:{
        id:{type:String},
        labelClass:{type:String},
        value:{type:Boolean,default:false},
        checkboxClass:{type:String},
        customClass:{type:String},
        name:{type:String}
    },
    data :function(){
        return{
            cntrlValue: this.value,
        }
    },
     watch: {
    value: function(newVal) {
      this.cntrlValue = newVal;
    },
    }


}
</script>

<style>

</style>
