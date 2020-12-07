<template>

	<div id="login-page" class="theme-blue-gradient">
		<div class="container">
			<div class="row">
				<div class="col-12 col-sm-12">
					<div id="login-box">
						<div class="row">
							<div class="col-12 col-sm-12">

								<div id="login-box-inner">
									<form role="form">
										<div :class="[errors.has('firstName')?'input-group has-error':'input-group']">
											<div class="input-group-prepend">
												<div class="input-group-text">
													<i class="fa fa-user mx-auto"></i>
												</div>
											</div>
											<!-- <input class="form-control" type="text" placeholder="First name"> -->
											<TextBox v-model="registerData.firstname" id="firstName" name="firstName" placeholder="First name" type="text" class="form-control" validations="required" />
										</div>
										<div :class="[errors.has('lastName')?'input-group has-error':'input-group']">
											<div class="input-group-prepend">
												<div class="input-group-text">
													<i class="fa fa-user mx-auto"></i>
												</div>
											</div>
											<TextBox v-model="registerData.lastname" id="lastName" name="lastName" placeholder="Last name" type="text" class="form-control" validations="required" />
										</div>
										<div :class="[errors.has('email')?'input-group has-error':'input-group']">
											<div class="input-group-prepend">
												<div class="input-group-text">
													<i class="fa fa-envelope mx-auto"></i>
												</div>
											</div>
											<TextBox v-model="registerData.email" id="email" name="email" placeholder="Email" type="text" class="form-control" validations="required||email" />
										</div>
										<div :class="[errors.has('phonenumber')?'input-group has-error':'input-group']">
											<div class="input-group-prepend">
												<div class="input-group-text">
													<i class="fa fa-mobile mx-auto"></i>
												</div>
											</div>
											<TextBox v-model="registerData.phonenumber" id="phonenumber" name="phonenumber" placeholder="Mobile Number" type="tel" class="form-control" validations="required" />
										</div>
										<div :class="[errors.has('password')?'input-group has-error':'input-group']">
											<div class="input-group-prepend">
												<div class="input-group-text">
													<i class="fa fa-lock mx-auto"></i>
												</div>
											</div>
											<TextBox v-model="registerData.encryptedPassword" id="password" name="password" placeholder="Password" type="password" class="form-control" validations="required" />
										</div>
										<div :class="[errors.has('reenterPassword')?'input-group has-error':'input-group']">
											<div class="input-group-prepend">
												<div class="input-group-text">
													<i class="fa fa-unlock-alt mx-auto"></i>
												</div>
											</div>
											<TextBox v-model="registerData.reenterpassword" id="reenterPassword" name="reenterPassword" placeholder="Re-enter Password" type="password" class="form-control" validations="required" />
										</div>
										<div id="remember-me-wrapper">
											<div class="row">
												<div class="col-12 col-sm-12">
													<div class="terms-reminder">

														<CheckBoxComponent id="termsAndConditions" labelClass="custom-control custom-checkbox" checkboxClass="custom-control-input" customClass="custom-control-indicator">
															<template slot="slot">
																<span class="custom-control-description">I accept terms and conditions</span>
															</template>
														</CheckBoxComponent>
													</div>
												</div>
											</div>
										</div>
										<div class="row">
											<div class="col-12 col-sm-12">
												<ButtonComponent id="registerButton" name="registerButton" buttonClass="btn btn-block complete-booking" label="Register" @input="onRegisterEvent()" />
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import TextBox from "../components/TextBox.vue";
import ButtonComponent from "../components/ButtonComponent.vue";
import CheckBoxComponent from "../components/CheckBox.vue";
import RegisterService from "../services/register_service.js";
import Router from "vue-router";

export default {
  name: "Register",
  components: {
    TextBox,
    ButtonComponent,
    CheckBoxComponent
  },
  data() {
    return {
      registerData: {
        firstname: "",
        lastname: "",
        email: "",
        phonenumber: "",
        encryptedPassword: "",
        reenterPassword: ""
      },
      validateFlag: false
    };
  },
  methods: {
    onRegisterEvent: async function() {
      var validated = await this.$validator.validate();
      if (validated) {
        if (
          this.checkPasswordComplexity(this.registerData.encryptedPassword) &&
          this.passwordRecheck() &&
          document.getElementById("termsAndConditions").checked
        ) {
          var ret = await RegisterService.RegisterNewUser(this);
          alert("registered");
          this.$emit("login", "Registered");
        } else if (!document.getElementById("termsAndConditions").checked) {
          alert("Accept the terms and conditions.");
        } else {
          alert(
            "Please enter alphanumeric password! Password should atleast contain a Uppercase alphabet, a Lowercase alphabet and a number "
          );
        }
      }
    },
    checkPasswordComplexity: function(pwd) {
      var regularExpression = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])[\w\d!@#$%_]{6,40}$/;
      return regularExpression.test(pwd);
    },
    passwordRecheck: function() {
      return this.encryptedPassword === this.reenterPassword ? true : false;
    }
  }
};
</script>
<style scoped>
#login-box {
  margin: 0px;
}
#login-box-inner {
  border: 0px;
}
#login-page {
  background-color: white;
}
</style>



