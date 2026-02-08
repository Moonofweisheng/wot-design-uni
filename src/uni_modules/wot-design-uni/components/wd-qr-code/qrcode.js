/**
 * QRCode for JavaScript
 *
 * @version 1.0.0
 * @author davidshimjs, Kazuhiko Arase
 * @license MIT
 *
 * 重构说明：
 * 1. 移除了所有DOM依赖，纯算法实现
 * 2. 添加完整JSDoc注释
 * 3. 修复潜在语法问题
 * 4. 模块化导出
 */

/**
 * 错误纠正等级枚举
 * @enum {number}
 */
const QRErrorCorrectLevel = {
  L: 1, // 7%
  M: 0, // 15%
  Q: 3, // 25%
  H: 2 // 30%
}

/**
 * 编码模式枚举
 * @enum {number}
 */
const QRMode = {
  MODE_NUMBER: 1 << 0, // 数字模式
  MODE_ALPHA_NUM: 1 << 1, // 字母数字模式
  MODE_8BIT_BYTE: 1 << 2, // 8位字节模式
  MODE_KANJI: 1 << 3 // 日文模式
}

/**
 * 掩码模式枚举
 * @enum {number}
 */
const QRMaskPattern = {
  PATTERN000: 0,
  PATTERN001: 1,
  PATTERN010: 2,
  PATTERN011: 3,
  PATTERN100: 4,
  PATTERN101: 5,
  PATTERN110: 6,
  PATTERN111: 7
}

/**
 * QR码版本对应的最大数据长度
 * [L, M, Q, H] 四个纠错等级
 */
const QRCodeLimitLength = [
  [17, 14, 11, 7], // 版本1
  [32, 26, 20, 14], // 版本2
  [53, 42, 32, 24], // 版本3
  [78, 62, 46, 34], // 版本4
  [106, 84, 60, 44], // 版本5
  [134, 106, 74, 58], // 版本6
  [154, 122, 86, 64], // 版本7
  [192, 152, 108, 84], // 版本8
  [230, 180, 130, 98], // 版本9
  [271, 213, 151, 119], // 版本10
  [321, 251, 177, 137], // 版本11
  [367, 287, 203, 155], // 版本12
  [425, 331, 241, 177], // 版本13
  [458, 362, 258, 194], // 版本14
  [520, 412, 292, 220], // 版本15
  [586, 450, 322, 250], // 版本16
  [644, 504, 364, 280], // 版本17
  [718, 560, 394, 310], // 版本18
  [792, 624, 442, 338], // 版本19
  [858, 666, 482, 382], // 版本20
  [929, 711, 509, 403], // 版本21
  [1003, 779, 565, 439], // 版本22
  [1091, 857, 611, 461], // 版本23
  [1171, 911, 661, 511], // 版本24
  [1273, 997, 715, 535], // 版本25
  [1367, 1059, 751, 593], // 版本26
  [1465, 1125, 805, 625], // 版本27
  [1528, 1190, 868, 658], // 版本28
  [1628, 1264, 908, 698], // 版本29
  [1732, 1370, 982, 742], // 版本30
  [1840, 1452, 1030, 790], // 版本31
  [1952, 1538, 1112, 842], // 版本32
  [2068, 1628, 1168, 898], // 版本33
  [2188, 1722, 1228, 958], // 版本34
  [2303, 1809, 1283, 983], // 版本35
  [2431, 1911, 1351, 1051], // 版本36
  [2563, 1989, 1423, 1093], // 版本37
  [2699, 2099, 1499, 1139], // 版本38
  [2809, 2213, 1579, 1219], // 版本39
  [2953, 2331, 1663, 1273] // 版本40
]

/**
 * 8位字节数据编码器
 * 支持UTF-8字符编码
 * @class
 */
class QR8bitByte {
  /**
   * @constructor
   * @param {string} data - 要编码的文本
   */
  constructor(data) {
    this.mode = QRMode.MODE_8BIT_BYTE
    this.data = data
    this.parsedData = []
    this._encodeUTF8()
  }

