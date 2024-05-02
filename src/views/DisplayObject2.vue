<template>
  <div ref="boxElementRef" class="box"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {
  Application,
  BitmapText,
  Assets,
  AnimatedSprite,
  TilingSprite,
  MeshSimple,
  MeshPlane,
  Point,
  MeshRope,
} from 'pixi.js';
import HD1Png from '@/assets/hd/1.png';
import HD2Png from '@/assets/hd/2.png';
import HD3Png from '@/assets/hd/3.png';
import HD4Png from '@/assets/hd/4.png';
import HD5Png from '@/assets/hd/5.png';
import HD6Png from '@/assets/hd/6.png';
import HD7Png from '@/assets/hd/7.png';
import HD8Png from '@/assets/hd/8.png';
import HD9Png from '@/assets/hd/9.png';
import HD10Png from '@/assets/hd/10.png';
import HD11Png from '@/assets/hd/11.png';
import HD12Png from '@/assets/hd/12.png';
import HD13Png from '@/assets/hd/13.png';
import HD14Png from '@/assets/hd/14.png';
import HD15Png from '@/assets/hd/15.png';
import HD16Png from '@/assets/hd/16.png';
import HD17Png from '@/assets/hd/17.png';
import HD18Png from '@/assets/hd/18.png';
import HD19Png from '@/assets/hd/19.png';
import HD20Png from '@/assets/hd/20.png';
import BackgroundImage from '@/assets/background.png';

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

const createAnimatedSprite = async () => {
  const images = [
    HD1Png,
    HD2Png,
    HD3Png,
    HD4Png,
    HD5Png,
    HD6Png,
    HD7Png,
    HD8Png,
    HD9Png,
    HD10Png,
    HD11Png,
    HD12Png,
    HD13Png,
    HD14Png,
    HD15Png,
    HD16Png,
    HD17Png,
    HD18Png,
    HD19Png,
    HD20Png,
  ];
  const textures = await Assets.load(images);

  // 动画Sprite实现连续帧动画
  const sprite = new AnimatedSprite(Object.values(textures));

  sprite.width = 90;
  sprite.height = 90;
  return sprite;
};

const createTilingSprite = async () => {
  const texture = await Assets.load(BackgroundImage);

  // 平铺纹理实现无限效果，会在水平方向和垂直方向都进行平铺
  // TilingSprite中纹理缩放从而适配sprite大小，需要自己处理
  const sprite = new TilingSprite({
    texture,
    width: texture.width * 0.5,
    height: texture.height * 0.5,
    tileScale: { x: 0.5, y: 0.5 },
  });
  return sprite;
};

const createBitmapText = () => {
  const text = new BitmapText({
    text: 'Hello Pixi!\n BitmapText',
    style: {
      fontFamily: 'Arial',
      fontSize: 18,
      fill: 0xff1010,
      align: 'center',
    },
  });

  return text;
};

const createMeshSimple = () => {
  // MeshSimple创建简单的Mesh
  // 没法自定义颜色等其他顶点属性，但提供texture属性定义纹理
  const mesh = new MeshSimple({
    // 定义顶点坐标，每2位表示一个顶点
    vertices: [0, 30, 30, -30, -30, -30],
    // 定义索引，每3个顶点构成一个三角形面片
    indices: [0, 1, 2, 2, 0, 1],
  });

  return mesh;
};

const createMeshPlane = async () => {
  const texture = await Assets.load(HD1Png);

  // 快速创建平面，必须提供纹理
  const plane = new MeshPlane({
    texture,
    // verticesX和verticesY定义不同方向上的大小
    verticesX: 20,
  });
  plane.width = texture.width * 0.3;
  plane.height = texture.height * 0.3;
  return plane;
};

const createMeshRope = async () => {
  const texture = await Assets.load('https://pixijs.com/assets/snake.png');

  const ropeLength = 918 / 20;
  const points = [];

  for (let i = 0; i < 20; i++) {
    points.push(new Point(i * ropeLength, Math.sin(i * 0.5) * 30));
  }

  // 基于纹理和点去构建Mesh
  const rope = new MeshRope({
    texture,
    points,
  });
  rope.scale.set(0.5);

  return rope;
};

const initScene = async (rootInfo) => {
  const { element, boundingRect } = rootInfo;

  const app = await createApplication(boundingRect.width, boundingRect.height);

  element.appendChild(app.canvas);

  const center = {
    x: app.screen.width * 0.5,
    y: app.screen.height * 0.5,
  };

  createTilingSprite().then((sprite) => {
    app.ticker.add(() => {
      // tilePosition是平铺纹理的偏移量
      // 设置tilePosition的x从而实现背景无缝滚动效果
      sprite.tilePosition.x -= 0.5;
    });

    app.stage.addChild(sprite);
  });

  createAnimatedSprite().then((sprite) => {
    sprite.position.set(center.x, center.y * 0.5);
    app.stage.addChild(sprite);
    sprite.play();
  });

  const text = createBitmapText();
  text.position.set(center.x, center.y);
  app.stage.addChild(text);

  const mesh = createMeshSimple();
  mesh.position.set(center.x * 0.5, center.y + 30);
  app.stage.addChild(mesh);

  createMeshPlane().then((plane) => {
    plane.position.set(center.x * 0.5, center.y);
    app.stage.addChild(plane);
  });

  createMeshRope().then((rope) => {
    rope.position.set(center.x * 0.1, center.y * 1.5);
    app.stage.addChild(rope);
  });
};

onMounted(() => {
  const boxElement = boxElementRef.value;
  const boundingRect = boxElement.getBoundingClientRect();

  initScene({ element: boxElement, boundingRect });
});
</script>
