import type { ExtractPropTypes, PropType } from 'vue'
import { makeStringProp } from '../common/props'

export type ConfigProviderTheme = 'light' | 'dark'

export const configProviderProps = {
  /**
   * 主题风格，设置为 dark 来开启深色模式，全局生效
   */
  theme: makeStringProp<ConfigProviderTheme>('light'),
  /**
   * 自定义主题变量
   */
  themeVars: {
    type: Object as PropType<ConfigProviderThemeVars>,
    default: () => ({})
  }
}

export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>

export type baseThemeVars = {
  colorTheme?: string // 主题色
  colorWhite?: string // 用于mix的白色
  colorBlack?: string // 用于mix的黑色
  colorSuccess?: string // 成功色
  colorWarning?: string // 警告色
  colorDanger?: string // 危险出错色
  colorPurple?: string // 紫色
  colorYellow?: string // 黄色
  colorBlue?: string // 蓝色
  colorInfo?: string // 信息色
  colorGray1?: string // 灰色1
  colorGray2?: string // 灰色2
  colorGray3?: string // 灰色3
  colorGray4?: string // 灰色4
  colorGray5?: string // 灰色5
  colorGray6?: string // 灰色6
  colorGray7?: string // 灰色7
  colorGray8?: string // 灰色8
  fontGray1?: string // 字体灰色1
  fontGray2?: string // 字体灰色2
  fontGray3?: string // 字体灰色3
  fontGray4?: string // 字体灰色4
  fontWhite1?: string // 字体白色1
  fontWhite2?: string // 字体白色2
  fontWhite3?: string // 字体白色3
  fontWhite4?: string // 字体白色4
  colorTitle?: string // 模块标题/重要正文
  colorContent?: string // 普通正文
  colorSecondary?: string // 次要信息，注释/补充/正文
  colorAid?: string // 辅助文字字号，弱化信息，引导性/不可点文字
  colorTip?: string // 失效、默认提示文字
  colorBorder?: string // 控件边框线
  colorBorderLight?: string // 分割线颜色
  colorBg?: string // 背景色、禁用填充色
  darkBackground?: string // 深色背景1
  darkBackground2?: string // 深色背景2
  darkBackground3?: string // 深色背景3
  darkBackground4?: string // 深色背景4
  darkBackground5?: string // 深色背景5
  darkBackground6?: string // 深色背景6
  darkBackground7?: string // 深色背景7
  darkColor?: string // 深色字体1
  darkColor2?: string // 深色字体2
  darkColor3?: string // 深色字体3
  darkColorGray?: string // 深色灰色
  darkBorderColor?: string // 深色边框颜色
  colorIcon?: string // icon颜色
  colorIconActive?: string // icon颜色hover
  colorIconDisabled?: string // icon颜色disabled
  fsBig?: string // 大型标题字号
  fsImportant?: string // 重要数据字号
  fsTitle?: string // 标题字号/重要正文字号
  fsContent?: string // 普通正文字号
  fsSecondary?: string // 次要信息字号
  fsAid?: string // 辅助文字字号
  fwMedium?: string // 字重500
  fwSemibold?: string // 字重600
  sizeSidePadding?: string // 屏幕两边留白padding
}

export type actionSheetThemeVars = {
  actionSheetWeight?: string
  actionSheetRadius?: string
  actionSheetLoadingSize?: string
  actionSheetActionHeight?: string
  actionSheetColor?: string
  actionSheetFs?: string
  actionSheetActiveColor?: string
  actionSheetSubnameFs?: string
  actionSheetSubnameColor?: string
  actionSheetDisabledColor?: string
  actionSheetBg?: string
  actionSheetTitleHeight?: string
  actionSheetTitleFs?: string
  actionSheetCloseFs?: string
  actionSheetCloseColor?: string
  actionSheetCloseTop?: string
  actionSheetCloseRight?: string
  actionSheetCancelColor?: string
  actionSheetCancelHeight?: string
  actionSheetCancelBg?: string
  actionSheetCancelRadius?: string
  actionSheetPanelPadding?: string
  actionSheetPanelImgFs?: string
  actionSheetPanelImgRadius?: string
}

export type badgeThemeVars = {
  badgeBg?: string
  badgeColor?: string
  badgeFs?: string
  badgePadding?: string
  badgeHeight?: string
  badgePrimary?: string
  badgeSuccess?: string
  badgeWarning?: string
  badgeDanger?: string
  badgeInfo?: string
  badgeDotSize?: string
  badgeBorder?: string
}

