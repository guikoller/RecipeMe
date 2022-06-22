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
				<div class="d-flex">
					<div class="text-h6 bold-text mb-2">Comentários</div>
					<base-button class="ml-auto" v-bind="commentBinds.button" @click="showCommentCreate = !showCommentCreate"/>
				</div>
				<v-card v-if="showCommentCreate" class="px-5 pt-4 mt-2">
					<v-text-field filled v-bind="commentBinds.avaliacao" v-model="commentForm.avaliacao"/>
					<v-textarea filled v-bind="commentBinds.texto" v-model="commentForm.texto"/>
					<div class="d-flex">
						<base-button class="ml-auto mb-3" v-bind="commentBinds.inButton" @click="addComment"/>
					</div>
				</v-card>
				<div v-if="!$store.state.token">
					Faça login para ver os comentários!
				</div>
				<div v-else v-for="(comment,i) in comments" :key="'comment'+i" class="mb-5">
					<div class="bold-text">
						{{formatDate(comment.data)}} - {{ comment.usuario }} ({{ Math.round(comment.avaliacao*5.555*10)/10 }}/5 ★) diz:
					</div>
					<div> {{ comment.texto }}</div>
				</div>
			</div>
		</base-card>
	</div>
</template>

<script>
import BaseCard from "@/components/BaseCard";
import UtilityMixin from "@/mixins/utility.mixin";
import axios from "axios";
import BaseButton from "@/components/BaseButton";

export default {
	name: "RecipeInfo",
	components: {BaseButton, BaseCard },
	mixins: [UtilityMixin],
	props: {
		id: [String, Number],
	},
	data() {
		return {
			commentBinds: {
				button: { buttonText: "Adicionar comentário" },
				avaliacao: { type: "number", label: "Avaliação (0-5)" },
				texto: { label: "Comentário" },
				inButton: { buttonText: "Adicionar", color: "primary" },
			},
			commentForm: {
				avaliacao: 0,
				texto: ""
			},
			comments: [],
			showCommentCreate: false,
			recipe: {}
		}
	},
	methods: {
		async addComment() {
			try {
				let form = {...this.commentForm};
				form.receita = this.id;
				form.data_avaliacao = new Date().toLocaleDateString("pt-BR");
				form.avaliacao = this.clampValue(form.avaliacao/5.555,0,0.9);
				await axios.post("http://localhost:8081/comentario", form, this.axiosConfig());

				// delete form.
				form.data = form.data_avaliacao;
				this.comments.push(form);
				this.showCommentCreate = false;
			} catch (e) {
				console.log(e);
				alert("Houve um erro!\n"+e);
			}
		},
		clampValue(value, min, max) {
			if (value < min) return min;
			if (value > max) return max;
			return value;
		},
		formatDate(dateString) {
			return dateString.slice(0,10).replaceAll("-","/");
		},
		textIngredient(ingredient) {
			let ingredientStr = "";
			ingredientStr += this.decimalToFraction(parseFloat(ingredient.quantidade))+" ";
			ingredientStr += this.getAttributeIfExists(ingredient, "nome_unidade").toLowerCase()+" de "
			ingredientStr += this.getAttributeIfExists(ingredient, "nome").toLowerCase();
			return ingredientStr;
		}
	},
	async mounted() {
		let recipeResponse = await axios.get('http://localhost:8081/receita', {params: { id: this.id }});
		this.recipe = recipeResponse.data;
		document.title = "RecipeMe | "+recipeResponse.data.nome;
		try {
			let commentResponse = await axios.get('http://localhost:8081/comentario', this.axiosConfig({ receita: this.id }));
			this.comments = commentResponse.data;
		} catch (e) {
			console.log(e);
		}
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