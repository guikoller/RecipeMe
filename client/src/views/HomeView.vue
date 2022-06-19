<template>
	<div>
		<base-card>
			<template #top>
				<v-img v-bind="imageBind"/>
			</template>
			<template #title>
				<div class="text-h5 main-title">
					RecipeMe, seu painel de receitas e gerenciamento de alimentos 👍
				</div>
			</template>
			<div class="main-text px-15 py-5"> {{loremIpsum.text}} </div>
		</base-card>
	</div>
</template>

<script>
import BaseCard from "@/components/BaseCard";

export default {
	name: "HomeView",
	components: { BaseCard },
	data() {
		return {
			loremIpsum: {
				text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras est mauris, molestie et nisl ac, sagittis volutpat nulla. Ut nunc felis, cursus quis nisi at, iaculis vulputate sapien. Praesent condimentum imperdiet sagittis. Quisque fringilla volutpat sem, ut molestie turpis tincidunt quis. Pellentesque cursus quis lectus vehicula molestie. Morbi auctor dapibus condimentum. Donec sit amet nisl enim. Nunc ut commodo augue, non venenatis leo. Ut blandit quis ex sed gravida. Sed sodales orci a odio lobortis iaculis. Aliquam erat volutpat. Sed tempor odio ac tincidunt iaculis.\n" +
						"\n" +
						"Etiam mollis mi sed fringilla cursus. Etiam tempor leo ligula, et rutrum leo lacinia at. Sed elementum a arcu eget aliquam. Cras viverra scelerisque nunc sit amet sollicitudin. Vivamus sed massa sed lacus condimentum pellentesque. Phasellus pulvinar rutrum felis cursus sagittis. Aenean ac laoreet nibh. Nam aliquam feugiat felis, non dignissim urna feugiat tristique. Phasellus scelerisque lorem libero, sit amet consequat velit finibus at. Mauris quis justo varius, accumsan tellus vel, dapibus nisl. Aliquam nec turpis aliquet, tincidunt magna rutrum, interdum sapien. Duis iaculis, nulla non pharetra dictum, turpis ante rhoncus sapien, et vehicula turpis dui ac elit. Nunc efficitur eros sed dolor aliquet dictum. Fusce dictum auctor elit ac interdum. Fusce sed tortor commodo, interdum elit in, sagittis risus.\n" +
						"\n" +
						"Pellentesque varius vestibulum nulla et consectetur. Pellentesque efficitur sem at velit consectetur convallis. Nam quis magna vitae dolor semper sagittis. Proin eu nulla ultrices, finibus erat quis, tincidunt nunc. In eleifend odio quis enim fringilla viverra in ut magna. Donec luctus sagittis tortor, in tincidunt orci porttitor in. Fusce porttitor nisl rhoncus sapien tempus fermentum. Phasellus rutrum nunc sed dolor auctor varius. Mauris accumsan magna nec eleifend viverra. Vestibulum id mauris sed ante dignissim iaculis et id ante. Integer nec aliquet magna. Fusce non odio tortor. Phasellus ultrices vitae neque non malesuada. Sed a ultrices tortor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n" +
						"\n" +
						"Nullam cursus, mi ac finibus molestie, nunc nisl pulvinar mi, in varius quam nibh eget risus. Phasellus condimentum, nulla et volutpat commodo, nisl elit pretium urna, at mollis velit metus at ligula. Phasellus eget laoreet turpis. Curabitur non arcu bibendum, rutrum felis non, finibus dui. Curabitur a lacus vitae risus finibus dignissim nec sed est. Fusce in nisi nec eros rhoncus faucibus. Donec velit neque, suscipit ut aliquet sit amet, sagittis ac nisl. Cras non felis et arcu malesuada convallis a quis erat. Suspendisse semper ornare cursus. Nulla et vehicula dolor. Proin placerat quis tortor non placerat. Nulla euismod eros non aliquet sollicitudin. Pellentesque eget ante dolor. Curabitur at eleifend diam, non vestibulum massa. Maecenas erat elit, condimentum nec volutpat id, tempor quis ligula.\n" +
						"\n" +
						"Sed vel iaculis augue. Sed scelerisque augue id velit dapibus vehicula. Fusce sollicitudin, nisi tempus porttitor tristique, enim tortor aliquam elit, vitae condimentum nisl lectus ullamcorper justo. Sed non vehicula orci. Vivamus lectus libero, lobortis ac quam vitae, dapibus vestibulum ligula. Etiam nisi nisl, malesuada vitae dolor at, sodales varius eros. In in condimentum felis, vitae placerat sapien. In accumsan lectus at dapibus dictum. Proin tempus lectus id velit convallis volutpat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas accumsan dictum lorem id pretium. Nam orci turpis, condimentum id eros eget, dapibus bibendum eros. Etiam mattis sed felis in imperdiet. Vivamus vestibulum sem magna."
			},
			imageBind: {
				height: "250",
				src: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2022%2F03%2F20%2F212721-Indian-Chicken-Curry-Murgh-Kari-mfs_004.jpg"
			}
		}
	}
}
</script>

<style scoped>
	.main-title {
		font-weight: bold !important;
		text-align: center;
		width:100%;
	}
	.main-text {
		text-align: center;
		white-space: pre-wrap;
	}
</style>