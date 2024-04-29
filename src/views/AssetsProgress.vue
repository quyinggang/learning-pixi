<template>
  <div ref="boxElementRef" class="box"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Application, Assets, HTMLText } from 'pixi.js';

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

// 一次性加载所有资源
const loadAssets = async (app) => {
  const stage = app.stage;
  const screen = app.screen;
  const htmlText = new HTMLText({
    text: '开始加载资源...',
    style: {
      fontFamily: 'Arial',
      fontSize: 20,
      fill: 0xff1010,
      align: 'center',
    },
  });
  htmlText.position.set(screen.width * 0.5, screen.height * 0.5);
  stage.addChild(htmlText);

  const urls = [
    'https://pic3.zhimg.com/v2-5523ed93593ee4c7fd97b972d0af92d3_r.jpg',
    'https://pic3.zhimg.com/v2-6a1dc51b6b3efc26b221568894165605_r.jpg',
    'https://pic1.zhimg.com/v2-ed385e72baf0a9c1d06c633982672402_r.jpg',
    'https://pic3.zhimg.com/v2-230b33bf409772ea9a62be47d25cf816_r.jpg',
    'https://pic1.zhimg.com/v2-9db7bf3b825f2db103a534ca59c75481_r.jpg',
    'https://pic4.zhimg.com/v2-5bde4b779cbcb801ab41d79509231ec4_r.jpg',
  ];
  // 多个资源如果其中存在加载失败的，进度都不会是100%
  const onProgress = (progress) => {
    const value = Math.trunc(progress * 100);
    // 使用HTMLText动态更新文本内容
    htmlText.text = `${value}%`;
  };

  // 在PIXI中只有Assets.load、loadBundle方法存在onProgress回调
  // loadBundle用于加载多个捆绑资源包，推荐使用
  const textures = await Assets.load(urls, onProgress);

  htmlText.text = '资源加载完毕';
  return textures;
};

const initScene = async (rootInfo) => {
  const { element, boundingRect } = rootInfo;

  const app = await createApplication(boundingRect.width, boundingRect.height);
  element.appendChild(app.canvas);

  await loadAssets(app);
};

onMounted(() => {
  const boxElement = boxElementRef.value;
  const boundingRect = boxElement.getBoundingClientRect();

  initScene({ element: boxElement, boundingRect });
});
</script>
