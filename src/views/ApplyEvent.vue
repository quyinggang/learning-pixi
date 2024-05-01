<template>
  <div ref="boxElementRef" class="box"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Application, Container, Graphics, Text, Rectangle } from 'pixi.js';

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

  let id = 0;
  const stage = app.stage;
  stage.eventMode = 'static';
  stage.cursor = 'pointer';

  /*
    当stage中没有任何内容时，hitArea为null
    hitArea表示响应事件的区域大小
    hitArea区域大小的范围是按照PIXI坐标系下定义的
  */
  stage.hitArea = new Rectangle(0, 0, boundingRect.width, boundingRect.height);
  stage.on('click', (event) => {
    id += 1;

    const position = {
      x: event.screenX,
      y: event.screenY,
    };
    const container = new Container();
    const circle = new Graphics().circle(0, 0, 20).fill('green');

    const text = new Text({
      text: id,
      style: {
        fontFamily: 'Arial',
        fontSize: 20,
        fill: '#fff',
      },
    });
    text.position.set(-text.width * 0.5, -text.height * 0.5);

    container.addChild(circle, text);
    container.position.set(position.x, position.y);

    stage.addChild(container);
  });

  const text = new Text({
    text: '点击屏幕创建圆',
    style: {
      fontSize: 20,
      fill: '#fff',
    },
  });
  text.position.set(app.screen.width * 0.5 - text.width * 0.5, 20);
  text.eventMode = 'none';
  stage.addChild(text);
};

onMounted(() => {
  const boxElement = boxElementRef.value;
  const boundingRect = boxElement.getBoundingClientRect();

  initScene({ element: boxElement, boundingRect });
});
</script>
