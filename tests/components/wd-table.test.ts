import { mount } from '@vue/test-utils'
import WdTable from '@/uni_modules/wot-design-uni/components/wd-table/wd-table.vue'
import { describe, expect, test } from 'vitest'

describe('WdTable', () => {
  test('基本渲染', async () => {
    const wrapper = mount(WdTable)
    expect(wrapper.classes()).toContain('wd-table')
  })

  test('表格数据渲染', async () => {
    const columns = [
      { label: '姓名', prop: 'name' },
      { label: '年龄', prop: 'age' },
      { label: '地址', prop: 'address' }
    ]
    const data = [
      { name: '张三', age: 25, address: '北京' },
      { name: '李四', age: 30, address: '上海' }
    ]
    const wrapper = mount(WdTable, {
      props: {
        columns,
        data
      }
    })
    const headers = wrapper.findAll('.wd-table__header-cell')
    expect(headers.length).toBe(3)
    expect(headers[0].text()).toBe('姓名')

    const rows = wrapper.findAll('.wd-table__row')
    expect(rows.length).toBe(2)
    const cells = wrapper.findAll('.wd-table__cell')
    expect(cells[0].text()).toBe('张三')
  })

  test('表头配置', async () => {
    const columns = [
      { label: '姓名', prop: 'name', width: '100px', align: 'center' },
      { label: '年龄', prop: 'age' }
    ]
    const wrapper = mount(WdTable, {
      props: {
        columns,
        data: []
      }
    })
    const headerCell = wrapper.find('.wd-table__header-cell')
    expect(headerCell.attributes('style')).toContain('width: 100px')
    expect(headerCell.classes()).toContain('is-center')
  })

  test('斑马纹', async () => {
    const wrapper = mount(WdTable, {
      props: {
        stripe: true,
        columns: [{ label: '姓名', prop: 'name' }],
        data: [{ name: '张三' }, { name: '李四' }]
      }
    })
    expect(wrapper.classes()).toContain('is-stripe')
  })

  test('边框', async () => {
    const wrapper = mount(WdTable, {
      props: {
        border: true,
        columns: [{ label: '姓名', prop: 'name' }],
        data: [{ name: '张三' }]
      }
    })
    expect(wrapper.classes()).toContain('is-border')
  })

  test('单元格点击事件', async () => {
    const columns = [{ label: '姓名', prop: 'name' }]
    const data = [{ name: '张三' }]
    const wrapper = mount(WdTable, {
      props: {
        columns,
        data
      }
    })
    const cell = wrapper.find('.wd-table__cell')
    await cell.trigger('click')
    expect(wrapper.emitted('cell-click')).toBeTruthy()
    expect(wrapper.emitted('cell-click')![0]).toEqual([
      {
        row: data[0],
        column: columns[0],
        rowIndex: 0,
        columnIndex: 0
      }
    ])
  })
})
