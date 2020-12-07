<template>
	<div class="theme-whbl  pace-done">
		<div id="theme-wrapper">
			<HelplyHeader />
			<div id="page-wrapper" class="container">
				<div class="row">
					<LeftTab :value="leftMenuSchema.leftMenu" />
					<router-view />
				</div>

			</div>
		</div>
	</div>
</template>
<script>
import leftTab from "../components/LeftTab.vue";
import helplySchema from "../data/HelplySchema.json";
import HelplyHeader from "./Header.vue";
export default {
  components: {
    LeftTab: leftTab,
    HelplyHeader: HelplyHeader
  },
  data: function() {
    return {
      leftMenuSchema: helplySchema
    };
  }
};
</script>
<style scope>
#nav-col {
  height: 100% !important;
}
</style>