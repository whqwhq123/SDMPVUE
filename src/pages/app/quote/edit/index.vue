<template>
  <div>
    <div class="quote-settle-accounts" id="settleAccountsGroup" :style="{ backgroundColor: vi.quote.header.bgColor, color: vi.quote.header.color }">
        <div class="after-after"></div>
        <div v-if="!defParams.loanIs">
          <div class="settle-accounts-sum-title">
            全款总花费（元）
          </div>
          <div class="settle-accounts-value">
            <span><commaMoney :num="sumVal"></commaMoney></span>
            <!--<span class="unit">￥</span>-->
          </div>
        </div>
        <div v-else class="settle-accounts-loan">
          <div class="settle-accounts-sum-title">
            贷款首付及费用（元）
          </div>
          <div class="settle-accounts-value">
            <span><commaMoney :num="loanPaymentPrice"></commaMoney></span>
            <!--<span class="unit">￥</span>-->
          </div>
          <div v-if="!isFixed" class="settle-accounts-group" >
            <div class="settle-accounts-item">
              <div class="settle-accounts-item-title">月供</div>
              <div class="settle-accounts-item-val"><commaMoney :num="loanMonthly"></commaMoney></div>
            </div>
            <div class="settle-accounts-item">
              <div class="settle-accounts-item-title">贷款额</div>
              <div class="settle-accounts-item-val"><commaMoney :num="loanLimit"></commaMoney></div>
            </div>
            <div class="settle-accounts-item">
              <div class="settle-accounts-item-title">总价</div>
              <div class="settle-accounts-item-val"><commaMoney :num="loanTotalPrice"></commaMoney></div>
            </div>
          </div>
          <div v-else class="fixed settle-accounts-group" :style="{backgroundColor: vi.quote.header.bgColor, color: vi.quote.header.color}">
            <div class="settle-accounts-item">
              <div class="settle-accounts-item-val"><commaMoney :num="loanPaymentPrice"></commaMoney></div>
              <div class="settle-accounts-item-title">首付及费用</div>
            </div>
            <div class="settle-accounts-item">
              <div class="settle-accounts-item-val"><commaMoney :num="loanMonthly"></commaMoney></div>
              <div class="settle-accounts-item-title">月供</div>
            </div>
            <div class="settle-accounts-item">
              <div class="settle-accounts-item-val"><commaMoney :num="loanLimit"></commaMoney></div>
              <div class="settle-accounts-item-title">贷款额</div>
            </div>
            <div class="settle-accounts-item">
              <div class="settle-accounts-item-val"><commaMoney :num="loanTotalPrice"></commaMoney></div>
              <div class="settle-accounts-item-title">总价</div>
            </div>
          </div>
        </div>
    </div>
    <ul class="quote-group">
      <li class="quote-item" v-if="Exhibition">
        <div class="quote-item-central">
          <div>
            <span class="quote-item-icon"><i class="quote-icon quote-car"></i></span>
            <span class="quote-item-name">车型</span>
          </div>
          <div class="quote-item-action">
              <span class="quote-item-value">{{ defParams.styleFullName }}</span>
          </div>
        </div>
      </li>
      <li class="quote-item" v-else>
        <div class="quote-item-central">
          <div>
            <span class="quote-item-icon"><i class="quote-icon quote-car"></i></span>
            <span class="quote-item-name">车型</span>
          </div>
          <div class="quote-item-action"  @click="toSelectCar">
              <span v-if="defParams.styleFullName" class="quote-item-value">{{ defParams.styleFullName }}</span>
              <span v-else class="quote-item-value tip">请选择车型</span>
              <span class="quote-item-more"><i class="quote-icon quote-icon-small quote-right"></i></span>
          </div>
        </div>
      </li>
      <li class="quote-item">
        <div class="quote-item-central">
          <div>
            <span class="quote-item-icon"><i class="quote-icon quote-money"></i></span>
            <span class="quote-item-name">指导价</span>
          </div>
          <div class="quote-item-action">
            <input v-model="defParams.priceVal" maxlength="8" class="quote-item-value" type="number" placeholder-class="quote-item-input" placeholder="0" />
          </div>
        </div>
      </li>
      <li class="quote-item">
        <div class="quote-item-central">
          <div>
            <span class="quote-item-icon"><i class="quote-icon quote-youhuijiage"></i></span>
            <span class="quote-item-name">优惠价格</span>
          </div>
          <div class="quote-item-action">
            <input v-model="defParams.preferentialVal" maxlength="8" class="quote-item-value" type="number"  placeholder-class="quote-item-input" placeholder="0"/>
          </div>
        </div>
      </li>
      <li class="quote-item">
        <div class="quote-item-central" >
          <div>
            <span class="quote-item-icon"><i class="quote-icon quote-kehuchenghu"></i></span>
            <span class="quote-item-name">颜色</span>
          </div>
          <div class="quote-item-action">
            <input v-model="defParams.color"  class="quote-item-value" maxlength="4" plceholder-class="quote-item-input" placeholder="请输入车辆的颜色" />
          </div>
        </div>
      </li>
      <li class="quote-item">
        <div class="quote-item-central" >
          <div>
            <span class="quote-item-icon"><i class="quote-icon quote-kehuchenghu"></i></span>
            <span class="quote-item-name">客户称呼</span>
          </div>
          <div class="quote-item-action">
            <input v-model="defParams.userName"  class="quote-item-value" maxlength="6" placeholder-class="quote-item-input" placeholder="请输入客户称呼" />
          </div>
        </div>
      </li>
      <li class="quote-item">
        <div class="quote-item-central">
          <div>
            <span class="quote-item-icon"><i class="quote-icon quote-phone"></i></span>
            <span class="quote-item-name">客户手机号</span>
          </div>
          <div class="quote-item-action">
            <input v-model="defParams.userPhone" class="quote-item-value" placeholder-class="quote-item-input" type="number"  maxlength="11"  placeholder="请输入手机号" />
          </div>
        </div>
      </li>
      <li class="quote-item">
        <div class="quote-item-central" >
          <div>
            <span class="quote-item-icon"><i class="quote-icon quote-zhihuan"></i></span>
            <span class="quote-item-name">是否置换</span>
          </div>
          <div class="quote-item-action">
            <switch @change="displaceChange" :checked="defParams.displaceIs"/>
          </div>
        </div>
        <ul v-show="defParams.displaceIs" class="quote-child-group">
          <li class="quote-child-item">
            <div>
              二手车残值
            </div>
            <div class="quote-item-action">
              <input v-model="defParams.residualVal" maxlength="8" class="quote-item-value" type="number"  placeholder-class="quote-item-input" placeholder="0" />
            </div>
          </li>
          <li class="quote-child-item">
            <div>
              置换补贴
            </div>
            <div class="quote-item-action">
              <input v-model="defParams.displaceVal" maxlength="8" class="quote-item-value" type="number"  placeholder-class="quote-item-input" placeholder="0" />
            </div>
          </li>
        </ul>
      </li>
      <li class="quote-item">
        <div class="quote-item-central">
          <div>
            <span class="quote-item-icon"><i class="quote-icon quote-daikuan"></i></span>
            <span class="quote-item-name">{{ loan.name }}</span>
          </div>
          <div class="quote-item-action">
            <switch @change="loanChange" :checked="defParams.loanIs"/>
          </div>
        </div>
        <ul v-show="defParams.loanIs" class="quote-child-group">
          <li class="quote-child-item">
            <div>期数</div>
            <div class="quote-item-action">
              <picker @change="loanStagesChange" value="index" range-key="name" :range="stages">
                <div class="stages-picker">
                  {{loan.stagesText || '选择期数'}}
                </div>
              </picker>
              <!--<input v-model="defParams.residualVal" class="quote-item-value" placeholder-class="quote-item-input" placeholder="0"/>-->
            </div>
          </li>
          <li class="quote-child-item">
            <div>首付比例</div>
            <div class="quote-item-action">
              <picker @change="loanPaymentRatioChange" value="index" range-key="name" :range="paymentRatio">
                <div class="stages-picker">
                  {{loan.paymentRatioText || '选择比例'}}
                </div>
              </picker>
            </div>
          </li>
          <li class="quote-child-item">
            <div>总费率（%）</div>
            <div class="quote-item-action">
              <input v-model="defParams.grossSpread" maxlength="8" class="quote-item-value" type="number"  placeholder-class="quote-item-input" placeholder="0"/>
            </div>
          </li>
          <li class="quote-child-item">
            <div>金融服务费</div>
            <div class="quote-item-action">
              <input v-model="defParams.financialServicesCost" maxlength="8" class="quote-item-value" type="number"  placeholder-class="quote-item-input" placeholder="0"/>
            </div>
          </li>
        </ul>
      </li>
      <li class="quote-item" >
        <div class="quote-item-central">
          <div>
            <span class="quote-item-icon"><i class="quote-icon quote-gouzhishui"></i></span>
            <span class="quote-item-name">购置税</span>
          </div>
          <div class="quote-item-action">
            <input v-model="defParams.purchaseTaxVal" maxlength="8" class="quote-item-value" type="number"  placeholder-class="quote-item-input" placeholder="0" />
          </div>
        </div>
      </li>
      <li class="quote-item">
        <div class="quote-item-central">
          <div>
            <span class="quote-item-icon"><i class="quote-icon quote-baoxian"></i></span>
            <span class="quote-item-name">保险（强交险、商业险、车船税）</span>
          </div>
          <div class="quote-item-action">
            <input v-model="defParams.insureVal" maxlength="8" class="quote-item-value" type="number"  placeholder-class="quote-item-input" placeholder="0" />
          </div>
        </div>
      </li>
      <li class="quote-item">
        <div class="quote-item-central">
          <div>
            <span class="quote-item-icon"><i class="quote-icon quote-fuwufei"></i></span>
            <span class="quote-item-name">服务费（上牌费）</span>
          </div>
          <div class="quote-item-action">
            <input v-model="defParams.serviceVal" maxlength="8" class="quote-item-value" type="number"  placeholder-class="quote-item-input" placeholder="0" />
          </div>
        </div>
      </li>
      <li class="quote-item">
        <div class="quote-item-central">
          <div>
            <span class="quote-item-icon"><i class="quote-icon quote-zengxiang"></i></span>
            <span class="quote-item-name">增项</span>
          </div>
          <div class="quote-item-action">
            <input v-model="defParams.addItemVal" maxlength="8" class="quote-item-value" type="number"  placeholder-class="quote-item-input" placeholder="0" />
          </div>
        </div>
        <div  class="quote-child-group">
          <textarea v-model="defParams.addItemDesc" class="quote-child-remark" auto-height placeholder="增项描述"></textarea>
        </div>
      </li>
      <li class="quote-item">
        <div class="quote-item-central">
          <div>
            <span class="quote-item-icon"><i class="quote-icon quote-zengsongxiangmu"></i></span>
            <span class="quote-item-name">赠送项目</span>
          </div>
          <div class="quote-item-action">
            <!--<input v-model="defParams.giveVal" class="quote-item-value" placeholder-class="quote-item-input" placeholder="0" />-->
          </div>
        </div>
        <div  class="quote-child-group">
          <textarea v-model="defParams.giveDesc" class="quote-child-remark" auto-height placeholder="赠送项目描述"></textarea>
        </div>
      </li>
      <li class="quote-item">
        <div class="quote-item-central">
          <div>
            <span class="quote-item-icon"><i class="quote-icon quote-yanbaochanpin"></i></span>
            <span class="quote-item-name">延保产品费用</span>
          </div>
          <div class="quote-item-action">
            <input v-model="defParams.extensionInsuranceVal" maxlength="8" class="quote-item-value" type="number" placeholder-class="quote-item-input" placeholder="0" />
          </div>
        </div>
        <div  class="quote-child-group">
          <textarea v-model="defParams.extensionInsuranceDesc" class="quote-child-remark" auto-height placeholder="延保产品描述"></textarea>
        </div>
      </li>
      <li class="quote-item" v-if="activityStatus">
        <div class="quote-item-central">
          <div>
            <span class="quote-item-icon"><i class="quote-icon quote-guanlianhuodong"></i></span>
            <span class="quote-item-name">关联活动</span>
          </div>
          <div class="quote-item-action">
            <span v-if="defParams.activeList.length > 0" @click="toActivity">已选择{{ defParams.activeList.length}}个</span>
            <span v-else class="stages-picker" @click="toActivity">默认选择<i class="quote-icon quote-right quote-icon-small"></i></span>
          </div>
        </div>
      </li>
      <li class="quote-item">
        <div class="quote-item-central">
          <div>
            <span class="quote-item-icon"><i class="quote-icon quote-car"></i></span>
            <span class="quote-item-name">设置有效期</span>
          </div>
          <div class="quote-item-action">
              <!-- <span v-if="defParams.endTime" class="quote-item-value">{{ defParams.endTime }}</span> -->
              <picker mode="date" :value="defParams.validityPeriod"  @change="bindDateChange">
                <view class="picker">
                   <span class="quote-item-value tip" v-if="!defParams.validityPeriod">请选择时间</span>
                   <span v-else>截止至{{defParams.validityPeriod}} </span>
                </view>
              </picker>
              <span class="quote-item-more"><i class="quote-icon quote-icon-small quote-right"></i></span>
          </div>
        </div>
      </li>
       <li class="quote-item">
        <div class="quote-item-central">
          <div>
            <span class="quote-item-icon"><i class="quote-icon quote-car"></i></span>
            <span class="quote-item-name">联系方式</span>
          </div>
          <div class="quote-item-action">
              <!-- <span v-if="defParams.endTime" class="quote-item-value">{{ defParams.endTime }}</span> -->
              <picker @change="changePhoneIs" :value="index" range-key="name" :range="isPhoneRange">
                <view class="picker">
                   <span class="quote-item-value tip" v-if="!loan.isPhone">是否显示</span>
                   <span v-else>{{loan.isPhone}} </span>
                </view>
              </picker>
              <span class="quote-item-more"><i class="quote-icon quote-icon-small quote-right"></i></span>
          </div>
        </div>
      </li>
      <li class="quote-item">
        <div class="quote-item-central">
          <div>
            <span class="quote-item-icon"><i class="quote-icon quote-car"></i></span>
            <span class="quote-item-name">店铺信息</span>
          </div>
          <div class="quote-item-action">
              <!-- <span v-if="defParams.endTime" class="quote-item-value">{{ defParams.endTime }}</span> -->
              <picker @change="changeshopIs" :value="index" range-key="name" :range="isPhoneRange">
                <view class="picker">
                   <span class="quote-item-value tip" v-if="!loan.shopIsShow">是否显示</span>
                   <span v-else>{{loan.shopIsShow}} </span>
                  
                </view>
              </picker>
              <span class="quote-item-more"><i class="quote-icon quote-icon-small quote-right"></i></span>
          </div>
        </div>
      </li>
    </ul>
    <!-- <button class="sava-quote-btn" @click="verificationParams" :style="{backgroundColor: vi.all.pageBtn.bgColor, color:  vi.all.pageBtn.color}">生成报价单</button> -->
    <button class="sava-quote-btn" @click="verificationParams">生成报价单</button>
    
  </div>
