<template>
	<div>
		<base-card class="base-card">
			<template #title>
				<div class="d-flex title-div">
					<span class="text-h4 base-title">Novo usuário</span>
				</div>
			</template>
			<v-divider class="mx-2"/>
			<base-form :inputs="userInputs" :form="form" @formChange="form = $event" @sendButton="sendForm"
								:origin-route-name="routeOrigin">
				<template #divider>
					<v-divider class="my-3"/>
				</template>
			</base-form>
		</base-card>
	</div>
</template>

<script>
import BaseCard from "@/components/BaseCard";
import BaseForm from "@/components/BaseForm";
import UtilityMixin from "@/mixins/utility.mixin";
import axios from "axios";

export default {
	name: "RegisterPage",
	components: { BaseCard, BaseForm },
	mixins: [UtilityMixin],
	data() {
		return {
			form: {},
			userInputs: {
				nome: { label: "Nome" },
				sobrenome: { label: "Sobrenome" },
				data_nascimento: { type: "date"},
				genero: { type: "select", label: "Gênero", items: ["M", "F", "X"]},
				newsletter: { type: "checkbox", label: "Assinar newsletter?" },
				divider: {},
				login: { label: "Login", hint: "Isto será usado para entrar no site" },
				senha: { type: "password", label: "Senha"}
			},
			routeOrigin: "Login"
		}
	},
	methods: {
		sanitizeForm() {
			let newForm = {...this.form}
			newForm.data_nascimento = new Date(newForm.data_nascimento).toLocaleDateString("pt-BR");
			newForm.newsletter = newForm.newsletter ? 1 : 0;
			return newForm;
		},
		async sendForm() {
			let newForm = this.sanitizeForm();
			console.log(newForm);
			try {
				await axios.post('http://localhost:8081/auth/create', newForm);
				await this.routerPush(this.routeOrigin);
			} catch (e) {
				console.log(e);
				alert("Houve um erro!\n"+e);
			}
		}
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