<template>
  <div ref="boxElementRef" class="box"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Application, Container, Graphics } from 'pixi.js';

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

  const container = new Container();
  container.position.set(center.x, center.y);

  const rect = new Graphics().rect(0, 0, 80, 50).stroke('green');
  // 位置属性position设置图形位置，其表示的是Translation
  rect.position.set(0, 0);
  // 设置变换基点
  rect.pivot.set(0, 0);
  // 使用scale缩放图形
  rect.scale.set(2);
  // 使用angle和rotation设置旋转
  rect.rotation = 0;
  // 使用skew倾斜图形
  rect.skew.set(0, 0);

  // rect的参考副本
  const rectCopy = rect.clone();
  rectCopy.position.set(rect.x, rect.y);
  rectCopy.scale.set(rect.scale.x, rect.scale.y);
  // 中心位置点
  const circle = new Graphics().circle(0, 0, 4).fill('red');
  circle.position.set(center.x, center.y);

  // width和height属性，它受scale的影响
  // 上面80 * 50, scale是2，width = 162，height = 102
  // console.log(rect.width, rect.height)

  // 获取图形的Transform矩阵
  // 矩阵根据position、scale、skew、rotate、pivot而生成
  // console.log(rect.localTransform);

  /*
    设置变换的基点是rect中心
    - 原先position定义的位置为(0,0)，rect左上角就是屏幕中心点
    - 设置pivot为react中心位置之后，此时rect的中心点就是屏幕中心点

    pivot设置变换的基点，对于Pivot需要注意的是：
    - 虽然类似于transform-origin的概念，虽然都是定义变换基点，但是pivot是不同的逻辑
    - pivot实际上会更改图形的绘制位置
    - pivot改变的是图形的Transform矩阵而不是position属性的值
    - pivot的坐标值和transform-origin对应值的含义是相同的，是根据图形元素自身去设置的

    此时获取localTransform就会发现Translation值改变了
  */
  const rectCenter = {
    x: (rect.width / rect.scale.x) * 0.5,
    y: (rect.height / rect.scale.y) * 0.5,
  };
  // rect.pivot.set(rectCenter.x, rectCenter.y);

  /**
    想要实现rect绘制在center并且绕rect中心旋转，在CSS中使用Transform-origin center就可以实现了
    在PIXI中如果按照定义pivot位置为rect中心是无法实现的，那么需要如何实现呢？需要同时修改position和pivot来实现
    - 旋转点是rect自身坐标系的坐标，而position是rect父容器container坐标系下的坐标
    - 使用rect.toGlobal(rectCenter)实现rect中心点坐标在container下坐标系下的值，从而实现坐标转换
    - pivot设置为rect中心点坐标

    从这个实现效果来看，可以更加清晰的理解pivot的具体应用逻辑：
    - pivot和position紧密关联的
    - 变换是依据pivot为基点实现变换的，但前提是position需要依据这个基点坐标重新设置
   */
  const globalPos = rect.toGlobal(rectCenter);
  rect.position.set(globalPos.x, globalPos.y);
  rect.pivot.set(rectCenter.x, rectCenter.y);

  /*
   在PIXI中position实际上是父容器下的坐标
   - 父容器为null时，这时父容器就是canvas视口，此时position就是视口坐标系下的偏移位置
   - 父容器为可渲染对象，则是以父容器左上角位置为原点的坐标系下偏移位置

   在PIXI中提供了相关API实现父子坐标系下坐标转换：
   - toLocal：转换成自身坐标系下本地坐标
   - toGlobal：转换成父坐标下坐标

   PIXI中坐标系与canvas坐标系相同，都是以左上角为(0,0)点的
  */
  // 父容器下的(10, 0)在rect坐标系中对应的位置
  // const local = rect.toLocal({ x: 10, y: 0})
  // rect坐标系的中心位置在父容器坐标系中对应的坐标位置
  // const globalPosition = rect.toGlobal(rectCenter)

  app.ticker.add(() => {
    rect.rotation += 0.01;
  });

  container.addChild(rectCopy);
  container.addChild(rect);
  app.stage.addChild(container);
  app.stage.addChild(circle);
};

onMounted(() => {
  const boxElement = boxElementRef.value;
  const boundingRect = boxElement.getBoundingClientRect();

  initScene({ element: boxElement, boundingRect });
});
</script>