</template>

<script>
  /**
   * @author yuhongru
   * @email  yuhongru@atgco.cn
   * @date   2019/7/1 14:24
   **/
  import { notice } from "../../../../utils/notice"
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import commaMoney from '../../../../components/quote/commaMoney'
  export default {
    name: "index",
    components: {
      commaMoney
    },
    data () {
      return {
        Exhibition:false,
        id:'',
        carModelId:'',
        // 车模块名
        carType:'',
        activityStatus: false,
        stages: [
          { name: '12期', value: 12 },
          { name: '16期', value: 16 },
          { name: '24期', value: 24 },
          { name: '36期', value: 36 },
          { name: '48期', value: 48 },
          { name: '60期', value: 60 },
        ],
        paymentRatio: [
          { name: '5%', value: 0.05 },
          { name: '10%', value: 0.1 },
          { name: '15%', value: 0.15 },
          { name: '20%', value: 0.2 },
          { name: '25%', value: 0.25 },
          { name: '30%', value: 0.3 },
          { name: '35%', value: 0.35 },
          { name: '40%', value: 0.4 },
          { name: '45%', value: 0.45 },
          { name: '50%', value: 0.5 },
          { name: '55%', value: 0.55 },
          { name: '60%', value: 0.6 },
          { name: '65%', value: 0.65 },
          { name: '70%', value: 0.7 },
          { name: '75%', value: 0.75 },
          { name: '80%', value: 0.8 },
          { name: '85%', value: 0.85 },
          { name: '90%', value: 0.9 },
        ],
        isPhoneRange:[
          { name: '是', value: 1 },
          { name: '否', value: 2 },
        ],
        loan: {
          name: '是否贷款',
          stagesText: '',
          paymentRatioText: '',
          isPhone:'',
          shopIsShow:''
        },
        beenPage: '', // 页面跳转记录 selectCar 选车， activity 选活动，shareQuote 生成报价单
        defParams: {
          styleFullName: '',
          modelName: '',
          styleName: '',
          styleYear: '',
          modelId: '',
          styleId: '',
          color:'',
          validityPeriod:'',
          isShowSalesmanPhone:'',
          isShowStore:'',
          userName: '', // 客户姓名
          userPhone: '', // 客户手机号
          priceVal: '', // 指导价
          preferentialVal: '', // 优惠价格
          displaceIs: 0,
          residualVal: '', // 二手车残值
          displaceVal: '', // 置换补贴
          purchaseTaxVal: '', // 购置税
          insureVal: '', // 保险费用
          serviceVal: '', // 服务费
          addItemVal: '', // 增项费用
          addItemDesc: '', // 增项描述
          // giveVal: '', // 赠送项目金额
          giveDesc: '', // 赠送项目描述
          extensionInsuranceVal: '', // 延保产品费用
          extensionInsuranceDesc: '', // 延保产品描述
          loanIs: 0,
          loanStagesVal: '', // 贷款期数
          paymentRatio: '', // 首付比例
          grossSpread: '', // 总费率
          financialServicesCost: '', //金融服务费
          activeList: [], // 选择的活动

        },
        isFixed: false,
        offsetTop:0,
      }
    },
    computed: {
      ...mapGetters({
        'vi': 'vi',
        'styleFullName': 'selectCar/styleFullName',
        'modelName': 'selectCar/modelName',
        'carModel': 'selectCar/carModel',
        'car': 'selectCar/car',
        'userInfo': 'userInfo',
        'selectedActivityList': 'recommendActivity/selectedActivityList'
      }),
      // 全款总价
      sumVal () {
        let priceVal= this.defParams.priceVal * 100, // 指导价
          preferentialVal= this.defParams.preferentialVal * 100, // 优惠价格
          residualVal= this.defParams.residualVal * 100, // 二手车残值
          displaceVal= this.defParams.displaceVal * 100, // 置换补贴
          purchaseTaxVal= this.defParams.purchaseTaxVal * 100, // 购置税
          insureVal= this.defParams.insureVal * 100, // 保险费用
          serviceVal= this.defParams.serviceVal * 100, // 服务费
          addItemVal= this.defParams.addItemVal * 100, // 增项费用
          extensionInsuranceVal= this.defParams.extensionInsuranceVal * 100 // 延保产品费用
          let sum = Math.floor((priceVal - preferentialVal - residualVal - displaceVal + purchaseTaxVal + insureVal + serviceVal + addItemVal + extensionInsuranceVal) / 100)
          return sum
      },
      // 贷款首付
      loanPaymentPrice () {
        // 贷款总价 ÷ 分期数
        let sum = this.loanTotalPrice,
          loanStagesVal = this.defParams.loanStagesVal; // 分期数
        let val = Math.floor(sum / loanStagesVal)
        return loanStagesVal ? val : 0
      },
      // 贷款总价
      loanTotalPrice () {
        // 指导价 - 优惠价格 + 购置税 + 保险 + 服务费 + 增项 + 延保产品费用 + 金融服务费 - 二手车残值 - 置换补贴 + 利息
        let priceVal= this.defParams.priceVal * 100, // 指导价
          preferentialVal= this.defParams.preferentialVal * 100, // 优惠价格
          residualVal= this.defParams.residualVal * 100, // 二手车残值
          displaceVal= this.defParams.displaceVal * 100, // 置换补贴
          purchaseTaxVal= this.defParams.purchaseTaxVal * 100, // 购置税
          insureVal= this.defParams.insureVal * 100, // 保险费用
          serviceVal= this.defParams.serviceVal * 100, // 服务费
          addItemVal= this.defParams.addItemVal * 100, // 增项费用
          loanInterest = this.loanInterest * 100, // 利息
          extensionInsuranceVal= this.defParams.extensionInsuranceVal * 100, // 延保产品费用
          financialServicesCost = this.defParams.financialServicesCost * 100; // 金融服务费
        let sum = Math.floor((loanInterest
          + priceVal - preferentialVal + purchaseTaxVal + insureVal + serviceVal + addItemVal
          + extensionInsuranceVal + financialServicesCost - residualVal - displaceVal)/100);
        return sum
      },
      // 贷款额
      loanLimit () {
       //（指导价-优惠价） -  [（指导价-优惠价） * 首付比例 ]
        let priceVal= this.defParams.priceVal, // 指导价
          preferentialVal= this.defParams.preferentialVal, // 优惠价格
          paymentRatio = this.defParams.paymentRatio, // 首付比例
          residualVal = this.defParams.residualVal || 0,
          displaceVal = this.defParams.displaceVal;
        let dVal = (priceVal - preferentialVal); // 指导价-优惠价
        let val =  Math.floor(dVal - dVal * paymentRatio - residualVal - displaceVal);
        return val
      },
      // 利息
      loanInterest () {
        let loanLimit = this.loanLimit, // 贷款额
          grossSpread = this.defParams.grossSpread ? parseInt(this.defParams.grossSpread) : 0; // 总费率 * 100
        return  Math.floor(loanLimit * grossSpread / 100)
      },
      // 月供
      loanMonthly () {
        // 贷款额 *（1+总费率） /  期数
        let loanLimit = this.loanLimit, // 贷款额
          grossSpread = this.defParams.grossSpread ? parseInt(this.defParams.grossSpread) : 0, // 总费率 * 100
          loanStagesVal = this.defParams.loanStagesVal; // 分期数
        let val = Math.floor((loanLimit * (100 + grossSpread)) / loanStagesVal / 100) ;
        return loanStagesVal ? val : 0
      },
      
    },
     mounted() {
        this.initDefParams()
        // ||"pages/user/customerTick/main"
       if(getCurrentPages()[getCurrentPages().length - 2].route=="pages/generalSale/receptionCustomer/main") {
         console.log(this.id)
         if(this.id==undefined) {
            this.Exhibition=false
         }else {
            this.Exhibition=true
          this.getOffer({carModelId:this.carModelId}).then(res=>{
            this.setCar(res.data.data)
            this.defParams.styleFullName=res.data.data.styleFullName
            this.defParams.styleId=res.data.data.styleId
            this.defParams.styleYear=res.data.data.styleYear
            this.defParams.styleName=res.data.data.styleName
            this.defParams.modelName=this.carType
            this.defParams.priceVal=parseInt(res.data.data.msrp*10000)
          })
         }
     }else if(getCurrentPages()[getCurrentPages().length - 2].route=="pages/user/customerTick/main") {
       this.Exhibition=true
        this.getOffer({carModelId:this.carModelId}).then(res=>{
          this.setCar(res.data.data)
          this.defParams.styleFullName=res.data.data.styleFullName
          this.defParams.styleId=res.data.data.styleId
          this.defParams.styleYear=res.data.data.styleYear
          this.defParams.styleName=res.data.data.styleName
          this.defParams.modelName=this.carType
          this.defParams.priceVal=parseInt(res.data.data.msrp*10000)
        })
     }else {
       this.Exhibition=false
     }
    },
    onShow() {
      // 设置默认值
      let query = mpvue.createSelectorQuery()
      query.select('#settleAccountsGroup').boundingClientRect(res => {
        this.offsetTop = res.height
      }).exec()
      this.initDefParams()
    },
    onLoad(op) {
     this.id=op.id
     this.carModelId=op.carModelId
     this.carType=op.carType
    },
    methods: {
      ...mapMutations({
        'setQuoteInfo': 'quote/setQuoteInfo',
        'setCar': 'selectCar/setCar',
      }),
      ...mapActions({
        'getOffer':'quote/getOffer',
        'createQuoteReq': 'quote/createQuoteReq',
        'getAcrivityListsOfPrice':'recommendActivity/getAcrivityListsOfPrice'
      }),
      /**
       * 初始化参数
       **/
      initDefParams () {
        let car = JSON.parse(JSON.stringify(this.car)) || {}
        let carModel = JSON.parse(JSON.stringify(this.carModel)) || {}
        /**
        * 车型相关
        * */
        let { styleFullName = '',styleName = '', styleYear = '', styleId = '', msrp = null  } = car
        let { carName: modelName = '', getCarNameId = '', imgUrl = ''} = carModel
        let { phone = '', userName = '' } = this.$root.$mp.query  // 其他页面跳入传参
        this.defParams.styleFullName = styleFullName
        this.defParams.styleName = styleName
        this.defParams.styleYear = styleYear
        this.defParams.styleId = styleId

        if (this.beenPage === 'selectCar') {
          this.defParams.modelName = modelName
          this.defParams.carTypePic = imgUrl
          this.defParams.modelId = getCarNameId
          /**
           * msrp 指导价
           * */
          this.defParams.priceVal = msrp ? parseInt(msrp * 10000) : msrp
        }
        if (this.beenPage === '') {

          this.defParams ={
            styleFullName: '',
              modelName: '',
              styleName: '',
              styleYear: '',
              modelId: '',
              styleId: '',
              validityPeriod:'',
              color:'',
              isShowSalesmanPhone:'',
              isShowStore:'',
              userName: '', // 客户姓名
              userPhone: '', // 客户手机号
              priceVal: '', // 指导价
              preferentialVal: '', // 优惠价格
              displaceIs: 0,
              residualVal: '', // 二手车残值
              displaceVal: '', // 置换补贴
              purchaseTaxVal: '', // 购置税
              insureVal: '', // 保险费用
              serviceVal: '', // 服务费
              addItemVal: '', // 增项费用
              addItemDesc: '', // 增项描述
              // giveVal: '', // 赠送项目金额
              giveDesc: '', // 赠送项目描述
              extensionInsuranceVal: '', // 延保产品费用
              extensionInsuranceDesc: '', // 延保产品描述
              loanIs: 0,
              loanStagesVal: '', // 贷款期数
              paymentRatio: '', // 首付比例
              grossSpread: '', // 总费率
              financialServicesCost: '', //金融服务费
              activeList: [] // 选择的活动
          }
        }
        if (userName) {
          this.defParams.userName = userName // 客户姓名
        }
        if (phone) {
          this.defParams.userPhone = phone // 客户手机号
        }

        /**
         * 选择活动
         * */
        if (this.activityStatus) {
          this.defParams.activeList = JSON.parse(JSON.stringify(this.selectedActivityList))
          let activitiesId = this.selectedActivityList.map((item) => item.activityId)
          this.defParams.activityIds = activitiesId.length > 0 ? activitiesId.join() : ''
        } else {
          this.defParams.activeList = []
          this.defParams.activityIds = ''
          this.getActivityLists(this.defParams.modelId)
        }

        /**
         * 清空填写相关页面跳转记录
         * */
        this.beenPage = ''
      },
      /**
       * 校验报价单参数
       * */
      verificationParams () {
        console.log(this.car)
        // 车型必选
        if (!this.car) {
          return notice({ title: '请选择车型'})
        }
        // 指导价必选
        if (!this.defParams.priceVal) {
          return notice({ title: '请输入指导价'})
        }
        if (isNaN(this.defParams.priceVal)) {
          return notice({ title: '指导价只能为数字'})
        }
        // 优惠价格数字校验
        if (isNaN(this.defParams.preferentialVal)) {
          return notice({ title: '优惠价格只能为数字'})
        }
        // 客户手机号校验
        if (this.defParams.userPhone) {
          if (!/^[1][3,5,6,7,8,9][0-9]{9}$/.test(this.defParams.userPhone)) {
            return notice({ title: '请输入正确的客户手机号'})
          }
        }
        // 购置税数字校验
        if (isNaN(this.defParams.purchaseTaxVal)) {
          return notice({ title: '购置税只能为数字'})
        }
        // 保险数字校验
        if (isNaN(this.defParams.insureVal)) {
          return notice({ title: '保险只能为数字'})
        }
        // 服务费数字校验
        if (isNaN(this.defParams.serviceVal)) {
          return notice({ title: '服务费只能为数字'})
        }
        // 增项数字校验
        if (isNaN(this.defParams.addItemVal)) {
          return notice({ title: '增项费用只能为数字'})
        }
        // 延保产品数字校验
        if (isNaN(this.defParams.extensionInsuranceVal)) {
          return notice({ title: '延保产品费用只能为数字'})
        }
        // if (this.defParams.extensionInsuranceVal) {
        //   if (!this.defParams.extensionInsuranceDesc) {
        //     return notice({ title: '请填写延保产品描述'})
        //   }
        // }
        if (this.defParams.loanIs) {
          if (this.verificationLoan()) {
            return
          }
        }
        // displace
        if (this.defParams.displaceIs) {
          if (this.verificationDisplace()) {
            return
          }
        }
        this.createQuote()
      },
      async createQuote() {
        // 数据缓存到vuex
        let quoteInfo = JSON.parse(JSON.stringify(this.defParams))
        quoteInfo.priceVal = Number(quoteInfo.priceVal) // 指导价
        quoteInfo.preferentialVal = Number(quoteInfo.preferentialVal) // 优惠价格
        quoteInfo.residualVal = Number(quoteInfo.residualVal) // 二手车残值
        quoteInfo.displaceVal = Number(quoteInfo.displaceVal)  // 置换补贴
        quoteInfo.purchaseTaxVal = Number(quoteInfo.purchaseTaxVal)  // 购置税
        quoteInfo.insureVal = Number(quoteInfo.insureVal)  // 保险费用
        quoteInfo.serviceVal = Number(quoteInfo.serviceVal)  // 服务费
        quoteInfo.addItemVal = Number(quoteInfo.addItemVal)  // 增项费用
        quoteInfo.extensionInsuranceVal = Number(quoteInfo.extensionInsuranceVal)  // 延保产品费用
        quoteInfo.grossSpread = Number(quoteInfo.grossSpread)  // 总费率
        quoteInfo.financialServicesCost = Number(quoteInfo.financialServicesCost)  //金融服务费
        quoteInfo.sumVal = this.defParams.loanIs ? this.loanTotalPrice : this.sumVal;
        quoteInfo.foursId = this.userInfo.foursId
        quoteInfo.userId = this.userInfo.userId

        quoteInfo.userTrajectoryId=this.id
        
        
        // quoteInfo.activityIds = this.defParams.activeList > 0 ? this.defParams.activeList.map((item) => item.activityId).join() : ''
        quoteInfo.nakedCar = this.defParams.priceVal - this.defParams.preferentialVal // 裸车优惠价
        // quoteInfo.userTrajectoryId=1101
        if (this.defParams.loanIs) {
          quoteInfo.loanPaymentPrice = this.loanPaymentPrice
          quoteInfo.loanLimit = this.loanLimit
          quoteInfo.loanMonthly = this.loanMonthly
          quoteInfo.loanInterest = this.loanInterest
        }
        this.setQuoteInfo(JSON.parse(JSON.stringify(quoteInfo)))
        // console.log(JSON.stringify(quoteInfo))
        // 走请求
        // console.log(quoteInfo)
        let res = await this.createQuoteReq(quoteInfo)
        if (res.code === 0) {
          this.createQuoteAfter(res.data)
        }
      },

      // 贷款部分验证
      verificationLoan () {
        if (!this.defParams.loanStagesVal) {
          notice({ title: '请选择贷款期数'})
          return true
        }
        if (!this.defParams.paymentRatio) {
          notice({ title: '请选择首付比例'})
          return true
        }
        if (!this.defParams.grossSpread) {
          notice({ title: '请填入总费率'})
          return true
        }
        if (isNaN(this.defParams.paymentRatio)) {
          notice({ title: '总费率只能是数字'})
          return true
        }
        if (!this.defParams.financialServicesCost) {
          notice({ title: '请填入金融服务费'})
          return true
        }
        if (isNaN(this.defParams.financialServicesCost)) {
          notice({ title: '金融服务费只能是数字'})
          return true
        }
        return false
      },
      // 置换部分验证
      verificationDisplace () {
        // residualVal: '', // 二手车残值
        //   displaceVal: '', // 置换补贴
        if (!this.defParams.residualVal) {
          notice({ title: '请填入二手车残值'})
          return true
        }
        if (!this.defParams.displaceVal) {
          notice({ title: '请填入置换补贴'})
          return true
        }
        return false
      },

      // 是否置换
      displaceChange (e) {
        let val = e.mp.detail.value;
        if (val) {
          this.defParams.displaceIs = 1
        } else {
          this.defParams.displaceIs = 0
          this.defParams.displaceVal = ''
          this.defParams.residualVal = ''
        }
      },
      // 是否贷款
      loanChange (e) {
        let val = e.mp.detail.value;
        this.loan = {
          name: '是否贷款',
          stagesText: '',
          paymentRatioText: ''
        }
        if (val) {
          this.defParams.loanIs = 1
        } else {
          this.defParams.loanIs = 0
        }
      },
      // 贷款期数
      loanStagesChange (e) {
        let value = e.mp.detail.value
        this.loan.stagesText = this.stages[value].name
        this.defParams.loanStagesVal = this.stages[value].value
      },
      // 首付比例
      loanPaymentRatioChange (e) {
        let value = e.mp.detail.value
        this.loan.paymentRatioText = this.paymentRatio[value].name
        this.defParams.paymentRatio = this.paymentRatio[value].value
      },
      // 设置有效期
      bindDateChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.mp.detail.value)
        this.defParams.validityPeriod=e.mp.detail.value
      },
      changePhoneIs(e){
        let value = e.mp.detail.value
        this.loan.isPhone = this.isPhoneRange[value].name
        this.defParams.isShowSalesmanPhone  = this.isPhoneRange[value].value
      },
      changeshopIs(e){
        let value = e.mp.detail.value
        this.loan.shopIsShow = this.isPhoneRange[value].name
        this.defParams.isShowStore = this.isPhoneRange[value].value
      },
      // 跳往生成报价单
      createQuoteAfter (id) {
        console.log(this.defParams.styleId)
      // 跳转到 生成后的页面
        this.beenPage = 'shareQuote'
        mpvue.navigateTo({ url: '/pages/app/quote/share/main?quoteId='+ id+'&carModelId='+this.defParams.styleId})
      },
      // 跳往选车
      toSelectCar() {
        // 记录跳转页面
        this.beenPage = 'selectCar'
        mpvue.navigateTo({
          url: '/pages/selectCar/car/main'
        })
      },
      // 跳往店铺活动页
      toActivity () {
        if (this.defParams.modelId) {
          // 记录跳转页面
          this.beenPage = 'activity'
          mpvue.navigateTo({
            url: '/pages/user/activity/main?carId=' + this.defParams.modelId
          })
        } else {
          notice({ title: '请选择车型' })
        }
      },
      async getActivityLists (id) {
        let params = {
          foursId: this.userInfo.foursId,
          carId: id
        }
        let res = await this.getAcrivityListsOfPrice(params)
        if (res.code === 0) {
          if (res.data.length > 0) {
            this.activityStatus = true
          } else {
            this.activityStatus = false
          }
        }
      }
    },
    onPageScroll(e) {
      let scrollTop = e.scrollTop
      this.isFixed = scrollTop > this.offsetTop;
    },
  };
