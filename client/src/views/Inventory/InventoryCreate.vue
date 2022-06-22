<template>
	<div>
		<base-card class="base-card">
			<template #title>
				<div class="d-flex title-div">
					<span class="text-h4 base-title">Adicionar item ao estoque</span>
				</div>
			</template>
			<v-divider class="mx-2"/>
			<base-form :inputs="itemInputs" :form="form" @formChange="form = $event" @sendButton="sendForm"
								:origin-route-name="routeOrigin"/>
		</base-card>
	</div>
</template>

<script>
import BaseCard from "@/components/BaseCard";
import BaseForm from "@/components/BaseForm";
import UtilityMixin from "@/mixins/utility.mixin";
import axios from "axios";

export default {
	name: "InventoryCreate",
	components: { BaseCard, BaseForm },
	mixins: [UtilityMixin],
	data() {
		return {
			form: {},
			itemInputs: {
				ingrediente: { type: "select", label: "Ingrediente", items:[], itemText: "nome", itemValue:"id" },
				quantidade: { type: "number", label: "Quantidade" }
			},
			routeOrigin: "InventoryList"
		}
	},
	methods: {
		sanitizeForm() {
			let newForm = {...this.form};
			newForm.medida = 1;
			return newForm;
		},
		async sendForm() {
			let newForm = this.sanitizeForm();
			try {
				await axios.post('http://localhost:8081/estoque', newForm, this.axiosConfig());
				await this.routerPush(this.routeOrigin);
			} catch (e) {
				console.log(e);
				alert("Houve um erro!\n"+e);
			}
		}
	},
	async mounted() {
		let ingredients = await axios.get('http://localhost:8081/ingrediente', this.axiosConfig());
		this.itemInputs.ingrediente.items = ingredients.data;
	}
}
</script>

<style scoped>
.base-card {
	width: 80%;
	/*border-radius: 0;*/
}
.base-title {
	font-weight: bold !important;
}
.title-div {
	width: 100%;
}
</style>