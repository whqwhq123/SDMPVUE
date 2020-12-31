"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var QR = require('./qrcode.js');

var GD = require('./gradient.js');

var Painter =
/*#__PURE__*/
function () {
  function Painter(ctx, data) {
    _classCallCheck(this, Painter);

    this.ctx = ctx;
    this.data = data;
    this.globalTextWidth = {};
    this.globalHeight = {};
    this.globalTextXorY = {};
  }

  _createClass(Painter, [{
    key: "paint",
    value: function paint(callback) {
      this.style = {
        width: this.data.width.toPx(),
        height: this.data.height.toPx()
      };

      this._background();

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.data.views[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var view = _step.value;

          this._drawAbsolute(view);
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

      this.ctx.draw(false, function () {
        callback();
      });
    }
  }, {
    key: "_background",
    value: function _background() {
      this.ctx.save();
      var _this$style = this.style,
          width = _this$style.width,
          height = _this$style.height;
      var bg = this.data.background;
      this.ctx.translate(width / 2, height / 2);

      this._doClip(this.data.borderRadius, width, height);

      if (!bg) {
        // 如果未设置背景，则默认使用白色
        this.ctx.setFillStyle('#fff');
        this.ctx.fillRect(-(width / 2), -(height / 2), width, height);
      } else if (bg.startsWith('#') || bg.startsWith('rgba') || bg.toLowerCase() === 'transparent') {
        // 背景填充颜色
        this.ctx.setFillStyle(bg);
        this.ctx.fillRect(-(width / 2), -(height / 2), width, height);
      } else if (GD.api.isGradient(bg)) {
        GD.api.doGradient(bg, width, height, this.ctx);
      } else {
        // 背景填充图片
        this.ctx.drawImage(bg, -(width / 2), -(height / 2), width, height);
      }

      this.ctx.restore();
    }
  }, {
    key: "_drawAbsolute",
    value: function _drawAbsolute(view) {
      // 证明 css 为数组形式，需要合并
      if (view.css && view.css.length) {
        /* eslint-disable no-param-reassign */
        view.css = Object.assign.apply(Object, _toConsumableArray(view.css));
      }

      switch (view.type) {
        case 'image':
          this._drawAbsImage(view);

          break;

        case 'text':
          this._fillAbsText(view);

          break;

        case 'rect':
          this._drawAbsRect(view);

          break;

        case 'qrcode':
          this._drawQRCode(view);

          break;

        default:
          break;
      }
    }
    /**
     * 根据 borderRadius 进行裁减
     */

  }, {
    key: "_doClip",
    value: function _doClip(borderRadius, width, height) {
      if (borderRadius && width && height) {
        var r = Math.min(borderRadius.toPx(), width / 2, height / 2); // 防止在某些机型上周边有黑框现象，此处如果直接设置 setFillStyle 为透明，在 Android 机型上会导致被裁减的图片也变为透明， iOS 和 IDE 上不会
        // setGlobalAlpha 在 1.9.90 起支持，低版本下无效，但把 setFillStyle 设为了 white，相对默认的 black 要好点

        this.ctx.setGlobalAlpha(0);
        this.ctx.setFillStyle('white');
        this.ctx.beginPath();
        this.ctx.arc(-width / 2 + r, -height / 2 + r, r, 1 * Math.PI, 1.5 * Math.PI);
        this.ctx.lineTo(width / 2 - r, -height / 2);
        this.ctx.arc(width / 2 - r, -height / 2 + r, r, 1.5 * Math.PI, 2 * Math.PI);
        this.ctx.lineTo(width / 2, height / 2 - r);
        this.ctx.arc(width / 2 - r, height / 2 - r, r, 0, 0.5 * Math.PI);
        this.ctx.lineTo(-width / 2 + r, height / 2);
        this.ctx.arc(-width / 2 + r, height / 2 - r, r, 0.5 * Math.PI, 1 * Math.PI);
        this.ctx.closePath();
        this.ctx.fill(); // 在 ios 的 6.6.6 版本上 clip 有 bug，禁掉此类型上的 clip，也就意味着，在此版本微信的 ios 设备下无法使用 border 属性

        if (!(getApp().systemInfo && getApp().systemInfo.version <= '6.6.6' && getApp().systemInfo.platform === 'ios')) {
          this.ctx.clip();
        }

        this.ctx.setGlobalAlpha(1);
      }
    }
    /**
     * 画边框
     */

  }, {
    key: "_doBorder",
    value: function _doBorder(view, width, height) {
      if (!view.css) {
        return;
      }

      var _view$css = view.css,
          borderRadius = _view$css.borderRadius,
          borderWidth = _view$css.borderWidth,
          borderColor = _view$css.borderColor;

      if (!borderWidth) {
        return;
      }

      this.ctx.save();

      this._preProcess(view, true);

      var r;

      if (borderRadius) {
        r = Math.min(borderRadius.toPx(), width / 2, height / 2);
      } else {
        r = 0;
      }

      var lineWidth = borderWidth.toPx();
      this.ctx.setLineWidth(lineWidth);
      this.ctx.setStrokeStyle(borderColor || 'black');
      this.ctx.beginPath();
      this.ctx.arc(-width / 2 + r, -height / 2 + r, r + lineWidth / 2, 1 * Math.PI, 1.5 * Math.PI);
      this.ctx.lineTo(width / 2 - r, -height / 2 - lineWidth / 2);
      this.ctx.arc(width / 2 - r, -height / 2 + r, r + lineWidth / 2, 1.5 * Math.PI, 2 * Math.PI);
      this.ctx.lineTo(width / 2 + lineWidth / 2, height / 2 - r);
      this.ctx.arc(width / 2 - r, height / 2 - r, r + lineWidth / 2, 0, 0.5 * Math.PI);
      this.ctx.lineTo(-width / 2 + r, height / 2 + lineWidth / 2);
      this.ctx.arc(-width / 2 + r, height / 2 - r, r + lineWidth / 2, 0.5 * Math.PI, 1 * Math.PI);
      this.ctx.closePath();
      this.ctx.stroke();
      this.ctx.restore();
    }
  }, {
    key: "_preProcess",
    value: function _preProcess(view, notClip) {
      var width;
      var height;
      var extra;

      switch (view.type) {
        case 'text':
          {
            var fontWeight = view.css.fontWeight === 'bold' ? 'bold' : 'normal';
            view.css.fontSize = view.css.fontSize ? view.css.fontSize : '20rpx';
            this.ctx.font = "normal ".concat(fontWeight, " ").concat(view.css.fontSize.toPx(), "px ").concat(view.css.fontFamily ? view.css.fontFamily : 'sans-serif'); // this.ctx.setFontSize(view.css.fontSize.toPx());
            
            var textLength = this.ctx.measureText(view.text).width;
            width = view.css.width ? view.css.width.toPx() : textLength; // 计算行数

            var calLines = Math.ceil(textLength / width);
            var lines = view.css.maxLines < calLines ? view.css.maxLines : calLines;
            var lineHeight = view.css.lineHeight ? view.css.lineHeight.toPx() : view.css.fontSize.toPx();
            height = lineHeight * lines;
            extra = {
              lines: lines,
              lineHeight: lineHeight
            };
            break;
          }

        case 'image':
          {
            // image 如果未设置长宽，则使用图片本身的长宽
            var ratio = getApp().systemInfo.pixelRatio ? getApp().systemInfo.pixelRatio : 2;
            width = view.css && view.css.width ? view.css.width.toPx() : Math.round(view.sWidth / ratio);
            height = view.css && view.css.height ? view.css.height.toPx() : Math.round(view.sHeight / ratio);
            break;
          }

        default:
          if (!(view.css.width && view.css.height)) {
            console.error('You should set width and height');
            return;
          }

          width = view.css.width.toPx();
          height = view.css.height.toPx();
          break;
      }

      var x;

      if (view.css && view.css.right) {
        if (typeof view.css.right === 'string') {
          x = this.style.width - view.css.right.toPx(true);
        } else {
          // 可以用数组方式，把文字长度计算进去
          // [right, 文字id, 乘数（默认 1）]
          var rights = view.css.right;
          x = this.style.width - rights[0].toPx(true) - this.globalTextWidth[rights[1]] * (rights[2] || 1);
        }
      } else if (view.css && view.css.left) {
        if (typeof view.css.left === 'string') {
          x = view.css.left.toPx(true);
        } else {
          var lefts = view.css.left;
          x = lefts[0].toPx(true) + this.globalTextWidth[lefts[1]] * (lefts[2] || 1);
        }
      } else {
        x = 0;
      }

      var y;

      if (view.css && view.css.bottom) {
        if (typeof view.css.bottom === 'string') {
          y = this.style.height - height - view.css.bottom.toPx(true);
        } else {
          // 可以用数组方式，把文字高度计算进去
          // [right, 文字id, 乘数（默认 1）]
          var bottoms = view.css.bottom;
          y = this.style.height - bottoms[0].toPx(true) - this.globalHeight[bottoms[1]] * (bottoms[2] || 1);
        }
      } else if (view.css && view.css.top) {
        if (typeof view.css.top === 'string') {
          y = view.css.top.toPx(true);
        } else {
          var tops = view.css.top;
          /**
           * @author yuhongru
           * y轴相对定位已指定id的元素为参照物
           * 此时 top[0] 为相对值
           * */

          var referenceY = this.globalTextXorY[tops[1]][1];
          var referenceH = this.globalHeight[tops[1]];
          y = tops[0].toPx(true) + referenceY + referenceH;
        }
      } else {
        y = 0;
      }

      if (typeof view.id !== 'undefined') {
        this.globalTextXorY[view.id] = [x, y];
      } // const y = view.css && view.css.bottom ? this.style.height - height - view.css.bottom.toPx(true) : (view.css && view.css.top ? view.css.top.toPx(true) : 0);


      var angle = view.css && view.css.rotate ? this._getAngle(view.css.rotate) : 0; // 当设置了 right 时，默认 align 用 right，反之用 left

      var align = view.css && view.css.align ? view.css.align : view.css && view.css.right ? 'right' : 'left';

      switch (align) {
        case 'center':
          this.ctx.translate(x, y + height / 2);
          break;

        case 'right':
          this.ctx.translate(x - width / 2, y + height / 2);
          break;

        default:
          this.ctx.translate(x + width / 2, y + height / 2);
          break;
      }

      this.ctx.rotate(angle);

      if (!notClip && view.css && view.css.borderRadius) {
        this._doClip(view.css.borderRadius, width, height);
      }

      this._doShadow(view);

      return {
        width: width,
        height: height,
        x: x,
        y: y,
        extra: extra
      };
    } // 画文字的背景图片

  }, {
    key: "_doBackground",
    value: function _doBackground(view) {
      this.ctx.save();

      var _this$_preProcess = this._preProcess(view, true),
          rawWidth = _this$_preProcess.width,
          rawHeight = _this$_preProcess.height;

      var _view$css2 = view.css,
          background = _view$css2.background,
          padding = _view$css2.padding;
      var pd = [0, 0, 0, 0];

      if (padding) {
        var pdg = padding.split(/\s+/);

        if (pdg.length === 1) {
          var x = pdg[0].toPx();
          pd = [x, x, x, x];
        }

        if (pdg.length === 2) {
          var _x = pdg[0].toPx();

          var y = pdg[1].toPx();
          pd = [_x, y, _x, y];
        }

        if (pdg.length === 3) {
          var _x2 = pdg[0].toPx();

          var _y = pdg[1].toPx();

          var z = pdg[2].toPx();
          pd = [_x2, _y, z, _y];
        }

        if (pdg.length === 4) {
          var _x3 = pdg[0].toPx();

          var _y2 = pdg[1].toPx();

          var _z = pdg[2].toPx();

          var a = pdg[3].toPx();
          pd = [_x3, _y2, _z, a];
        }
      }

      var width = rawWidth + pd[1] + pd[3];
      var height = rawHeight + pd[0] + pd[2];

      if (GD.api.isGradient(background)) {
        GD.api.doGradient(background, width, height, this.ctx);
      } else {
        this.ctx.setFillStyle(background);
      }

      this.ctx.fillRect(-(width / 2), -(height / 2), width, height);
      this.ctx.restore();
    }
  }, {
    key: "_drawQRCode",
    value: function _drawQRCode(view) {
      this.ctx.save();

      var _this$_preProcess2 = this._preProcess(view),
          width = _this$_preProcess2.width,
          height = _this$_preProcess2.height;

      if (view.id) {
        this.globalHeight[view.id] = height;
      }

      QR.api.draw(view.content, this.ctx, -width / 2, -height / 2, width, height, view.css.background, view.css.color);
      this.ctx.restore();

      this._doBorder(view, width, height);
    }
  }, {
    key: "_drawAbsImage",
    value: function _drawAbsImage(view) {
      if (!view.url) {
        return;
      }

      this.ctx.save();

      var _this$_preProcess3 = this._preProcess(view),
          width = _this$_preProcess3.width,
          height = _this$_preProcess3.height;

      if (view.id) {
        this.globalHeight[view.id] = height;
      } // 获得缩放到图片大小级别的裁减框


      var rWidth = view.sWidth;
      var rHeight = view.sHeight;
      var startX = 0;
      var startY = 0; // 绘画区域比例

      var cp = width / height; // 原图比例

      var op = view.sWidth / view.sHeight;

      if (cp >= op) {
        rHeight = rWidth / cp;
        startY = Math.round((view.sHeight - rHeight) / 2);
      } else {
        rWidth = rHeight * cp;
        startX = Math.round((view.sWidth - rWidth) / 2);
      }

      if (view.css && view.css.mode === 'scaleToFill') {
        this.ctx.drawImage(view.url, -(width / 2), -(height / 2), width, height);
      } else {
        this.ctx.drawImage(view.url, startX, startY, rWidth, rHeight, -(width / 2), -(height / 2), width, height);
      }

      this.ctx.restore();

      this._doBorder(view, width, height);
    }
  }, {
    key: "_fillAbsText",
    value: function _fillAbsText(view) {
      if (!view.text) {
        return;
      }

      view.text = view.text.toString();

      if (view.css.background) {
        // 生成背景
        this._doBackground(view);
      }

      this.ctx.save();

      var _this$_preProcess4 = this._preProcess(view),
          width = _this$_preProcess4.width,
          height = _this$_preProcess4.height,
          extra = _this$_preProcess4.extra;

      this.ctx.setFillStyle(view.css.color || 'black');
      var lines = extra.lines,
          lineHeight = extra.lineHeight;
      var preLineLength = Math.round(view.text.length / lines);
      var start = 0;
      var alreadyCount = 0; // 如果设置了id，则保留 text 的长度

      if (view.id) {
        var textWidth = this.ctx.measureText(view.text).width;
        var textHeight = this.ctx.measureText(view.text).height;
        this.globalTextWidth[view.id] = width ? textWidth < width ? textWidth : width : textWidth;
        this.globalHeight[view.id] = height ? textHeight < height ? textHeight : height : textHeight;
      }

      for (var i = 0; i < lines; ++i) {
        alreadyCount = preLineLength;
        var text = view.text.substr(start, alreadyCount);
        var measuredWith = this.ctx.measureText(text).width; // 如果测量大小小于width一个字符的大小，则进行补齐，如果测量大小超出 width，则进行减除
        // 如果已经到文本末尾，也不要进行该循环

        while (start + alreadyCount <= view.text.length && (width - measuredWith > view.css.fontSize.toPx() || measuredWith > width)) {
          if (measuredWith < width) {
            text = view.text.substr(start, ++alreadyCount);
          } else {
            if (text.length <= 1) {
              // 如果只有一个字符时，直接跳出循环
              break;
            }

            text = view.text.substr(start, --alreadyCount);
          }

          measuredWith = this.ctx.measureText(text).width;
        }

        start += text.length; // 如果是最后一行了，发现还有未绘制完的内容，则加...

        if (i === lines - 1 && start < view.text.length) {
          while (this.ctx.measureText("".concat(text, "...")).width > width) {
            if (text.length <= 1) {
              // 如果只有一个字符时，直接跳出循环
              break;
            }

            text = text.substring(0, text.length - 1);
          }

          text += '...';
          measuredWith = this.ctx.measureText(text).width;
        }

        this.ctx.setTextAlign(view.css.align ? view.css.align : 'left');
        var x = void 0;

        switch (view.css.align) {
          case 'center':
            x = 0;
            break;

          case 'right':
            x = width / 2;
            break;

          default:
            x = -(width / 2);
            break;
        }

        var y = -(height / 2) + (i === 0 ? view.css.fontSize.toPx() : view.css.fontSize.toPx() + i * lineHeight);

        if (view.css.textStyle === 'stroke') {
          this.ctx.strokeText(text, x, y, measuredWith);
        } else {
          this.ctx.fillText(text, x, y, measuredWith);
        }

        var fontSize = view.css.fontSize.toPx();

        if (view.css.textDecoration) {
          this.ctx.beginPath();

          if (/\bunderline\b/.test(view.css.textDecoration)) {
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x + measuredWith, y);
          }

          if (/\boverline\b/.test(view.css.textDecoration)) {
            this.ctx.moveTo(x, y - fontSize);
            this.ctx.lineTo(x + measuredWith, y - fontSize);
          }

          if (/\bline-through\b/.test(view.css.textDecoration)) {
            this.ctx.moveTo(x, y - fontSize / 3);
            this.ctx.lineTo(x + measuredWith, y - fontSize / 3);
          }

          this.ctx.closePath();
          this.ctx.setStrokeStyle(view.css.color);
          this.ctx.stroke();
        }
      }

      this.ctx.restore();

      this._doBorder(view, width, height);
    }
  }, {
    key: "_drawAbsRect",
    value: function _drawAbsRect(view) {
      this.ctx.save();

      var _this$_preProcess5 = this._preProcess(view),
          width = _this$_preProcess5.width,
          height = _this$_preProcess5.height;

      if (view.id) {
        this.globalHeight[view.id] = height;
      }

      if (GD.api.isGradient(view.css.color)) {
        GD.api.doGradient(view.css.color, width, height, this.ctx);
      } else {
        this.ctx.setFillStyle(view.css.color);
      }

      this.ctx.fillRect(-(width / 2), -(height / 2), width, height);
      this.ctx.restore();

      this._doBorder(view, width, height);
    } // shadow 支持 (x, y, blur, color), 不支持 spread
    // shadow:0px 0px 10px rgba(0,0,0,0.1);

  }, {
    key: "_doShadow",
    value: function _doShadow(view) {
      if (!view.css || !view.css.shadow) {
        return;
      }

      var box = view.css.shadow.replace(/,\s+/g, ',').split(' ');

      if (box.length > 4) {
        console.error('shadow don\'t spread option');
        return;
      }

      this.ctx.shadowOffsetX = parseInt(box[0], 10);
      this.ctx.shadowOffsetY = parseInt(box[1], 10);
      this.ctx.shadowBlur = parseInt(box[2], 10);
      this.ctx.shadowColor = box[3];
    }
  }, {
    key: "_getAngle",
    value: function _getAngle(angle) {
      return Number(angle) * Math.PI / 180;
    }
  }]);

  return Painter;
}();

exports["default"] = Painter;