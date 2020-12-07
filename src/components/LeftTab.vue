<template>
	<div id="nav-col">
		<section id="col-left" class="col-left-nano">
			<div id="col-left-inner" class="col-left-nano-content">
				<div class="navbar navbar-expand-lg navbar-light" id="sidebar-nav">
					<div class="collapse navbar-collapse navbar-ex1-collapse" id="sidebar-nav">
						<ul class="nav navbar-nav nav-pills nav-stacked">
							<li class="nav-header nav-header-first d-none d-lg-block" v-if="schema.headerName">
								{{schema.headerName}}
							</li>
							<li v-for="(subTab,key) in schema.tabMenu" :key="key" :class="{'open' : subTab.isExpanded}">
								<a @click="onClickLink(subTab)" class="dropdown-toggle dropdown-nocaret" v-bind:class="{'active':checkIsActive(subTab)}">
									<i :class="subTab.leftTabIcon"></i>
									<span>{{subTab.name }}</span>
									<i class="fa fa-angle-right drop-icon" v-if="subTab.tabMenu != undefined && subTab.tabMenu.length > 0"></i>
									<span v-if="subTab.rightTabIcon && !subTab.tabMenu" :class="subTab.rightTabIcon.class">{{subTab.rightTabIcon.content}}</span>

								</a>
								<ul class="submenu" :style="{'display': subTab.isExpanded ?'block':'none'}" v-if="subTab.tabMenu != undefined && subTab.tabMenu.length > 0 && subTab.isExpanded">

									<li v-for="(subTab,key) in subTab.tabMenu" :key="key" v-bind:class="{'active':checkIsActive(subTab),'open' : subTab.isExpanded}">
										<a @click="onClickLink(subTab)" class="dropdown-toggle dropdown-nocaret">
											{{subTab.name}}
											<i class="fa fa-angle-right drop-icon" v-if="subTab.tabMenu != undefined && subTab.tabMenu.length > 0"></i>
											<span v-if="subTab.rightTabIcon && !subTab.tabMenu" :class="subTab.rightTabIcon.class">{{subTab.rightTabIcon.content}}</span>
										</a>
										<ul class="submenu" :style="{'display': subTab.isExpanded ?'block':'none'}" v-if="subTab.tabMenu != undefined && subTab.tabMenu.length > 0 && subTab.isExpanded">
											<li v-for="(subTab,key) in subTab.tabMenu" :key="key">
												<a @click="onClickLink(subTab)">
													<span>{{subTab.name}}</span>
													<span v-if="subTab.rightTabIcon" :class="subTab.rightTabIcon.class">{{subTab.rightTabIcon.content}}</span>
												</a>
											</li>
										</ul>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>
<script>
export default {
  name: "LeftTab",
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          headerName: "Navigation",
          tabMenu: [
            {
              name: "UI Kit",
              leftTabIcon: "fa fa-desktop",
              tabMenu: [
                {
                  name: "3 Level Menu",
                  tabMenu: [
                    {
                      name: "3rd Gen",
                      rightTabIcon: {
                        class: "label label-success pull-right",
                        content: "New"
                      },
                      link: "/aa"
                    }
                  ]
                }
              ]
            }
          ]
        };
      }
    }
  },
  data: function() {
    return {
      schema: this.value || {}
    };
  },
  mounted() {},
  methods: {
    onClickLink: function(subTab) {
      if (subTab.link) this.$router.push(subTab.link);
      else subTab.isExpanded = !subTab.isExpanded;
    },
    checkIsActive: function(tab) {
      var isActive = false;
      var routePath = this.$route.path;
      if (tab.link == routePath) {
        isActive = true;
      }
      return isActive;
    }
  }
};
</script>

<style scoped>
.active {
  background-color: #f5f5f5 !important;
}
</style>


