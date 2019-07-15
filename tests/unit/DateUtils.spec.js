import DateUtils from '@/utils/DateUtils.vue'
import moment from 'moment'



describe('DateUtils.js', () => {
  it('returns the nfl week when passed a date', () => {
    const earlyDate = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})