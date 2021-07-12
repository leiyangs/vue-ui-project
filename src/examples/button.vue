<template>
  <div>
    按钮：
    <y-button class="aa bb cc" type="primary" icon="search">查询</y-button>
    <y-button type="primary">主要的</y-button>
    <y-button type="primary" :loading="true" icon="search">主要的</y-button>
    <y-button type="warning">警告</y-button>
    <y-button type="danger">危险的</y-button>
    <y-button type="success">成功的</y-button>
    <y-button type="info">信息</y-button>
    <y-button type="primary" icon="share"></y-button>
    <y-button>默认按钮</y-button>
    <y-button size="medium" :disabled="true">中等按钮</y-button>
    <y-button size="small">小型按钮</y-button>
    <y-button size="mini">超小按钮</y-button>
  </div>
</template>
