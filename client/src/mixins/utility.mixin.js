const UtilityMixin = {
    methods: {
        htmlLog(log) {
            console.log(log);
        },
        async routerPush(routeName, params = {}) {
            if (this.$router.resolve({name: routeName}).resolved.matched.length && this.$route.name !== routeName ) {
                await this.$router.push({name: routeName, params});
            }
            else if (this.$route.name !== "404") await this.$router.push({name: "404"});
        }
    }
};

export default UtilityMixin;
