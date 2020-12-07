<template >
	<div :class="rootClass">
		<div class="md-modal md-effect-1" :class="{'md-show' : showModal }" :id="id" tabindex="-1" aria-labelledby="myModalLabel">

			<div class="md-content">

				<div class="modal-header">
					<slot name="modalHeader" />
				</div>
				<div class="modal-body modal-max-height" v-on:scroll="OnScroll" :style="bodyStyle">
					<slot name="modalContent" />
				</div>
				<div class="modal-footer">
					<slot name="modalFooter" />
				</div>
			</div>
			<!-- </div> -->
		</div>
		<div class="md-overlay" @click="$emit('closePopUp')" />
	</div>

</template>

<script>
export default {
  name: "ModalPopUp",
  props: {
    id: { type: String, default: "myModal" },
    modalStyle: {
      type: String,
      default: "width: 600px !important;margin: 0px auto;"
    },
    bodyStyle: {
      type: String,
      default: ""
    },
    rootClass: String,
    showModal: {
      default: false
    }
  },
  methods: {
    OnScroll: function() {
      this.$emit("Scrolled");
    }
  }
};
</script>

<style scoped>
.modal-header {
  min-height: 55px !important;
}
</style>
