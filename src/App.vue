<template>
   <div id="app">
     <h1 id="title"> SISTEMA DE VENDAS </h1>
    <div id="nav">
      <b-nav tabs fill>
        <b-nav-item to="/Vendas" disabled>Vendas</b-nav-item>
        <b-nav-item to="/Dividas" disabled>Dividas</b-nav-item>
        <b-nav-item to="/Clientes">Clientes</b-nav-item>
        <b-nav-item to="/Despesas" disabled>Despesas</b-nav-item>
    </b-nav>

    </div>
    <router-view/>

    </div>
</template>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#title {
  color: #13cc85;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif
}

#nav {
  padding: 30px;
}

.router-link-active {
    font-weight: bold;
    color:#13cc85;
}


</style>
