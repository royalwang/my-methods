import Vue from 'vue'

/*
  首字母大写方法
 */
const upperFirst = (string) => {
  if (!string) return;
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Require in a base component context
const requireComponent = require.context(
  //所要注册的组件的文件夹位置
  '../components/', false, /\.vue$/
)

requireComponent.keys().forEach(fileName => {
  // Get component config
  const componentConfig = requireComponent(fileName)

  // Get PascalCase name of component
  // 组件首字母大写转换
  const componentName = upperFirst(
    fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')
  )
  // Register component globally
  // 全局注册
  Vue.component(componentName, componentConfig.default || componentConfig)
})
