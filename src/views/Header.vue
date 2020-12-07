<template>
	<header>
		<div class="container">
			<div class="row">
				<div :class="{'col-md-12':!isUserLoggedIn,'col-md-9':isUserLoggedIn}">
					<nav class="navbar navbar-expand-lg navbar-light">
						<a class="navbar-brand" href="#"><img src="../assets/images/logo.png" alt="logo"></a>
						<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
							<span class="navbar-toggler-icon"></span>
						</button>
						<div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
							<ul class="nav navbar-nav">

								<li class="nav-item">
									<a class="nav-link" href="#howitworks">How it works</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="#services">Our Services </a>
								</li>
								<li><a @click="onClick('/')" v-if='isUserLoggedIn' class="btn btn-info">Book a Cleaning</a></li>
								<li><a @click="showLoginMenu=true" v-if='!isUserLoggedIn' class="btn btn-info" style='margin-right: 10px;'>Login</a></li>
							</ul>
						</div>
					</nav>
				</div>
				<div class="col-md-3" v-if="isUserLoggedIn">
					<div id="header-navbar" class='pull-right'>
						<ul class="nav navbar-nav" id="header-nav">

							<li class="dropdown profile-dropdown show" :class="{'open':this.isUserOptionExpanded}" @click="negateUserOptions">
								<a class="dropdown-toggle" data-toggle="dropdown" href="#" :aria-expanded="isUserOptionExpanded">
									<img alt="" src="../assets/close.png">
									<span class="d-none d-md-block">
										{{userDetails.fullName}}
									</span>
									<b class="caret">
									</b>
								</a>
								<ul class="dropdown-menu dropdown-menu-right" :class="{'show':this.isUserOptionExpanded}">

									<li v-for='(option,key) in value' :key=key>
										<a @click="onClick(option.link)">
											<i :class="option.iconClass">
											</i>
											{{option.name}}
										</a>
									</li>
								</ul>
							</li>

						</ul>
					</div>
				</div>
			</div>

		</div>
		<RightMenuComponent :showRightMenu="showLoginMenu">
			<template slot="rightMenuContent">
				<div class="modal-header">
					<span class="right-menu-header">Login</span>

					<button type="button" class="close" @click="hideRightMenu($event)" aria-hidden="true">×</button>

				</div>
				<SignIn @register="showLoginMenu=false;showRegisterMenu=true" @close="hideRightMenu($event)"></SignIn>
			</template>

		</RightMenuComponent>
		<RightMenuComponent :showRightMenu="showRegisterMenu">
			<template slot="rightMenuContent">
				<div class="modal-header">
					<span class="right-menu-header">Register</span>

					<button type="button" class="close" @click="hideRightMenu()" aria-hidden="true">×</button>

				</div>
				<register @login="showLoginMenu=true;showRegisterMenu=false"></register>
			</template>

		</RightMenuComponent>
	</header>

</template>
<script>
import { AxiosService } from "../services";
import COMMON_CONSTANTS from "../constants/common_constants";
import SECURITY_CONSTANTS from "../store/security/constants";
import Register from "./Register.vue";
import SignIn from "./SignIn.vue";
export default {
  name: "Header",
  props: {
    options: {
      type: Array,
      default: () => [
        {
          name: "Profile",
          iconClass: "fa fa-user-circle",
          link: "/User/Profile"
        },
        {
          name: "Orders",
          iconClass: "fa fa-first-order",
          link: "/details/order"
        },
        {
          name: "Logout",
          iconClass: "fa fa-power-off",
          link: "/logout"
        }
      ]
    }
  },
  data() {
    return {
      value: this.options || [],
      isUserOptionExpanded: false,
      isUserLoggedIn: false,
      userDetails: {},
      showLoginMenu: false,
      showRegisterMenu: false
    };
  },
  async mounted() {
    var response = await AxiosService.postRequest(
      this,
      "api\\User\\GetUserInformation",
      COMMON_CONSTANTS.DEFAULT_CONTENT_TYPE_HEADER
    ).then(data => {
      this[SECURITY_CONSTANTS.MUTATIONS.USER.USERDETAILS](data);
    });
    this.populateUserDetails();
  },
  components: {
    Register,
    SignIn
  },
  methods: {
    onClick: async function(link, isUserLoggedIn) {
      if (link && link != "/logout") {
        this.$router.push(link);
      } else {
        this.userDetails = {
          firstName: "",
          lastName: "",
          Id: ""
        };
        var response = await AxiosService.postRequest(
          this,
          "api\\Login\\Logout",
          COMMON_CONSTANTS.DEFAULT_CONTENT_TYPE_HEADER
        ).then(data => {
          this.isUserLoggedIn = false;
          this[SECURITY_CONSTANTS.MUTATIONS.USER.USERDETAILS](this.userDetails);
        });
      }
    },
    negateUserOptions: function() {
      this.isUserOptionExpanded = !this.isUserOptionExpanded;
    },
    hideRightMenu: function(status) {
      (this.showLoginMenu = false), (this.showRegisterMenu = false);
      if (status == "Authenticated") {
        this.populateUserDetails();
      }
    },
    populateUserDetails: function() {
      this.userDetails = {
        firstName: this.GetUserDetails.FirstName,
        lastName: this.GetUserDetails.LastName,
        Id: this.GetUserDetails.Id
      };

      this.userDetails.fullName =
        this.userDetails.firstName +
        " " +
        (this.userDetails.lastName ? this.userDetails.lastName.charAt(0) : "");
      if (this.GetUserDetails.Id) {
        this.isUserLoggedIn = true;
      }
    }
  }
};
</script>
<style scoped>
body.theme-whbl #header-navbar .nav .show > a {
  background-color: white !important;
}
body.theme-whbl #header-navbar .nav > li > a {
  color: black !important;
}
#header-navbar {
  box-shadow: none !important;
}
header {
  padding: 0px !important;
  background-color: white !important;
}

#header-navbar {
  margin-top: 5px;
}
.dropdown-toggle {
  text-overflow: ellipsis !important;
}
.right-menu-header {
  font-size: 1.4em;
  color: #45c3d3;
}
</style>


