<template>
	<div class="row">

		<div class="col-md-12 col-sm-12 col-xs-12">
			<span class="booking-confirm-icon green">
				<i class="fa fa-check-circle" aria-hidden="true"></i>
				<br />
			</span>

			<span class="booking-confirm-text green">Booking Successful</span><br />
			<span class="booking-confirm-subtext">We will be assigning someone soon</span>
			<br /><br />
			<h1>Redirecting....</h1>
		</div>
	</div>

</template>
<script>
export default {
  name: "BookingConfirmation",
  mounted: function() {
    var vueInstance = this;
    setInterval(function() {
      vueInstance.redirectToOrders();
    }, 3000);
  },
  methods: {
    redirectToOrders: function() {
      window.location.href = window.location.origin + "/#/Orders";
    }
  }
};
</script>
<style scoped>
.booking-confirm-icon {
  font-size: 9em;
}
.booking-confirm-text {
  font-size: 2em;
}
.booking-confirm-subtext {
  font-size: 1.4em;
  color: grey;
}
</style>
