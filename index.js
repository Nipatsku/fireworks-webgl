const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl2");
const loggingEnabled = true;
const loadImg = (name) => {
  const img = new Image();
  img.src =
    "data:image/png;base64,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";
  //   img.crossOrigin = "";
  //   img.src = `sprites/${name}.png`;
  return img;
};
const rand = (min, max) => min + Math.random() * (max - min);
const pi2 = 2 * Math.PI;
const bounds = canvas.getBoundingClientRect();
const width = Math.floor(bounds.width);
const height = Math.floor(bounds.height);
const screenScale = Math.sqrt(width ** 2 + height ** 2) / 992;
console.log(screenScale);
canvas.width = width;
canvas.height = height;

// TODO: Dynamic max count?
const particleMaxCount = 100_000;
// TODO: Test performance!
const renderMode = gl.STREAM_DRAW;
const updateSteps = 10;
const textures = {
  //   cloud: loadImg("cloud"),
  cloud: loadImg("cloud"),
};
const textureKeys = Object.keys(textures);

// #region Shader source code
const locGeometry = 0;
const locTexCoord = 1;
const locPos = 2;
const locColor = 3;
const locRotation = 4;
const locScale = 5;
const attributesPerParticle = 8;
const coordinateSystem = "pixels";
const coordsPixelsCentered = "pixels-centered";
const coordsPixels = "pixels";
const vertexShaderSrc = `#version 300 es
  precision mediump float;
  precision mediump int;
  layout(location=${locGeometry}) in vec2 aPosGeometry;
  layout(location=${locTexCoord}) in vec2 aTexCoord;
  layout(location=${locPos}) in vec2 aPos;
  layout(location=${locColor}) in vec4 aColor;
  layout(location=${locRotation}) in float aRotationRad;
  layout(location=${locScale}) in float aScale;
  uniform vec2 uViewportSizePx;
  uniform sampler2D uTexture;
  out vec4 vColor;
  out vec2 vTexCoord;
  void main(void) {
    ivec2 size = textureSize(uTexture, 0);
    float rotX = cos(aRotationRad);
    float rotY = sin(aRotationRad);
    vec2 rotGeometry = vec2(
      aPosGeometry.x * rotY + aPosGeometry.y * rotX,
      aPosGeometry.y * rotY - aPosGeometry.x * rotX
    );
    ${
      coordinateSystem === coordsPixels
        ? "gl_Position = vec4(vec2(-1.0, 1.0) + (vec2(aPos.x, -aPos.y) + rotGeometry * vec2(size) * aScale) * 2.0 / uViewportSizePx, 0.0, 1.0);"
        : coordinateSystem === coordsPixelsCentered
        ? "gl_Position = vec4((vec2(aPos.x, -aPos.y) + rotGeometry * vec2(size) * aScale) * 2.0 / uViewportSizePx, 0.0, 1.0);"
        : (() => {
            console.error(
              `Unidentified 'coordinateSystem': ${coordinateSystem}`
            );
            return "";
          })()
    }
    vColor = aColor;
    vTexCoord = aTexCoord;
  }`;

const fragmentShaderSrc = `#version 300 es
  precision mediump float;
  precision mediump int;
  in vec4 vColor;
  in vec2 vTexCoord;
  uniform sampler2D uTexture;
  out vec4 fragColor;
  void main(void) {
    vec4 texSample = texture(uTexture, vTexCoord);
    fragColor = vec4(vColor.rgb, vColor.a * texSample.a);
  }`;

// #endregion

