'use client';

import { useEffect, useRef } from 'react';

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function syncSize() {
      const w = canvas!.clientWidth || 1280;
      const h = canvas!.clientHeight || 720;
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w;
        canvas!.height = h;
      }
    }

    const observer = new ResizeObserver(syncSize);
    observer.observe(canvas);
    syncSize();

    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) return;

    const vertexSource = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

    const fragmentSource = `precision highp float;
varying vec2 v_texCoord;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

void main() {
  vec2 uv = v_texCoord;
  vec2 p = (v_texCoord - 0.5) * 2.0;
  p.x *= u_resolution.x / u_resolution.y;

  vec3 color = mix(vec3(0.0, 0.06, 0.2), vec3(0.0, 0.31, 0.97), uv.y);
  color = mix(color, vec3(0.37, 0.74, 0.97), pow(uv.y, 2.0));

  float dotSize = 0.005;
  float spacing = 0.04;
  vec2 grid = fract(uv / spacing);
  vec2 id = floor(uv / spacing);

  float dist = length(p);
  float sphere = smoothstep(0.8, 0.78, dist);

  float h = hash(id);
  float glow = (sin(u_time * 0.5 + h * 6.28) * 0.5 + 0.5) * sphere;

  float d = length(grid - 0.5);
  float dots = smoothstep(dotSize + 0.001, dotSize, d) * glow;

  color += dots * vec3(1.0, 1.0, 1.0) * 0.6;

  vec2 m = u_mouse / u_resolution;
  float mouseGlow = smoothstep(0.2, 0.0, length(uv - m));
  color += mouseGlow * vec3(0.37, 0.74, 0.97) * 0.2;

  gl_FragColor = vec4(color, 1.0);
}`;

    function compile(type: number, source: string) {
      const shader = gl!.createShader(type)!;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      return shader;
    }

    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vertexSource));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragmentSource));
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const positionLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(program, 'u_time');
    const resLoc = gl.getUniformLocation(program, 'u_resolution');
    const mouseLoc = gl.getUniformLocation(program, 'u_mouse');

    const mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    function onMouseMove(event: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      if (rect.width && rect.height) {
        mouse.x = ((event.clientX - rect.left) / rect.width) * canvas!.width;
        mouse.y = (1 - (event.clientY - rect.top) / rect.height) * canvas!.height;
      }
    }
    window.addEventListener('mousemove', onMouseMove);

    let frame = 0;
    function render(t: number) {
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
      if (timeLoc) gl!.uniform1f(timeLoc, t * 0.001);
      if (resLoc) gl!.uniform2f(resLoc, canvas!.width, canvas!.height);
      if (mouseLoc) gl!.uniform2f(mouseLoc, mouse.x, mouse.y);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      frame = requestAnimationFrame(render);
    }
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
