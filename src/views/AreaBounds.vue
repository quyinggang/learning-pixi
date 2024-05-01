<template>
  <div ref="boxElementRef" class="box"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {
  Application,
  Assets,
  BlurFilter,
  Graphics,
  Rectangle,
  Sprite,
  Text,
} from 'pixi.js';
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

const circleBounds = (center) => {
  const circle = new Graphics();
  circle.circle(0, 0, 20);
  circle.fill('green');

  circle.position.set(center.x, center.y);

  // 获取Circle的包围盒
  const bounds = circle.getBounds();
  const { minX, minY, maxX, maxY } = bounds;

  // 依据包围盒数据创建矩形
  const rectGraphics = new Graphics();
  rectGraphics.rect(0, 0, maxX - minX, maxY - minY);
  rectGraphics.stroke('red');
  rectGraphics.position.set(minX, minY);

  // 设置新的包围盒
  const boundsArea = new Rectangle(
    minX - 20,
    minY - 20,
    maxX - minX + 40,
    maxY - minY + 40
  );
  circle.boundsArea = boundsArea;

  return [rectGraphics, circle];
};

const circleHitArea = (center) => {
  const circle = new Graphics();
  circle.circle(0, 0, 20);
  circle.fill('green');

  circle.position.set(center.x, center.y);

  circle.eventMode = 'static';
  circle.cursor = 'pointer';
  circle.on('click', () => {
    alert('点击了圆形的hitArea');
  });

  // hitArea默认值是null
  // 可以认为点击区域是作为circle的子对象的
  // 即hitArea的坐标是以circle的作为为原点建立的
  circle.hitArea = new Rectangle(0, 0, 100, 100);

  const text = new Text({
    text: '修改了hitArea，请移动鼠标并点击查看',
    style: {
      fontSize: 12,
      fill: '#fff',
    },
  });
  text.position.set(circle.x - text.width * 0.5, circle.y - text.height - 30);

  return [text, circle];
};

const filterAreaSprite = async (center) => {
  const texture = await Assets.load(GMImage);
  const sprite = new Sprite(texture);
  sprite.width = 320;
  sprite.height = 180;

  sprite.position.set(center.x - sprite.width * 0.5, center.y);

  // filterArea默认值是null
  // filterArea表示滤镜的应用区域范围，这个范围大小是纹理自身的大小而不是sprite的大小
  sprite.filterArea = new Rectangle(0, 0, texture.width, texture.height * 0.5);

  // 应用滤镜
  sprite.filters = new BlurFilter();
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

  const graphicsList1 = circleHitArea({
    x: center.x,
    y: center.y * 0.5,
  });
  const graphicsList2 = circleBounds({
    x: center.x,
    y: center.y - 30,
  });

  filterAreaSprite(center).then((sprite) => {
    app.stage.addChild(sprite);
  });

  app.stage.addChild(...graphicsList1, ...graphicsList2);
};

onMounted(() => {
  const boxElement = boxElementRef.value;
  const boundingRect = boxElement.getBoundingClientRect();

  initScene({ element: boxElement, boundingRect });
});
</script>
