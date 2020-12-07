<template>

	<div id="login-page" class="theme-blue-gradient">
		<div class="container">
			<div class="row">
				<div class="col-12 col-sm-12">
					<div id="login-box">
						<div id="login-box-holder">
							<div class="row">
								<div class="col-12 col-sm-12">

									<div id="login-box-inner">
										<div :class="[errors.has('loginEmail')?'input-group has-error':'input-group']">
											<div class="input-group-prepend">
												<div class="input-group-text">
													<i class="fa fa-user mx-auto"></i>
												</div>
											</div>
											<TextBox v-model="signInData.Id" id="loginEmail" name="loginEmail" placeholder="Email Address" type="text" class="form-control" validations="required|email" />

										</div>
										<div :class="[errors.has('encryptedPassword')?'input-group has-error':'input-group']">
											<div class="input-group-prepend">
												<div class="input-group-text">
													<i class="fa fa-key mx-auto"></i>
												</div>
											</div>
											<TextBox v-model="signInData.encryptedPassword" id="encryptedPassword" name="encryptedPassword" placeholder="Password" type="password" class="form-control" validations="required" />
										</div>
										<div id="remember-me-wrapper">
											<div class="row">
												<a href="forgot-password.html" id="login-forget-link" class="col-12">
													Forgot password?
												</a>
											</div>
										</div>
										<div class="row">
											<div class="col-12">
												<ButtonComponent type="submit" class="btn btn-success col-12" label="Login" @input="onLogin()" />
											</div>
										</div>
										<div class="row">
											<div class="col-12">
												<p class="social-text">Or login with</p>
											</div>
										</div>
										<div class="row">
											<div class="col-12 col-sm-12">
												<button id="signinButton" type="submit" class="btn btn-primary col-12 btn-google">
													<i class="fa fa-google"></i> &nbsp; Sign in with Google
													<!-- <div id="google-signin-button"></div> -->
												</button>
											</div>
										</div>

									</div>

								</div>
							</div>
						</div>

						<div id="login-box-footer">
							<div class="row">
								<div class="col-12 col-sm-12">
									Do not have an account?
									<a tabindex="1" @click="$emit('register','')">Register now</a>
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
import $ from "jquery";
import { AxiosService } from "../services";
import COMMON_CONSTANTS from "../constants/common_constants";
import SECURITY_CONSTANTS from "../store/security/constants";
import TextBox from "../components/TextBox.vue";
import ButtonComponent from "../components/ButtonComponent.vue";
import CheckBoxComponent from "../components/CheckBox.vue";
export default {
  name: "SignIn",
  components: {
    TextBox,
    ButtonComponent,
    CheckBoxComponent
  },
  inject: ["$validator"],
  data() {
    return {
      signInData: {
        id: "",
        encryptedPassword: ""
      },
      retData: [],
      authData: false
    };
  },
  mounted: function() {
    var auth2;
    var vue = this;
    gapi.load("auth2", function() {
      auth2 = gapi.auth2.init({
        client_id:
          "863849289201-ji3v81g4ehnqb00341upl8hr453042sh.apps.googleusercontent.com"
        // Scopes to request in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
      //auth2.grantOfflineAccess().then(vue.signInCallback);
    });
    $("#signinButton").click(function() {
      // signInCallback defined in step 6.
      auth2.grantOfflineAccess().then(vue.signInCallback);
    });
    // gapi.signin2.render("google-signin-button", {
    //   //onsuccess: this.onSignIn
    // });
  },
  methods: {
    // signInInput: function(value) {
    //   value.id == "email"
    //     ? (this.signInData.id = value.cntrlValue)
    //     : (this.signInData.encryptedPassword = value.cntrlValue);
    // },
    onSignIn(user) {
      const profile = user.getBasicProfile();
      console.log(profile);
    },
    onLogin: async function() {
      var validated = await this.$validator.validate();

      if (validated) {
        await AxiosService.postRequest(
          this,
          "api\\Login\\VerifyLogin",
          COMMON_CONSTANTS.DEFAULT_CONTENT_TYPE_HEADER,
          this.signInData
        ).then(data => {
          if (data) {
            this.authData = true;
          } else {
            alert("Please enter correct email id and password!");
          }
        });

        if (this.authData) {
          var response = await AxiosService.postRequest(
            this,
            "api\\User\\GetUserInformation",
            COMMON_CONSTANTS.DEFAULT_CONTENT_TYPE_HEADER
          ).then(data => {
            this[SECURITY_CONSTANTS.MUTATIONS.USER.USERDETAILS](data);
            this.$emit("close", "Authenticated");
          });
        }
      }
    },
    signInCallback: async function(accessCode) {
      var response = await AxiosService.postRequest(
        this,
        "api\\Login\\Signin",
        COMMON_CONSTANTS.DEFAULT_CONTENT_TYPE_HEADER,
        { Token: accessCode["code"] }
      );
      this[SECURITY_CONSTANTS.MUTATIONS.USER.USERDETAILS](response);
    }
  }
};
</script>
<style scoped>
.btn-google {
  background-color: #dd4b39 !important;
  border-color: #dd4b39 !important;
  text-transform: unset !important;
}
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

