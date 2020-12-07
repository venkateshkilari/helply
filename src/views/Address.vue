<template>
	<div id="content-wrapper">
		<div class="col-lg-12">

			<div class="row">
				<div class="col-lg-12">
					<ol class="breadcrumb">
						<li><a href="#">Home</a></li>
						<li class="active"><span>Addresses</span></li>
					</ol>
					<h1>Manage Addresses</h1>
				</div>
			</div>

			<div class="row" v-if="addressExist">
				<div class="col-md-4 col-sm-6 col-xs-12" style="display: flex;" v-for="data in this.datafromModel.User.Address" :key="data.Id">
					<div class="main-box small-graph-box " style="color:black;width: 100%;">
						<span class="value">{{data.Label}}</span>
						<p>{{data.Address +", "+ data.City +", "+data.State+", "+data.Country}}</p>
						<p style="margin-top: 1%"><a class="links" v-on:click="editSelectedAddress(data.Id)">Edit</a>
							<a style="margin-left: 5%;" class="links" v-on:click="deleteAddress(data.Id)">Delete</a></p>
					</div>
				</div>
			</div>
		</div>
		<ButtonComponent id="add" name="add" buttonClass="btn btn-success" label="Add New" @input="enterNewAddress" />
		<!-- ozwin -->
		<ModalPopup :showModal="showModal">
			<template slot="modalHeader">
				Edit Address
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true" v-on:click="closePopup">×</button>
			</template>
			<template slot="modalContent">
				<div class="form-group">
					<label>Address Label</label>
					<TextBox id="addlabel" name="addlabel" mainClass="form-control" :value="editLabel" v-model="editLabel" />
				</div>
				<div class="form-group">
					<label>Addtress</label>
					<TextBox id="address" name="address" mainClass="form-control" :value="editAddress" v-model="editAddress" />
				</div>
				<div class="form-group">
					<label for="city">City</label>
					<TextBox id="city" name="city" mainClass="form-control" :value="editCity" v-model="editCity" />
				</div>
				<div class="form-group">
					<label for="state">State</label>
					<TextBox id="state" name="state" mainClass="form-control" :value="editState" v-model="editState" />
				</div>
				<div class="form-group">
					<label for="country">Country</label>
					<TextBox id="country" name="country" mainClass="form-control" :value="editCountry" v-model="editCountry" />
				</div>
			</template>
			<template slot="modalFooter">
				<ButtonComponent id="Close" name="Close" buttonClass="btn btn-default" label="Cancel" @input="closePopup" />
				<ButtonComponent id="Save" name="Save" buttonClass="btn btn-primary" label="Save Changes" @input="updateUserAddress" />
			</template>
		</ModalPopup>
		<!-- ozwin -->
	</div>
</template>

<script>
import HelplyModel from "../view_models/BookingModal.json";
import USER_SERVICE from "../services/user_service.js";
import loadash from "lodash";
export default {
  name: "profile",
  data: function() {
    return {
      datafromModel: HelplyModel,
      showModal: false,
      addressExist: false,
      editLabel: "",
      editAddress: "",
      editCity: "",
      editCountry: "",
      editState: "",
      currentAddressId: ""
    };
  },
  mounted: async function() {
    this.datafromModel.User = await USER_SERVICE.GetUserDetails(this);
    if (this.datafromModel.User.Address.length > 0) this.addressExist = true;
  },
  methods: {
    editSelectedAddress: function(addressId) {
      var editableAddress = loadash.find(this.datafromModel.User.Address, [
        "Id",
        addressId
      ]);
      this.currentAddressId = addressId;
      this.showModal = true;
      this.editLabel = editableAddress.Label;
      this.editAddress = editableAddress.Address;
      this.editCity = editableAddress.City;
      this.editCountry = editableAddress.Country;
      this.editState = editableAddress.State;
    },
    enterNewAddress: function() {
      this.currentAddressId =
        this.datafromModel.User.FirstName + Math.ceil(Math.random() * 10000);
      this.showModal = true;
      this.editLabel = "";
      this.editAddress = "";
      this.editCity = "";
      this.editCountry = "";
      this.editState = "";
    },
    deleteAddress: async function(currentId) {
      var tmpAddressList = this.datafromModel.User.Address;

      _.remove(tmpAddressList, ["Id", currentId]);
      this.datafromModel.User.Address = tmpAddressList;
      this.addressExist = false;
      this.addressExist = true;
      this.datafromModel.User.Id = "22";
      await USER_SERVICE.UpdateUserDetails(this);
    },
    closePopup: function() {
      this.showModal = false;
    },
    updateUserAddress: async function() {
      _.remove(this.datafromModel.User.Address, ["Id", this.currentAddressId]);
      var tmpaddress = {
        Id: this.currentAddressId,
        Address: this.editAddress,
        Label: this.editLabel,
        City: this.editCity,
        Country: this.editCountry,
        State: this.editState
      };
      this.datafromModel.User.Address.push(tmpaddress);
      await USER_SERVICE.UpdateUserDetails(this);
      this.showModal = false;
      this.addressExist = false;
      this.addressExist = true;
    }
  }
};
</script>
<style>
.links {
  color: #03a9f4 !important;
}
</style>