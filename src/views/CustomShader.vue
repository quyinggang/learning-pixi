<template>
  <div ref="boxElementRef" class="box"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {
  Application,
  Assets,
  GlProgram,
  Mesh,
  MeshGeometry,
  Shader,
} from 'pixi.js';
import GMImage2 from '@/assets/gmlei.png';
import GMImage1 from '@/assets/gm.jpg';

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

const createShader = async () => {
  const vertexShader = `
      attribute vec2 aPosition;
      attribute vec2 aUV;
      varying vec2 vUV;

			uniform mat3 uProjectionMatrix;
			uniform mat3 uWorldTransformMatrix;
			uniform mat3 uTransformMatrix;

			void main() {
        vUV = aUV;
			  mat3 mvp = uProjectionMatrix * uWorldTransformMatrix * uTransformMatrix;
			  gl_Position = vec4((mvp * vec3(aPosition, 1.0)).xy, 0.0, 1.0);
			}

  `;
  const fragmentShader = `
      varying vec2 vUV;

      uniform sampler2D uTexture1;
      uniform sampler2D uTexture2;
      uniform float uTime;

      float random2D(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }

      // 二维值噪声
      float valueNoise (vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);

        // Four corners in 2D of a tile
        float a = random2D(i);
        float b = random2D(i + vec2(1.0, 0.0));
        float c = random2D(i + vec2(0.0, 1.0));
        float d = random2D(i + vec2(1.0, 1.0));

        vec2 u = f*f*(3.0-2.0*f);

        return mix(a, b, u.x) +
                (c - a)* u.y * (1.0 - u.x) +
                (d - b) * u.x * u.y;
      }


			void main() {
        vec4 texture1 = texture2D(uTexture1, vUV);
        vec4 texture2 = texture2D(uTexture2, vUV);
        float time = abs(sin(uTime));
        float progress = step(time, valueNoise(vUV * 10.0));
        gl_FragColor = mix(texture1, texture2, progress);
			}
  `;

  const texture = await Assets.load([GMImage1, GMImage2]);
  const textures = Object.values(texture);

  return new Shader({
    glProgram: new GlProgram({
      vertex: vertexShader,
      fragment: fragmentShader,
    }),
    // 定义shader uniforms
    resources: {
      uTexture1: textures[0].source,
      uTexture2: textures[1].source,
      timeUniforms: {
        uTime: { type: 'f32', value: 0.0 },
      },
    },
  });
};

const initScene = async (rootInfo) => {
  const { element, boundingRect } = rootInfo;

  const app = await createApplication(boundingRect.width, boundingRect.height);

  element.appendChild(app.canvas);

  const screen = app.screen;
  const center = {
    x: screen.width * 0.5,
    y: screen.height * 0.5,
  };

  const shader = await createShader();

  /*
    注意顶点定义的顺序，会影响法向量的方向, 在PIXI中会导致纹理绘制可能存在问题
    法向量的方向使用右手螺旋法则去判断，通常逆时针定义顶点方向
  */
  // const geometry = new Geometry({
  //   attributes: {
  //     aPosition: [-1, -1, 1, -1, 1, 1, -1, 1],
  //     aUV: [0, 0, 1, 0, 1, 1, 0, 1],
  //   },
  //   indexBuffer: [0, 1, 2, 2, 3, 0],
  // });

  // 使用MeshGeometry可以便捷地创建Geometry
  const geometry = new MeshGeometry({
    positions: [-1, -1, 1, -1, 1, 1, -1, 1],
  });
  const mesh = new Mesh({
    geometry,
    shader,
  });
  mesh.width = 320;
  mesh.height = 180;
  mesh.position.set(center.x, center.y);

  // 更新shader的time uniforms属性值
  let time = 0;
  const step = 1 / 60;
  const timeUniforms = mesh.shader.resources.timeUniforms;
  app.ticker.add(() => {
    time += step;
    timeUniforms.uniforms.uTime = time;
  });
  app.stage.addChild(mesh);
};

onMounted(() => {
  const boxElement = boxElementRef.value;
  const boundingRect = boxElement.getBoundingClientRect();

  initScene({ element: boxElement, boundingRect });
});
</script>