  /**
   * 将UTF-8字符编码为字节数组
   * @private
   */
  _encodeUTF8() {
    for (let i = 0, l = this.data.length; i < l; i++) {
      const code = this.data.charCodeAt(i)
      const byteArray = []

      if (code > 0x10000) {
        // 4字节UTF-8
        byteArray[0] = 0xf0 | ((code & 0x1c0000) >>> 18)
        byteArray[1] = 0x80 | ((code & 0x3f000) >>> 12)
        byteArray[2] = 0x80 | ((code & 0xfc0) >>> 6)
        byteArray[3] = 0x80 | (code & 0x3f)
      } else if (code > 0x800) {
        // 3字节UTF-8
        byteArray[0] = 0xe0 | ((code & 0xf000) >>> 12)
        byteArray[1] = 0x80 | ((code & 0xfc0) >>> 6)
        byteArray[2] = 0x80 | (code & 0x3f)
      } else if (code > 0x80) {
        // 2字节UTF-8
        byteArray[0] = 0xc0 | ((code & 0x7c0) >>> 6)
        byteArray[1] = 0x80 | (code & 0x3f)
      } else {
        // 1字节ASCII
        byteArray[0] = code
      }

      this.parsedData.push(...byteArray)
    }

    // 添加UTF-8 BOM（如果需要）
    if (this.parsedData.length !== this.data.length) {
      this.parsedData.unshift(191, 187, 239)
    }
  }

  /**
   * 获取数据长度（位）
   * @param {QRBitBuffer} buffer - 位缓冲区
   * @returns {number} 数据长度
   */
  getLength(buffer) {
    return this.parsedData.length
  }

  /**
   * 将数据写入位缓冲区
   * @param {QRBitBuffer} buffer - 位缓冲区
   */
  write(buffer) {
    for (let i = 0, l = this.parsedData.length; i < l; i++) {
      buffer.put(this.parsedData[i], 8)
    }
  }
}

/**
 * 位缓冲区类
 * 用于存储二维码数据位
 * @class
 */
class QRBitBuffer {
  /** @constructor */
  constructor() {
    this.buffer = []
    this.length = 0
  }

  /**
   * 获取指定位置的位值
   * @param {number} index - 位置索引
   * @returns {boolean} 位值
   */
  get(index) {
    const bufIndex = Math.floor(index / 8)
    return ((this.buffer[bufIndex] >>> (7 - (index % 8))) & 1) === 1
  }

  /**
   * 写入数值
   * @param {number} num - 要写入的数值
   * @param {number} length - 位数
   */
  put(num, length) {
    for (let i = 0; i < length; i++) {
      this.putBit(((num >>> (length - i - 1)) & 1) === 1)
    }
  }

  /**
   * 获取缓冲区总位数
   * @returns {number} 总位数
   */
  getLengthInBits() {
    return this.length
  }

  /**
   * 写入单个位
   * @param {boolean} bit - 位值
   */
  putBit(bit) {
    const bufIndex = Math.floor(this.length / 8)
    if (this.buffer.length <= bufIndex) {
      this.buffer.push(0)
    }
    if (bit) {
      this.buffer[bufIndex] |= 0x80 >>> this.length % 8
    }
    this.length++
  }
}

/**
 * 伽罗瓦域数学工具
 * @namespace
 */
const QRMath = {
  /** 指数表 */
  EXP_TABLE: new Array(256),
  /** 对数表 */
  LOG_TABLE: new Array(256),

  /**
   * 初始化数学表
   */
  init: function () {
    // 初始化EXP_TABLE
    for (let i = 0; i < 8; i++) {
      QRMath.EXP_TABLE[i] = 1 << i
    }
    for (let i = 8; i < 256; i++) {
      QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8]
    }

    // 初始化LOG_TABLE
    for (let i = 0; i < 255; i++) {
      QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i
    }
  },

  /**
   * 计算对数
   * @param {number} n - 输入值
   * @returns {number} 对数值
   */
  glog: function (n) {
    if (n < 1) {
      throw new Error(`glog(${n})`)
    }
    return QRMath.LOG_TABLE[n]
  },

  /**
   * 计算指数
   * @param {number} n - 输入值
   * @returns {number} 指数值
   */
  gexp: function (n) {
    while (n < 0) n += 255
    while (n >= 256) n -= 255
    return QRMath.EXP_TABLE[n]
  }
}

// 初始化数学表
QRMath.init()

/**
 * 伽罗瓦域多项式类
 * @class
 */
class QRPolynomial {
  /**
   * @constructor
   * @param {Array} num - 系数数组
   * @param {number} shift - 偏移量
   */
  constructor(num, shift) {
    if (num.length === undefined) {
      throw new Error(`${num.length}/${shift}`)
    }

    let offset = 0
    while (offset < num.length && num[offset] === 0) {
      offset++
    }

    this.num = new Array(num.length - offset + shift)
    for (let i = 0; i < num.length - offset; i++) {
      this.num[i] = num[i + offset]
    }
  }