// #region Init shaders and other static render resources
gl.enable(gl.BLEND);
gl.blendFuncSeparate(
  gl.SRC_ALPHA,
  gl.ONE_MINUS_SRC_ALPHA,
  gl.ONE,
  gl.ONE_MINUS_SRC_ALPHA
);
gl.viewport(0, 0, width, height);
gl.clearColor(0, 0, 0, 0);
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderSrc);
gl.compileShader(vertexShader);
if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
  const infoLog = gl.getShaderInfoLog(vertexShader);
  console.error(`Vertex shader compilation error\n${infoLog}`);
}
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderSrc);
gl.compileShader(fragmentShader);
if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
  const infoLog = gl.getShaderInfoLog(fragmentShader);
  console.error(`Fragment shader compilation error\n${infoLog}`);
}
const shader = gl.createProgram();
gl.attachShader(shader, vertexShader);
gl.attachShader(shader, fragmentShader);
gl.linkProgram(shader);
if (!gl.getProgramParameter(shader, gl.LINK_STATUS)) {
  console.error(`Shader program link error\n${gl.getProgramInfoLog(shader)}`);
}
gl.deleteShader(vertexShader);
gl.deleteShader(fragmentShader);
gl.useProgram(shader);
const locViewportSize = gl.getUniformLocation(shader, "uViewportSizePx");
const locTexture = gl.getUniformLocation(shader, "uTexture");
const vertexBufferRectangle = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferRectangle);
gl.bufferData(
  gl.ARRAY_BUFFER,
  new Float32Array([
    -0.5, -0.5, 0.0, 0.0, -0.5, 0.5, 0.0, 1.0, 0.5, 0.5, 1.0, 1.0, 0.5, -0.5,
    1.0, 0.0,
  ]),
  gl.STATIC_DRAW
);
gl.enableVertexAttribArray(locGeometry);
gl.vertexAttribDivisor(locGeometry, 0);
gl.vertexAttribPointer(
  locGeometry,
  2,
  gl.FLOAT,
  false,
  4 * Float32Array.BYTES_PER_ELEMENT,
  0
);
gl.enableVertexAttribArray(locTexCoord);
gl.vertexAttribDivisor(locTexCoord, 0);
gl.vertexAttribPointer(
  locTexCoord,
  2,
  gl.FLOAT,
  false,
  4 * Float32Array.BYTES_PER_ELEMENT,
  2 * Float32Array.BYTES_PER_ELEMENT
);
const particlesDataBuffer = gl.createBuffer();
let particlesDataBufferSize = particleMaxCount * attributesPerParticle;
let particlesData = new Float32Array(particlesDataBufferSize);
gl.bindBuffer(gl.ARRAY_BUFFER, particlesDataBuffer);
gl.bufferData(gl.ARRAY_BUFFER, particlesData, renderMode);
gl.enableVertexAttribArray(locPos);
gl.vertexAttribDivisor(locPos, 1);
gl.vertexAttribPointer(
  locPos,
  2,
  gl.FLOAT,
  false,
  attributesPerParticle * Float32Array.BYTES_PER_ELEMENT,
  0 * Float32Array.BYTES_PER_ELEMENT
);
gl.enableVertexAttribArray(locColor);
gl.vertexAttribDivisor(locColor, 1);
gl.vertexAttribPointer(
  locColor,
  4,
  gl.FLOAT,
  false,
  attributesPerParticle * Float32Array.BYTES_PER_ELEMENT,
  2 * Float32Array.BYTES_PER_ELEMENT
);
gl.enableVertexAttribArray(locRotation);
gl.vertexAttribDivisor(locRotation, 1);
gl.vertexAttribPointer(
  locRotation,
  1,
  gl.FLOAT,
  false,
  attributesPerParticle * Float32Array.BYTES_PER_ELEMENT,
  6 * Float32Array.BYTES_PER_ELEMENT
);
gl.enableVertexAttribArray(locScale);
gl.vertexAttribDivisor(locScale, 1);
gl.vertexAttribPointer(
  locScale,
  1,
  gl.FLOAT,
  false,
  attributesPerParticle * Float32Array.BYTES_PER_ELEMENT,
  7 * Float32Array.BYTES_PER_ELEMENT
);

// #endregion

// #region Load texture sources
const loadedTextures = [];
if (textures) {
  const keys = Object.keys(textures);
  keys.forEach((key) => {
    const value = textures[key];
    if (!value) {
      return;
    }
    if (loggingEnabled) console.time(`load texture ${key}`);
    try {
      const loadTextureData = (textureData) => {
        const index = loadedTextures.length;
        const texture = gl.createTexture();
        gl.activeTexture(gl.TEXTURE0 + index);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
        const level = 0;
        const internalFormat = gl.RGBA;
        const srcFormat = gl.RGBA;
        const srcType = gl.UNSIGNED_BYTE;
        gl.texImage2D(
          gl.TEXTURE_2D,
          level,
          internalFormat,
          srcFormat,
          srcType,
          textureData
        );
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        loadedTextures.push({ texture, index, name: key });
        if (loggingEnabled) console.timeEnd(`load texture ${key}`);

        // // Select active texture for rendering.
        // let desiredTextureIndex = undefined;
        // particleSystem.effects.forEach((effect) => {
        //   effect.textures.forEach((texture) => {
        //     const i = loadedTextures.findIndex((item) => item.name === texture);
        //     if (i >= 0) {
        //       desiredTextureIndex = i;
        //     }
        //   });
        // });
        // if (desiredTextureIndex >= 0) {
        //   gl.uniform1i(locTexture, desiredTextureIndex);
        // }
      };

      if (value instanceof HTMLImageElement) {
        if (value.complete) {
          loadTextureData(value);
        } else {
          const loadImage = () => {
            loadTextureData(value);
            value.removeEventListener("load", loadImage);
          };
          value.addEventListener("load", loadImage);
        }
      } else {
        // Unidentified texture data. Just attempt to load it and hope it works :)
        loadTextureData(value);
      }
    } catch (e) {
      console.error(`Couldn't load texture ${key}\n\t${e.message}`);
    }
  });
}
// #endregion

