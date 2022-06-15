<template>
	<div>
		<v-data-table multi-sort v-bind="$props">
			<template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
				<slot :name="name" v-bind="data"/>
			</template>
		</v-data-table>
	</div>
</template>

<script>
export default {
	name: "BaseTable",
	props: {
		headers: { type: Array, default: () => [] },
		items: { type: Array, default: () => [] },
		itemsPerPage: { type: Number, default: 50 },
		noDataText: { type: String, default: "ERROR" },
		noResultsText: { type: String }
	}
}
</script>

<style scoped>

</style>