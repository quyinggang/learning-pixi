<template>
  <div ref="boxElementRef" class="box"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Application, Assets, Graphics, Sprite, Text } from 'pixi.js';
import GMImage from '@/assets/gm.jpg';

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

  const screen = app.screen;
  const center = {
    x: screen.width * 0.5,
    y: screen.height * 0.5,
  };
  const texture = await Assets.load(GMImage);
  const sprite = new Sprite(texture);
  sprite.width = screen.width;
  sprite.height = screen.height;

  const mask = new Graphics().circle(0, 0, 50).fill();
  sprite.mask = mask;

  mask.position.set(center.x, center.y);

  app.stage.eventMode = 'static';
  app.stage.on('mousemove', (event) => {
    const x = event.screenX;
    const y = event.screenY;

    mask.position.set(x, y);
  });

  const text = new Text({
    text: '移动鼠标查看效果',
    style: {
      fontSize: 16,
      fill: '#fff',
    },
  });
  text.position.set(center.x - text.width * 0.5, 30);

  // 添加到场景中
  app.stage.addChild(text, mask, sprite);
};

onMounted(() => {
  const boxElement = boxElementRef.value;
  const boundingRect = boxElement.getBoundingClientRect();

  initScene({ element: boxElement, boundingRect });
});
</script>
