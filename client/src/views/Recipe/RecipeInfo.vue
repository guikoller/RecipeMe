<template>
	<div>
		<base-card class="recipe-card">
			<template #title>
				<div class="d-flex title-div">
					<span class="text-h4 bold-text">{{ recipe.name }}</span>
				</div>
			</template>
			<v-divider class="mx-2"/>
			<v-img class="my-5" height="250" contain :src="recipe.imgSrc"/>
			<v-divider class="mx-2"/>
			<div class="py-5 px-3">
				<span class="text-h6 bold-text">Ingredientes</span><br>
				<span v-for="(ingredient,i) in recipe.ingredients" :key="'ingredient'+i">
					• {{ingredient.name}} <br>
				</span>
				<br>
				<span class="text-h6 bold-text">Modo de preparo</span><br>
				<span v-for="(preparation,i) in recipe.preparationSteps" :key="'preparation'+i">
					{{ i+1 }}. {{preparation.description}} <br>
				</span>
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

export default {
	name: "RecipeInfo",
	components: { BaseCard },
	props: {
		id: [String, Number],
	},
	data() {
		return {
			recipe: {
				name: "Miojo",
				imgSrc: "https://http2.mlstatic.com/D_NQ_NP_701442-MLB46725885754_072021-O.jpg",
				ingredients: [
					{ name: "1 pacote de macarrão instantâneo" },
					{ name: "1/2 cubo de caldo de galinha" },
					{ name: "1 dente de alho picado" },
					{ name: "1 colher(sopa) de óleo" },
					{ name: "Cheiro verde picado" },
				],
				preparationSteps: [
					{ description: "Aqueça o óleo em uma panela." },
					{ description: "Acrescente o alho picado e deixe dourar." },
					{ description: "Em seguida, coloque a mesma quantidade de água indicada na embalagem para fazer o miojo." },
					{ description: "Deixe ferver." },
					{ description: "Acrescente o macarrão e em seguida o caldo de galinha." },
					{ description: "Mexa por 1 minuto e deixe cozinhar no tempo indicado (geralmente 3 minutos)." },
					{ description: "Adicione cheiro verde a gosto e sirva!" },
				],
				comments: [
					{ user: { name: "Alfons" }, score: 2, text: "Não consegui fazer"},
					{ user: { name: "Alfons" }, score: 2, text: "Não consegui fazer"}
				]
			}
		}
	},
	mounted() {
		console.log(this.id);
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