</script>

<style scoped>
  .quote-settle-accounts{
    height: 360rpx;
    background-color: #1A1A1A;
    color: #fff;
    padding-top: 1rpx;
  }
  .settle-accounts-sum-title{
    font-size: 26rpx;
    margin-top: 118rpx;
    margin-left: 68rpx;
  }
  .settle-accounts-value{
    font-size: 80rpx;
    line-height: 1;
    margin-left: 62rpx;
    margin-top: 38rpx;
  }
  .settle-accounts-value .unit {
    font-size: 48rpx;
  }
  .settle-accounts-loan .settle-accounts-sum-title{
    margin-top: 50rpx;
  }
  .settle-accounts-loan .settle-accounts-value{
    margin-top: 18rpx;
  }
  .settle-accounts-loan .settle-accounts-group {
    display: flex;
    justify-content: space-between;
    padding-bottom: 46rpx;
  }
  .settle-accounts-loan .settle-accounts-group.fixed {
    background-color: #BB0A30;
    position: fixed;
    width: 100%;
    top:0;
    left: 0;
    margin: 0;
    z-index: 999;
  }
  /*贷款结算部分 正常样式*/
  .settle-accounts-loan .settle-accounts-item {
    text-align: center;
    flex: auto;
    max-width: 33.3333%;
    word-break: break-all;
  }
  .settle-accounts-loan .settle-accounts-item .settle-accounts-item-title{
    font-size: 28rpx;
    line-height: 1;
    margin-top: 46rpx;
    margin-bottom: 24rpx;
    color: rgba(255,255,255,.7);
  }
  .settle-accounts-loan .settle-accounts-item .settle-accounts-item-val{
    font-size: 32rpx;
    font-weight: bold;
    line-height: 1;
  }
  /*贷款结算部分 吸顶样式*/
  .settle-accounts-loan .fixed .settle-accounts-item{
    max-width: 25%;
  }
  .settle-accounts-loan .fixed .settle-accounts-item-title{
    margin-top: 36rpx;
    margin-bottom: 0;
  }
  .settle-accounts-loan .fixed .settle-accounts-item-val{
    margin-top: 48rpx;
  }
  /*贷款子项样式*/
  .stages-picker{
    color: #B3B3B3;
  }

  .quote-group{
    padding: 0 68rpx;
    padding-top: 8rpx;
    font-size: 28rpx;
  }

  .quote-item{
    border-bottom: 2rpx solid #F2F2F2;
  }
  .quote-item:last-of-type{
    border-bottom: none;
  }
  .quote-item-central{
    display: flex;
    justify-content: space-between;
    line-height: 104rpx;
  }
  .quote-item-action{
    display: flex;
    flex: auto;
    width: 0;
    justify-content: flex-end;
    flex-wrap:nowrap;
    overflow: hidden;
  }
  .quote-item-value{
    display: inline;
    float: right;
    /*flex: 1;*/
    text-align: right;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .quote-item-more{
    vertical-align: middle;
    display: block;
  }
  input.quote-item-value {
    display: block;
    height: 104rpx;
  }
  .quote-item-value.tip {
    color: #B3B3B3;
  }
  .quote-item-input{
    font-size: 28rpx;
    color: #B3B3B3;
  }
  .quote-child-group{
    margin-left: 74rpx;
    font-size: 26rpx;
    color: #1A1A1A;
    line-height: 64rpx;
  }
  .quote-child-item {
    display: flex;
    justify-content: space-between;
    border-top: 2rpx solid #F2F2F2;
  }
  .quote-child-item .quote-item-value{
    height: 64rpx;
    width: 100%;
  }
  .quote-child-remark{
    width: 100%;
    line-height: 1;
    font-size: 26rpx;
    color: #B3B3B3;
    margin-bottom: 30rpx;
  }
  .sava-quote-btn{
    width: 614rpx;
    margin-top: 28rpx;
    margin-bottom: 104rpx;
    line-height: 84rpx;
    color: #fff;
    background-color: #BB0A30;
    border-radius: 84rpx;
    font-size: 28rpx;
  }

</style>
<style scoped>
  @import "../../../../assets/quote/icon.css";
</style>
<style scoped lang="scss">
  .quote-settle-accounts {
    position: relative;
    align-items: center;
    min-height: 360rpx;
    background-color: #BB0A30;
    overflow: hidden;

    &:before, &:after, .after-after {
      content: "";
      position: absolute;
      min-width: 1800rpx;
      min-height: 1800rpx;
      background-color: #fff;
      animation-name: rotate;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }

    &:before {
      left: 50%;
      top: 292rpx;
      opacity: .25;
      border-radius: 45%;
      animation-duration: 10s;
    }

    &:after {
      left: 35%;
      top: 315rpx;
      opacity: .25;
      border-radius: 40%;
      animation-duration: 15s;
    }
    .after-after{
      left: 82%;
      top: 330rpx;
      opacity: .25;
      border-radius: 43%;
      animation-duration: 13s;
    }
  }
  @keyframes rotate {
    0% {
      transform: translate(-50%, 0) rotateZ(0deg);
    }
    50% {
      transform: translate(-50%, -2%) rotateZ(180deg);
    }
    100% {
      transform: translate(-50%, 0%) rotateZ(360deg);
    }
  }
</style>
<style>
  .wx-switch-input{
    width: 80rpx !important;
    height: 48rpx !important;
  }
  .wx-switch-input::before{
    background-color: #1A1A1A !important;
    width: 80rpx !important;
    height: 46rpx !important;
  }
  /*绿色样式（true的样式）*/
  .wx-switch-input::after{
    width: 46rpx !important;
    height: 46rpx !important;
  }

</style>
