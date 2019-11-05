<template>
  <div id="Vendas">
    <b-table striped hover :items="items"></b-table>

    {{info}}
    <div id="areaInputs">
      <div id="areaCadastrar">
        <h3>Cadastrar novo</h3>

        <b-form inline @submit="cadastrarCliente" @reset="onReset" v-if="show">
          <b-form-group id="input-group-1" label="Nome:" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="form.nome"
              required
              placeholder="Digite nome completo"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Telefone:" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="form.telefone"
              type="tel"
              placeholder="(38)99102-1955"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-3" label="Email:" label-for="input-3">
            <b-form-input id="input-3" v-model="form.email" type="email" placeholder="Digite email"></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-4" label="Endereço:" label-for="input-4">
            <b-form-input id="input-4" v-model="form.endereco" placeholder="Digite endereço"></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="success">Cadastrar</b-button>
          <b-button type="reset" variant="warning">Limpar</b-button>
        </b-form>
        <b-alert v-model="msgSucessoCadastro" variant="success" dismissible>Cadastrado com sucesso!</b-alert>
      </div>
      <!-- Fim Area de Cadastro -->

      <div id="areaAtualizar">
        <h3>Atualizar cliente</h3>

        <form @submit="atualizarCliente">
          <b-form-select
            v-model="selecionadoAtualizar"
            :options="pessoasCadastradas"
            id="inputRemover"
            required
          ></b-form-select>

          <b-button type="submit" variant="primary">Atualizar</b-button>
          <b-button type="reset" variant="warning">Limpar</b-button>
          <br />
        </form>
        Selecionado: {{selecionadoAtualizar}}
      </div>
      <!-- Fim Area de Atualizar -->

      <div id="areaRemover">
        <h3>Remover cliente</h3>
        <form @submit="removerCliente">
          <b-form-select
            v-model="selecionadoRemover"
            :options="pessoasCadastradas"
            id="inputRemover"
            required
          ></b-form-select>

          <b-button type="submit" variant="danger">Remover</b-button>
          <br />
          Selecionado: {{selecionadoRemover}}
        </form>
        <b-alert v-model="msgSucessoRemocao" variant="success" dismissible>Removido com sucesso!</b-alert>
      </div>
      <!-- Fim Area de Remover -->
    </div>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  data() {
    return {
      info: null,
      checkCadastro: "",
      items: [],

      form: {
        nome: "",
        email: "",
        telefone: "",
        endereco: ""
      },
      show: true,
      msgSucessoCadastro: false,
      msgSucessoRemocao: false,

      selecionadoAtualizar: null,

      pessoasCadastradas: [],
      selecionadoRemover: null
    };
  },
  //   Mounted é executado logo ao carregar o site
  mounted() {
    // Retorna todos os clientes do banco de dados logo ao iniciar o site
    axios
      .get(`http://${process.env.VUE_APP_IP}:3333/clientes`)
      .then(response => {
        let data = response.data;
        data = data.map(elem => {
          elem["data_cadastro"] = elem["data_cadastro"]
            .replace("T", " ")
            .replace(".000Z", "");
          return elem;
        });

        this.items = data;
        this.pessoasCadastradas = data
          .filter(pessoa => pessoa.id != 1)
          .map(pessoa => pessoa.nome);
      })
      .catch(() => {
        this.info = "Não foi possível consultar dados";
      });
  },
  methods: {
    // Realiza nova requisição ao banco de dados quando é realizada uma operação
    carregarDados(evt) {
      // Evita que a página recarregue quando ocorre um submit
      evt.preventDefault();
      axios
        .get(`http://${process.env.VUE_APP_IP}:3333/clientes`)
        .then(response => {
          //  Converte a data vinda do banco para formato legível
          let data = response.data;
          data = data.map(elem => {
            elem["data_cadastro"] = elem["data_cadastro"]
              .replace("T", " ")
              .replace(".000Z", "");
            return elem;
          });

          // Carrega os dados da requisição para a tabela exibida na tela:
          this.items = data;
          // Retorna somente o nome das pessoas cadastradas:
          this.pessoasCadastradas = data
            .filter(pessoa => pessoa.id != 1)
            .map(pessoa => pessoa.nome);
        })
        .catch(() => {
          this.info = "Não foi possível consultar dados";
        });
    },

    cadastrarCliente(evt) {
      evt.preventDefault();
      //  Verifica se a pessoa ainda não está cadastrada
      if (this.pessoasCadastradas.includes(this.form.nome)) {
        this.checkCadastro = "Essa pessoa já está cadastrada";
        return 0;
      }
      //  Realiza requisição para cadastro
      axios
        .post(`http://${process.env.VUE_APP_IP}:3333/clientes`, {
          nome: this.form.nome,
          telefone: this.form.telefone,
          email: this.form.email,
          endereco: this.form.endereco
        })
        .then(() => {
          this.carregarDados(evt); // Atualiza o cliente com dados do banco
          this.msgSucessoCadastro = true; // Exibe mensagem de sucesso ao cadastrar
        })
        .catch(() => {
          this.info = "Não foi possível consultar dados";
        });
      this.form.email = "";
      this.form.nome = "";
      this.form.telefone = "";
    },

    atualizarCliente() {},

    removerCliente(evt) {
      evt.preventDefault();
      // Realiza requisição informando na URL o cliente a ser deletado
      axios
        .post(
          `http://${process.env.VUE_APP_IP}:3333/clientes/delete/${this.selecionadoRemover}`
        )
        .then(() => {
          this.carregarDados(evt);
          this.msgSucessoRemocao = true;
        })
        .catch(() => {
          this.info = "Não foi possível consultar dados";
        });
    },
    // Limpa os campos de input
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.nome = "";
      this.form.telefone = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#Vendas {
  padding: 2em;
}
.b-table {
  margin: auto;
  max-width: 70em;
}
#areaInputs {
  max-width: 70em;
  margin: auto;
  margin-top: 4em;
  text-align: left;
}
#areaCadastrar {
  margin-bottom: 3em;
}
#areaAtualizar {
  margin-bottom: 3em;
}
.form-group {
  margin-left: -1em;
  padding: 1em;
}
.btn {
  margin: 0.4em;
}
#inputRemover {
  max-width: 10em;
}
</style>
