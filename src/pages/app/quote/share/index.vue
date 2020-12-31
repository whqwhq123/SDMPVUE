<template>
    <div style="height: 100%">
      <div class="app-authorization" v-if="wxAuthorization" @click.stop="wxAuthorization = false">
        <div class="app-authorization-box" @click.stop="() => {}">
          <div class="app-authorization-body">保存图片到相册需要您的授权</div>
          <div class="app-authorization-footer">
            <button @click="wxAuthorization = false" class="cancel">取消</button>
            <button open-type="openSetting" class="confirm" @opensetting="setImageAuthorization">确认</button>
          </div>
        </div>

      </div>
      <div class="app-authorization" v-if="mianduimianStatus" @click.stop="mianduimianStatus = false">
        <div class="app-authorization-box" @click.stop="() => {}">
          <img class="app-authorization-big-close" v-if="imageApi" :src="imageApi + '/weixin-close.png'" alt="" @click="mianduimianStatus = false">
          <div class="app-authorization-body">
            <div style="text-align: center;line-height: 60rpx">扫码解锁报价福利</div>
            <img :src="smallAppCodeUrl" alt="">
            <!--that.userInfo.foursId, 1, that.userInfo.userId, parseInt(that.quoteId)-->
          </div>
        </div>
      </div>
      <div @click="closeAction" style="height: calc(100% - 94rpx)" >
        <swiper class="swiper"  :autoplay="autoplay" :interval="interval" v-if="offer.length>0" style="height:464rpx">
          <block v-for="(item, index) in offer" :key="index">
              <swiper-item>
                  <image :src="item.picUrl" class="slide-image" mode="aspectFill" style="height:100%;width:100%"/>
              </swiper-item>
          </block>
      </swiper> 
        <div :class="['quote-container', actionStatus ? 'hasItem' : '' ]" id="quoteContainer">
          <div>
            <h1 class="car-name">{{ quoteInfo.modelName }}</h1>
            <h1 class="car-name">{{ quoteInfo.styleYear }}{{ quoteInfo.styleName }}</h1>
             <div class='color_text' v-if="quoteInfo.color">颜色：{{quoteInfo.color}}</div>
            <div class="quote-money">
              <span class="quote-money-unit">￥</span>
              <span><commaMoney :num="quoteInfo.nakedCar"></commaMoney></span>
            </div>
            <div class="money-group">
              <div class="old-money">
                <span>指导价：</span>
                <span><commaMoney :num="quoteInfo.priceVal"></commaMoney></span>
              </div>
              <div class="discount-money" v-if="quoteInfo.preferentialVal && quoteInfo.preferentialVal != 0">
                <span>优惠</span>
                <span id="preferentialVal"><commaMoney  :num="quoteInfo.preferentialVal"></commaMoney></span>
              </div>
            </div>
          </div>

          <!--贷款项-->
          <div class="loan-container" id="loanContainer" v-show="quoteInfo.loanIs === 1">
            <ul class="loan-money-group">
              <li class="loan-money-item">
                <div class="loan-money-item-title">首付</div>
                <div class="loan-money-item-num"><span id="loanPaymentPrice"><commaMoney :num="quoteInfo.loanPaymentPrice"></commaMoney></span></div>
              </li>
              <li class="loan-money-item">
                <div class="loan-money-item-title">月供</div>
                <div class="loan-money-item-num"><span id="loanMonthly"><commaMoney :num="quoteInfo.loanMonthly"></commaMoney></span></div>
              </li>
              <li class="loan-money-item">
                <div class="loan-money-item-title">贷款额</div>
                <div class="loan-money-item-num"><span id="loanLimit"><commaMoney :num="quoteInfo.loanLimit"></commaMoney></span></div>
              </li>
            </ul>

            <ul class="loan-group">
              <li class="loan-item">
                <div class="loan-item-title">期数</div>
                <div class="loan-item-num"><span id="loanStagesVal">{{quoteInfo.loanStagesVal}}</span></div>
              </li>
              <li class="loan-item">
                <div class="loan-item-title">首付比例</div>
                <div class="loan-item-num"><span id="paymentRatio">{{quoteInfo.paymentRatio * 100}}%</span></div>
              </li>
              <li class="loan-item">
                <div class="loan-item-title">金融服务费</div>
                <div class="loan-item-num"><span id="financialServicesCost"><commaMoney :num="quoteInfo.financialServicesCost"></commaMoney></span></div>
              </li>
            </ul>
          </div>
          <!--其他项列表-->
          <ul class="other-group">
            <li class="other-item" v-show="quoteInfo.purchaseTaxVal">
              <div class="other-item-central">
                <div>
                  <i class="quote-icon quote-gouzhishui"></i>
                  <span class="other-item-title">购置税</span>
                </div>
                <div class="other-item-value">
                  <span id="purchaseTaxVal"><commaMoney  :num="quoteInfo.purchaseTaxVal"></commaMoney></span>
                </div>
              </div>
            </li>
            <li class="other-item" v-show="quoteInfo.insureVal">
              <div class="other-item-central" >
                <div>
                  <i class="quote-icon quote-baoxian"></i>
                  <span class="other-item-title">保险(强交险、商业险、车船税)</span>
                </div>
                <div class="other-item-value">
                  <span id="insureVal"><commaMoney :num="quoteInfo.insureVal"></commaMoney></span>
                </div>
              </div>
            </li>
            <li class="other-item" v-show="quoteInfo.serviceVal">
              <div class="other-item-central">
                <div>
                  <i class="quote-icon quote-fuwufei"></i>
                  <span class="other-item-title">服务费</span>
                </div>
                <div class="other-item-value">
                  <span id="serviceVal"><commaMoney :num="quoteInfo.serviceVal"></commaMoney></span>
                </div>
              </div>
            </li>
            <li class="other-item" v-show="quoteInfo.addItemVal">
              <div class="other-item-central">
                <div>
                  <i class="quote-icon quote-zengxiang"></i>
                  <span class="other-item-title">增项</span>
                </div>
                <div class="other-item-value">
                  <span id="addItemVal"><commaMoney :num="quoteInfo.addItemVal"></commaMoney></span>
                </div>
              </div>
              <div class="other-item-remark" v-show="quoteInfo.addItemDesc">
                <span id="addItemDesc">{{quoteInfo.addItemDesc}}</span>
              </div>
            </li>
            <li class="other-item" v-show="quoteInfo.extensionInsuranceVal">
              <div class="other-item-central">
                <div>
                  <i class="quote-icon quote-yanbaochanpin"></i>
                  <span class="other-item-title">延保产品费用</span>
                </div>
                <div class="other-item-value">
                  <span id="extensionInsuranceVal"><commaMoney :num="quoteInfo.extensionInsuranceVal"></commaMoney></span>
                </div>
              </div>
              <div class="other-item-remark" v-show="quoteInfo.extensionInsuranceDesc">
                <span id="extensionInsuranceDesc">{{quoteInfo.extensionInsuranceDesc}}</span>
              </div>
            </li>
            <li class="other-item" v-show="quoteInfo.giveDesc">
              <div class="other-item-central">
                <div>
                  <i class="quote-icon quote-zengsongxiangmu"></i>
                  <span class="other-item-title">赠送项目</span>
                </div>
                <div class="other-item-value">
                  <!--<commaMoney :num="quoteInfo.giveVal"></commaMoney>-->
                </div>
              </div>
              <div class="other-item-remark" v-show="quoteInfo.giveDesc">
                <span id="giveDesc">{{quoteInfo.giveDesc}}</span>
              </div>
            </li>
            <li class="other-item" v-show="quoteInfo.residualVal">
              <div class="other-item-central" >
                <div>
                  <i class="quote-icon quote-ershouchecanzhi"></i>
                  <span class="other-item-title">二手车残值</span>
                </div>
                <div class="other-item-value negative">
                  <span id="residualVal"> <span>-</span><commaMoney :num="quoteInfo.residualVal"></commaMoney></span>
                </div>
              </div>
            </li>
            <li class="other-item"  v-show="quoteInfo.displaceVal">
              <div class="other-item-central">
                <div>
                  <i class="quote-icon quote-zhihuanbutie"></i>
                  <span class="other-item-title">置换补贴</span>
                </div>
                <div class="other-item-value negative">
                  <span id="displaceVal"><span>-</span><commaMoney :num="quoteInfo.displaceVal"></commaMoney></span>
                </div>
              </div>
            </li>
          </ul>
          <!--总价-->
          <div class="money-sum">
            <span class="money-sum-title">总价</span>
            <span class="money-sum-value" id="sumVal"><commaMoney :num="quoteInfo.sumVal"></commaMoney></span>
          </div>
          
          <div class="period_time" v-if="quoteInfo.validityPeriod">
            <div class='period_title'>报价有效期至</div>
            <div class='period_data'>{{quoteInfo.validityPeriod}}</div>
        </div>

        </div>
      </div>
      <div class="quote-action">
        <div class="quote-action-group" v-if="actionStatus">
          <ul class="quote-action-warp">
            <li class="quote-action-item" @click="getSalesCode">
              <img v-if="imageApi" :src="imageApi + '/icon-save.png'" alt="" >
              <div>生成美图</div>
            </li>
            <li class="quote-action-item" @click="showCode">
              <img v-if="imageApi" :src="imageApi + '/shart_code.png'" alt="">
              <div>面对面</div>
            </li>
            <li class="quote-action-item" @click="toOtherSmallApp">
              <img v-if="imageApi" :src="imageApi + '/icon-wechart.png'" alt="">
              <div>分享好友</div>
            </li>
          </ul>
        </div>
        <button class="quote-action-btn" @click="showAction" :style="{backgroundColor: vi.all.pageBtn.bgColor, color:  vi.all.pageBtn.color}">分享报价单</button>
      </div>
      <!--<painter :palette="imgDraw" /> -->
      <div style="position: absolute; top: -999999rpx">
      <!--<div>-->
        <painter :customStyle="customStyle" :palette="imgDraw" />
      </div>
    </div>
