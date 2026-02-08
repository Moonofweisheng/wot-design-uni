export declare const QRErrorCorrectLevel: {
  L: number
  M: number
  Q: number
  H: number
}

export interface QRCodeResult {
  modules: boolean[][]
  moduleCount: number
  typeNumber: number
  errorCorrectLevel: number
}

export declare function generateQRCode(
  text: string,
  options?: {
    typeNumber?: number
    errorCorrectLevel?: number
  }
): QRCodeResult
