<template>
	<v-card	class="mx-auto mb-12 card1">
		<slot name="top"/>
		<v-card-title>
			<slot name="title"/>
		</v-card-title>
		<slot/>
		<v-card-actions v-if="actions">
			<slot name="actions"/>
		</v-card-actions>
	</v-card>
</template>

<script>
export default {
	name: "BaseCard",
	props: {
		actions: { type: Boolean, default: false }
	}
}
</script>

<style scoped>
	.card1 {
		border-radius: 0 !important;
	}
</style>