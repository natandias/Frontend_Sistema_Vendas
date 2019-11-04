<template>
    <div id="Dividas">
        <b-table striped hover :items="items"></b-table>
        {{info}}
    </div>
</template>

<script>
const axios = require('axios');

export default {
   data() {
       return {
           info: null,
           items: [],
         };
   },
   mounted() {
        axios.get('http://localhost:3333/clientes')
        .then((response) => {
            this.items = response.data;
        })
        .catch(() => {
            this.info = 'Não foi possível consultar dados';
        })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .b-table {
        margin: auto;
        max-width: 60em;
    }
</style>