export type buttonThemeVars = {
  buttonDisabledOpacity?: string

  buttonSmallHeight?: string
  buttonSmallPadding?: string
  buttonSmallFs?: string
  buttonSmallRadius?: string
  buttonSmallLoading?: string

  buttonMediumHeight?: string
  buttonMediumPadding?: string
  buttonMediumFs?: string
  buttonMediumRadius?: string
  buttonMediumLoading?: string
  buttonMediumBoxShadowSize?: string

  buttonLargeHeight?: string
  buttonLargePadding?: string
  buttonLargeFs?: string
  buttonLargeRadius?: string
  buttonLargeLoading?: string
  buttonLargeBoxShadowSize?: string

  buttonIconFs?: string
  buttonIconSize?: string
  buttonIconColor?: string
  buttonIconDisabledColor?: string

  buttonNormalColor?: string
  buttonNormalDisabledColor?: string

  buttonPlainBgColor?: string

  buttonPrimaryColor?: string
  buttonPrimaryBgColor?: string
  buttonPrimaryBoxShadowColor?: string

  buttonSuccessColor?: string
  buttonSuccessBgColor?: string
  buttonSuccessBoxShadowColor?: string

  buttonInfoColor?: string
  buttonInfoBgColor?: string
  buttonInfoPlainBorderColor?: string
  buttonInfoPlainNormalColor?: string

  buttonWarningColor?: string
  buttonWarningBgColor?: string
  buttonWarningBoxShadowColor?: string

  buttonErrorColor?: string
  buttonErrorBgColor?: string
  buttonErrorBoxShadowColor?: string

  buttonTextHoverOpacity?: string
}

export type cellThemeVars = {
  cellPadding?: string
  cellLineHeight?: string

  cellGroupTitleFs?: string
  cellGroupPadding?: string
  cellGroupTitleColor?: string
  cellGroupValueFs?: string
  cellGroupValueColor?: string

  cellWrapperPadding?: string
  cellWrapperPaddingLarge?: string

  cellWrapperPaddingWithLabel?: string
  cellIconRight?: string
  cellIconSize?: string
  cellTitleFs?: string
  cellTitleColor?: string
  cellLabelFs?: string
  cellLabelColor?: string
  cellValueFs?: string
  cellValueColor?: string
  cellArrowSize?: string
  cellArrowColor?: string
  cellTapBg?: string

  cellTitleFsLarge?: string
  cellLabelFsLarge?: string
  cellIconSizeLarge?: string

  cellRequiredColor?: string
  cellRequiredSize?: string
  cellVerticalTop?: string
}

export type calendarThemeVars = {
  calendarFs?: string
  calendarPanelPadding?: string
  calendarPanelTitleFs?: string
  calendarPanelTitleColor?: string
  calendarWeekColor?: string
  calendarWeekHeight?: string
  calendarWeekFs?: string
  calendarDayFs?: string
  calendarDayColor?: string
  calendarDayFw?: string
  calendarDayHeight?: string
  calendarMonthWidth?: string
  calendarActiveColor?: string
  calendarDisabledColor?: string
  calendarRangeColor?: string
  calendarActiveBorder?: string
  calendarInfoFs?: string
}

export type checkboxThemeVars = {
  checkboxMargin?: string
  checkboxBg?: string
  checkboxLabelMargin?: string
  checkboxSize?: string
  checkboxIconSize?: string
  checkboxBorderColor?: string
  checkboxCheckColor?: string
  checkboxLabelFs?: string
  checkboxLabelColor?: string
  checkboxCheckedColor?: string

  checkboxDisabledColor?: string
  checkboxDisabledLabelColor?: string
  checkboxDisabledCheckColor?: string
  checkboxDisabledCheckBg?: string
  checkboxSquareRadius?: string

  checkboxLargeSize?: string
  checkboxLargeLabelFs?: string

  checkboxButtonHeight?: string
  checkboxButtonMinWidth?: string
  checkboxButtonRadius?: string
  checkboxButtonBg?: string
  checkboxButtonFontSize?: string
  checkboxButtonBorder?: string
  checkboxButtonDisabledBorder?: string
}