</template>

<script>
  /**
   * @author yuhongru
   * @email  yuhongru@atgco.cn
   * @date   2019/7/3 14:37
   **/
  import commaMoney from '../../../../components/quote/commaMoney'
  import { imageApi, saasApi } from "../../../../http/url"
  import { mapGetters, mapActions } from 'vuex'
  import { notice } from "../../../../utils/notice"

  export default {
    name: "index",
    components: {
      commaMoney,
      // painter
    },
    data () {
      return {
        offer:[],
        imageApi,
        saasApi,
        customStyle: 'width: 750rpx',
        actionStatus: false,
        mianduimianStatus: false,
        wxAuthorization: false,
        imgDraw: {},
        quoteInfo: {},
        quoteId: '',
        checkKey: [
          'loanPaymentPrice',
          'loanMonthly',
          'loanLimit',

          'loanStagesVal',
          'paymentRatio',
          'financialServicesCost',

          'preferentialVal',
          'residualVal',
          'displaceVal',
          'purchaseTaxVal',
          'insureVal',
          'serviceVal',
          'addItemVal',
          'addItemDesc',
          'giveDesc',
          'extensionInsuranceVal',
          'extensionInsuranceDesc',
          'loanStagesVal',
          'paymentRatio',
          'financialServicesCost',
          'sumVal'
        ],
        domObj: null,
        userInfos: null,
        salesCode: ''
      }
    },
    mounted() {
    },
    onShow () {
      // console.log(this.$root.$mp.query)
      this.domObj = null
      let { quoteId = '' } = this.$root.$mp.query
      this.quoteId = quoteId
      let quoteInfo = JSON.parse(JSON.stringify(this.quoteInfos))
      this.quoteInfo = quoteInfo
      this.userInfos = JSON.parse(JSON.stringify(this.userInfo))
      this.close(this.$root.$mp.query.carModelId)
    },
    onReady () {
      this.createImage()
    },
    onUnload () {
      this.actionStatus = false
    },
    computed: {
      ...mapGetters({
        'vi': 'vi',
        'userInfo': 'userInfo',
        'quoteInfos': 'quote/quoteInfo'
      }),
      smallAppCodeUrl () {
        return saasApi + 'weixin/qr.jpg?body=' + [this.userInfo.foursId, 1, this.userInfo.userId, parseInt(this.quoteId),,1].join() + '&type=salesman_4'
      },
      imgPath () {
        return mpvue.getStorageSync('createImagePath')
      },
      // 贷款项附加高度
      loanHeight () {
        return this.quoteInfo.loanIs ? 0 : 444
      },
      // 优惠canvas
      preferentialConfig () {
        if (!this.quoteInfo.preferentialVal) return [];
        let val = this.quoteInfo.preferentialVal
        return [
          {
            id: 'preferentialVal',
            type: 'text',
            text: '优惠 ' + val,
            css: {
              top: ['114rpx', 'styleName'],
              right: '48rpx',
              color: '#BB0A30',
              fontSize: '24rpx'
            }
          },
          {
            type: 'rect',
            css: {
              width: '48rpx',
              height: '48rpx',
              right: ['60rpx', 'preferentialVal'],
              borderRadius: '96rpx',
              top: ['102rpx', 'styleName'],
              color: '#BB0A30',
              fontSize: '24rpx'
            }
          },
          {
            type: 'rect',
            css: {
              width: '48rpx',
              height: '48rpx',
              right: '48rpx',
              borderRadius: '96rpx',
              top: ['102rpx', 'styleName'],
              color: '#BB0A30',
              fontSize: '24rpx'
            }
          },
          {
            type: 'text',
            text: '优惠 ' + val,
            css: {
              padding: '10rpx',
              lineHeight: '28rpx',
              top: ['112rpx', 'styleName'],
              right: '78rpx',
              background: '#BB0A30',
              color: '#fff',
              fontSize: '24rpx'
            }
          },
        ]
      },
      loanContainerConfig () {
        if (this.quoteInfo.loanIs) {
          return [
            {
              id: 'loadBox',
              type: 'rect',
              css: {
                height: '370rpx',
                width: '654rpx',
                top: ['206rpx', 'styleName'],
                left: '48rpx',
                borderWidth: '2rpx',
                borderColor: '#F2F2F2',
                borderRadius: '32rpx'
              }
            },
            {
              type: 'rect',
              css: {
                height: '140rpx',
                width: '654rpx',
                color: '#F7F7FA',
                top: ['206rpx', 'styleName'],
                left: '48rpx',
                borderRadius: '32rpx'
              }
            },
            {
              id: 'line-1',
              type: 'rect',
              css: {
                height: '96rpx',
                width: '2rpx',
                color: 'rgba(26,26,26,.1)',
                top: ['226rpx', 'styleName'],
                left: '268rpx'
              }
            },
            {
              id: 'line-2',
              type: 'rect',
              css: {
                height: '96rpx',
                width: '2rpx',
                color: 'rgba(26,26,26,.1)',
                top: ['226rpx', 'styleName'],
                left: '478rpx'
              }
            },
            ...this.loanPaymentPriceConfig,
            ...this.loanMonthlyConfig,
            ...this.loanLimitConfig,

            ...this.loanStagesConfig,
            ...this.paymentRatioConfig,
            ...this.financialServicesCostConfig
          ]
        } else {
          return []
        }
      },
      // 首付 loanPaymentPrice
      loanPaymentPriceConfig () {
        if (this.domObj && !this.quoteInfo.loanIs) {
          return []
        }
        return [
          {
            id: 'loanPaymentPriceVal',
            type: 'text',
            text: this.quoteInfo.loanPaymentPrice,
            css: {
              width: '216rpx',
              align: 'center',
              top: this.domObj ? this.domObj.loanPaymentPrice.top + 'px' : '',
              left: '156rpx',
              color: '#1A1A1A',
              fontSize: '34rpx',
              fontWeight: 'bold',

            }
          },
          {
            id: 'loanPaymentPriceTitle',
            type: 'text',
            text: '首付',
            css: {
              width: '216rpx',
              align: 'center',
              top: ['-43px', 'loanPaymentPriceVal'],
              left: '156rpx',
              color: '#1A1A1A',
              fontSize: '24rpx'
            }
          },
        ]
      },
      // 月供 loanMonthly
      loanMonthlyConfig () {
        if (this.domObj && !this.quoteInfo.loanIs) {
          return []
        }
        return [
          {
            id: 'loanMonthlyVal',
            type: 'text',
            text: this.quoteInfo.loanMonthly,
            css: {
              width: '216rpx',
              align: 'center',
              top: this.domObj ? this.domObj.loanMonthly.top + 'px' : '',
              left: '372rpx',
              color: '#1A1A1A',
              fontSize: '34rpx',
              fontWeight: 'bold',

            }
          },
          {
            id: 'loanMonthlyTitle',
            type: 'text',
            text: '月供',
            css: {
              width: '216rpx',
              align: 'center',
              top: ['-43px', 'loanMonthlyVal'],
              left: '372rpx',
              color: '#1A1A1A',
              fontSize: '24rpx'
            }
          },

        ]
      },
      // 贷款额 loanLimit
      loanLimitConfig () {
        if (this.domObj && !this.quoteInfo.loanIs) {
          return []
        }
        return [
          {
            id: 'loanLimitVal',
            type: 'text',
            text: this.quoteInfo.loanLimit,
            css: {
              width: '216rpx',
              align: 'center',
              top: this.domObj ? this.domObj.loanLimit.top + 'px' : '',
              left: '588rpx',
              color: '#1A1A1A',
              fontSize: '34rpx',
              fontWeight: 'bold'
            }
          },
          {
            id: 'loanLimitTitle',
            type: 'text',
            text: '贷款额',
            css: {
              width: '216rpx',
              align: 'center',
              top: ['-43px', 'loanLimitVal'],
              left: '588rpx',
              color: '#1A1A1A',
              fontSize: '24rpx'
            }
          },

        ]
      },
      // 期数 loanStagesVal
      loanStagesConfig () {
        if (this.domObj && !this.quoteInfo.loanIs) {
          return []
        }
        return [
          {
            id: 'loanStagesVal',
            type: 'text',
            text: this.quoteInfo.loanStagesVal,
            css: {
              top: this.domObj ? this.domObj.loanStagesVal.top + 'px' : '',
              right: '96rpx',
              color: '#1A1A1A',
              fontSize: '26rpx'
            }
          },
          {
            id: 'loanStagesTitle',
            type: 'text',
            text: '期数',
            css: {
              top: ['-26rpx', 'loanStagesVal'],
              left: '96rpx',
              color: '#767676',
              fontSize: '26rpx'
            }
          },

        ]
      },
      // 首付比例 paymentRatio
      paymentRatioConfig () {
        if (this.domObj && !this.quoteInfo.loanIs) {
          return []
        }
        return [
          {
            id: 'paymentRatioVal',
            type: 'text',
            text: this.quoteInfo.paymentRatio * 100 + '%',
            css: {
              top: this.domObj ? this.domObj.paymentRatio.top + 'px' : '',
              right: '96rpx',
              color: '#1A1A1A',
              fontSize: '26rpx'
            }
          },
          {
            id: 'paymentRatioTitle',
            type: 'text',
            text: '首付比例',
            css: {
              top: ['-26rpx', 'paymentRatioVal'],
              left: '96rpx',
              color: '#767676',
              fontSize: '26rpx'
            }
          },

        ]
      },
      // 金融服务费 financialServicesCost
      financialServicesCostConfig () {
        if (this.domObj && !this.quoteInfo.loanIs) {
          return []
        }
        return [
          {
            id: 'financialServicesCostVal',
            type: 'text',
            text: this.quoteInfo.financialServicesCost,
            css: {
              top: this.domObj ? this.domObj.financialServicesCost.top + 'px' : '',
              right: '96rpx',
              color: '#1A1A1A',
              fontSize: '26rpx'
            }
          },
          {
            id: 'financialServicesCostTitle',
            type: 'text',
            text: '金融服务费',
            css: {
              top: ['-26rpx', 'financialServicesCostVal'],
              left: '96rpx',
              color: '#767676',
              fontSize: '26rpx'
            }
          },

        ]
      },

      // 购置税 purchaseTaxVal
      purchaseTaxConfig () {
        let cha = 0
        if (this.quoteInfo.loanIs) {
          cha = 22
        }
        if (this.quoteInfo.purchaseTaxVal) {
          return [
            {
              id: 'purchaseTaxValue',
              type: 'text',
              text: this.quoteInfo.purchaseTaxVal,
              css: {
                top: this.domObj ? this.domObj.purchaseTaxVal.top + cha + 'px': '',
                right: '58rpx',
                color: '#BB0A30',
                fontSize: '28rpx'
              }
            },
            {
              id: 'purchaseTaxIcon',
              type: 'image',
              url: imageApi + '/quote-gouzhisui.png',
              css: {
                width: '48rpx',
                height: '48rpx',
                top: ['-36rpx', 'purchaseTaxValue'],
                left: '78rpx'
              }
            },
            {
              id: 'purchaseTaxTitle',
              type: 'text',
              text: '购置税',
              css: {
                top: ['-30rpx', 'purchaseTaxValue'],
                left: '150rpx',
                color: '#1A1A1A',
                fontSize: '28rpx'
              }
            },
            {
              id: 'purchaseTaxLine',
              type: 'rect',
              css: {
                width: '614rpx',
                height: '2rpx',
                color: '#F2F2F2',
                top: ['34rpx', 'purchaseTaxValue'],
                left: '78rpx'
              }
            }
          ]
        } else {
          return []
        }
      },
      // 保险（强交险、商业险、车船税）insureVal
      insureConfig () {
        let cha = 0
        if (this.quoteInfo.loanIs) {
          cha = 22
        }
        if (this.quoteInfo.insureVal) {
          return [
            {
              id: 'insureValue',
              type: 'text',
              text: this.quoteInfo.insureVal,
              css: {
                top: this.domObj ? this.domObj.insureVal.top + cha + 'px' : '',
                right: '58rpx',
                color: '#BB0A30',
                fontSize: '28rpx'
              }
            },
            {
              id: 'insureIcon',
              type: 'image',
              url: imageApi + '/quote-baoxian.png',
              css: {
                width: '48rpx',
                height: '48rpx',
                top: ['-36rpx', 'insureValue'],
                left: '78rpx'
              }
            },
            {
              id: 'insureTitle',
              type: 'text',
              text: '保险（强交险、商业险、车船税）',
              css: {
                top: ['-30rpx', 'insureValue'],
                left: '150rpx',
                color: '#1A1A1A',
                fontSize: '28rpx'
              }
            },

            {
              id: 'insureLine',
              type: 'rect',
              css: {
                width: '614rpx',
                height: '2rpx',
                color: '#F2F2F2',
                top: ['34rpx', 'insureValue'],
                left: '78rpx'
              }
            }
          ]
        } else {
          return []
        }
      },
      // 服务费 serviceVal
      serviceConfig () {
        let cha = 0
        if (this.quoteInfo.loanIs) {
          cha = 22
        }
        if (this.quoteInfo.serviceVal) {
          return [
            {
              id: 'serviceValue',
              type: 'text',
              text: this.quoteInfo.serviceVal,
              css: {
                top: this.domObj ? this.domObj.serviceVal.top + cha  + 'px' : '',
                right: '58rpx',
                color: '#BB0A30',
                fontSize: '28rpx'
              }
            },
            {
              id: 'serviceIcon',
              type: 'image',
              url: imageApi + '/quote-fuwufei.png',
              css: {
                width: '48rpx',
                height: '48rpx',
                top: ['-36rpx', 'serviceValue'],
                left: '78rpx'
              }
            },
            {
              id: 'serviceTitle',
              type: 'text',
              text: '服务费',
              css: {
                top: ['-30rpx', 'serviceValue'],
                left: '150rpx',
                color: '#1A1A1A',
                fontSize: '28rpx'
              }
            },
            {
              id: 'serviceLine',
              type: 'rect',
              css: {
                width: '614rpx',
                height: '2rpx',
                color: '#F2F2F2',
                top: ['34rpx', 'serviceValue'],
                left: '78rpx'
              }
            }
          ]
        } else {
          return []
        }
      },
      // 增项 addItemVal
      addItemConfig () {
        let cha = 0
        if (this.quoteInfo.loanIs) {
          cha = 22
        }
        if (this.quoteInfo.addItemVal) {
          return [
            {
              id: 'addItemValue',
              type: 'text',
              text: this.quoteInfo.addItemVal,
              css: {
                top: this.domObj ? this.domObj.addItemVal.top  + cha + 'px' : '',
                right: '58rpx',
                color: '#BB0A30',
                fontSize: '28rpx'
              }
            },
            {
              id: 'addItemIcon',
              type: 'image',
              url: imageApi + '/quote-zengxiang.png',
              css: {
                width: '48rpx',
                height: '48rpx',
                top: ['-36rpx', 'addItemValue'],
                left: '78rpx'
              }
            },
            {
              id: 'addItemTitle',
              type: 'text',
              text: '增项',
              css: {
                top: ['-30rpx', 'addItemValue'],
                left: '150rpx',
                color: '#1A1A1A',
                fontSize: '28rpx'
              }
            },
            {
              id: 'addItemDesc',
              type: 'text',
              text: this.quoteInfo.addItemDesc,
              css: {
                width: '542rpx',
                top: ['36rpx', 'addItemValue'],
                left: '150rpx',
                color: '#B3B3B3',
                fontSize: '26rpx'
              }
            },
            {
              id: 'addItemLine',
              type: 'rect',
              css: {
                width: '614rpx',
                height: '2rpx',
                color: '#F2F2F2',
                top: this.quoteInfo.addItemDesc ? ['42rpx', 'addItemDesc'] : ['36rpx', 'addItemTitle'],
                left: '78rpx'
              }
            }
          ]
        } else {
          return []
        }
      },
      // 延保产品费用 extensionInsuranceVal
      extensionInsuranceConfig () {
        let cha = 0
        if (this.quoteInfo.loanIs) {
          cha = 22
        }
        if (!this.quoteInfo.extensionInsuranceVal) {
          return []
        }
        return [
          {
            id: 'extensionInsuranceValue',
            type: 'text',
            text: this.quoteInfo.extensionInsuranceVal,
            css: {
              top: this.domObj ? this.domObj.extensionInsuranceVal.top  + cha + 'px' : '',
              right: '58rpx',
              color: '#BB0A30',
              fontSize: '28rpx'
            }
          },
          {
            id: 'extensionInsuranceIcon',
            type: 'image',
            url: imageApi + '/quote-yanqibaoxian.png',
            css: {
              width: '48rpx',
              height: '48rpx',
              top: [ '-36rpx','extensionInsuranceValue'],
              left: '78rpx'
            }
          },
          {
            id: 'extensionInsuranceTitle',
            type: 'text',
            text: '延保产品费用',
            css: {
              top: [ '-30rpx','extensionInsuranceValue'],
              left: '150rpx',
              color: '#1A1A1A',
              fontSize: '28rpx'
            }
          },

          {
            id: 'extensionInsuranceDesc',
            type: 'text',
            text: this.quoteInfo.extensionInsuranceDesc,
            css: {
              width: '542rpx',
              top:  [ '36rpx','extensionInsuranceValue'],
              left: '150rpx',
              color: '#B3B3B3',
              fontSize: '26rpx'
            }
          },
          {
            id: 'extensionInsuranceLine',
            type: 'rect',
            css: {
              width: '614rpx',
              height: '2rpx',
              color: '#F2F2F2',
              top: this.quoteInfo.extensionInsuranceDesc ? ['42rpx', 'extensionInsuranceDesc'] : ['36rpx', 'extensionInsuranceTitle'],
              left: '78rpx'
            }
          }
        ]
      },
      // 赠送项目  giveVal giveDesc
      giveConfig () {
        if (!this.quoteInfo.giveDesc) {
          return []
        }
        return [
          {
            id: 'giveDesc',
            type: 'text',
            text: this.quoteInfo.giveDesc,
            css: {
              width: '542rpx',
              top: this.domObj ? this.domObj.giveDesc.top + 'px' : '',
              left: '150rpx',
              color: '#B3B3B3',
              fontSize: '26rpx'
            }
          },
          {
            id: 'giveIcon',
            type: 'image',
            url: imageApi + '/quote-zengsongxiangmu.png',
            css: {
              width: '48rpx',
              height: '48rpx',
              top: [ '-50px','giveDesc'],
              left: '78rpx'
            }
          },
          {
            id: 'giveTitle',
            type: 'text',
            text: '赠送项目',
            css: {
              top: [ '-45px','giveDesc'],
              left: '150rpx',
              color: '#1A1A1A',
              fontSize: '28rpx'
            }
          },
          {
            id: 'giveLine',
            type: 'rect',
            css: {
              width: '614rpx',
              height: '2rpx',
              color: '#F2F2F2',
              top: this.quoteInfo.giveDesc ? ['42rpx', 'giveDesc'] : ['36rpx', 'giveTitle'],
              left: '78rpx'
            }
          }
        ]
      },
      // 二手车残值 residualVal
      residualConfig () {
        let cha = 0
        if (this.quoteInfo.loanIs) {
          cha = 22
        }
        if (!this.quoteInfo.residualVal) {
          return []
        }
        return [
          {
            id: 'residualValue',
            type: 'text',
            text: this.quoteInfo.residualVal ? '-' + this.quoteInfo.residualVal : '',
            css: {
              top: this.domObj ? this.domObj.residualVal.top + cha  + 'px' : '',
              right: '58rpx',
              color: '#40B671',
              fontSize: '28rpx'
            }
          },
          {
            id: 'residualIcon',
            type: 'image',
            url: imageApi + '/quote-ershouchecanzhi.png',
            css: {
              width: '48rpx',
              height: '48rpx',
              top: [ '-36rpx','residualValue'],
              left: '78rpx'
            }
          },
          {
            id: 'residualTitle',
            type: 'text',
            text: '二手车残值',
            css: {
              top:  [ '-30rpx','residualValue'],
              left: '150rpx',
              color: '#1A1A1A',
              fontSize: '28rpx'
            }
          },

          {
            id: 'residualLine',
            type: 'rect',
            css: {
              width: '614rpx',
              height: '2rpx',
              color: '#F2F2F2',
              top: [ '36rpx','residualTitle'],
              left: '78rpx'
            }
          }
        ]
      },
      // 置换补贴 displaceVal
      displaceConfig () {
        let cha = 0
        if (this.quoteInfo.loanIs) {
          cha = 22
        }
        if (!this.quoteInfo.displaceVal) {
          return []
        }
        return [
          {
            id: 'displaceValue',
            type: 'text',
            text: this.quoteInfo.displaceVal ? '-' + this.quoteInfo.displaceVal : '',
            css: {
              top: this.domObj ? this.domObj.displaceVal.top + cha  + 'px' : '',
              right: '58rpx',
              color: '#40B671',
              fontSize: '28rpx'
            }
          },
          {
            id: 'displaceIcon',
            type: 'image',
            url: imageApi + '/quote-zhihuanbutie.png',
            css: {
              width: '48rpx',
              height: '48rpx',
              top: [ '-36rpx','displaceValue'],
              left: '78rpx'
            }
          },
          {
            id: 'displaceTitle',
            type: 'text',
            text: '置换补贴',
            css: {
              top: [ '-30rpx','displaceValue'],
              left: '150rpx',
              color: '#1A1A1A',
              fontSize: '28rpx'
            }
          },

          {
            id: 'displaceLine',
            type: 'rect',
            css: {
              width: '614rpx',
              height: '2rpx',
              color: '#F2F2F2',
              top: [ '36rpx','displaceTitle'],
              left: '78rpx'
            }
          }
        ]
      },
      // 总价
      sumValConfig () {
        if (this.domObj && !this.domObj.sumVal) {
          return []
        }
        
        let result= [
          {
            id: 'sumValTitle',
            type: 'text',
            text: '总价 ' + this.quoteInfo.sumVal,
            css: {
              top: this.domObj ? this.domObj.sumVal.top + 'px' : '',
              right: '58rpx',
              color: '#BB0A30',
              fontWeight: 'bold',
              fontSize: '32rpx'
            }
          }
        ]

      if(this.quoteInfo.validityPeriod){
          result.concat([
            {
            id: 'sumValTitle',
            type: 'rect',
            css: {
              width: '653rpx',
              height: '68rpx',
              borderRadius: '4rpx',
              top: this.domObj ? this.domObj.sumVal.top+40 + 'px' : '',
              left: '48rpx',
              color: '#F2F1F6',
              fontSize: '26rpx'
            }
          },{
            type: 'text',
            text: '报价有效期至   '+ this.quoteInfo.validityPeriod,
            
            maxLines: 1,
            css: {
              width: '653rpx',
              left: '68rpx',
              color: '#B3B3B3',
              fontSize: '26rpx',
              top: this.domObj ? this.domObj.sumVal.top+50 + 'px' : '',
            }
          }])
        }

        return result;

      },
      // 活动
      activitiesConfig () {
        let aName = '', aDesc = '';
        if (!this.quoteInfo.activeList || this.quoteInfo.activeList.length === 0) {
          return []
        }
        if (this.quoteInfo.activeList && this.quoteInfo.activeList.length > 0 ) {
          aName = this.quoteInfo.activeList[0].activityName
          aDesc = this.quoteInfo.activeList[0].activityDesc
        }
        return [
          {
            id: 'activitiesBox',
            type: 'image',
            url: imageApi + '/activities_bg.png',
            css: {
              width: '696rpx',
              height: '151rpx',
              top: [ '48rpx','sumValTitle'],
              left: '26rpx'
            }
          },
          {
            id: 'activitiesName',
            type: 'text',
            text: aName,
            css: {
              width: '576rpx',
              top: [ '86rpx','sumValTitle'],
              left: '86rpx',
              color: '#E8CDAA',
              fontSize: '28rpx',
              maxLines: 1
            }
          },
          {
            id: 'activitiesDesc',
            type: 'text',
            text: aDesc,
            css: {
              width: '576rpx',
              top: [ '138rpx','sumValTitle'],
              left: '86rpx',
              color: '#FFFFFF',
              fontSize: '22rpx',
              maxLines: 1
            }
          },
        ]
      },
      // 二维码
      qrCodeConfig () {
        return [
          {
            id: 'qrCodeImage',
            type: 'image',
            url: this.smallAppCodeUrl,
            css: {
              width: '200rpx',
              height: '200rpx',
              left: '276rpx',
              top: this.quoteInfo.activeList && this.quoteInfo.activeList.length > 0  ? ['102rpx', 'activitiesBox'] : ['102rpx', 'sumValTitle'],
              // top: ['102rpx', 'activitiesBox'],
            }
          },
          {
            id: 'qrCodeText',
            type: 'text',
            text: '长按扫描查看报价单',
            css: {
              left: '375rpx',
              align: 'center',
              color: '#B3B3B3',
              fontSize: '24rpx',
              top: this.quoteInfo.activeList && this.quoteInfo.activeList.length > 0  ? ['48rpx', 'activitiesBox'] : ['48rpx', 'sumValTitle'],
              // top: ['48rpx', 'activitiesBox'],
            }
          }
        ]
      },
      // 店铺信息
      shopInfo () {
        if(this.quoteInfo.isShowStore==2){
          return []
        }
        return [
          {
            id: 'shopBox',
            type: 'rect',
            css: {
              width: '653rpx',
              height: '162rpx',
              left: '48rpx',
              color: '#F2F1F6',
              borderRadius: '8rpx',
              top: ['64rpx', 'qrCodeImage']
            }
          },
          {
            id: 'shopLogo',
            type: 'image',
            url: this.userInfos ? this.userInfo.logo : '',
            css: {
              width: '120rpx',
              height: '120rpx',
              left: '72rpx',
              top: ['84rpx', 'qrCodeImage'],
            }
          },
          {
            id: 'shopName',
            type: 'text',
            text: this.userInfos ? this.userInfos.foursName : '',
            maxLines: 1,
            css: {
              width: '456rpx',
              left: '206rpx',
              color: '#1A1A1A',
              fontSize: '26rpx',
              fontWeight: 'bold',
              top: ['86rpx', 'qrCodeImage'],
            }
          },
          {
            id: 'shopPhone',
            type: 'text',
            text: '电话: ' +  (this.userInfos ? this.userInfos.phone : ''),
            maxLines: 1,
            css: {
              width: '456rpx',
              left: '206rpx',
              color: '#1A1A1A',
              fontSize: '24rpx',

              top: ['128rpx', 'qrCodeImage'],
            }
          },
          {
            id: 'shopAdress',
            type: 'text',
            text: '地址：' + (this.userInfos ? this.userInfos.fullAddress : ''),
            maxLines: 1,
            css: {
              width: '456rpx',
              left: '206rpx',
              color: '#1A1A1A',
              fontSize: '24rpx',
              top: ['168rpx', 'qrCodeImage'],
            }
          }
        ]
      }

    },
    methods: {
      ...mapActions({
        'getSmallCode': 'leaveInfo/getSmallCode',
        'create':'quote/create',
      }),
      async close(id) {
        let arr=[]
        let res=await this.create({carModelId:id})
        if(res.code==0) {
          if(res.data.length>=5) {
             res.data.slice(0,5).forEach((item,index)=>{
               if(item.picUrl!=null) {
                 arr.push(item)
               }else {

               }
             })
             this.offer=arr
          }else {
            this.offer=res.data
          }
        }
      },
      closeAction() {
        console.log('关闭分享操作菜单')
        this.actionStatus = false
      },
      onImgOK(e) {
        this.imagePath = e.detail.path;
      },
      setImageAuthorization (res) {
        this.wxAuthorization = false
      },
      // 获取小程序码
      async getSalesCode (type = 0) {
        if (type !== 1) {
          type = 0
        }
        if (type === 0) {
          this.saveImage()
        } else {
          console.log('打开小程序二维码弹框')
          this.mianduimianStatus = true
        }
      },


      // 显示操作按钮组
      showAction () {
        this.actionStatus = true
      },
      async createImage() {
        let domNameList = this.checkDom(this.checkKey)
        domNameList = domNameList.concat(['quoteContainer', 'sumVal'])
        let elNameList = [];
        domNameList.forEach((name) => {
          elNameList.push(this.elQuery('#' + name))
        })
        let DOMList = await Promise.all(elNameList)
        this.domObj = {}
        DOMList.forEach((item) => {
          if (!item) { return }
          item.top = item.top + 20
          this.domObj[item.id] = item
        })
        let quoteInfo = this.quoteInfo
        let quoteContainerHeight = this.domObj ? this.domObj.quoteContainer.height : 0;
        let activityHeight = this.quoteInfo.activeList.length > 0 ? 100 : 0
        let otherHeight = 288
        let canvarHeight = quoteContainerHeight + activityHeight + otherHeight;
        this.imgDraw ={
          width: '750rpx',
          height:  canvarHeight + 'px',
          background: '#fff',
          views: [
            {
              type: 'text',
              text: quoteInfo.modelName,
              css: {
                top: '48rpx',
                left: '48rpx',
                color: '#1A1A1A',
                fontSize: '52rpx'
              }
            },
            {
              id: 'styleName',
              type: 'text',
              text: quoteInfo.styleYear + quoteInfo.styleName,
              css: {
                width: '654rpx',
                top: '146rpx',
                left: '48rpx',
                color: '#1A1A1A',
                fontSize: '52rpx',
              }
            },
            {
              type: 'text',
              text:  quoteInfo.color? '颜色 '+quoteInfo.color :'',
              css: {
                 top: ['30rpx', 'styleName'],
               
                left: '48rpx',
                color: '#666666',
                fontSize: '22rpx'
              }
            },
            {
              type: 'text',
              text: '￥',
              css: {
                top: ['76rpx', 'styleName'],
                left: '48rpx',
                color: '#1A1A1A',
                fontSize: '32rpx',
                fontWeight: 'bold'
              }
            },
            {
              id: 'nakedCar',
              type: 'text',
              text: this.quoteInfo.nakedCar,
              css: {
                top: ['60rpx', 'styleName'],
                left: '80rpx',
                color: '#1A1A1A',
                fontSize: '52rpx',
                fontWeight: 'bold'
              }
            },
            {
              type: 'text',
              text: '指导价:' + this.quoteInfo.priceVal,
              css: {
                top: ['24rpx', 'nakedCar'],
                left: '48rpx',
                color: '#1A1A1A',
                fontSize: '26rpx',
                textDecoration: 'line-through'
              }
            },

            ...this.preferentialConfig,
            ...this.loanContainerConfig,
            ...this.purchaseTaxConfig,
            ...this.insureConfig,
            ...this.serviceConfig,
            ...this.addItemConfig,
            ...this.extensionInsuranceConfig,
            ...this.giveConfig,
            ...this.residualConfig,
            ...this.displaceConfig,
            ...this.sumValConfig,
            ...this.activitiesConfig,
            ...this.qrCodeConfig,
            ...this.shopInfo
          ]
        }
        console.table(this.imgDraw)
      },
      async saveImage() {
        let that = this;
        let { path: __path } = mpvue.getStorageSync('createImagePath')
        console.log('生成图片路径', __path)
        mpvue.saveImageToPhotosAlbum({
          filePath: __path,
          success(res) {
            notice({ title: '已保存至您的相册' })
          },
          fail(res) {
            if (res.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || res.errMsg === "saveImageToPhotosAlbum:fail auth deny" || res.errMsg === "saveImageToPhotosAlbum:fail authorize no response") {
              that.wxAuthorization = true
            }
            console.error(res)
          }
        });
      },
      /**
       * 跳转留资小程序
       * @param scene  4S店 类型 销售ID 报价单ID
       * */
      toOtherSmallApp () {
        let that = this
        let params = [that.userInfo.foursId, 1, that.userInfo.userId, parseInt(that.quoteId)].join()
        console.log(params)
        mpvue.navigateToMiniProgram({
          appId: 'wxb531f813eaa2c2ea',
          path: '/pages/sell/index?scene='+ params,
          // extraData: {//传递的参数
          //      scene: params
          // },
          envVersion: 'trial',
          success (res) {
            console.log('跳转c端销售落地页',res)
          }
        })
      },
      showCode () {
        this.getSalesCode(1)
      },
      /**
       * 检查是否有值 返回有值的Key
       * @param Array 检查的Key的集合
       * @return Array 有值的Key的集合
       * @desc 此处key作为DOM Id 从而确定 显示的DOM
       * */
      checkDom (arr) {
        let returnArr = []
        arr.forEach((key) => {
          if (Array.isArray(this.quoteInfo[key])) {
            if (this.quoteInfo[key].length > 0) {
              returnArr.push(key)
            }
          } else{
            if (this.quoteInfo[key] && this.quoteInfo[key] !== 0 && this.quoteInfo[key] !== '0') {
              returnArr.push(key)
            } else {
            }
          }
        })
        return returnArr
      },
      // 查询DOM
      async elQuery (str) {
        let promise = new Promise(function(resolve, reject) {
          const query = mpvue.createSelectorQuery();
          query.select(str).boundingClientRect(function(rect){
            console.log(str, rect)
            resolve(rect)    // 节点的上边界坐标
          }).exec()
        });
        return promise
      },
      subtractLoanHeight (num) {
        return num - this.loanHeight + 'rpx'
      }
    }
  }
