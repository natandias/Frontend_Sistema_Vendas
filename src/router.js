import Vue from 'vue';
import Router from 'vue-router';
import Vendas from './views/Vendas.vue';
import Dividas from './views/Dividas.vue';
import Clientes from './views/Clientes.vue';
import Despesas from './views/Despesas.vue';


Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/vendas',
      name: 'Vendas',
      component: Vendas,
    },
    {
      path: '/dividas',
      name: 'Dividas',
      component: Dividas,
    },
    {
      path: '/clientes',
      name: 'Clientes',
      component: Clientes,
    },
    {
      path: '/despesas',
      name: 'Despesas',
      component: Despesas,
    },

  ],
});