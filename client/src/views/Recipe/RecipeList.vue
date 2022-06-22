<template>
	<div>
		<base-card class="recipe-card">
			<template #title>
				<div class="d-flex title-div">
					<span class="text-h4 recipe-title">Receitas</span>
					<base-button class="ml-auto mt-1" v-bind="buttonCreateBind" @click="routerPush('RecipeCreate')"/>
				</div>
			</template>
			<v-divider class="mx-2"/>
			<base-table v-bind="recipeTable">
				<template #item.rendimento="{item}">
					{{item.rendimento}} pessoa(s)
				</template>
				<template #item.hasIngredients="{item}">
					{{hasIngredientsSymbol(item.hasIngredients)}}
				</template>
				<template #item.actions="{item}">
					<base-button button-text="Ver" @click="routerPush('RecipeInfo', {id: item.id})"/>
				</template>
			</base-table>
		</base-card>
	</div>
</template>

<script>
import BaseCard from "@/components/BaseCard";
import BaseButton from "@/components/BaseButton";
import BaseTable from "@/components/BaseTable";
import UtilityMixin from "@/mixins/utility.mixin";
import axios from "axios";

export default {
	name: "RecipeList",
	components: { BaseButton, BaseCard, BaseTable },
	mixins: [UtilityMixin],
	data() {
		return {
			buttonCreateBind: {
				buttonText: "Nova receita"
			},
			recipeTable: {
				noDataText: "Erro: Não há nenhuma receita",
				noResultsText: "Nenhuma receita encontrada!",
				headers: [
					{ text: "Nome", value: "nome" },
					{ text: "Categoria", value: "categoria" },
					{ text: "Rendimento", value: "rendimento" },
					{ text: "Tempo de Preparo", value: "tempo_preparo" },
					{ text: "", value: "actions" }
				],
				items: [
					// { id: 0, nome: "Pavê", 'category.nome': "Sobremesas", tempo_preparo: "1 Hora" },
					// { id: 1, nome: "Miojo", 'category.nome': "Massas", tempo_preparo: "8 Horas" },
					// { id: 2, nome: "Costela", 'category.nome': "Carnes", tempo_preparo: "5 Horas" },
					// { id: 3, nome: "Arroz", 'category.nome': "Grãos", tempo_preparo: "15 Minutos" },
					// { id: 4, nome: "Feijão", 'category.nome': "Grãos", tempo_preparo: "1 Hora" },
				]
			}
		}
	},
	methods: {
		hasIngredientsSymbol(ing) {
			return ing ? "👍" : "👎";
		}
	},
	async mounted() {
		let recipes = await axios.get('http://localhost:8081/receita/all');
		this.recipeTable.items = recipes.data;
	}
}
</script>

<style scoped>
	.recipe-card {
		width: 80%;
		/*border-radius: 0;*/
	}
	.recipe-title {
		font-weight: bold !important;
	}
	.title-div {
		width: 100%;
	}
</style>