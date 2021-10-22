precision highp float;

uniform vec2 uImageSizes;
uniform vec2 uPlaneSizes;
uniform sampler2D tMap;
uniform float uOpacity;
uniform float uZoom;

varying vec2 vUv;

void main() {
  vec2 ratio = vec2(
    min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
    min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
  );

  vec2 newUv = vUv;

  vec2 uv = vec2(
    (1. - uZoom) * 0.5 + uZoom * newUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
    (1. - uZoom) * 0.25 + uZoom * newUv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );

  gl_FragColor.rgb = texture2D(tMap, uv).rgb;
  gl_FragColor.a = uOpacity;
}
