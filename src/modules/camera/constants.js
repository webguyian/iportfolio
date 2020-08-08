export const defaultSettings = {
  flash: 'disabled',
  timer: 'disabled',
  filter: 'enabled',
  swap: 'disabled'
};

export const initialFilters = [
  {
    label: 'Original',
    value: 'none'
  },
  {
    label: 'Grayscale',
    value: 'grayscale(100%)'
  },
  {
    label: 'Sepia',
    value: 'sepia(100%)'
  },
  {
    label: 'Invert',
    value: 'invert(100%)'
  },
  {
    label: 'Saturate',
    value: 'saturate(250%)'
  },
  {
    label: 'High Contrast',
    value: 'contrast(400%)'
  },
  {
    label: 'Hue Rotate',
    value: 'hue-rotate(180deg)'
  },
  {
    label: 'Sharpen',
    value: 'url(#svgSharpen)'
  },
  {
    label: 'Blur',
    value: 'blur(4px)'
  },
  {
    label: 'Threshold',
    value: 'url(#svgThreshold)'
  }
];
