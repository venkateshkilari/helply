<template>

</template>
<script>
import COMMON_CONSTANTS from "../constants/common_constants";
export default {
  name: "RazorPay",
  props: {
    description: String,
    prefill: {
      type: Object,
      default: () => {
        return {
          name: "",
          email: ""
        };
      }
    },
    notes: {
      type: Object,
      default: () => {
        return {
          address: ""
        };
      }
    }
  },
  date: function() {
    return {};
  },
  mounted: function() {},
  methods: {
    // 2000 paise = INR 20
    initiatePayment: function(amount) {
      var vueInstance = this;
      var options = {
        key: COMMON_CONSTANTS.PAYMENT_KEY,
        amount: amount, // 2000 paise = INR 20
        name: COMMON_CONSTANTS.PAYMENT_MERCHANT_NAME,
        description: this.description,
        image: COMMON_CONSTANTS.PAYMENT_IMAGE_PATH,
        handler: function(response) {
          vueInstance.$emit("PaymentResponse", response);
        },
        prefill: this.prefill,
        notes: this.notes,
        theme: {
          color: COMMON_CONSTANTS.PAYMENT_THEME_COLOR
        }
      };
      var razorPay = new Razorpay(options);
      razorPay.open();
    }
  }
};
</script>
