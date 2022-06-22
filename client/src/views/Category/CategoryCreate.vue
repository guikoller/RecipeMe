<template>
	<div>
		<base-card class="base-card">
			<template #title>
				<div class="d-flex title-div">
					<span class="text-h4 base-title">Nova categoria</span>
				</div>
			</template>
			<v-divider class="mx-2"/>
			<base-form :inputs="categoryInputs" :form="form" @formChange="form = $event" @sendButton="sendForm"
								origin-route-name="CategoryList"/>
		</base-card>
	</div>
</template>

<script>
import BaseCard from "@/components/BaseCard";
import BaseForm from "@/components/BaseForm";
import UtilityMixin from "@/mixins/utility.mixin";
import axios from "axios";

export default {
	name: "CategoryCreate",
	components: { BaseCard, BaseForm },
	mixins: [UtilityMixin],
	data() {
		return {
			form: {},
			categoryInputs: {
				nome: { label: "Nome" },
			}
		}
	},
	methods: {
		async sendForm() {
			// this.sanitizeForm();
			try {
				await axios.post('http://localhost:8081/categoria', this.form, this.axiosConfig());
				this.routerPush("CategoryList");
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