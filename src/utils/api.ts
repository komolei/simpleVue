const getUrlParams = (param: string): string => {
  const url: string = window.location.href.toString()
  const urlArr: string[] = url
    .replace(/[\?\#]/g, '&')
    .split('&')
    .filter(function (item) {
      return item.indexOf('=')
    })
  const urlObj: any = {}
  urlArr.forEach(function (item) {
    urlObj[item.substr(0, item.indexOf('='))] = item.substr(
      item.indexOf('=') + 1,
      item.length
    )
  })
  return urlObj[param] ? urlObj[param] : ''
}

/**
 * localhost,test env use ajax ,prod env use apiPost
 * ajax
 */
const apiPost1 = (window as any).apiPost

function apiPost (url: any, data: any, success: any) {
  const otherParam = {
    sign: '64e85788c679a7a1140123d1eaeececd',
    token: '8935da137f77adeff85b0eec33033479'
  }
  //   return window.apiPost(url, data, success)
  const locationHref = window.location.href.toString()
  !/(localhost|file|test)/g.test(locationHref)
    ? useAjax(url, data, success)
    : apiPost1(url, data, success)

  // 格式化参数
  function formatParams (data: { [x: string]: string | number | boolean }) {
    const arr = []
    for (const name in data) {
      // encodeURIComponent() ：用于对 URI 中的某一部分进行编码
      arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]))
    }
    return arr.join('&')
  }
  function useAjax (url: string, data: any, success: (arg0: string) => any) {
    // 避免有特殊字符，必须格式化传输数据
    // let xhr: XMLHttpRequest
    let xhr: any

    // 实例化XMLHttpRequest对象
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest()
    }
    // 监听事件，只要 readyState 的值变化，就会调用 readystatechange 事件
    xhr.onreadystatechange = function () {
      // readyState属性表示请求/响应过程的当前活动阶段，4为完成，已经接收到全部响应数据
      if (xhr.readyState === 4) {
        const status = xhr.status
        // status：响应的HTTP状态码，以2开头的都是成功
        if (status >= 200 && status < 300) {
          let response: any
          // 判断接受数据的内容类型
          const type: any = xhr.getResponseHeader('Content-type')
          if (type.indexOf('xml') !== -1 && xhr.responseXML) {
            response = xhr.responseXML // Document对象响应
          } else if (type === 'application/json') {
            response = JSON.parse(xhr.responseText) // JSON响应
          } else {
            response = xhr.responseText // 字符串响应
          }
          // 成功回调函数
          success && success(response)
        }
      }
    }
    xhr.open('POST', url, true)
    // 必须，设置提交时的内容类型
    xhr.setRequestHeader(
      'Content-Type',
      'application/x-www-form-urlencoded; charset=UTF-8'
    )
    // 传输数据
    xhr.send(
      formatParams({
        ...otherParam,
        ...data,
        mode: 'web'
      })
    )
  }
}
export { getUrlParams, apiPost }
