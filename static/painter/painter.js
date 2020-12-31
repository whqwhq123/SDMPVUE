"use strict";

var _pen = _interopRequireDefault(require('./lib/pen.js'));

var _downloader = _interopRequireDefault(require('./lib/downloader.js'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var util = require('./lib/util.js');

var downloader = new _downloader["default"](); // 最大尝试的绘制次数

var MAX_PAINT_COUNT = 5;
Component({
  canvasWidthInPx: 0,
  canvasHeightInPx: 0,
  paintCount: 0,

  /**
   * 组件的属性列表
   */
  properties: {
    customStyle: {
      type: String
    },
    palette: {
      type: Object,
      observer: function observer(newVal, oldVal) {
        if (this.isNeedRefresh(newVal, oldVal)) {
          this.paintCount = 0;
          this.startPaint();
        }
      }
    },
    // 启用脏检查，默认 false
    dirty: {
      type: Boolean,
      value: false
    }
  },
  data: {
    picURL: '',
    showCanvas: true,
    painterStyle: ''
  },
  attached: function attached() {
    setStringPrototype();
  },
  methods: {
    /**
     * 判断一个 object 是否为 空
     * @param {object} object
     */
    isEmpty: function isEmpty(object) {
      for (var i in object) {
        return false;
      }

      return true;
    },
    isNeedRefresh: function isNeedRefresh(newVal, oldVal) {
      if (!newVal || this.isEmpty(newVal) || this.data.dirty && util.equal(newVal, oldVal)) {
        return false;
      }

      return true;
    },
    startPaint: function startPaint() {
      var _this = this;

      var that = this;

      if (this.isEmpty(this.properties.palette)) {
        return;
      }

      if (!(getApp().systemInfo && getApp().systemInfo.screenWidth)) {
        try {
          getApp().systemInfo = wx.getSystemInfoSync();
        } catch (e) {
          var error = "Painter get system info failed, ".concat(JSON.stringify(e));
          that.triggerEvent('imgErr', {
            error: error
          });
          console.error(error);
          return;
        }
      }

      screenK = getApp().systemInfo.screenWidth / 750;
      this.downloadImages().then(function (palette) {
        var width = palette.width,
            height = palette.height;
        _this.canvasWidthInPx = width.toPx();
        _this.canvasHeightInPx = height.toPx();

        if (!width || !height) {
          console.error("You should set width and height correctly for painter, width: ".concat(width, ", height: ").concat(height));
          return;
        }

        _this.setData({
          painterStyle: "width:".concat(width, ";height:").concat(height, ";")
        });

        var ctx = wx.createCanvasContext('k-canvas', _this);
        var pen = new _pen["default"](ctx, palette);
        pen.paint(function () {
          _this.saveImgToLocal();
        });
      });
    },
    downloadImages: function downloadImages() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        var preCount = 0;
        var completeCount = 0;
        var paletteCopy = JSON.parse(JSON.stringify(_this2.properties.palette));

        if (paletteCopy.background) {
          preCount++;
          downloader.download(paletteCopy.background).then(function (path) {
            paletteCopy.background = path;
            completeCount++;

            if (preCount === completeCount) {
              resolve(paletteCopy);
            }
          }, function () {
            completeCount++;

            if (preCount === completeCount) {
              resolve(paletteCopy);
            }
          });
        }

        if (paletteCopy.views) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            var _loop = function _loop() {
              var view = _step.value;

              if (view && view.type === 'image' && view.url) {
                preCount++;
                /* eslint-disable no-loop-func */

                downloader.download(view.url).then(function (path) {
                  view.url = path;
                  wx.getImageInfo({
                    src: view.url,
                    success: function success(res) {
                      // 获得一下图片信息，供后续裁减使用
                      view.sWidth = res.width;
                      view.sHeight = res.height;
                    },
                    fail: function fail(error) {
                      // 如果图片坏了，则直接置空，防止坑爹的 canvas 画崩溃了
                      view.url = "";
                      console.error("getImageInfo ".concat(view.url, " failed, ").concat(JSON.stringify(error)));
                    },
                    complete: function complete() {
                      completeCount++;

                      if (preCount === completeCount) {
                        resolve(paletteCopy);
                      }
                    }
                  });
                }, function () {
                  completeCount++;

                  if (preCount === completeCount) {
                    resolve(paletteCopy);
                  }
                });
              }
            };

            for (var _iterator = paletteCopy.views[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              _loop();
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }

        if (preCount === 0) {
          resolve(paletteCopy);
        }
      });
    },
    saveImgToLocal: function saveImgToLocal() {
      var _this3 = this;

      var that = this;
      setTimeout(function () {
        wx.canvasToTempFilePath({
          canvasId: 'k-canvas',
          success: function success(res) {
            that.getImageInfo(res.tempFilePath);
          },
          fail: function fail(error) {
            console.error("canvasToTempFilePath failed, ".concat(JSON.stringify(error)));
            that.triggerEvent('imgErr', {
              error: error
            });
          }
        }, _this3);
      }, 300);
    },
    getImageInfo: function getImageInfo(filePath) {
      var that = this;
      wx.getImageInfo({
        src: filePath,
        success: function success(infoRes) {
          if (that.paintCount > MAX_PAINT_COUNT) {
            var error = "The result is always fault, even we tried ".concat(MAX_PAINT_COUNT, " times");
            console.error(error);
            that.triggerEvent('imgErr', {
              error: error
            });
            return;
          } // 比例相符时才证明绘制成功，否则进行强制重绘制


          if (Math.abs((infoRes.width * that.canvasHeightInPx - that.canvasWidthInPx * infoRes.height) / (infoRes.height * that.canvasHeightInPx)) < 0.01) {
            that.triggerEvent('imgOK', {
              path: filePath
            });
            wx.setStorageSync('createImagePath', {
              path: filePath
            });
            console.log(filePath);
          } else {
            that.startPaint();
          }

          that.paintCount++;
        },
        fail: function fail(error) {
          console.error("getImageInfo failed, ".concat(JSON.stringify(error)));
          that.triggerEvent('imgErr', {
            error: error
          });
        }
      });
    }
  }
});
var screenK = 0.5;

function setStringPrototype() {
  /* eslint-disable no-extend-native */

  /**
   * 是否支持负数
   * @param {Boolean} minus 是否支持负数
   */
  String.prototype.toPx = function toPx(minus) {
    var reg;

    if (minus) {
      reg = /^-?[0-9]+([.]{1}[0-9]+){0,1}(rpx|px)$/g;
    } else {
      reg = /^[0-9]+([.]{1}[0-9]+){0,1}(rpx|px)$/g;
    }

    var results = reg.exec(this);

    if (!this || !results) {
      console.error("The size: ".concat(this, " is illegal"));
      return 0;
    }

    var unit = results[2];
    var value = parseFloat(this);
    var res = 0;

    if (unit === 'rpx') {
      res = Math.round(value * screenK);
    } else if (unit === 'px') {
      res = value;
    }

    return res;
  };
}