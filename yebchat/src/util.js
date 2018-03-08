// 跳转
export function getRedirectPath({ type, avatar }){
  // 根据用户信息 返回跳转地址
  // 分别是
  // user.type --> /b or /g
  // user.avatar --> /binfo or /ginfo
  let url = (type==='b')?'/b':'/g';
  if (!avatar ) {
    url += 'info';
  }
  return url;
}
