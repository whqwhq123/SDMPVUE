const fsm = wx.getFileSystemManager();
const FILE_BASE_NAME = 'tmp_base64src'; //自定义文件名

async function base64src(base64data, cb) {
  const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64data) || [];

  if (!format) {
    return (new Error('ERROR_BASE64SRC_PARSE'));
  }
  const filePath = `${wx.env.USER_DATA_PATH}/${FILE_BASE_NAME}.${format}`;
  const buffer = wx.base64ToArrayBuffer(bodyData);
  let promise = new Promise((resolve, reject) => {
    fsm.writeFile({
        filePath,
        data: buffer,
        encoding: 'binary',
      success: res => {
        resolve(filePath)
      },
      fail: res => {
        // return (new Error('ERROR_BASE64SRC_WRITE', res));
        reject(res)
      }
    })
  })
  return promise
};

export { base64src };