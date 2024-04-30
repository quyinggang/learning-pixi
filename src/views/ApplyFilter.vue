<template>
  <div ref="boxElementRef" class="box"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watchEffect } from 'vue';
import { Application, Assets, Sprite, BlurFilter, NoiseFilter } from 'pixi.js';
import GMImage from '@/assets/gm.jpg';
import { GUI } from 'dat.gui';

const boxElementRef = ref(null);

const currentFilter = ref(null);

const createDatGUI = () => {
  const gui = new GUI();
  const config = {
    noiseFilter: () => {
      currentFilter.value = new NoiseFilter({ noise: 0.8 });
    },
    blurFilter: () => {
      currentFilter.value = new BlurFilter({ strength: 8 });
    },
  };
  gui.add(config, 'noiseFilter').name('NoiseFilter');
  gui.add(config, 'blurFilter').name('BlurFilter');
  return gui;
};

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

const createSprite = async () => {
  const texture = await Assets.load(GMImage);
  const sprite = new Sprite(texture);
  return sprite;
};

const initScene = async (rootInfo) => {
  const { element, boundingRect } = rootInfo;

  const app = await createApplication(boundingRect.width, boundingRect.height);

  element.appendChild(app.canvas);

  // screen表示渲染器视口大小的矩形区域
  const screen = app.screen;
  const center = {
    x: screen.width * 0.5,
    y: screen.height * 0.5,
  };

  const sprite = await createSprite();
  sprite.width = 320;
  sprite.height = 180;
  sprite.position.set(center.x - 160, center.y - 90);

  // 添加到场景中
  app.stage.addChild(sprite);

  watchEffect(() => {
    const filter = currentFilter.value;
    if (filter) {
      sprite.filters = filter;
    }
  });
};

onMounted(() => {
  const boxElement = boxElementRef.value;
  const boundingRect = boxElement.getBoundingClientRect();

  const gui = createDatGUI();
  initScene({ element: boxElement, boundingRect });

  gui.open();

  onBeforeUnmount(() => gui.destroy());
});
</script>
