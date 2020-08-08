export const drawText = (text, context, x, y) => {
  context.font = 'bold 160px Montserrat';
  context.textAlign = 'center';
  context.strokeStyle = '#1c1c1e';
  context.lineWidth = 6;
  context.strokeText(text, x, y);
  context.fillStyle = '#fff';
  context.fillText(text, x, y);
};
