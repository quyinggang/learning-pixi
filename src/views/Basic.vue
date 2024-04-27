<template>
  <div ref="boxElementRef" class="box"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Application, Graphics } from 'pixi.js';

const boxElementRef = ref(null);

const initStage = async (rootInfo) => {
  const { element, boundingRect } = rootInfo;

  const app = new Application();
  // 设置视口宽度、高度
  await app.init({
    width: boundingRect.width,
    height: boundingRect.height,
    // 开启抗锯齿
    antialias: true,
  });
  element.appendChild(app.canvas);

  // screen表示的挂载canvas dom节点的父节点的矩形区域
  const screen = app.screen;
  const center = {
    x: screen.width * 0.5,
    y: screen.height * 0.5,
  };

  // 创建圆并且填充红色
  const circleGraphics = new Graphics();
  circleGraphics.circle(center.x, center.y, 20);
  circleGraphics.fill('red');

  // 添加到场景中
  app.stage.addChild(circleGraphics);
};

onMounted(() => {
  const boxElement = boxElementRef.value;
  const boundingRect = boxElement.getBoundingClientRect();

  initStage({ element: boxElement, boundingRect });
});
</script>
