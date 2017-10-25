<template lang="html">
  <div class="container">
    <div class="columns">
      <div class="column">
        <div class="notification is-info">
          <hello></hello>
        </div>
      </div>
      <div class="column">
        
        <button v-if="!capturing">Start capturing</button>
        <button v-if="capturing">Stop capturing</button>

        <div v-if="hasResults">
          <button>Clear cache</button>
          <button>Export URLs</button>
          <button>Export data JSON</button>
        </div>
<br>
Results: 20<br>
-<br>
-<br>
-<br>
-<br>
        <p class="notification is-success">
          <label class="label">Filter by URL</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-success" type="text" v-model="url">
            <span class="icon is-small">
              <i class="fa fa-check"></i>
            </span>
            <span class="help is-success">{{url}}</span>
          </p>
        </p>
      </div>
      <div class="column">
        <p class="notification is-warning">Search in data</p>
        <p class="control has-icon has-icon-right">
            <input class="input is-success" type="text" v-model="dataStr">
            <span class="icon is-small">
              <i class="fa fa-check"></i>
            </span>
            <span class="help is-success">{{dataStr}}</span>
          </p>
      </div>
    </div>
  </div>
</template>

<script>
import Hello from './hello.vue';
export default {
  data(){
    return {
      url:'*',
      dataStr:'',
      capturing: false,
      hasResults: false
    }
  },
  methods: {

  },
  components:{
    hello:Hello
  }
}
</script>

<style lang="css">
</style>
