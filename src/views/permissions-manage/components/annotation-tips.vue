<!--
 * @Author: your name
 * @Date: 2021-12-29 09:15:14
 * @LastEditTime: 2022-01-04 17:17:41
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \oms.fandow.come:\my_work\oauth.fandow.com\src\views\permissions-manage\components\annotation-tips.vue
-->
<template>
  <div class="tips">{{ props.content }}</div>
</template>


<script lang="ts" setup>
  import { defineProps } from 'vue'
  interface propsType {
  content: string,
}
const props = withDefaults(defineProps<propsType>(), {})
</script>

<style lang="scss" scoped>
  .tips {
    width: 100%;
    font-size: 14px;
    color: rgba(0,0,0,.85);
    // position: relative;
    background-color: #f0f6ff;
    border: 1px solid #b3cdff;
    border-radius: 2px;
    padding: 8px 15px;
    box-sizing: border-box;
    margin: 0;
    font-variant: tabular-nums;
    line-height: 1.5715;
    list-style: none;
    font-feature-settings: "tnum","tnum";
    word-wrap: break-word;
  }
</style>