export interface CoverHotspotInput {
  containerWidth: number;
  containerHeight: number;
  imageWidth: number;
  imageHeight: number;
  x: number;
  y: number;
  objectPositionX?: number;
  objectPositionY?: number;
}

export interface CoverHotspotPosition {
  left: number;
  top: number;
  visible: boolean;
}

const HOTSPOT_SAFE_RADIUS = 22;

export function mapImagePointToCoverContainer({
  containerWidth,
  containerHeight,
  imageWidth,
  imageHeight,
  objectPositionX = 0.5,
  objectPositionY = 0.5,
  x,
  y
}: CoverHotspotInput): CoverHotspotPosition {
  if (
    containerWidth <= 0 ||
    containerHeight <= 0 ||
    imageWidth <= 0 ||
    imageHeight <= 0
  ) {
    return {
      left: containerWidth * (x / 100),
      top: containerHeight * (y / 100),
      visible: true
    };
  }

  const scale = Math.max(containerWidth / imageWidth, containerHeight / imageHeight);
  const renderedWidth = imageWidth * scale;
  const renderedHeight = imageHeight * scale;
  const offsetX = (containerWidth - renderedWidth) * objectPositionX;
  const offsetY = (containerHeight - renderedHeight) * objectPositionY;
  const left = offsetX + renderedWidth * (x / 100);
  const top = offsetY + renderedHeight * (y / 100);

  return {
    left,
    top,
    visible:
      left >= HOTSPOT_SAFE_RADIUS &&
      left <= containerWidth - HOTSPOT_SAFE_RADIUS &&
      top >= HOTSPOT_SAFE_RADIUS &&
      top <= containerHeight - HOTSPOT_SAFE_RADIUS
  };
}