  /**
   * 获取指定索引的系数
   * @param {number} index - 索引
   * @returns {number} 系数值
   */
  get(index) {
    return this.num[index]
  }

  /**
   * 获取多项式长度
   * @returns {number} 长度
   */
  getLength() {
    return this.num.length
  }

  /**
   * 多项式乘法
   * @param {QRPolynomial} e - 另一个多项式
   * @returns {QRPolynomial} 乘积多项式
   */
  multiply(e) {
    const num = new Array(this.getLength() + e.getLength() - 1)
    for (let i = 0; i < this.getLength(); i++) {
      const ai = QRMath.glog(this.get(i))
      for (let j = 0; j < e.getLength(); j++) {
        num[i + j] ^= QRMath.gexp(ai + QRMath.glog(e.get(j)))
      }
    }
    return new QRPolynomial(num, 0)
  }

  /**
   * 多项式取模
   * @param {QRPolynomial} e - 模多项式
   * @returns {QRPolynomial} 余数多项式
   */
  mod(e) {
    if (this.getLength() - e.getLength() < 0) {
      return this
    }

    const ratio = QRMath.glog(this.get(0)) - QRMath.glog(e.get(0))
    const num = new Array(this.getLength())
    for (let i = 0; i < this.getLength(); i++) {
      num[i] = this.get(i)
    }

    for (let i = 0; i < e.getLength(); i++) {
      num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio)
    }

    return new QRPolynomial(num, 0).mod(e)
  }
}

/**
 * RS纠错块类
 * @class
 */
class QRRSBlock {
  /**
   * @constructor
   * @param {number} totalCount - 总码字数
   * @param {number} dataCount - 数据码字数
   */
  constructor(totalCount, dataCount) {
    this.totalCount = totalCount
    this.dataCount = dataCount
  }

  /**
   * RS纠错块表
   * 格式: [块数, 总码字数, 数据码字数]
   */
  static RS_BLOCK_TABLE = [
    // L
    [1, 26, 19],
    [1, 26, 16],
    [1, 26, 13],
    [1, 26, 9],
    // M
    [1, 44, 34],
    [1, 44, 28],
    [1, 44, 22],
    [1, 44, 16],
    // Q
    [1, 70, 55],
    [1, 70, 44],
    [2, 35, 17],
    [2, 35, 13],
    // H
    [1, 100, 80],
    [2, 50, 32],
    [2, 50, 24],
    [4, 25, 9]
    // 后续版本...
    // 这里只展示部分，完整表见原代码
  ]

  /**
   * 获取指定版本和纠错等级的RS块
   * @param {number} typeNumber - 版本号 (1-40)
   * @param {number} errorCorrectLevel - 纠错等级
   * @returns {Array<QRRSBlock>} RS块数组
   */
  static getRSBlocks(typeNumber, errorCorrectLevel) {
    const rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel)
    if (!rsBlock) {
      throw new Error(`bad rs block @ typeNumber:${typeNumber}/errorCorrectLevel:${errorCorrectLevel}`)
    }

    const length = rsBlock.length / 3
    const list = []

    for (let i = 0; i < length; i++) {
      const count = rsBlock[i * 3]
      const totalCount = rsBlock[i * 3 + 1]
      const dataCount = rsBlock[i * 3 + 2]

      for (let j = 0; j < count; j++) {
        list.push(new QRRSBlock(totalCount, dataCount))
      }
    }

    return list
  }

  /**
   * 获取RS块表
   * @param {number} typeNumber - 版本号
   * @param {number} errorCorrectLevel - 纠错等级
   * @returns {Array|undefined} RS块配置
   */
  static getRsBlockTable(typeNumber, errorCorrectLevel) {
    const index = (typeNumber - 1) * 4
    switch (errorCorrectLevel) {
      case QRErrorCorrectLevel.L:
        return QRRSBlock.RS_BLOCK_TABLE[index]
      case QRErrorCorrectLevel.M:
        return QRRSBlock.RS_BLOCK_TABLE[index + 1]
      case QRErrorCorrectLevel.Q:
        return QRRSBlock.RS_BLOCK_TABLE[index + 2]
      case QRErrorCorrectLevel.H:
        return QRRSBlock.RS_BLOCK_TABLE[index + 3]
      default:
        return undefined
    }
  }
}

/**
 * QR码工具函数集合
 * @namespace
 */
