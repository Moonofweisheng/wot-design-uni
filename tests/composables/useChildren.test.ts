import { flattenVNodes } from '@/uni_modules/wot-design-uni/components/composables/useChildren'
import { describe, expect, it } from 'vitest'
import { h, type VNode } from 'vue'

function createVNodeWithSubTree(subTree: VNode): VNode {
  const parent = h('div')
  // @ts-expect-error 模拟 component.subTree
  parent.component = { subTree }
  return parent
}

describe('flattenVNodes', () => {
  it('should return empty array if not a VNode', () => {
    const resultA = flattenVNodes(null as any)
    expect(resultA).toEqual([])

    const resultB = flattenVNodes([] as any)
    expect(resultB).toEqual([])
  })

  it('should flatten single-level VNodes', () => {
    const span = h('span')
    const root = h('div', [span])

    const resultA = flattenVNodes(span)
    expect(resultA).toEqual([span])

    const resultB = flattenVNodes(root)
    expect(resultB).toEqual([span])
  })

  it('Should flatten multiple VNodes in a single layer', () => {
    const child1 = h('span')
    const child2 = h('p')
    const root = h('div', [child1, child2])
    const result = flattenVNodes(root)
    expect(result).toEqual([child1, child2])
  })

  it('should flatten nested VNodes with children', () => {
    const child1 = h('span')
    const child2 = h('p')
    const nested = h('div', [child2])
    const root = h('div', [child1, nested])
    const result = flattenVNodes(root)
    expect(result).toEqual([child1, child2])
  })

  it('should include and traverse component.subTree', () => {
    const subChild = h('i')
    const subTree = h('div', [subChild])
    const compVNode = createVNodeWithSubTree(subTree)
    const root = h('div', [compVNode])
    const result = flattenVNodes(root)
    expect(result).toEqual([compVNode, subChild])
  })

  it('should handle top-level VNode with component.subTree', () => {
    const subChild = h('b')
    const subTree = h('section', [subChild])
    const top = h('div')
    // @ts-expect-error 模拟顶层 vnode 的 component.subTree
    top.component = { subTree }
    const result = flattenVNodes(top)
    expect(result).toEqual([top, subChild])
  })
})
