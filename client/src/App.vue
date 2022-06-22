<template>
	<div id="app">
		<v-app>
			<v-app-bar color="primary" dense>
				<div class="app-bar-title" @click="routerPush('Home')">Recipe Me</div>
				<div v-for="(button,i) in appButtons" :key="appButtons+i" class="app-bar-button ml-6 px-2 py-1"
					:style="appButtonStyle(button.outlined)" @click="routerPush(button.routeName)">
					{{button.text}}
				</div>
			</v-app-bar>
			<router-view class="router-view-class"/>
		</v-app>
	</div>
</template>

<script>
import UtilityMixin from "@/mixins/utility.mixin";

export default {
	name: 'App',
	mixins: [UtilityMixin],
	data() {
		return {
			appButtons: [
				{ text: "Home", routeName: "Home" },
				{ text: "Receitas", routeName: "RecipeList" },
				{ text: "Estoque", routeName: "Inventory" },
				// { text: "Meu Perfil", routeName: "Profile", outlined: true },
			]
		}
	},
	methods: {
		appButtonStyle(outlined) {
			let buttonStyle = {};
			if (outlined) {
				buttonStyle.border = "solid 1px green";
				buttonStyle.borderRadius = "8px";
			}
			return buttonStyle;
		}
	}
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
}

.app-bar-title {
	color: white;
	cursor: pointer;
	font-size: 1.8rem;
	font-weight: bolder;
	line-height: 2.5rem;
	letter-spacing: -3px !important;
}
.app-bar-button {
	color: white;
	cursor: pointer;
}

.router-view-class {
	background-color: #EEEEEE;
	height: 100%;
}
</style>
