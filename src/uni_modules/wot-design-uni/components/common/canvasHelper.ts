/**
 * 适配 canvas 2d 上下文
 * @param ctx canvas 2d 上下文
 * @returns
 */
export function canvas2dAdapter(ctx: CanvasRenderingContext2D): UniApp.CanvasContext {
  return Object.assign(ctx, {
    setFillStyle(color: string | CanvasGradient) {
      ctx.fillStyle = color
    },
    setStrokeStyle(color: string | CanvasGradient | CanvasPattern) {
      ctx.strokeStyle = color
    },
    setLineWidth(lineWidth: number) {
      ctx.lineWidth = lineWidth
    },
    setLineCap(lineCap: 'butt' | 'round' | 'square') {
      ctx.lineCap = lineCap
    },

    setFontSize(font: string) {
      ctx.font = font
    },
    setGlobalAlpha(alpha: number) {
      ctx.globalAlpha = alpha
    },
    setLineJoin(lineJoin: 'bevel' | 'round' | 'miter') {
      ctx.lineJoin = lineJoin
    },
    setTextAlign(align: 'left' | 'center' | 'right') {
      ctx.textAlign = align
    },
    setMiterLimit(miterLimit: number) {
      ctx.miterLimit = miterLimit
    },
    setShadow(offsetX: number, offsetY: number, blur: number, color: string) {
      ctx.shadowOffsetX = offsetX
      ctx.shadowOffsetY = offsetY
      ctx.shadowBlur = blur
      ctx.shadowColor = color
    },
    setTextBaseline(textBaseline: 'top' | 'bottom' | 'middle') {
      ctx.textBaseline = textBaseline
    },
    createCircularGradient() {},
    draw() {},
    addColorStop() {}
  }) as unknown as UniApp.CanvasContext
}