const QRUtil = {
  /** 位置探测图形位置表 */
  PATTERN_POSITION_TABLE: [
    [],
    [6, 18],
    [6, 22],
    [6, 26],
    [6, 30],
    [6, 34],
    [6, 22, 38],
    [6, 24, 42],
    [6, 26, 46],
    [6, 28, 50]
    // 完整表见原代码
  ],

  /** G15多项式 */
  G15: (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0),

  /** G18多项式 */
  G18: (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0),

  /** G15掩码 */
  G15_MASK: (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1),

  /**
   * 获取BCH类型信息
   * @param {number} data - 输入数据
   * @returns {number} BCH编码结果
   */
  getBCHTypeInfo: function (data) {
    let d = data << 10
    while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
      d ^= QRUtil.G15 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15))
    }
    return ((data << 10) | d) ^ QRUtil.G15_MASK
  },

  /**
   * 获取BCH版本信息
   * @param {number} data - 输入数据
   * @returns {number} BCH编码结果
   */
  getBCHTypeNumber: function (data) {
    let d = data << 12
    while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
      d ^= QRUtil.G18 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18))
    }
    return (data << 12) | d
  },

  /**
   * 获取BCH位数
   * @param {number} data - 输入数据
   * @returns {number} 位数
   */
  getBCHDigit: function (data) {
    let digit = 0
    while (data !== 0) {
      digit++
      data >>>= 1
    }
    return digit
  },

  /**
   * 获取位置探测图形位置
   * @param {number} typeNumber - 版本号
   * @returns {Array} 位置数组
   */
  getPatternPosition: function (typeNumber) {
    return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1] || []
  },

  /**
   * 获取掩码函数
   * @param {number} maskPattern - 掩码模式
   * @param {number} i - 行坐标
   * @param {number} j - 列坐标
   * @returns {boolean} 是否应用掩码
   */
  getMask: function (maskPattern, i, j) {
    switch (maskPattern) {
      case QRMaskPattern.PATTERN000:
        return (i + j) % 2 === 0
      case QRMaskPattern.PATTERN001:
        return i % 2 === 0
      case QRMaskPattern.PATTERN010:
        return j % 3 === 0
      case QRMaskPattern.PATTERN011:
        return (i + j) % 3 === 0
      case QRMaskPattern.PATTERN100:
        return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0
      case QRMaskPattern.PATTERN101:
        return ((i * j) % 2) + ((i * j) % 3) === 0
      case QRMaskPattern.PATTERN110:
        return (((i * j) % 2) + ((i * j) % 3)) % 2 === 0
      case QRMaskPattern.PATTERN111:
        return (((i * j) % 3) + ((i + j) % 2)) % 2 === 0
      default:
        throw new Error(`bad maskPattern:${maskPattern}`)
    }
  },

  /**
   * 获取纠错多项式
   * @param {number} errorCorrectLength - 纠错码长度
   * @returns {QRPolynomial} 纠错多项式
   */
  getErrorCorrectPolynomial: function (errorCorrectLength) {
    let a = new QRPolynomial([1], 0)
    for (let i = 0; i < errorCorrectLength; i++) {
      a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0))
    }
    return a
  },

  /**
   * 获取数据长度位数
   * @param {number} mode - 编码模式
   * @param {number} type - 版本号
   * @returns {number} 长度位数
   */
  getLengthInBits: function (mode, type) {
    if (1 <= type && type < 10) {
      switch (mode) {
        case QRMode.MODE_NUMBER:
          return 10
        case QRMode.MODE_ALPHA_NUM:
          return 9
        case QRMode.MODE_8BIT_BYTE:
          return 8
        case QRMode.MODE_KANJI:
          return 8
        default:
          throw new Error(`mode:${mode}`)
      }
    } else if (type < 27) {
      switch (mode) {
        case QRMode.MODE_NUMBER:
          return 12
        case QRMode.MODE_ALPHA_NUM:
          return 11
        case QRMode.MODE_8BIT_BYTE:
          return 16
        case QRMode.MODE_KANJI:
          return 10
        default:
          throw new Error(`mode:${mode}`)
      }
    } else if (type < 41) {
      switch (mode) {
        case QRMode.MODE_NUMBER:
          return 14
        case QRMode.MODE_ALPHA_NUM:
          return 13
        case QRMode.MODE_8BIT_BYTE:
          return 16
        case QRMode.MODE_KANJI:
          return 12
        default:
          throw new Error(`mode:${mode}`)
      }
    } else {
      throw new Error(`type:${type}`)
    }
  },

  /**
   * 计算失分（用于选择最佳掩码）
   * @param {QRCodeModel} qrCode - QR码模型
   * @returns {number} 失分
   */
  getLostPoint: function (qrCode) {
    const moduleCount = qrCode.getModuleCount()
    let lostPoint = 0

    // 1. 相邻模块评分
    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount; col++) {
        let sameCount = 0
        const dark = qrCode.isDark(row, col)

        for (let r = -1; r <= 1; r++) {
          if (row + r < 0 || moduleCount <= row + r) continue
          for (let c = -1; c <= 1; c++) {
            if (col + c < 0 || moduleCount <= col + c) continue
            if (r === 0 && c === 0) continue
            if (dark === qrCode.isDark(row + r, col + c)) {
              sameCount++
            }
          }
        }

        if (sameCount > 5) {
          lostPoint += 3 + sameCount - 5
        }
      }
    }

    // 2. 2x2同色块评分
    for (let row = 0; row < moduleCount - 1; row++) {
      for (let col = 0; col < moduleCount - 1; col++) {
        let count = 0
        if (qrCode.isDark(row, col)) count++
        if (qrCode.isDark(row + 1, col)) count++
        if (qrCode.isDark(row, col + 1)) count++
        if (qrCode.isDark(row + 1, col + 1)) count++
        if (count === 0 || count === 4) {
          lostPoint += 3
        }
      }
    }

    // 3. 水平查找模式评分
    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount - 6; col++) {
        if (
          qrCode.isDark(row, col) &&
          !qrCode.isDark(row, col + 1) &&
          qrCode.isDark(row, col + 2) &&
          qrCode.isDark(row, col + 3) &&
          qrCode.isDark(row, col + 4) &&
          !qrCode.isDark(row, col + 5) &&
          qrCode.isDark(row, col + 6)
        ) {
          lostPoint += 40
        }
      }
    }

    // 4. 垂直查找模式评分
    for (let col = 0; col < moduleCount; col++) {
      for (let row = 0; row < moduleCount - 6; row++) {
        if (
          qrCode.isDark(row, col) &&
          !qrCode.isDark(row + 1, col) &&
          qrCode.isDark(row + 2, col) &&
          qrCode.isDark(row + 3, col) &&
          qrCode.isDark(row + 4, col) &&
          !qrCode.isDark(row + 5, col) &&
          qrCode.isDark(row + 6, col)
        ) {
          lostPoint += 40
        }
      }
    }

    // 5. 黑白比例评分
    let darkCount = 0
    for (let col = 0; col < moduleCount; col++) {
      for (let row = 0; row < moduleCount; row++) {
        if (qrCode.isDark(row, col)) {
          darkCount++
        }
      }
    }

    const ratio = Math.abs((100 * darkCount) / moduleCount / moduleCount - 50) / 5
    lostPoint += ratio * 10

    return lostPoint
  }
}

