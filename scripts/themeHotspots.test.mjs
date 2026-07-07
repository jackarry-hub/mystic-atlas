import assert from "node:assert/strict";
import { mapImagePointToCoverContainer } from "../src/lib/themeHotspots.ts";

const image = { imageWidth: 1672, imageHeight: 941 };

{
  const point = mapImagePointToCoverContainer({
    ...image,
    containerWidth: 1920,
    containerHeight: 900,
    x: 50,
    y: 0
  });

  assert.equal(point.left, 960);
  assert.equal(Math.round(point.top), -90);
}

{
  const point = mapImagePointToCoverContainer({
    ...image,
    containerWidth: 390,
    containerHeight: 844,
    x: 50,
    y: 50
  });

  assert.equal(Math.round(point.left), 195);
  assert.equal(Math.round(point.top), 422);
}

{
  const point = mapImagePointToCoverContainer({
    ...image,
    containerWidth: 390,
    containerHeight: 844,
    x: 80,
    y: 50
  });

  assert.equal(point.visible, false);
}