export type collapseThemeVars = {
  collapseSidePadding?: string
  collapseBodyPadding?: string
  collapseHeaderPadding?: string
  collapseTitleColor?: string
  collapseTitleFs?: string
  collapseArrowSize?: string
  collapseArrowColor?: string
  collapseBodyFs?: string
  collapseBodyColor?: string
  collapseDisabledColor?: string
  collapseRetractFs?: string
  collapseMoreColor?: string
}

export type dividerThemeVars = {
  dividerPadding?: string
  dividerColor?: string
  dividerLineColor?: string
  dividerFs?: string
}

export type dropMenuThemeVars = {
  dropMenuHeight?: string
  dropMenuColor?: string
  dropMenuFs?: string
  dropMenuArrowFs?: string

  dropMenuSidePadding?: string
  dropMenuDisabledColor?: string
  dropMenuItemHeight?: string
  dropMenuItemColor?: string
  dropMenuItemFs?: string
  dropMenuItemColorActive?: string
  dropMenuItemColorTip?: string
  dropMenuItemFsTip?: string
  dropMenuOptionCheckSize?: string
  dropMenuLineColor?: string
  dropMenuLineHeight?: string
}

export type inputNumberThemeVars = {
  inputNumberColor?: string
  inputNumberBorderColor?: string
  inputNumberDisabledColor?: string
  inputNumberHeight?: string
  inputNumberBtnWidth?: string
  inputNumberInputWidth?: string
  inputNumberRadius?: string
  inputNumberFs?: string
  inputNumberIconSize?: string
  inputNumberIconColor?: string
}

export type inputThemeVars = {
  inputPadding?: string
  inputBorderColor?: string
  inputNotEmptyBorderColor?: string
  inputFs?: string
  inputFsLarge?: string
  inputIconMargin?: string
  inputColor?: string
  inputPlaceholderColor?: string
  inputDisabledColor?: string
  inputErrorColor?: string
  inputIconColor?: string
  inputClearColor?: string
  inputCountColor?: string
  inputCountCurrentColor?: string
  inputBg?: string

  inputCellBg?: string
  inputCellBorderColor?: string
  inputCellPadding?: string
  inputCellPaddingLarge?: string
  inputCellHeight?: string
  inputCellLabelWidth?: string
  inputInnerHeight?: string
  inputInnerHeightNoBorder?: string
  inputCountFs?: string
  inputCountFsLarge?: string
  inputIconSize?: string
  inputIconSizeLarge?: string
}

export type textareaThemeVars = {
  textareaPadding?: string
  textareaBorderColor?: string
  textareaNotEmptyBorderColor?: string
  textareaFs?: string
  textareaFsLarge?: string
  textareaIconMargin?: string
  textareaColor?: string
  textareaIconColor?: string
  textareaClearColor?: string
  textareaCountColor?: string
  textareaCountCurrentColor?: string
  textareaBg?: string
  textareaCellBorderColor?: string
  textareaCellPadding?: string
  textareaCellPaddingLarge?: string
  textareaCellHeight?: string
  textareaCountFs?: string
  textareaCountFsLarge?: string
  textareaIconSize?: string
  textareaIconSizeLarge?: string
}

export type loadmoreThemeVars = {
  loadmoreHeight?: string
  loadmoreColor?: string
  loadmoreFs?: string
  loadmoreErrorColor?: string
  loadmoreRefreshFs?: string
  loadmoreLoadingSize?: string
}

export type messageBoxThemeVars = {
  messageBoxWidth?: string
  messageBoxBg?: string
  messageBoxRadius?: string
  messageBoxPadding?: string
  messageBoxTitleFs?: string
  messageBoxTitleColor?: string
  messageBoxContentFs?: string
  messageBoxContentColor?: string
  messageBoxContentMaxHeight?: string
  messageBoxContentScrollbarWidth?: string
  messageBoxContentScrollbarColor?: string
  messageBoxInputErrorColor?: string
}

export type noticeBarThemeVars = {
  noticeBarFs?: string
  noticeBarLineHeight?: string
  noticeBarBorderRadius?: string
  noticeBarPadding?: string
  noticeBarWarningBg?: string
  noticeBarInfoBg?: string
  noticeBarDangerBg?: string
  noticeBarWarningColor?: string
  noticeBarInfoColor?: string
  noticeBarDangerColor?: string
  noticeBarPrefixSize?: string
  noticeBarCloseBg?: string
  noticeBarCloseSize?: string
  noticeBarCloseColor?: string
  noticeBarWrapPadding?: string
}