</script>

<style scoped>
  @import "../../../../assets/quote/icon.css";

  .quote-container{
     padding: 48rpx 48rpx 94rpx;
   }
  .quote-container.hasItem {
    padding-bottom: 234rpx;
  }
  .car-name{
    color: #1A1A1A;
    font-size: 52rpx;
    line-height: 1;
    font-weight: 500;
    margin-bottom: 26rpx;
  }
  .quote-money{
    padding-top: 34rpx;
    font-size: 48rpx;
    line-height: 1;
    color: #1A1A1A;
    font-weight: bold;
    vertical-align: bottom;
  }
  .quote-money-unit{
    font-size: 32rpx;
    vertical-align: bottom;
  }

  .money-group{
    display: flex;
    margin-bottom: 44rpx;
    justify-content: space-between;
  }
  .old-money {
    position: relative;
    display: inline-block;
    font-size: 26rpx;
    margin-top: 22rpx;
    line-height: 1;
  }
  .old-money:before{
    position: absolute;
    content: '';
    display: block;
    top: 50%;
    width: 100%;
    border-bottom: 2px solid #1A1A1A;
  }
  .discount-money{
    display: inline-block;
    padding: 0 32rpx;
    color: #fff;
    font-size: 24rpx;
    text-align: center;
    line-height: 48rpx;
    border-radius: 48rpx;
    background-color: #BB0A30;
  }
  /*贷款项样式*/
  .loan-container{
    border: 1px solid rgba(242,242,242,1);
    border-radius: 32rpx;
  }
  .loan-money-group{
    background-color: #F7F7FA;
    border-radius: 32rpx;
    padding: 26rpx 0 28rpx 0;
    display: flex;
  }
  .loan-money-item {
    flex: 1;
    color: #1A1A1A;
    line-height: 1;
    max-width: 33.3333%;
    text-align: center;
    border-right: 1px solid rgba(26,26,26,.1);
  }
  .loan-money-item:last-of-type{
    border-right: none;
  }
  .loan-money-item-title{
    font-size: 24rpx;
  }
  .loan-money-item-num{
    font-size: 34rpx;
    font-weight: bold;
    margin-top: 24rpx;
  }


  .loan-group{
    padding-top: 29rpx;
    padding-bottom: 28rpx;
  }
  .loan-item{
    display: flex;
    justify-content: space-between;
    font-size: 26rpx;
    line-height: 68rpx;
    padding: 0 48rpx;
  }
  .loan-item-title{
    color: #767676;
  }
  .loan-item-num{
    color: #1A1A1A;
  }
  /**/
  .other-group {
    padding-left: 30rpx;
    padding-right: 10rpx;
  }
  .other-item{
   border-bottom: 1px solid #F2F2F2;
  }
  .other-item-central{
    display: flex;
    line-height: 114rpx;
    font-size: 28rpx;
    justify-content: space-between;
  }
  .other-item-remark{
    margin-bottom: 36rpx;
    color: #B3B3B3;
    font-size: 26rpx;
    line-height: 32rpx;
    padding-left: 72rpx;
  }
  .other-item-central .quote-icon{
    vertical-align: middle;
    display: inline-block;
  }
  .other-item-title{
    vertical-align: middle;
  }
  .other-item-value{
    vertical-align: middle;
    color: #BB0A30;
  }
  .other-item-value.negative{
    color: #40B671;
  }
  .money-sum{
    line-height: 130rpx;
    color: #BB0A30;
    text-align: right;
    font-weight: bold;
    font-size: 32rpx;
  }
  .money-sum-title{
    margin-right: 20rpx;
  }

  .quote-action{
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 20;
    width: 100%;
  }
  .quote-action-group{
    position: absolute;
    width: 100%;
    top: -140rpx;
    background-color: rgba(26,26,26,.6);
    height: 140rpx;
  }
  .quote-action-warp{
    width: 490rpx;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
  .quote-action-item{
    text-align: center;
    font-size: 24rpx;
    padding-top: 28rpx;
    line-height: 1;
    color: rgba(255,255,255,.8);
  }
  .quote-action-item img{
    display: inline-block;
    width: 44rpx;
    height: 44rpx;
    margin-bottom: 16rpx;
  }
  .quote-action-btn{
    width: 100%;
    background-color: #1A1A1A;
    text-align: center;
    border-radius: 0;
    color: #fff;
    font-size: 28rpx;
    line-height: 94rpx;
  }

  .app-authorization{
    position: fixed;
    z-index: 1000;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.6);
  }
  .app-authorization-box{
    position: relative;
    width: 490rpx;
    padding: 48rpx;
    margin: 0 auto;
    background: #fff;
    border-radius: 16rpx;
  }
  .app-authorization-big-close{
    position: absolute;
    width: 64rpx;
    height: 64rpx;
    bottom: -112rpx;
    left: 50%;
    margin-left: -32rpx;
  }
  .app-authorization-footer{
    display: flex;
    justify-content: space-around;
  }
  .app-authorization-footer button{
    width: 180rpx;
    line-height: 70rpx;
    height: 70rpx;
    font-size: 28rpx;
  }
  .app-authorization-footer .confirm{
    background-color: #1A1A1A;
    color: #fff;
    border:1px solid rgba(26,26,26,1);
  }
  .app-authorization-footer .cancel{
    background-color: #FFF;
    border:1px solid rgba(26,26,26,1);
  }
  .app-authorization-body{
    font-size: 28rpx;
    color: #767676;
    line-height: 40rpx;
    margin-bottom: 24rpx;

  }
  .app-authorization-body img {
    display: block;
    width: 300rpx;
    height: 300rpx;
    margin: 0 auto;
  }
  .color_text{
    color: #666666;
    border: 1px solid #AAAAAA;
    font-size: 22rpx;
    text-align: center;
    width: 210rpx;
    height: 36rpx;
   line-height: 36rpx;
  }
  .period_time{
    background: #F2F2F2;
    font-size: 26rpx;
    color:#B3B3B3;
    display: flex;
    height: 68rpx;
    line-height: 68rpx;
    width: 327px;
    margin: 0 auto;
    border-radius:2px;
}
.period_title {
  margin: 0 30rpx;
}
.period_data {
}

</style>