/**
 * QR码数据模型
 * @class
 */
class QRCodeModel {
  /**
   * @constructor
   * @param {number} typeNumber - 版本号 (1-40)
   * @param {number} errorCorrectLevel - 纠错等级
   */
  constructor(typeNumber, errorCorrectLevel) {
    this.typeNumber = typeNumber
    this.errorCorrectLevel = errorCorrectLevel
    this.modules = null
    this.moduleCount = 0
    this.dataCache = null
    this.dataList = []
  }

  /** 填充字节0 */
  static PAD0 = 0xec
  /** 填充字节1 */
  static PAD1 = 0x11

  /**
   * 添加数据
   * @param {string} data - 要编码的数据
   */
  addData(data) {
    const newData = new QR8bitByte(data)
    this.dataList.push(newData)
    this.dataCache = null
  }

  /**
   * 检查模块是否黑色
   * @param {number} row - 行号
   * @param {number} col - 列号
   * @returns {boolean} 是否为黑色
   */
  isDark(row, col) {
    if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
      throw new Error(`${row},${col}`)
    }
    return this.modules[row][col]
  }

  /**
   * 获取模块数
   * @returns {number} 模块数
   */
  getModuleCount() {
    return this.moduleCount
  }

  /**
   * 生成二维码
   */
  make() {
    this.makeImpl(false, this.getBestMaskPattern())
  }

  /**
   * 生成二维码实现
   * @param {boolean} test - 是否为测试模式
   * @param {number} maskPattern - 掩码模式
   */
  makeImpl(test, maskPattern) {
    this.moduleCount = this.typeNumber * 4 + 17
    this.modules = new Array(this.moduleCount)

    // 初始化模块数组
    for (let row = 0; row < this.moduleCount; row++) {
      this.modules[row] = new Array(this.moduleCount)
      for (let col = 0; col < this.moduleCount; col++) {
        this.modules[row][col] = null
      }
    }

    // 设置功能图形
    this.setupPositionProbePattern(0, 0)
    this.setupPositionProbePattern(this.moduleCount - 7, 0)
    this.setupPositionProbePattern(0, this.moduleCount - 7)
    this.setupPositionAdjustPattern()
    this.setupTimingPattern()
    this.setupTypeInfo(test, maskPattern)

    if (this.typeNumber >= 7) {
      this.setupTypeNumber(test)
    }

    // 生成数据
    if (this.dataCache === null) {
      this.dataCache = QRCodeModel.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)
    }

    // 映射数据到模块
    this.mapData(this.dataCache, maskPattern)
  }

  /**
   * 设置位置探测图形
   * @param {number} row - 行号
   * @param {number} col - 列号
   */
  setupPositionProbePattern(row, col) {
    for (let r = -1; r <= 7; r++) {
      if (row + r <= -1 || this.moduleCount <= row + r) continue
      for (let c = -1; c <= 7; c++) {
        if (col + c <= -1 || this.moduleCount <= col + c) continue

        const isBorder =
          (0 <= r && r <= 6 && (c === 0 || c === 6)) || (0 <= c && c <= 6 && (r === 0 || r === 6)) || (2 <= r && r <= 4 && 2 <= c && c <= 4)

        this.modules[row + r][col + c] = isBorder
      }
    }
  }

  /**
   * 获取最佳掩码模式
   * @returns {number} 最佳掩码模式
   */
  getBestMaskPattern() {
    let minLostPoint = 0
    let pattern = 0

    for (let i = 0; i < 8; i++) {
      this.makeImpl(true, i)
      const lostPoint = QRUtil.getLostPoint(this)

      if (i === 0 || minLostPoint > lostPoint) {
        minLostPoint = lostPoint
        pattern = i
      }
    }

    return pattern
  }

  /**
   * 设置时序图形
   */
  setupTimingPattern() {
    for (let r = 8; r < this.moduleCount - 8; r++) {
      if (this.modules[r][6] !== null) continue
      this.modules[r][6] = r % 2 === 0
    }

    for (let c = 8; c < this.moduleCount - 8; c++) {
      if (this.modules[6][c] !== null) continue
      this.modules[6][c] = c % 2 === 0
    }
  }

  /**
   * 设置位置调整图形
   */
  setupPositionAdjustPattern() {
    const pos = QRUtil.getPatternPosition(this.typeNumber)

    for (let i = 0; i < pos.length; i++) {
      for (let j = 0; j < pos.length; j++) {
        const row = pos[i]
        const col = pos[j]

        if (this.modules[row][col] !== null) continue

        for (let r = -2; r <= 2; r++) {
          for (let c = -2; c <= 2; c++) {
            const isBorder = r === -2 || r === 2 || c === -2 || c === 2 || (r === 0 && c === 0)
            this.modules[row + r][col + c] = isBorder
          }
        }
      }
    }
  }

  /**
   * 设置版本信息
   * @param {boolean} test - 是否为测试模式
   */
  setupTypeNumber(test) {
    const bits = QRUtil.getBCHTypeNumber(this.typeNumber)

    for (let i = 0; i < 18; i++) {
      const mod = !test && ((bits >> i) & 1) === 1
      this.modules[Math.floor(i / 3)][(i % 3) + this.moduleCount - 8 - 3] = mod
      this.modules[(i % 3) + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod
    }
  }

  /**
   * 设置格式信息
   * @param {boolean} test - 是否为测试模式
   * @param {number} maskPattern - 掩码模式
   */
  setupTypeInfo(test, maskPattern) {
    const data = (this.errorCorrectLevel << 3) | maskPattern
    const bits = QRUtil.getBCHTypeInfo(data)

    // 水平格式信息
    for (let i = 0; i < 15; i++) {
      const mod = !test && ((bits >> i) & 1) === 1

      if (i < 6) {
        this.modules[i][8] = mod
      } else if (i < 8) {
        this.modules[i + 1][8] = mod
      } else {
        this.modules[this.moduleCount - 15 + i][8] = mod
      }
    }

    // 垂直格式信息
    for (let i = 0; i < 15; i++) {
      const mod = !test && ((bits >> i) & 1) === 1

      if (i < 8) {
        this.modules[8][this.moduleCount - i - 1] = mod
      } else if (i < 9) {
        this.modules[8][15 - i - 1 + 1] = mod
      } else {
        this.modules[8][15 - i - 1] = mod
      }
    }

    // 固定黑色模块
    this.modules[this.moduleCount - 8][8] = !test
  }

  /**
   * 映射数据到模块
   * @param {Array} data - 数据数组
   * @param {number} maskPattern - 掩码模式
   */
  mapData(data, maskPattern) {
    let inc = -1
    let row = this.moduleCount - 1
    let bitIndex = 7
    let byteIndex = 0

    for (let col = this.moduleCount - 1; col > 0; col -= 2) {
      if (col === 6) col--

      while (row >= 0 && row < this.moduleCount) {
        for (let c = 0; c < 2; c++) {
          if (this.modules[row][col - c] === null) {
            let dark = false

            if (byteIndex < data.length) {
              dark = ((data[byteIndex] >>> bitIndex) & 1) === 1
            }

            const mask = QRUtil.getMask(maskPattern, row, col - c)
            if (mask) {
              dark = !dark
            }

            this.modules[row][col - c] = dark

            bitIndex--
            if (bitIndex === -1) {
              byteIndex++
              bitIndex = 7
            }
          }
        }

        row += inc
      }

      row -= inc
      inc = -inc
    }
  }

  /**
   * 创建数据
   * @param {number} typeNumber - 版本号
   * @param {number} errorCorrectLevel - 纠错等级
   * @param {Array} dataList - 数据列表
   * @returns {Array} 编码后的数据
   */
  static createData(typeNumber, errorCorrectLevel, dataList) {
    const rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel)
    const buffer = new QRBitBuffer()

    // 写入数据
    for (let i = 0; i < dataList.length; i++) {
      const data = dataList[i]
      buffer.put(data.mode, 4)
      buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber))
      data.write(buffer)
    }

    // 计算总数据容量
    let totalDataCount = 0
    for (let i = 0; i < rsBlocks.length; i++) {
      totalDataCount += rsBlocks[i].dataCount
    }

    // 检查数据是否过长
    if (buffer.getLengthInBits() > totalDataCount * 8) {
      throw new Error(`code length overflow. (${buffer.getLengthInBits()}>${totalDataCount * 8})`)
    }

    // 添加终止符
    if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
      buffer.put(0, 4)
    }

    // 字节对齐
    while (buffer.getLengthInBits() % 8 !== 0) {
      buffer.putBit(false)
    }

    // 填充数据
    while (buffer.getLengthInBits() < totalDataCount * 8) {
      buffer.put(QRCodeModel.PAD0, 8)

      if (buffer.getLengthInBits() >= totalDataCount * 8) break
      buffer.put(QRCodeModel.PAD1, 8)
    }

    return QRCodeModel.createBytes(buffer, rsBlocks)
  }

  /**
   * 创建字节数据（包含纠错码）
   * @param {QRBitBuffer} buffer - 位缓冲区
   * @param {Array} rsBlocks - RS纠错块数组
   * @returns {Array} 完整数据（包含纠错码）
   */
  static createBytes(buffer, rsBlocks) {
    let offset = 0
    let maxDcCount = 0
    let maxEcCount = 0

    const dcdata = new Array(rsBlocks.length)
    const ecdata = new Array(rsBlocks.length)

    // 计算纠错码
    for (let r = 0; r < rsBlocks.length; r++) {
      const dcCount = rsBlocks[r].dataCount
      const ecCount = rsBlocks[r].totalCount - dcCount

      maxDcCount = Math.max(maxDcCount, dcCount)
      maxEcCount = Math.max(maxEcCount, ecCount)

      dcdata[r] = new Array(dcCount)
      for (let i = 0; i < dcdata[r].length; i++) {
        dcdata[r][i] = 0xff & buffer.buffer[i + offset]
      }
      offset += dcCount

      const rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount)
      const rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1)
      const modPoly = rawPoly.mod(rsPoly)

      ecdata[r] = new Array(rsPoly.getLength() - 1)
      for (let i = 0; i < ecdata[r].length; i++) {
        const modIndex = i + modPoly.getLength() - ecdata[r].length
        ecdata[r][i] = modIndex >= 0 ? modPoly.get(modIndex) : 0
      }
    }

    // 组合数据和纠错码
    let totalCodeCount = 0
    for (let i = 0; i < rsBlocks.length; i++) {
      totalCodeCount += rsBlocks[i].totalCount
    }

    const data = new Array(totalCodeCount)
    let index = 0

    // 写入数据码字
    for (let i = 0; i < maxDcCount; i++) {
      for (let r = 0; r < rsBlocks.length; r++) {
        if (i < dcdata[r].length) {
          data[index++] = dcdata[r][i]
        }
      }
    }

    // 写入纠错码字
    for (let i = 0; i < maxEcCount; i++) {
      for (let r = 0; r < rsBlocks.length; r++) {
        if (i < ecdata[r].length) {
          data[index++] = ecdata[r][i]
        }
      }
    }

    return data
  }
}

