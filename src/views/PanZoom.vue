<template>
  <div ref="boxElementRef" class="box"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Application, Container, Graphics } from 'pixi.js';
import { getNumberInRange, getRandomColor } from '@/utils';

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

const createCircles = (screen) => {
  const { x, y, width, height } = screen;
  const circles = [];
  for (let index = 0; index < 20; index++) {
    const posX = getNumberInRange(x, x + width);
    const posY = getNumberInRange(y, y + height);
    const color = getRandomColor();
    const circle = new Graphics().circle(0, 0, 20).fill(color);
    circle.position.set(posX, posY);
    circles.push(circle);
  }

  return circles;
};

const applyPan = (container) => {
  let isDragging = false;
  let oldPosition = { x: 0, y: 0 };

  const handleMouseMove = (event) => {
    if (!isDragging) return;
    const x = container.position.x;
    const y = container.position.y;
    const newPosition = {
      x: event.pageX,
      y: event.pageY,
    };
    const next = {
      x: newPosition.x - oldPosition.x + x,
      y: newPosition.y - oldPosition.y + y,
    };
    container.position.set(next.x, next.y);
    oldPosition = newPosition;
  };
  const handleMouseUp = () => {
    isDragging = false;
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  container.parent.addEventListener('mousedown', (event) => {
    oldPosition = {
      x: event.pageX,
      y: event.pageY,
    };
    isDragging = true;
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
  });
};
const applyZoom = ({ element, container, boundingRect }) => {
  const scaleBy = 1.02;
  const min = 0.3;
  const max = 8;
  const handleWheel = (event) => {
    event.preventDefault();
    const { pageX, pageY, deltaY } = event;
    const oldScale = container.scale.x || 1.0;
    const translation = {
      x: container.position.x,
      y: container.position.y,
    };
    const nextScale = deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
    if (nextScale > max || nextScale < min) {
      return;
    }
    const x = pageX - boundingRect.left;
    const y = pageY - boundingRect.top;
    const offsetX = x - translation.x;
    const offsetY = y - translation.y;
    const offsetSize = {
      x: offsetX / oldScale,
      y: offsetY / oldScale,
    };
    const newTranslation = {
      x: -offsetSize.x * nextScale + x,
      y: -offsetSize.y * nextScale + y,
    };
    container.updateTransform({
      x: newTranslation.x,
      y: newTranslation.y,
      scaleX: nextScale,
      scaleY: nextScale,
    });
  };
  element.addEventListener('wheel', handleWheel, { passive: false });
};

const initScene = async (rootInfo) => {
  const { element, boundingRect } = rootInfo;

  const app = await createApplication(boundingRect.width, boundingRect.height);
  app.canvas.className = 'canvas';
  element.appendChild(app.canvas);

  const screen = app.screen;
  const circles = createCircles(screen);
  const container = new Container();
  container.addChild(...circles);
  app.stage.addChild(container);

  app.stage.eventMode = 'static';
  app.stage.hitArea = screen;
  app.stage.interactiveChildren = false;
  applyZoom({ element, boundingRect, container });
  applyPan(container);
};

onMounted(() => {
  const boxElement = boxElementRef.value;
  const boundingRect = boxElement.getBoundingClientRect();

  initScene({ element: boxElement, boundingRect });
});
</script>

<style>
.canvas {
  touch-action: none;
}
</style>
