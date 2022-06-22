<template>
	<div>
		<base-card class="recipe-card">
			<template #title>
				<div class="d-flex title-div">
					<span class="text-h4 bold-text">{{ recipe.nome }}</span>
				</div>
			</template>
			<v-divider class="mx-2"/>
			<v-img class="my-5" height="250" contain :src="getAttributeIfExists(recipe, 'url_imagem')"/>
			<v-divider class="mx-2"/>
			<div class="py-5 px-3">
				<span class="bold-text">Rendimento: </span> {{textRendimento(recipe.rendimento)}} <br>
				<span class="bold-text">Tempo de preparo: </span> {{ recipe.tempo_preparo }}<br>
			</div>
			<v-divider class="mx-2"/>
			<div class="py-5 px-3">
				<span class="text-h6 bold-text">Ingredientes</span><br>
				<span v-for="(ingredient,i) in recipe.ingredientes" :key="'ingredient'+i">
					• {{textIngredient(ingredient)}} <br>
				</span>
				<br>
				<span class="text-h6 bold-text">Modo de preparo</span><br>
				<span> {{ recipe.descricao }}</span>
			</div>
			<v-divider class="mx-2"/>
			<div class="py-5 px-3">
				<div class="text-h6 bold-text mb-2">Comentários</div>
				<div v-for="(comment,i) in recipe.comments" :key="'comment'+i" class="mb-5">
					<div class="bold-text">
						{{ comment.user.name }} ({{ comment.score }}/5 ★) diz:
					</div>
					<div> {{ comment.text }}</div>
				</div>
			</div>
		</base-card>
	</div>
</template>

<script>
import BaseCard from "@/components/BaseCard";
import UtilityMixin from "@/mixins/utility.mixin";
import axios from "axios";

export default {
	name: "RecipeInfo",
	components: { BaseCard },
	mixins: [UtilityMixin],
	props: {
		id: [String, Number],
	},
	data() {
		return {
			// recipe: {
			// 	nome: "Miojo",
			// 	imgSrc: "https://http2.mlstatic.com/D_NQ_NP_701442-MLB46725885754_072021-O.jpg",
			// 	ingredientes: [
			// 		{ nome: "1 pacote de macarrão instantâneo" },
			// 		{ nome: "1/2 cubo de caldo de galinha" },
			// 		{ nome: "1 dente de alho picado" },
			// 		{ nome: "1 colher(sopa) de óleo" },
			// 		{ nome: "Cheiro verde picado" },
			// 	],
			// 	descricao: "Aqueça o óleo em uma panela.",
			// 	comments: [
			// 		{ user: { name: "Alfons" }, score: 2, text: "Não consegui fazer"},
			// 		{ user: { name: "Alfons" }, score: 2, text: "Não consegui fazer"}
			// 	]
			// }
			recipe: {}
		}
	},
	methods: {
		textIngredient(ingredient) {
			let ingredientStr = "";
			ingredientStr += this.decimalToFraction(parseFloat(ingredient.quantidade))+" ";
			ingredientStr += this.getAttributeIfExists(ingredient, "nome_unidade").toLowerCase()+" de "
			ingredientStr += this.getAttributeIfExists(ingredient, "nome").toLowerCase();
			return ingredientStr;
		},
		textTempoPreparo(tempo_preparo) {
			while(['0', ':'].includes(tempo_preparo.charAt(0))) {
				tempo_preparo = tempo_preparo.substring(1);
			}
			return tempo_preparo;
		}
	},
	async mounted() {
		let recipeResponse = await axios.get('http://localhost:8081/receita', {params: { id: this.id }});
		this.recipe = recipeResponse.data;
		document.title = "RecipeMe | "+recipeResponse.data.nome;
	}
}
</script>

<style scoped>
.recipe-card {
	width: 80%;
}
.bold-text {
	font-weight: bold !important;
}
.title-div {
	width: 100%;
}
</style>