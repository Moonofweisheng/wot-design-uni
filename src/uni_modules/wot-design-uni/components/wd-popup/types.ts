import { baseProps, makeBooleanProp, makeNumberProp, makeStringProp } from '../common/props'

export type PopupType = 'center' | 'top' | 'right' | 'bottom' | 'left'

export const popupProps = {
  ...baseProps,
  transition: String,
  closable: makeBooleanProp(false),
  position: makeStringProp<PopupType>('center'),
  closeOnClickModal: makeBooleanProp(true),
  duration: {
    type: [Number, Boolean],
    default: 300
  },
  modal: makeBooleanProp(true),
  zIndex: makeNumberProp(10),
  hideWhenClose: makeBooleanProp(true),
  modalStyle: makeStringProp(''),
  safeAreaInsetBottom: makeBooleanProp(false),
  modelValue: makeBooleanProp(false),
  lazyRender: makeBooleanProp(true),
  lockScroll: makeBooleanProp(true)
}