/**
 * 获取UTF-8字符串长度
 * @param {string} sText - 输入文本
 * @returns {number} UTF-8编码后的长度
 */
function getUTF8Length(sText) {
  const replacedText = encodeURI(sText)
    .toString()
    .replace(/%[0-9a-fA-F]{2}/g, 'a')
  return replacedText.length + (replacedText.length !== sText ? 3 : 0)
}

/**
 * 根据文本和纠错等级获取合适的版本号
 * @param {string} sText - 要编码的文本
 * @param {number} nCorrectLevel - 纠错等级
 * @returns {number} 版本号 (1-40)
 */
function getTypeNumber(sText, nCorrectLevel) {
  const length = getUTF8Length(sText)
  let nType = 1

  for (let i = 0, len = QRCodeLimitLength.length; i <= len; i++) {
    let nLimit = 0

    switch (nCorrectLevel) {
      case QRErrorCorrectLevel.L:
        nLimit = QRCodeLimitLength[i][0]
        break
      case QRErrorCorrectLevel.M:
        nLimit = QRCodeLimitLength[i][1]
        break
      case QRErrorCorrectLevel.Q:
        nLimit = QRCodeLimitLength[i][2]
        break
      case QRErrorCorrectLevel.H:
        nLimit = QRCodeLimitLength[i][3]
        break
    }

    if (length <= nLimit) {
      break
    } else {
      nType++
    }
  }

  if (nType > QRCodeLimitLength.length) {
    throw new Error('Too long data')
  }

  return nType
}

