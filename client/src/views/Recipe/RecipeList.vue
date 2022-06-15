<template>
	<div>
		<base-card class="recipe-card">
			<template #title>
				<div class="d-flex title-div">
					<span class="text-h4 recipe-title">Receitas</span>
					<base-button class="ml-auto mt-1" v-bind="buttonCreateBind"/>
				</div>
			</template>
			<v-divider class="mx-2"/>
			<base-table v-bind="recipeTable">
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
					{ text: "Nome", value: "name" },
					{ text: "Tipo", value: "category.name" },
					{ text: "Tempo de Preparo", value: "prepareTime" },
					{ text: "Ingredientes", value: "hasIngredients" },
					{ text: "", value: "actions" }
				],
				items: [
					{ id: 0, name: "Pavê", 'category.name': "Sobremesas", prepareTime: "1 Hora", hasIngredients: true },
					{ id: 1, name: "Miojo", 'category.name': "Massas", prepareTime: "8 Horas", hasIngredients: false },
					{ id: 2, name: "Costela", 'category.name': "Carnes", prepareTime: "5 Horas", hasIngredients: true },
					{ id: 3, name: "Arroz", 'category.name': "Grãos", prepareTime: "15 Minutos", hasIngredients: true },
					{ id: 4, name: "Feijão", 'category.name': "Grãos", prepareTime: "1 Hora", hasIngredients: true },
				]
			}
		}
	},
	methods: {
		hasIngredientsSymbol(ing) {
			return ing ? "👍" : "👎";
		}
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