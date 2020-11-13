<template>
  <view class="row">
    <text>* {{item.text}}</text>
    <text :on-press="onRemoveTodo" class="listItemDelete">  X </text> <!-- myös :on-press käy -->
  </view>
</template>

<script>
export default {
  props: {
    item: { type: Object },
    removeTodo: { type: Function}
  },
  methods: {
      onRemoveTodo: function () {
          this.$emit('removeTodoro',this.item.id)
      },
  }

};
</script>

<style>
  .row {
    flex-direction: row;
    margin: 5  
  }
  .listItemDelete {
    margin-left: 10;
    color: red;
    font-weight: bold;
  }
</style>