<template>
  <div ref="boxElementRef" class="box"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {
  Application,
  Graphics,
  GraphicsPath,
  GraphicsContext,
  Sprite,
  Assets,
  Text,
} from 'pixi.js';
import gmImage from '@/assets/gm.jpg';

const boxElementRef = ref(null);

const createCircle = () => {
  // 创建圆并且填充红色
  const graphics = new Graphics();
  graphics.circle(30, 30, 10);
  graphics.fill('green');

  return graphics;
};

const createEllipse = () => {
  // 创建椭圆环并设置描边样式
  const graphics = new Graphics();
  graphics.ellipse(80, 30, 10, 20);
  graphics.stroke({ color: 'red', width: 3 });

  return graphics;
};

const createLine = () => {
  // 创建多个线段
  const graphics = new Graphics();
  graphics.moveTo(140, 18);
  graphics.lineTo(200, 18);
  graphics.stroke({ color: 'green', width: 1 });

  graphics.moveTo(140, 28);
  graphics.lineTo(200, 28);
  graphics.stroke({ color: 'red', width: 2 });

  graphics.moveTo(140, 38);
  graphics.lineTo(200, 38);
  graphics.stroke({ color: 'yellow', width: 3 });

  return graphics;
};

const createSVG = () => {
  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <path id="lineAB" d="M 100 350 l 150 -300" stroke="red"
      stroke-width="3" fill="none" />
      <path id="lineBC" d="M 250 50 l 150 300" stroke="red"
      stroke-width="3" fill="none" />
      <path d="M 175 200 l 150 0" stroke="green" stroke-width="3"
      fill="none" />
      <path d="M 100 350 q 150 -300 300 0" stroke="blue"
      stroke-width="5" fill="none" />
      <!-- Mark relevant points -->
      <g stroke="black" stroke-width="3" fill="red">
        <circle id="pointA" cx="100" cy="350" r="3" />
        <circle id="pointB" cx="250" cy="50" r="3" />
        <circle id="pointC" cx="400" cy="350" r="3" />
      </g>
    </svg>
  `;
  const graphics = new Graphics();

  // 需要注意的是PIXI并不能完全正确地解析SVG内容，例如SVG中文本就不支持
  graphics.svg(svgContent);

  graphics.position.set(220, 0);
  graphics.scale.set(0.15);

  return graphics;
};

const createPath = () => {
  // 组合图形
  const path = new GraphicsPath()
    .rect(-50, -50, 100, 100)
    .circle(80, 80, 50)
    .circle(80, -80, 50)
    .circle(-80, 80, 50)
    .circle(-80, -80, 50);

  const graphics = new Graphics();

  graphics.path(path);
  graphics.stroke({ color: 'green', width: 3 });

  graphics.position.set(60, 100);
  graphics.scale.set(0.2);

  return graphics;
};

const createRectByContext = () => {
  const context = new GraphicsContext();

  context.rect(150, 90, 30, 30);
  context.stroke('red');

  return new Graphics(context);
};

const createSprite = async () => {
  const texture = await Assets.load(gmImage);

  const sprite = new Sprite(texture);

  sprite.width = 80;
  sprite.height = 45;
  sprite.position.set(30, 150);
  return sprite;
};

const createText = () => {
  const text = new Text({
    text: 'Hello Pixi!',
    style: {
      fontFamily: 'Arial',
      fontSize: 24,
      fill: 'green',
      align: 'center',
    },
  });

  text.position.set(140, 150);
  return text;
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

const initScene = async (rootInfo) => {
  const { element, boundingRect } = rootInfo;

  const app = await createApplication(boundingRect.width, boundingRect.height);

  element.appendChild(app.canvas);

  const graphicsList = [
    createCircle(),
    createEllipse(),
    createLine(),
    createSVG(),
    createPath(),
    createRectByContext(),
    createText(),
  ];

  const asyncList = [createSprite()];

  // 添加到场景中
  app.stage.addChild(...graphicsList);

  Promise.all(asyncList).then((list) => {
    app.stage.addChild(...list);
  });
};

onMounted(() => {
  const boxElement = boxElementRef.value;
  const boundingRect = boxElement.getBoundingClientRect();

  initScene({ element: boxElement, boundingRect });
});
</script>
