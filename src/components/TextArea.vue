<template>																														
    <div :class="mainClass">
        <textarea :id="id" class="optinal-textarea" v-model="cntrlValue" @input="$emit('input',cntrlValue)"></textarea>
    </div>


</template>
<script>
export default {
    name :"TextArea",
    props:{
        id: {type:String},
        mainClass:{type:String}
    },
    data(){
        return{
          cntrlValue: this.value,
        }
    }
}
</script>
<style scoped>

</style>