export type paginationThemeVars = {
  paginationContentPadding?: string
  paginationMessagePadding?: string
  paginationMessageFs?: string
  paginationMessageColor?: string
  paginationNavBorder?: string
  paginationNavBorderRadius?: string
  paginationNavFs?: string
  paginationNavWidth?: string
  paginationNavColor?: string
  paginationNavContentFs?: string
  paginationNavSepatatorPadding?: string
  paginationNavCurrentColor?: string
  paginationIconSize?: string
}

export type pickerThemeVars = {
  pickerToolbarHeight?: string
  pickerActionHeight?: string
  pickerToolbarFinishColor?: string
  pickerToolbarCancelColor?: string
  pickerToolbarFs?: string
  pickerToolbarTitleColor?: string
  pickerColumnFs?: string
  pickerBg?: string
  pickerColumnActiveFs?: string
  pickerColumnColor?: string
  pickerColumnHeight?: string
  pickerColumnItemHeight?: string
  pickerColumnSelectBg?: string
  pickerLoadingButtonColor?: string
  pickerColumnPadding?: string

  pickerColumnDisabledColor?: string
  pickerMask?: string
  pickerLoadingBg?: string
  pickerRegionSeparatorColor?: string
  pickerCellArrowSizeLarge?: string

  pickerRegionColor?: string
  pickerRegionBgActiveColor?: string

  pickerRegionFs?: string
}

export type colPickerThemeVars = {
  colPickerSelectedHeight?: string
  colPickerSelectedPadding?: string
  colPickerSelectedFs?: string
  colPickerSelectedColor?: string
  colPickerSelectedFw?: string
  colPickerLineWidth?: string
  colPickerLineHeight?: string
  colPickerLineColor?: string
  colPickerLineBoxShadow?: string
  colPickerListHeight?: string
  colPickerListPaddingBottom?: string
  colPickerListColor?: string
  colPickerListColorDisabled?: string
  colPickerListColorTip?: string
  colPickerListFs?: string
  colPickerListFsTip?: string
  colPickerListItemPadding?: string
  colPickerListCheckedIconSize?: string
  colPickerListColorChecked?: string
}

export type overlayThemeVars = {
  overlayBg?: string
  overlayBgDark?: string
}

export type popupThemeVars = {
  popupCloseSize?: string
  popupCloseColor?: string
}

export type progressThemeVars = {
  progressPadding?: string
  progressBg?: string
  progressDangerColor?: string
  progressSuccessColor?: string
  progressColor?: string
  progressLinearSuccessColor?: string
  progressLinearDangerColor?: string
  progressHeight?: string
  progressLabelColor?: string
  progressLabelFs?: string
  progressIconFs?: string
}

export type radioThemeVars = {
  radioMargin?: string
  radioLabelMargin?: string
  radioSize?: string
  radioBg?: string
  radioLabelFs?: string
  radioLabelColor?: string
  radioCheckedColor?: string
  radioDisabledColor?: string
  radioDisabledLabelColor?: string

  radioLargeSize?: string
  radioLargeLabelFs?: string

  radioButtonHeight?: string
  radioButtonMinWidth?: string
  radioButtonMaxWidth?: string
  radioButtonRadius?: string
  radioButtonBg?: string
  radioButtonFs?: string
  radioButtonBorder?: string
  radioButtonDisabledBorder?: string

  radioDotSize?: string
  radioDotLargeSize?: string
  radioDotCheckedBg?: string
  radioDotCheckedBorderColor?: string
  radioDotBorderColor?: string
  radioDotDisabledBorder?: string
  radioDotDisabledBg?: string
}

export type searchThemeVars = {
  searchSidePadding?: string
  searchPadding?: string
  searchInputRadius?: string
  searchInputBg?: string
  searchInputHeight?: string
  searchInputPadding?: string
  searchInputFs?: string
  searchInputColor?: string
  searchIconColor?: string
  searchIconSize?: string
  searchClearIconSize?: string
  searchPlaceholderColor?: string
  searchCancelPadding?: string
  searchCancelFs?: string
  searchCancelColor?: string
  searchLightBg?: string
}

export type sliderThemeVars = {
  sliderFs?: string
  sliderHandleRadius?: string
  sliderHandleBg?: string
  sliderAxieHeight?: string
  sliderColor?: string
  sliderAxieBg?: string
  sliderLineColor?: string
  sliderDisabledColor?: string
}