// #region Particles & generators logic

let gravity = 1;
/**
 * @type {Array<{
 *  x: number,
 *  y: number,
 *  vx: number,
 *  vy: number,
 *  weight: number,
 *  lifetime: number,
 *  r: number,
 *  g: number,
 *  b: number,
 *  a: number,
 *  va: number,
 *  scale: number
 * }>}
 */
let particlesByTexture = textureKeys.map((_) => []);
/**
 * @type {Array<{
 *  x: number,
 *  y: number,
 *  vx: number,
 *  vy: number,
 *  weight: number,
 *  rate: number,
 *  modulus: number,
 *  pAngleMinRad: number,
 *  pAngleMaxRad: number,
 *  pVelocityMin: number,
 *  pVelocityMax: number,
 *  pLifetimeMin: number,
 *  pLifetimeMax: number,
 *  pScaleMin: number,
 *  pScaleMax: number,
 *  pWeight: number,
 *  pTextureIndexes: number[],
 *  colors: { r: number, g: number, b: number, a: number }[],
 *  update: () => unknown,
 * }>}
 */
let generators = [];

let tPrevParticleUpdate = undefined;
const updateParticles = () => {
  const tNow = performance.now();
  const deltaa = Math.min(
    tPrevParticleUpdate ? tNow - tPrevParticleUpdate : 0,
    1000
  );
  for (let i3 = 0; i3 < updateSteps; i3 += 1) {
    const delta = deltaa / updateSteps;
    const gravityDelta = delta * gravity;
    for (let i = 0; i < generators.length; i += 1) {
      const generator = generators[i];
      if (generator.modulus === undefined) generator.modulus = 0;
      generator.vy += gravityDelta * generator.weight;
      generator.x += screenScale * generator.vx * delta;
      generator.y += screenScale * generator.vy * delta;
      generator.modulus += generator.rate * delta;
      if (generator.modulus > 1) {
        const count = Math.floor(generator.modulus);
        for (let i2 = 0; i2 < count; i2 += 1) {
          // spawn particle
          const pAngle = rand(generator.pAngleMinRad, generator.pAngleMaxRad);
          const pVelocity = rand(
            generator.pVelocityMin,
            generator.pVelocityMax
          );
          const pLifetime = rand(
            generator.pLifetimeMin,
            generator.pLifetimeMax
          );
          const pTextureIndex =
            generator.pTextureIndexes[
              Math.round(rand(0, generator.pTextureIndexes.length - 1))
            ];
          const color =
            generator.colors[Math.round(rand(0, generator.colors.length - 1))];
          particlesByTexture[pTextureIndex].push({
            x: generator.x,
            y: generator.y,
            vx: screenScale * Math.cos(pAngle) * pVelocity,
            vy: screenScale * Math.sin(pAngle) * pVelocity,
            va: color.a / (pLifetime + delta),
            lifetime: pLifetime + delta,
            weight: generator.pWeight,
            r: color.r,
            g: color.g,
            b: color.b,
            a: color.a,
            rotRad: rand(0, pi2),
            scale: screenScale * rand(generator.pScaleMin, generator.pScaleMax),
          });
        }
        generator.modulus -= count;
      }
      if (generator.update) generator.update();
    }
    for (const particles of particlesByTexture) {
      for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i];
        particle.lifetime -= delta;
        if (particle.lifetime < 0) {
          particles.splice(i, 1);
          i -= 1;
          continue;
        }
        particle.vy += gravityDelta * particle.weight;
        particle.x += particle.vx * delta;
        particle.y += particle.vy * delta;
        particle.a -= particle.va * delta;
      }
    }
  }
  tPrevParticleUpdate = tNow;
};

// #endregion

// #region Rendering logic

