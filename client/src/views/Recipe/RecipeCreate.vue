<template>
	<div>
		<base-card class="base-card">
			<template #title>
				<div class="d-flex title-div">
					<span class="text-h4 base-title">Nova receita</span>
				</div>
			</template>
			<v-divider class="mx-2"/>
			<base-form :inputs="recipeInputs" :form="form" @formChange="form = $event" @sendButton="sendForm"
				origin-route-name="RecipeList">
				<template #ingredientes>
					<div>
						Ingredientes: {{form.ingredientes.length}}
						<base-button class="ml-5" v-bind="ingredients.addButtonBind" @click="addIngredient"/>
						<v-card v-for="(ingredient,i) in form.ingredientes" :key="'ingredient'+i"
							class="pa-5 my-2">
							<v-select filled no-data-text="Sem dados" v-bind="ingredients.ingredienteIdBind" v-model="ingredient.id_ingrediente"/>
							<v-text-field filled v-bind="ingredients.quantidadeBind" v-model="ingredient.quantidade"/>
							<v-btn icon @click="form.ingredientes.splice(i, 1)"><v-icon>mdi-delete</v-icon></v-btn>
						</v-card>
					</div>
				</template>
			</base-form>
		</base-card>
	</div>
</template>

<script>
import BaseButton from "@/components/BaseButton";
import BaseCard from "@/components/BaseCard";
import BaseForm from "@/components/BaseForm";
import UtilityMixin from "@/mixins/utility.mixin";
import axios from "axios";

export default {
	name: "RecipeCreate",
	components: { BaseButton, BaseCard, BaseForm },
	mixins: [UtilityMixin],
	data() {
		return {
			form: {
				ingredientes: [],
			},
			ingredients: {
				addButtonBind: { buttonText: "Adicionar ingrediente" },
				ingredienteIdBind: { label: "Ingrediente", items:[], itemText: "nome", itemValue: "id"},
				quantidadeBind: { label: "Quantidade", type: "number", suffix: "unidade(s)" }
			},
			recipeInputs: {
				categoria_id: { type: "select", label: "Categoria", items: [], itemText: "nome", itemValue: "id" },
				nome: { label: "Nome" },
				descricao: { type: "textarea", label: "Descrição e passos" },
				rendimento: { type: "number", label: "Rendimento", suffix: "pessoa(s)" },
				tempo_preparo: { type: "time", label: "Tempo de preparo (hh:mm)"},
				ingredientes: {}
			}
		}
	},
	methods: {
		addIngredient() {
			this.form.ingredientes.push({
				id_ingrediente: undefined,
				id_unidade: 1,
				quantidade: 0
			});
		},
		sanitizeForm() {
			if (this.form.tempo_preparo?.includes(":")) {
				this.form.tempo_preparo = this.form.tempo_preparo.replace(":","")+"00";
			}
		},
		async sendForm() {
			this.sanitizeForm();
			try {
				await axios.post('http://localhost:8081/receita', this.form, this.axiosConfig());
				this.routerPush("RecipeList");
			} catch (e) {
				console.log(e);
				alert("Houve um erro!\n"+e);
			}
		}
	},
	async mounted() {
		let categories = await axios.get('http://localhost:8081/categoria', this.axiosConfig());
		this.recipeInputs.categoria_id.items = categories.data;
		let ingredients = await axios.get('http://localhost:8081/ingrediente', this.axiosConfig());
		this.ingredients.ingredienteIdBind.items = ingredients.data;
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