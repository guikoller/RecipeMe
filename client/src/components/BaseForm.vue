<template>
	<div class="pa-8">
		<div v-for="(input,i) in inputs" :key="'input'+i">
			<slot :name="i">
<!--				Form{{form}}-->
<!--				FormInternal{{formInternal}}-->
				<v-select v-if="input.type === 'select'" filled no-data-text="Sem dados" v-bind="input" v-model="formInternal[i]"/>
				<v-textarea v-else-if="input.type === 'textarea'" filled v-bind="input" v-model="formInternal[i]"/>
				<v-text-field v-else filled v-bind="input" v-model="formInternal[i]"/>
			</slot>
		</div>
		<v-divider class="my-5"/>
		<div class="d-flex">
			<base-button class="ml-auto" v-bind="sendButtonBind" @click="$emit('sendButton')"/>
<!--			<base-button class="ml-3" v-bind="clearButtonBind"/>-->
			<base-button class="ml-3" v-bind="cancelButtonBind" @click="routerPush(originRouteName)"/>
		</div>
	</div>
</template>

<script>
import BaseButton from "@/components/BaseButton";
import UtilityMixin from "@/mixins/utility.mixin";

export default {
	name: "BaseForm",
	components: { BaseButton },
	mixins: [UtilityMixin],
	props: {
		inputs: { type: Object, default: () => {return {}}},
		form: { type: Object },
		originRouteName: { type: String, default: "Home" }
	},
	data() {
		return {
			sendButtonBind: { buttonText: "Enviar" },
			// clearButtonBind: { buttonText: "Limpar", color: "primary" },
			cancelButtonBind: { buttonText: "Cancelar", color: "error" },
			formInternal: {}
		}
	},
	watch: {
		form(value) {
			this.formInternal = value;
		},
		formInternal(value) {
			this.$emit("formChange", value);
		}
	},
	mounted() {
		this.formInternal = this.form;
	}
}
</script>

<style scoped>

</style>