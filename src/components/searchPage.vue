<template>
  <div>
    <div class="searchEnding">
      <table class="dxy-table dxy-hover">
        <thead>
        <tr>
          <th>剧名</th>
          <th>类型</th>
          <th>更新时间</th>
          <th>看看</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for='item in searchInf'>
          <td>{{item.moveName}}</td>
          <td>{{item.moveType}}</td>
          <td>{{item.moveTime}}</td>
          <td>
              <button type="button" class="dxy-btn dxy-btn-primary" @click='download' :link="item.link" :linkName='item.moveName'>去看看</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

import gotoSearchPage from '../mixins/gotoSearchPage'

export default {
  name: 'searchEnding',
  props: ['searchInf'],
  mixins : [gotoSearchPage],
  created (){
    console.log(this.searchInf)
  },
  data() {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

p {
  font-size: 12px;
  line-height: 40px;
}

</style>
