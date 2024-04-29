<template>
  <div ref="boxElementRef" class="box"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Application, Graphics } from 'pixi.js';

const boxElementRef = ref(null);

const createApplication = async (width, height) => {
  const app = new Application();
  // 设置视口宽度、高度
  await app.init({
    width,
    height,
    // 开启抗锯齿
    antialias: true,
    // 分辨率，用于解决多倍屏下的模糊问题
    resolution: window.devicePixelRatio || 1,
    // 设置canvas的style width/height为视口大小
    autoDensity: true,
  });
  return app;
};

const initScene = async (rootInfo) => {
  const { element, boundingRect } = rootInfo;

  const app = await createApplication(boundingRect.width, boundingRect.height);

  element.appendChild(app.canvas);

  // screen表示渲染器视口大小的矩形区域
  const screen = app.screen;
  const clientCenter = {
    x: screen.width * 0.5,
    y: screen.height * 0.5,
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

  initScene({ element: boxElement, boundingRect });
});
</script>
