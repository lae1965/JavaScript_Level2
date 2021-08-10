Vue.component('error', {
    data() {
        return {
            textErr: '',
        }
    },
    methods: {
        setError(error) {
            this.textErr = error;
        },
    },
    template: `
        <div v-if="textErr !== ''">
            <p style="background-color: red; text-align: center;">
                <button @click="setError('')">&times;</button>
                {{ textErr }}
            </p>
        </div>`
});