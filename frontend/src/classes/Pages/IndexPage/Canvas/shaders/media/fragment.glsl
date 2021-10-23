precision highp float;

uniform vec2 uImageSizes;
uniform vec2 uPlaneSizes;
uniform sampler2D tMap;
uniform float uOpacity;
uniform float uZoom;
uniform float uZoomProgress;

varying vec2 vUv;

void main() {
  vec2 ratio = vec2(
    min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
    min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
  );

  float zoomStateX = (1. - uZoom) * 0.5 + uZoom * vUv.x * ratio.x;
  float zoomStateY = (1. - uZoom) * 0.25 + uZoom * vUv.y * ratio.y;

  float normalStateX = vUv.x * ratio.x;
  float normalStateY = vUv.y * ratio.y;

  float finalStateX = mix(normalStateX, zoomStateX, uZoomProgress);
  float finalStateY = mix(normalStateY, zoomStateY, uZoomProgress);

  vec2 uv = vec2(
    finalStateX + (1.0 - ratio.x) * 0.5,
    finalStateY + (1.0 - ratio.y) * 0.5
  );

  gl_FragColor.rgb = texture2D(tMap, uv).rgb;
  gl_FragColor.a = uOpacity;
}