export type sortButtonThemeVars = {
  sortButtonFs?: string
  sortButtonColor?: string
  sortButtonHeight?: string
  sortButtonLineHeight?: string
  sortButtonLineColor?: string
}

export type stepsThemeVars = {
  stepsIconSize?: string
  stepsInactiveColor?: string
  stepsFinishedColor?: string
  stepsIconTextFs?: string
  stepsErrorColor?: string
  stepsTitleFs?: string
  stepsTitleFw?: string
  stepsLabelFs?: string
  stepsDescriptionColor?: string
  stepsIsIconWidth?: string
  stepsLineColor?: string
  stepsDotSize?: string
  stepsDotActiveSize?: string
}

export type switchThemeVars = {
  switchSize?: string
  switchWidth?: string
  switchHeight?: string
  switchCircleSize?: string
  switchBorderColor?: string
  switchActiveColor?: string
  switchActiveShadowColor?: string
  switchInactiveColor?: string
  switchInactiveShadowColor?: string
}

export type tabsThemeVars = {
  tabsNavArrowFs?: string
  tabsNavArrowOpenFs?: string
  tabsNavWidth?: string
  tabsNavHeight?: string
  tabsNavFs?: string
  tabsNavColor?: string
  tabsNavBg?: string
  tabsNavActiveColor?: string
  tabsNavDisabledColor?: string
  tabsNavLineHeight?: string
  tabsNavLineWidth?: string
  tabsNavLineBgColor?: string
  tabsNavMapFs?: string
  tabsNavMapColor?: string
  tabsNavMapArrowColor?: string
  tabsNavMapBtnBeforeBg?: string
  tabsNavMapButtonBackColor?: string
  tabsNavMapButtonRadius?: string
  tabsNavMapModalBg?: string
}

export type tagThemeVars = {
  tagFs?: string
  tagColor?: string
  tagSmallFs?: string
  tagInfoColor?: string
  tagPrimaryColor?: string
  tagDangerColor?: string
  tagWarningColor?: string
  tagSuccessColor?: string
  tagInfoBg?: string
  tagPrimaryBg?: string
  tagDangerBg?: string
  tagWarningBg?: string
  tagSuccessBg?: string
  tagRoundColor?: string
  tagRoundBorderColor?: string
  tagRoundRadius?: string
  tagMarkRadius?: string
  tagCloseSize?: string
  tagCloseColor?: string
  tagCloseActiveColor?: string
}

export type toastThemeVars = {
  toastPadding?: string
  toastMaxWidth?: string
  toastRadius?: string
  toastBg?: string
  toastFs?: string
  toastWithIconMinWidth?: string
  toastIconSize?: string
  toastIconMarginRight?: string
  toastLoadingPadding?: string
  toastBoxShadow?: string
}

export type loadingThemeVars = {
  loadingSize?: string
}

export type tooltipThemeVars = {
  tooltipBg?: string
  tooltipColor?: string
  tooltipRadius?: string
  tooltipArrowSize?: string
  tooltipFs?: string
  tooltipBlur?: string
  tooltipPadding?: string
  tooltipCloseSize?: string
  tooltipZIndex?: string
  tooltipLineHeight?: string
}

export type popoverThemeVars = {
  popoverBg?: string
  popoverColor?: string
  popoverBoxShadow?: string
  popoverArrowBoxShadow?: string
  popoverBorderColor?: string
  popoverRadius?: string
  popoverArrowSize?: string
  popoverFs?: string
  popoverPadding?: string
  popoverLineHeight?: string
  popoverZIndex?: string
}

export type gridItemThemeVars = {
  gridItemFs?: string
  gridItemBg?: string
  gridItemPadding?: string
  gridItemBorderColor?: string
}

export type statustipThemeVars = {
  statustipFs?: string
  statustipColor?: string
  statustipLineHeight?: string
  statustipPadding?: string
}

export type cardThemeVars = {
  cardBg?: string
  cardFs?: string
  cardPadding?: string
  cardFooterPadding?: string
  cardShadowColor?: string
  cardRadius?: string
  cardLineHeight?: string
  cardMargin?: string
  cardTitleColor?: string
  cardTitleFs?: string
  cardContentBorderColor?: string
  cardRectangleTitlePadding?: string
  cardRectangleContentPadding?: string
  cardRectangleFooterPadding?: string
  cardContentColor?: string
  cardContentLineHeight?: string
  cardContentMargin?: string
  cardContentRectangleMargin?: string
}

