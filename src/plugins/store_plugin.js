import { mapGetters, mapActions, mapMutations } from "vuex";
import  SECURITY_CONSTANTS  from "../store/security/constants";
export default {
  install: function(Vue) {
    Vue.mixin({
      computed: {
        ...mapGetters({
          GetUserDetails: SECURITY_CONSTANTS.GETTERS.USER.USERDETAILS
        })
      },
      methods: {
        ...mapMutations([
          SECURITY_CONSTANTS.MUTATIONS.USER.USERDETAILS
         
        ]),
        ...mapActions([
          SECURITY_CONSTANTS.ACTIONS.USER.USERDETAILS
         
        ])
      }
    });
  }
};
