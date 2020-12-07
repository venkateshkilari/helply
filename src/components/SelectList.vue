<template>
            <b-form-select
            :id= "id" 
            :name="name"             
            :options="options" 
            v-model="cntrlValue"
            @input="$emit('input',cntrlValue)"
            :disabled="this.disabled"
            :placeholder="placeholder"/>
</template>

<script>
export default {
    name:"SelectList",
    props: {
    id: {type:String},
    name: {type:String},
    value: {type:String},
    options: {type:Array},
    disabled: 
        {type:Boolean,
            default:false},
    placeholder: {type:String}
  },
  data()
  {
      return{
          cntrlValue: "",
      }
}
}
</script>

<style>

</style>
