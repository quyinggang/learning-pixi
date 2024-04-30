<template>
  <div ref="boxElementRef" class="box"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Application, Assets, Sprite, Texture, CanvasSource } from 'pixi.js';
import GMImage from '@/assets/gm.jpg';
import GMVideo from '@/assets/gm.mp4';

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

const createImageTexture = async () => {
  const texture = await Assets.load(GMImage);
  const sprite = new Sprite(texture);
  sprite.width = 320;
  sprite.height = 180;
  return sprite;
};

const createVideoTexture = async () => {
  const texture = await Assets.load({
    src: GMVideo,
    // 视频相关配置项，默认视频静音
    data: { loop: true },
  });
  const sprite = new Sprite(texture);
  sprite.width = 320;
  sprite.height = 180;
  return sprite;
};

const createCanvasTexture = () => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = 320;
  canvas.height = 180;

  context.beginPath();
  context.rect(0, 0, 320, 180);
  context.strokeStyle = 'red';
  context.stroke();

  context.beginPath();
  context.rect(80, 45, 160, 90);
  context.fillStyle = 'green';
  context.fill();

  // 创建canvas source从而创建纹理
  const texture = Texture.from(
    new CanvasSource({
      resource: canvas,
    })
  );
  const sprite = new Sprite(texture);

  sprite.width = 320;
  sprite.height = 180;
  return sprite;
};

const initScene = async (rootInfo) => {
  const { element, boundingRect } = rootInfo;

  const app = await createApplication(boundingRect.width, boundingRect.height);

  element.appendChild(app.canvas);

  const screen = app.screen;
  const clientCenter = {
    x: screen.width * 0.5,
    y: screen.height * 0.5,
  };

  createImageTexture().then((sprite) => {
    sprite.position.set(clientCenter.x - 160, clientCenter.y * 0.5 - 90);
    app.stage.addChild(sprite);
  });

  createVideoTexture().then((sprite) => {
    sprite.position.set(clientCenter.x - 160, clientCenter.y - 90);
    app.stage.addChild(sprite);
  });

  const canvasSprite = createCanvasTexture();
  canvasSprite.position.set(clientCenter.x - 160, clientCenter.y + 100);
  app.stage.addChild(canvasSprite);
};

onMounted(() => {
  const boxElement = boxElementRef.value;
  const boundingRect = boxElement.getBoundingClientRect();

  initScene({ element: boxElement, boundingRect });
});
</script>
