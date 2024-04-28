<template>
  <div ref="boxElementRef" class="box"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Application, Graphics } from 'pixi.js';

const boxElementRef = ref(null);

const initStage = async (rootInfo) => {
  const { element, boundingRect } = rootInfo;
  const dpr = window.devicePixelRatio;

  const app = new Application();
  // 设置视口宽度、高度
  await app.init({
    width: boundingRect.width,
    height: boundingRect.height,
    // 开启抗锯齿
    antialias: true,
    // 分辨率，用于解决多倍屏下的模糊问题
    resolution: dpr,
  });
  element.appendChild(app.canvas);

  // screen表示渲染器视口大小的矩形区域，需要注意dpr不作用其大小
  const screen = app.screen;
  const clientCenter = {
    x: (screen.width / dpr) * 0.5,
    y: (screen.height / dpr) * 0.5,
  };

  // 创建圆并且填充红色
  const circleGraphics = new Graphics();
  circleGraphics.circle(clientCenter.x, clientCenter.y, 20);
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