const renderParticles = () => {
  // Update particle render data
  const particleCountsByTexture = textureKeys.map((_) => 0);
  let iData = 0;
  for (let i = 0; i < textureKeys.length; i += 1) {
    const particles = particlesByTexture[i];
    const particleCount = particles.length;
    for (let i2 = 0; i2 < particleCount; i2 += 1) {
      const particle = particles[i2];
      particlesData[iData + 0] = particle.x;
      particlesData[iData + 1] = particle.y;
      particlesData[iData + 2] = particle.r;
      particlesData[iData + 3] = particle.g;
      particlesData[iData + 4] = particle.b;
      particlesData[iData + 5] = particle.a;
      particlesData[iData + 6] = particle.rotRad;
      particlesData[iData + 7] = particle.scale;
      iData += attributesPerParticle;
    }
    particleCountsByTexture[i] = particleCount;
  }
  // render each texture in own render call
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  for (let i = 0; i < textureKeys.length; i += 1) {
    const particleCount = particleCountsByTexture[i];
    gl.uniform2f(locViewportSize, width, height);
    gl.bufferData(gl.ARRAY_BUFFER, particlesData, renderMode);
    gl.drawArraysInstanced(gl.TRIANGLE_FAN, 0, 4, particleCount);
  }
};

// #endregion

const frame = () => {
  updateParticles();
  //   console.log(
  //     generators.length,
  //     "generators",
  //     particlesByTexture.reduce((prev, cur) => prev + cur.length, 0),
  //     "particles"
  //   );
  renderParticles();
  //   setTimeout(frame, 1000);
  requestAnimationFrame(frame);
};
frame();

gravity = 0.0001;

const Firework = (params) => {
  const { x } = params;
  const angRad = 1.5 * Math.PI + rand(-1, 1) * 0.1 * Math.PI;
  const velocity = rand(0.7, 1);
  const blowAt = rand(0, height / 2);
  const generator = {
    x,
    y: height,
    vx: Math.cos(angRad) * velocity,
    vy: Math.sin(angRad) * velocity,
    weight: rand(5, 10),
    rate: 1,
    pAngleMinRad: 0,
    pAngleMaxRad: pi2,
    pVelocityMin: 0.0,
    pVelocityMax: 0.02,
    pLifetimeMin: 300,
    pLifetimeMax: 1500,
    pScaleMin: 0.01,
    pScaleMax: 0.02,
    pWeight: 0.3,
    pTextureIndexes: [0],
    colors: [{ r: 1, g: 1, b: 0, a: 1 }],
    update: () => {
      if (generator.y < blowAt || generator.vy > 0) {
        generators.splice(generators.indexOf(generator), 1);
        const colorOptions = [
          { a: 1, r: 0.94, g: 0.03, b: 0.054 }, // red
          { a: 1, r: 0.91, g: 0.56, b: 0.02 }, // orange
          { a: 1, r: 0.89, g: 0.91, b: 0.08 }, // yellow
          { a: 1, r: 0.06, g: 0.9, b: 0.05 }, // green
          { a: 1, r: 68 / 256, g: 166 / 256, b: 209 / 256 }, // blue
          { a: 1, r: 182 / 256, g: 108 / 256, b: 221 / 256 }, // purple
          { a: 1, r: 1, g: 1, b: 1 }, // white
        ];
        const color =
          colorOptions[Math.round(rand(0, colorOptions.length - 1))];
        const magnitude = rand(0.5, 1);
        const threadCount = Math.round(magnitude * 30);
        const velocity2 = rand(0.3, 0.5);
        for (let i = 0; i < threadCount; i += 1) {
          const scale = rand(0.03, 0.085);
          const angRad2 = rand(0, pi2);
          const generator2 = {
            x: generator.x,
            y: generator.y,
            vx: Math.cos(angRad2) * velocity2,
            vy: Math.sin(angRad2) * velocity2,
            weight: 5,
            rate: 0.2,
            pAngleMinRad: 0,
            pAngleMaxRad: pi2,
            pVelocityMin: 0,
            pVelocityMax: 0,
            pLifetimeMin: magnitude * 1000,
            pLifetimeMax: magnitude * 1000,
            pScaleMin: scale,
            pScaleMax: scale,
            pWeight: 0.1,
            pTextureIndexes: [0],
            colors: [color],
          };
          generators.push(generator2);
          setTimeout(() => {
            generators.splice(generators.indexOf(generator2), 1);
          }, rand(magnitude * 250, magnitude * 500));
        }
      }
    },
  };
  generators.push(generator);
};

const addFirework = () => {
  Firework({ x: rand(0, width) });
  setTimeout(addFirework, rand(300, 1200));
};
addFirework();
