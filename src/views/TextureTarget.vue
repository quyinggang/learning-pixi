<template>
  <div ref="boxElementRef" class="box"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {
  Application,
  Container,
  Graphics,
  RenderTexture,
  Sprite,
} from 'pixi.js';

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
  const center = {
    x: screen.width * 0.5,
    y: screen.height * 0.5,
  };

  const rect = new Graphics().rect(0, 0, 160, 90).fill('green');
  rect.position.set(center.x, center.y);
  app.stage.addChild(rect);

  const viewContainer = new Container();
  const size = { width: screen.width * 0.25, height: screen.height * 0.25 };
  const borderRect = new Graphics()
    .rect(0, 0, size.width, size.height)
    .stroke('red');
  const renderTexture = RenderTexture.create({
    width: screen.width,
    height: screen.height,
    antialias: true,
  });
  const sprite = new Sprite(renderTexture);
  sprite.width = size.width;
  sprite.height = size.height;
  viewContainer.addChild(borderRect, sprite);

  viewContainer.renderable = false;
  viewContainer.position.set(center.x + size.width, 0);
  app.stage.addChild(viewContainer);

  app.ticker.add(() => {
    rect.rotation += 0.01;

    /*
      RenderTexture表示可渲染纹理，实际上和Texture并没有什么区别，只是提供便捷创建纹理的方式
      渲染器支持自定义设置renderTarget，renderTarget表示渲染目标
      - 渲染目标是指场景渲染的目的地，渲染目标可以是屏幕，也可以是其他地方
      - RenderTarget表示一个渲染目标对象
      - 在PIXI中渲染目标可以是RenderTarget、RenderTexture
    */
    viewContainer.renderable = false;
    app.renderer.render({
      container: app.stage,
      target: renderTexture,
    });
    viewContainer.renderable = true;
  });
};

onMounted(() => {
  const boxElement = boxElementRef.value;
  const boundingRect = boxElement.getBoundingClientRect();

  initScene({ element: boxElement, boundingRect });
});
</script>
