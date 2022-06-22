<template>
	<div>
		<base-card class="base-card">
			<template #title>
				<div class="d-flex title-div">
					<span class="text-h4 base-title">Categorias</span>
					<base-button class="ml-auto mt-1" v-bind="buttonCreateBind" @click="routerPush('CategoryCreate')"/>
				</div>
			</template>
			<v-divider class="mx-2"/>
			<base-table v-bind="categoryTable"/>
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
	name: "CategoryList",
	components: { BaseButton, BaseCard, BaseTable },
	mixins: [UtilityMixin],
	data() {
		return {
			buttonCreateBind: {
				buttonText: "Nova categoria"
			},
			categoryTable: {
				noDataText: "Erro: Não há nenhuma categoria",
				noResultsText: "Nenhuma categoria encontrada!",
				headers: [
					{ text: "ID", value: "id" },
					{ text: "Nome", value: "nome" }
				],
				items: []
			}
		}
	},
	async mounted() {
		let categories = await axios.get('http://localhost:8081/categoria', this.axiosConfig());
		this.categoryTable.items = categories.data;
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