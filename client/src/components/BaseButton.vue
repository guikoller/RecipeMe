<template>
	<v-btn v-bind="$props" v-on="$listeners">{{ buttonText }}</v-btn>
</template>

<script>
export default {
	name: "BaseButton",
	props: {
		buttonText: { type: String, default: "Botão" },
		color: { type: String, default: "accent" }
	}
}
</script>

<style scoped>

</style>