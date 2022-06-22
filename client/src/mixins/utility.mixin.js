import store from "@/plugins/vuex";

const UtilityMixin = {
    methods: {
        axiosConfig(params = {}) {
            let bearerToken = "Bearer "+store.state.token;
            return {
                headers: { Authorization: bearerToken },
                params
            }
        },
        decimalToFraction(decimal) {
            let returnStr = "";
            if (decimal && typeof decimal === "number") {
                if (Math.floor(decimal) === decimal) {
                    returnStr += decimal;
                }
                else {
                    if (decimal > 1) {
                        let floor = Math.floor(decimal);
                        decimal = decimal - floor;
                        returnStr = floor.toString()+" ";
                    }
                    let gcd = function(a, b) {
                        if (b < 0.0000001) return a;                // Since there is a limited precision we need to limit the value.
                        return gcd(b, Math.floor(a % b));           // Discard any fractions due to limitations in precision.
                    };
                    let len = decimal.toString().length - 2;
                    let denominator = Math.pow(10, len);
                    let numerator = decimal * denominator;
                    let divisor = gcd(numerator, denominator);
                    numerator /= divisor;
                    denominator /= divisor;
                    returnStr += (Math.floor(numerator) + '/' + Math.floor(denominator));
                }
            }
            return returnStr;
        },
        getAttributeIfExists(item, attribute, pre='', post='', empty='') {
            if (item && item[attribute]) return pre+item[attribute]+post;
            else return empty;
        },
        htmlLog(log) {
            console.log(log);
        },
        async routerPush(routeName, params = {}) {
            let routeExists = this.$router.resolve({name: routeName}).resolved.matched.length;
            if (routeExists && this.$route.name !== routeName ) {
                await this.$router.push({name: routeName, params});
            }
            else if (!routeExists && this.$route.name !== "404") await this.$router.push({name: "404"});
        },
        textRendimento(rendimento) {
            if( typeof rendimento !== "number")
                rendimento = parseFloat(rendimento);
            let rendimentoStr = rendimento + " pessoa";
            if (rendimento > 1) rendimentoStr += "s";
            return rendimentoStr;
        }
    }
};

export default UtilityMixin;
