<template>
	<div>
		<base-card class="base-card">
			<template #title>
				<div class="d-flex title-div">
					<span class="text-h4 base-title">Estoque</span>
					<base-button class="ml-auto mt-1" v-bind="buttonBinds.create" @click="routerPush('InventoryCreate')"/>
					<base-button class="ml-3 mt-1" v-bind="buttonBinds.canMake" @click="canMakeRecipes.open = true"/>
					<v-dialog v-model="canMakeRecipes.open">
						<v-card class="pa-5">
							<span class="text-h4 base-title">Receitas que posso fazer</span>
							<v-divider class="mx-2 my-2"/>
							<base-table v-bind="canMakeRecipes.table">
								<template #item.rendimento="{item}">
									{{item.rendimento}} pessoa(s)
								</template>
								<template #item.actions="{item}">
									<base-button button-text="Ver" @click="routerPush('RecipeInfo', {id: item.id})"/>
								</template>
							</base-table>
						</v-card>
					</v-dialog>
				</div>
			</template>
			<v-divider class="mx-2"/>
			<base-table v-bind="inventoryTable">
				<template #item.remover="{item}">
					<base-button v-bind="buttonBinds.minus" @click="alterarQuantidade(-1, item)"/>
				</template>
				<template #item.adicionar="{item}">
					<base-button v-bind="buttonBinds.plus" @click="alterarQuantidade(1, item)"/>
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
	name: "InventoryList",
	components: { BaseButton, BaseCard, BaseTable },
	mixins: [UtilityMixin],
	data() {
		return {
			buttonBinds: {
				canMake: { buttonText: "Receitas que posso fazer", color: "primary" },
				create: { buttonText: "Adicionar item" },
				minus: { buttonText: "-", color: "error" },
				plus: { buttonText: "+" },
			},
			canMakeRecipes: {
				open: false,
				table: {
					noDataText: "Erro: Não há nenhuma receita",
					noResultsText: "Nenhuma receita encontrada!",
					headers: [
						{ text: "Nome", value: "nome" },
						{ text: "Rendimento", value: "rendimento" },
						{ text: "Tempo de Preparo", value: "tempo_preparo" },
						{ text: "", value: "actions" }
					],
					items: []
				}
			},
			inventoryTable: {
				noDataText: "Erro: Não há nenhum item no estoque",
				noResultsText: "Nenhum item encontrado!",
				headers: [
					{ text: "Nome", value: "ingrediente" },
					{ text: "Quantidade", value: "quantidade" },
					{ text: "Unidade", value: "medida" },
					{ text: "Remover", value: "remover" },
					{ text: "Adicionar", value: "adicionar" },
				],
				items: []
			}
		}
	},
	methods: {
		alterarQuantidade(qte, item) {
			item.quantidade = (parseFloat(item.quantidade)+qte).toString();
		}
	},
	async mounted() {
		let items = await axios.get('http://localhost:8081/estoque', this.axiosConfig());
		this.inventoryTable.items = items.data;
		let recipes = await axios.get('http://localhost:8081/receita/possoFazer', this.axiosConfig());
		this.canMakeRecipes.table.items = recipes.data;
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