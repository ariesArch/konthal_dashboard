const data = {
  name: {
    en: 'Name',
    mm: 'အမည်',
    icon: 'mdi-account'
  },
  name_mm: {
    en: 'Name MM',
    mm: 'အမည်',
    icon: 'mdi-account'
  },
  branch_name: {
    en: 'Branch Name',
    mm: 'ဆိုင်ခွဲအမည်',
    icon: 'mdi-account'
  },
  city_name: {
    en: 'City Name',
    mm: 'မြို့အမည်',
    icon: 'mdi-city'
  },
  township_name: {
    en: 'Township Name',
    mm: 'မြို့နယ်အမည်',
    icon: 'mdi-city'
  },
  description: {
    en: 'Description',
    mm: 'ဖော်ပြချက်'
  }
}
// export default (key) => {
//   return data[key] ? data[key] : null
// }
export const getLabel = (key) => {
  return data[key] ? data[key].mm : null
}
export const getIcon = (key) => {
  return data[key] ? data[key].icon : null
}