export type uploadThemeVars = {
  uploadSize?: string
  uploadEvokeIconSize?: string
  uploadEvokeBg?: string
  uploadEvokeColor?: string
  uploadEvokeDisabledColor?: string
  uploadCloseIconSize?: string
  uploadCloseIconColor?: string
  uploadProgressFs?: string
  uploadFileFs?: string
  uploadFileColor?: string
  uploadPreviewNameFs?: string
  uploadPreviewIconSize?: string
  uploadPreviewNameBg?: string
  uploadPreviewNameHeight?: string
  uploadCoverIconSize?: string
}

export type curtainThemeVars = {
  curtainContentRadius?: string
  curtainContentCloseColor?: string
  curtainContentCloseFs?: string
}

export type notifyThemeVars = {
  notifyTextColor?: string
  notifyPadding?: string
  notifyFontSize?: string
  notifyLineHeight?: string
  notifyPrimaryBackground?: string
  notifySuccessBackground?: string
  notifyDangerBackground?: string
  notifyWarningBackground?: string
}

export type skeletonThemeVars = {
  skeletonBackgroundColor?: string
  skeletonAnimationGradient?: string
  skeletonAnimationFlashed?: string
  skeletonTextHeightDefault?: string
  skeletonRectHeightDefault?: string
  skeletonCircleHeightDefault?: string
  skeletonRowMarginBottom?: string
  skeletonBorderRadiusText?: string
  skeletonBorderRadiusRect?: string
  skeletonBorderRadiusCircle?: string
}

export type circleThemeVars = {
  circleTextColor?: string
}

export type swiperThemeVars = {
  swiperRadius?: string
  swiperItemPadding?: string
}

export type swiperNavThemeVars = {
  // dot & dots-bar
  swiperNavDotColor?: string
  swiperNavDotActiveColor?: string
  swiperNavDotSize?: string
  swiperNavDotsBarActiveWidth?: string
  // fraction
  swiperNavFractionColor?: string
  swiperNavFractionBgColor?: string
  swiperNavFractionHeight?: string
  swiperNavFractionFontSize?: string
  // button
  swiperNavBtnColor?: string
  swiperNavBtnBgColor?: string
  swiperNavBtnSize?: string
}

export type segmentedThemeVars = {
  segmentedPadding?: string
  segmentedItemBgColor?: string
  segmentedItemColor?: string
  segmentedItemAcitveBg?: string
  segmentedItemDisabledColor?: string
}

export type tabbarThemeVars = {
  tabbarHeight?: string
  tabbarBoxShadow?: string
}

export type tabbarItemThemeVars = {
  tabbarItemTitleFontSize?: string
  tabbarItemTitleLineHeight?: string
  tabbarInactiveColor?: string
  tabbarActiveColor?: string
  tabbarItemIconSize?: string
}

export type navbarThemeVars = {
  navbarHeight?: string
  navbarColor?: string
  navbarBackground?: string
  navbarArrowSize?: string
  navbarDescFontSize?: string
  navbarDescFontColor?: string
  navbarTitleFontSize?: string
  navbarTitleFontWeight?: string
  navbarDisabledOpacity?: string
  navbarHoverColor?: string
}

export type navbarCapsuleThemeVars = {
  navbarCapsuleBorderColor?: string
  navbarCapsuleBorderRadius?: string
  navbarCapsuleWidth?: string
  navbarCapsuleHeight?: string
  navbarCapsuleIconSize?: string
}

export type tableThemeVars = {
  tableColor?: string
  tableBg?: string
  tableStripeBg?: string
  tableBorderColor?: string
  tableFontSize?: string
}

export type sidebarThemeVars = {
  sidebarBg?: string
  sidebarWidth?: string
  sidebarHeight?: string
}

export type sidebarItemThemeVars = {
  sidebarColor?: string
  sidebarItemHeight?: string
  sidebarItemLineHeight?: string
  sidebarDisabledColor?: string
  sidebarActiveColor?: string
  sidebarActiveBg?: string
  sidebarHoverBg?: string
  sidebarBorderRadius?: string
  sidebarFontSize?: string
  sidebarIconSize?: string
  sidebarActiveBorderWidth?: string
  sidebarActiveBorderHeight?: string
}