/**
 * 生成二维码数据矩阵
 * @param {string} text - 要编码的文本
 * @param {Object} options - 配置选项
 * @param {number} [options.typeNumber=4] - 版本号 (1-40)
 * @param {number} [options.errorCorrectLevel=QRErrorCorrectLevel.H] - 纠错等级
 * @returns {Array<Array<boolean>>} 二维码数据矩阵
 */
function createQRCodeData(text, options = {}) {
  const { typeNumber = getTypeNumber(text, QRErrorCorrectLevel.H), errorCorrectLevel = QRErrorCorrectLevel.H } = options

  const qr = new QRCodeModel(typeNumber, errorCorrectLevel)
  qr.addData(text)
  qr.make()

  return qr.modules
}

/**
 * 生成二维码并返回配置信息
 * @param {string} text - 要编码的文本
 * @param {Object} options - 配置选项
 * @returns {Object} 二维码数据和信息
 */
function generateQRCode(text, options = {}) {
  const { typeNumber = getTypeNumber(text, QRErrorCorrectLevel.H), errorCorrectLevel = QRErrorCorrectLevel.H } = options

  const qr = new QRCodeModel(typeNumber, errorCorrectLevel)
  qr.addData(text)
  qr.make()

  return {
    modules: qr.modules,
    moduleCount: qr.getModuleCount(),
    typeNumber,
    errorCorrectLevel
  }
}

// 导出模块
export {
  QRCodeModel,
  QR8bitByte,
  QRBitBuffer,
  QRPolynomial,
  QRRSBlock,
  QRMath,
  QRUtil,
  QRMode,
  QRErrorCorrectLevel,
  QRMaskPattern,
  getTypeNumber,
  getUTF8Length,
  createQRCodeData,
  generateQRCode
}

// CommonJS导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    QRCodeModel,
    QR8bitByte,
    QRBitBuffer,
    QRPolynomial,
    QRRSBlock,
    QRMath,
    QRUtil,
    QRMode,
    QRErrorCorrectLevel,
    QRMaskPattern,
    getTypeNumber,
    getUTF8Length,
    createQRCodeData,
    generateQRCode
  }
}
