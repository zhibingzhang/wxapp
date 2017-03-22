<template>
  <div id="app">
    <h1 v-html='title'></h1>
    <ul>
      <li v-for='item in items' v-bind:class="{active: item.isFinished}" v-on:click="toggle">
        {{item.label}}{{msg}}
      </li>
    </ul>
    <input type="text" v-model='newItem' v-on:keyup.enter='addNew()'>
    <HeaderA msgfromfather='hello is vue'></HeaderA>
  </div>
</template>
<script>
import Store from './store.js'
import HeaderA from './components/Header'
export default {
  name: 'app',
  data: function(){
    return {
      title: 'www.68chicken.com',
      items: Store.fetch(),
      activeClass: 'active',
      newItem: '',
      msg: ''
    }
  },
  watch:{
    items:{
      handler: function(item){
        Store.save(item)
      },
      deep: true
    }
  },
  components:{
    HeaderA
  },
  events:{
    'child-vue': function(msg){
      this.msg = msg
    }
  },
  methods:{
    toggle: function(item){
      console.log(item)
    },
    addNew: function(){
      this.items.push({
        label: this.newItem,
        isFinished: false
      })
      this.newItem = '';
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
