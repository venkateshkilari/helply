import Vue from "vue";
import Router from "vue-router";
import Booking from "../views/Booking.vue"
import SignIn from "../views/SignIn.vue"
import Register from "../views/Register.vue"
import User from "../views/User.vue";
import Profile from "../views/Profile.vue";
import Address from "../views/Address.vue";
import Helply from "../views/Helply.vue"
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "Helply",
            component: Helply
        },
        {
            path: "/Booking",
            name: "Booking",
            component: Booking
        },
        {
            path: "/signIn",
            component: SignIn
        },
        {
            path: "/register",
            component: Register
        },
        {
            path: "/BookingConfirmation",
            component: () => import("../views/BookingConfirmation")
        },
  
        {
              path:"/User",
              component:User,
              children:[
                {
                    path:"/User/Profile",
                    component:Profile
                },
                {
                    path:"/User/Address",
                    component:Address
                }
              ]
          }
    ]
});