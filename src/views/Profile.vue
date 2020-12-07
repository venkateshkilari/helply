<template>
	<div id="content-wrapper">
		<div class="col-lg-12">
			<div class="row">
				<div class="col-lg-12">
					<ol class="breadcrumb">
						<li><a href="#">Home</a></li>
						<li class="active"><span>User Profile</span></li>
					</ol>
					<h1 style="text-align:left">User Profile</h1>
				</div>
			</div>
			<!-- ozwin -->
			<ModalPopup :showModal="showModal">
				<template slot="modalHeader">
					Edit Profile
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true" v-on:click="closePopup">×</button>
				</template>
				<template slot="modalContent">
					<div class="form-group">
						<label>First Name</label>
						<TextBox id="FName" name="FName" mainClass="form-control" :value="this.datafromModel.User.FirstName" v-model="datafromModel.User.FirstName" />
					</div>
					<div class="form-group">
						<label>Last Name</label>
						<TextBox id="LName" name="LName" mainClass="form-control" :value="this.datafromModel.User.LastName" v-model="datafromModel.User.LastName" />
					</div>
					<div class="form-group">
						<label for="Email">Email</label>
						<TextBox id="Email" name="Email" mainClass="form-control" :value="this.datafromModel.User.Email" v-model="datafromModel.User.Email" />
					</div>
					<div class="form-group">
						<label for="phone">Phone Nmber</label>
						<TextBox id="phone" name="phone" inputType="number" validations="'required|number'" mainClass="form-control" :value="this.datafromModel.User.PhoneNumber" v-model="datafromModel.User.PhoneNumber" />
					</div>
				</template>
				<template slot="modalFooter">
					<ButtonComponent id="Close" name="Close" buttonClass="btn btn-default" label="Cancel" @input="closePopup" />
					<ButtonComponent id="Save" name="Save" buttonClass="btn btn-primary" label="Save Changes" @input="updateUserInfo" />
				</template>
			</ModalPopup>
			<!-- lobo -->

			<div id="user-profile" class="row">
				<div class="col-lg-12 col-md-12 col-sm-12">
					<div class="main-box clearfix">
						<header class="main-box-header clearfix">
							<h2>{{this.datafromModel.User.FirstName+" "+this.datafromModel.User.LastName}}</h2>
						</header>
						<div class="main-box-body clearfix">
							<ul class="row">
								<ol class="col-lg-4 col-md-4 col-sm-4" style="border-right: 1px solid rgb(231, 235, 238);">
									<div class="profile-status" style="margin-left: -18%; margin-top: 1%;"><i class="fa fa-user user-icon"></i>
										<!-- <div class="profile-since">
										Member since: Jan 2012
									</div> -->
									</div>
								</ol>
								<ol class="col-lg-4 col-md-4 col-sm-4" style="border-right: 1px solid rgb(231, 235, 238);">
									<div style="padding: 15px 0px; margin: 15px 0px;">
										<ul class="fa-ul">
											<li><i class="fa fa-envelope"></i> &nbsp;Email Id: <span>{{this.datafromModel.User.Email}}</span></li>
											<li><i class="fa fa-phone"></i>&nbsp;Phone #: <span>{{this.datafromModel.User.PhoneNumber}}</span></li>
										</ul>
									</div>
								</ol>
								<ol class="col-lg-4 col-md-4 col-sm-4">
									<div class="profile-message-btn center-block text-center" style="margin-top: 10%;">
										<ButtonComponent id="Edit" name="Edit" buttonClass="btn btn-success" label="Edit Details" @input="editProfile" />
									</div>
								</ol>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

	
<script>
import HelplyModel from "../view_models/BookingModal.json";
import USER_SERVICE from "../services/user_service.js";
export default {
  name: "profile",
  data: function() {
    return {
      datafromModel: HelplyModel,
      showModal: false
    };
  },
  mounted: async function() {
    this.datafromModel.User = await USER_SERVICE.GetUserDetails(this);
  },
  methods: {
    editProfile: function() {
      this.showModal = true;
    },
    closePopup: function() {
      this.showModal = false;
    },
    updateUserInfo: async function() {
      await USER_SERVICE.UpdateUserDetails(this);
      this.showModal = false;
    }
  }
};
</script>
<style scoped>
.md-show {
  display: block !important;
}
.user-icon {
  font-size: 200px;
  color: lightblue;
  padding-left: 50px;
}
</style>
    
