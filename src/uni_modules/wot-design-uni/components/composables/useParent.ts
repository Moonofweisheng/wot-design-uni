import {
  ref,
  inject,
  computed,
  onUnmounted,
  type InjectionKey,
  getCurrentInstance,
  type ComponentPublicInstance,
  type ComponentInternalInstance,
  onMounted,
  type Ref,
  reactive
} from 'vue'

type ParentProvide<T> = T & {
  link(child: ComponentInternalInstance): void
  unlink(child: ComponentInternalInstance): void
  children: ComponentPublicInstance[]
  internalChildren: ComponentInternalInstance[]
}

type UseParentResult<T> = {
  parent: Ref<ParentProvide<T> | null>
  index: Ref<number>
}

export function useParent<T>(key: InjectionKey<ParentProvide<T>>): UseParentResult<T> {
  const result: UseParentResult<T> = {
    parent: ref(null),
    index: ref<number>(-1)
  }
  // #ifdef MP-TOUTIAO
  onMounted(() => {
    // #endif
    result.parent.value = inject(key, null)

    if (result.parent.value) {
      const instance = getCurrentInstance()!
      const { link, unlink, internalChildren } = result.parent.value

      link(instance)
      onUnmounted(() => unlink(instance))

      result.index.value = computed(() => internalChildren.indexOf(instance)).value
    }
    // #ifdef MP-TOUTIAO
  })
  // #endif

  return result
}
