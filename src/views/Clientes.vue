<template>
    <div id="Vendas">
        <b-table striped hover :items="items"></b-table>
        {{info}}

        <div id="areacadastro">

                <h3> Cadastrar novo </h3>

            <b-form inline @submit="onSubmit" @reset="onReset" v-if="show">

            <b-form-group id="input-group-1"
            label="Nome:"
            label-for="input-1">
            <b-form-input
                id="input-1"
                v-model="form.nome"
                required
                placeholder="Digite nome"
                ></b-form-input>
            </b-form-group>

             <b-form-group id="input-group-2"
            label="Telefone:"
            label-for="input-2"
            >
            <b-form-input
                id="input-2"
                v-model="form.telefone"
                type="tel"
                placeholder="(38)99102-1955"
                ></b-form-input>
            </b-form-group>

            <b-form-group
                id="input-group-3"
                label="Email:"
                label-for="input-3"
            >
                <b-form-input
                id="input-3"
                v-model="form.email"
                type="email"
                placeholder="Digite email"
                ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Cadastrar</b-button>
            <b-button type="reset" variant="danger">Limpar</b-button>
            </b-form>

        </div>

    </div>
</template>

<script>
const axios = require('axios');

export default {
   data() {
       return {
          info: null,
          items: [],

          form: {
          nome: '',
          email: '',
          telefone: '',
        },
        show: true,
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
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        axios.post('http://localhost:3333/clientes', {
            nome: this.form.nome,
            telefone: this.form.telefone,
            email: this.form.email
        })
        .then(() => {

            axios.get('http://localhost:3333/clientes')
            .then((response) => {
                this.items = response.data;
            })
            .catch(() => {
            this.info = 'Não foi possível consultar dados';
            })

        })
        .catch(() => {
            this.info = 'Não foi possível consultar dados';
        })
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.nome = ''
        this.telefone = ''
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .b-table {
        margin: auto;
        max-width: 60em;
    }
    #areacadastro {
        max-width: 60em;
        margin: auto;
        margin-top: 4em;
        text-align: left;
    }
    .form-group {
        margin-left: -1em;
        padding: 1em;
    }
    .btn {
        margin: 0.4em;
    }
</style>
