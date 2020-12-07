<template>
	<div v-show="showRightMenu">
		<div id="config-tool">

			<div id="config-tool-options" class="right-menu-content">
				<slot name="rightMenuContent"></slot>
			</div>

		</div>
	</div>

</template>
<script>
export default {
  name: "RightMenuComponent",
  props: {
    showRightMenu: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {};
  }
};
</script>
<style scoped>
#config-tool {
  width: 30%;
  top: 0px;
  z-index: 10001;
  height: 100%;
}
.right-menu-content {
  height: 100%;
}
</style>

