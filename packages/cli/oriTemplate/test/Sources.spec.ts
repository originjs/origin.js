import { mount } from '@vue/test-utils'
import Sources from '@/components/Sources.vue'

const sourceOpitons = [
  {
    title: 'github',
    link: 'https://github.com/originjs/origin.js',
  },
  {
    title: 'docs',
    link: 'https://originjs.github.io/docs/',
  },
]

describe('Sources', () => {
  test('Sources link', () => {
    const wrapper = mount(Sources, {
      props: {
        list: sourceOpitons,
      },
    })

    expect(wrapper.find('[title = "github"]').attributes('href')).toBe(
      sourceOpitons[0].link,
    )
    expect(wrapper.find('[title = "docs"]').attributes('href')).toBe(
      sourceOpitons[1].link,
    )
  })
})
