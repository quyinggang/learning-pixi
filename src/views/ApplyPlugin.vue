<template>
  <div ref="boxElementRef" class="box"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {
  Application,
  Assets,
  Container,
  Graphics,
  HTMLText,
  Sprite,
  Text,
} from 'pixi.js';
import { ButtonContainer, FancyButton, List } from '@pixi/ui';
import { Sound } from '@pixi/sound';
import { PixelateFilter } from 'pixi-filters';
import FearSound from '@/assets/fearless.mp3';
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

const createButton = () => {
  // pixi ui
  const container = new Container();
  const roundRect = new Graphics().roundRect(0, 0, 100, 50, 15).fill('green');
  const text = new Text({
    text: 'Click Me',
    style: {
      fontSize: 12,
      fill: '#fff',
    },
  });
  // 设置文字原点在中心
  text.anchor.set(0.5);
  // 文字在容器中心
  text.position.set(roundRect.width * 0.5, roundRect.height * 0.5);
  container.addChild(roundRect, text);

  const button = new ButtonContainer();
  button.position.set(10, 10);
  button.onPress.connect(() => {
    alert('PIXI UI：点击了按钮');
  });
  button.addChild(container);

  return button;
};

const createList = (center) => {
  const container = new Container();

  const viewGraphics = new Graphics()
    .roundRect(0, 0, 271, 200, 20)
    .fill('#f5e3a9');

  const items = [];
  const size = {
    width: 70,
    height: 70,
    radius: 20,
  };
  for (let i = 0; i < 6; i++) {
    const button = new FancyButton({
      defaultView: new Graphics()
        .roundRect(0, 0, size.width, size.height, size.radius)
        .fill(0xa5e24d),
      hoverView: new Graphics()
        .roundRect(0, 0, size.width, size.height, size.radius)
        .fill(0xfec230),
      pressedView: new Graphics()
        .roundRect(0, 0, size.width, size.height, size.radius)
        .fill(0xfe6048),
      text: new Text({
        text: i + 1,
        style: {
          fontSize: 28,
          fill: '#000',
        },
      }),
    });
    button.onPress.connect(() => alert(`PIXI List: ${i + 1}`));

    items.push(button);
  }

  const list = new List({
    children: [...items],
    elementsMargin: 10,
    horPadding: 20,
    vertPadding: 20,
    type: ['horizontal', 'vertical'],
  });

  container.addChild(viewGraphics, list);
  container.position.set(center.x - container.width * 0.5, 10);
  return container;
};

const createSoundButton = async (center) => {
  const container = new Container();
  const roundRect = new Graphics().roundRect(0, 0, 100, 50, 15).fill('green');
  const htmlText = new HTMLText({
    text: '点击播放音乐',
    style: {
      fontSize: 12,
      fill: '#fff',
    },
  });
  // 设置文字原点在中心
  htmlText.anchor.set(0.5);
  // 文字在容器中心
  htmlText.position.set(roundRect.width * 0.5, roundRect.height * 0.5);
  container.addChild(roundRect, htmlText);

  const button = new ButtonContainer();
  button.position.set(center.x * 1.5, 10);
  button.addChild(container);

  const sound = await Sound.from({
    url: FearSound,
    autoPlay: false,
  });
  button.onPress.connect(() => {
    let text = '';
    if (sound.isPlaying) {
      sound.stop();
      text = '点击播放音乐';
    } else {
      sound.play();
      text = '点击停止音乐';
    }
    htmlText.text = text;
  });

  return button;
};

const createSpriteFilter = async (center) => {
  const texture = await Assets.load(GMImage);
  const sprite = new Sprite(texture);

  sprite.width = 320;
  sprite.height = 180;
  sprite.position.set(10, center.y);

  sprite.filters = new PixelateFilter();

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

  const button = createButton(center);
  app.stage.addChild(button);

  const list = createList(center);
  app.stage.addChild(list);

  const soundButton = await createSoundButton(center);
  app.stage.addChild(soundButton);

  const sprite = await createSpriteFilter(center);
  app.stage.addChild(sprite);
};

onMounted(() => {
  const boxElement = boxElementRef.value;
  const boundingRect = boxElement.getBoundingClientRect();

  initScene({ element: boxElement, boundingRect });
});
</script>
