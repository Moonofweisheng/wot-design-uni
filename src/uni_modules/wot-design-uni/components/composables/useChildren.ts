import {
  provide,
  reactive,
  getCurrentInstance,
  type VNode,
  type InjectionKey,
  type VNodeNormalizedChildren,
  type ComponentPublicInstance,
  type ComponentInternalInstance
} from 'vue'

// 小程序端不支持从vue导出的isVNode方法，参考uni-mp-vue的实现
function isVNode(value: any): value is VNode {
  return value ? value.__v_isVNode === true : false
}

export function flattenVNodes(children: VNode | VNodeNormalizedChildren) {
  const result: VNode[] = []
  const traverse = (children: VNode | VNodeNormalizedChildren) => {
    if (!isVNode(children)) return

    if (Array.isArray(children?.children)) {
      children.children.forEach((child) => {
        if (isVNode(child)) {
          result.push(child)

          if (child.component?.subTree) {
            result.push(child.component.subTree)
            traverse(child.component.subTree)
          }

          if (child.children) {
            traverse(child)
          }
        }
      })
    } else if (children.component?.subTree) {
      traverse(children.component.subTree)
    }
  }

  traverse(children)

  return result
}

const findVNodeIndex = (vnodes: VNode[], vnode: VNode) => {
  const index = vnodes.indexOf(vnode)
  if (index === -1) {
    return vnodes.findIndex((item) => vnode.key !== undefined && vnode.key !== null && item.type === vnode.type && item.key === vnode.key)
  }
  return index
}

// sort children instances by vnodes order
export function sortChildren(
  parent: ComponentInternalInstance,
  publicChildren: ComponentPublicInstance[],
  internalChildren: ComponentInternalInstance[]
) {
  const vnodes = parent && parent.subTree && parent.subTree.children ? flattenVNodes(parent.subTree) : []
  internalChildren.sort((a, b) => findVNodeIndex(vnodes, a.vnode) - findVNodeIndex(vnodes, b.vnode))

  const orderedPublicChildren = internalChildren.map((item) => item.proxy!)

  publicChildren.sort((a, b) => {
    const getIndex = (comp: ComponentPublicInstance) => {
      const uid = comp.$.uid
      return orderedPublicChildren.findIndex((i) => i.$.uid === uid)
    }

    const indexA = getIndex(a)
    const indexB = getIndex(b)
    return indexA - indexB
  })
}

export function useChildren<
  // eslint-disable-next-line
  Child extends ComponentPublicInstance = ComponentPublicInstance<{}, any>,
  ProvideValue = never
>(key: InjectionKey<ProvideValue>) {
  const publicChildren: Child[] = reactive([])
  const internalChildren: ComponentInternalInstance[] = reactive([])
  const parent = getCurrentInstance()!

  const linkChildren = (value?: ProvideValue) => {
    const link = (child: ComponentInternalInstance) => {
      if (child.proxy) {
        internalChildren.push(child)
        publicChildren.push(child.proxy as Child)
        sortChildren(parent, publicChildren, internalChildren)
      }
    }

    const unlink = (child: ComponentInternalInstance) => {
      const index = internalChildren.indexOf(child)
      publicChildren.splice(index, 1)
      internalChildren.splice(index, 1)
    }

    provide(
      key,
      Object.assign(
        {
          link,
          unlink,
          children: publicChildren,
          internalChildren
        },
        value
      )
    )
  }

  return {
    children: publicChildren,
    linkChildren
  }
}