export type fabThemeVars = {
  fabTriggerHeight?: string
  fabTriggerWidth?: string
  fabActionsPadding?: string
  fabIconFs?: string
}

export type countDownThemeVars = {
  countDownTextColor?: string
  countDownFontSize?: string
  countDownLineHeight?: string
}

export type numberKeyboardThemeVars = {
  numberKeyboardKeyHeight?: string
  numberKeyboardKeyFontSize?: string
  numberKeyboardKeyBackground?: string
  numberKeyboardKeyBorderRadius?: string
  numberKeyboardDeleteFontSize?: string
  numberKeyboardKeyActiveColor?: string
  numberKeyboardButtonTextColor?: string
  numberKeyboardButtonBackground?: string
  numberKeyboardButtonActiveOpacity?: string
  numberKeyboardBackground?: string
  numberKeyboardTitleHeight?: string
  numberKeyboardTitleColor?: string
  numberKeyboardTitleFontSize?: string
  numberKeyboardClosePadding?: string
  numberKeyboardCloseColor?: string
  numberKeyboardCloseFontSize?: string
  numberKeyboardIconSize?: string
}

export type passwodInputThemeVars = {
  passwordInputHeight?: string
  passwordInputMargin?: string
  passwordInputFontSize?: string
  passwordInputRadius?: string
  passwordInputBackground?: string
  passwordInputInfoColor?: string
  passwordInputInfoFontSize?: string
  passwordInputBorderColor?: string
  passwordInputErrorInfoColor?: string
  passwordInputDotSize?: string
  passwordInputDotColor?: string
  passwordInputTextColor?: string
  passwordInputCursorColor?: string
  passwordInputCursorWidth?: string
  passwordInputCursorHeight?: string
  passwordInputCursorDuration?: string
}

export type formItemThemeVars = {
  formItemErrorMessageColor?: string
  formItemErrorMessageFontSize?: string
  formItemErrorMessageLineHeight?: string
}

export type backtopThemeVars = {
  backtopBg?: string
  backtopIconSize?: string
}

export type indexBarThemeVars = {
  indexBarIndexFontSize?: string
}

export type textThemeVars = {
  textInfoColor?: string
  textPrimaryColor?: string
  textErrorColor?: string
  textWarningColor?: string
  textSuccessColor?: string
}

export type videoPreviewThemeVars = {
  videoPreviewBg?: string
  videoPreviewCloseColor?: string
  videoPreviewCloseFontSize?: string
}

export type imgCropperThemeVars = {
  imgCropperIconSize?: string
  imgCropperIconColor?: string
}

export type ConfigProviderThemeVars = baseThemeVars &
  actionSheetThemeVars &
  badgeThemeVars &
  buttonThemeVars &
  cellThemeVars &
  calendarThemeVars &
  checkboxThemeVars &
  collapseThemeVars &
  dividerThemeVars &
  dropMenuThemeVars &
  inputNumberThemeVars &
  inputThemeVars &
  textareaThemeVars &
  loadmoreThemeVars &
  messageBoxThemeVars &
  noticeBarThemeVars &
  paginationThemeVars &
  pickerThemeVars &
  colPickerThemeVars &
  overlayThemeVars &
  popupThemeVars &
  progressThemeVars &
  radioThemeVars &
  searchThemeVars &
  sliderThemeVars &
  sortButtonThemeVars &
  stepsThemeVars &
  switchThemeVars &
  tabsThemeVars &
  tagThemeVars &
  toastThemeVars &
  loadingThemeVars &
  tooltipThemeVars &
  popoverThemeVars &
  gridItemThemeVars &
  statustipThemeVars &
  cardThemeVars &
  uploadThemeVars &
  curtainThemeVars &
  notifyThemeVars &
  skeletonThemeVars &
  circleThemeVars &
  swiperThemeVars &
  swiperNavThemeVars &
  segmentedThemeVars &
  tabbarThemeVars &
  tabbarItemThemeVars &
  navbarThemeVars &
  navbarCapsuleThemeVars &
  tableThemeVars &
  sidebarThemeVars &
  sidebarItemThemeVars &
  fabThemeVars &
  countDownThemeVars &
  numberKeyboardThemeVars &
  passwodInputThemeVars &
  formItemThemeVars &
  backtopThemeVars &
  indexBarThemeVars &
  textThemeVars &
  videoPreviewThemeVars &
  imgCropperThemeVars
