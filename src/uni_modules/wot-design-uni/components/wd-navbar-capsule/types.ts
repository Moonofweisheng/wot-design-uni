import type { ExtractPropTypes } from 'vue'
import { baseProps } from '../common/props'

export const navbarCapsuleProps = {
  ...baseProps
}

export type NavbarCapsuleProps = ExtractPropTypes<typeof navbarCapsuleProps>
