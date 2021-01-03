<template>
  <div>
    <div class="allpendcom">
      <div class="allpendcomBox">
        <div
          :class="[{ atv: item.isShow }, 'tabs']"
          v-for="(item, index) in tabs"
          @click="avtTabsFun(item, index)"
          :key="item"
        >
          {{ item.title }}
          <span :class="{ line: item.isShow }"></span>
          <div class="tipsDiv" v-if="item.tips === 0 ? false : true">
            <span class="tips">{{ item.tips }}</span>
          </div>
        </div>
      </div>
      <div class="linerow"></div>
      <div class="allpendcomList">
        <div class="viewallItem">
          <div
            class="viewallItem_top"
            :style="{ height: tabsIndex != 2 ? '226rpx' : '80rpx' }"
          >
            <div class="viewallItem_top_l_t viewallItem_top_l_tb">
              <div class="viewallItem_top_l">
                <div class="viewallItem_top_l_img">
                  <!-- <img src="" alt="" /> -->
                </div>
                <div class="viewallItem_top_l_tit">
                  <div class="viewallItem_top_l_titp">
                    颤三<span class="level_icon" :style="colorObj[4]">{{
                      levelval[4]
                    }}</span>
                  </div>
                  <div>13280504044</div>
                </div>
              </div>
              <div class="viewallItem_top_r">
                <!-- <img
                v-if="imageApi"
                :src="imageApi + '/iconviewPhone.png'"
                alt=""
              /> -->
              </div>
            </div>
            <div
              class="viewallItem_top_l_b viewallItem_top_l_tb"
              v-if="tabsIndex != 2"
            >
              <div class="viewallItem_top_l_b_tit">距离预约时间还有:</div>
              <div class="viewallItem_top_l_b_time">
                0天
                <span class="viewallItem_top_l_b_timesty">00</span> :
                <span class="viewallItem_top_l_b_timesty">00</span> :
                <span class="viewallItem_top_l_b_timesty">00</span>
              </div>
              <div
                class="viewallItem_top_l_b_sh"
                @click="viewallItemClick(tabsIndex)"
              >
                {{ tabsIndex ? "结束试驾" : "审核" }}
              </div>
            </div>
          </div>
          <div class="viewallItem_but">
            <div class="viewallItem_but_top">
              <div class="viewallItem_but_img">
                <!-- <img src="" alt=""> -->
              </div>
              <div class="viewallItem_but_tit">
                <div class="viewallItem_but_tit1">
                  <div class="viewallItem_but_tit11">预约时间:</div>
                  <div class="viewallItem_but_tit12">2020-12-14 13:30:00</div>
                </div>
                <div class="viewallItem_but_tit2">
                  奥迪A6 2020款 1.8T 自动 豪华型
                </div>
                <div class="viewallItem_but_tit3">
                  <div class="viewallItem_but_tit31">指导价格:</div>
                  <div class="viewallItem_but_tit32">29.66~32.99万</div>
                </div>
              </div>
            </div>
            <div class="feedback" v-if="tabsIndex == 2">
              <template v-if="isfj">
                <div class="viewallItem_but_feedback" @click="isfankuiFun">
                  <div class="viewallItem_but_feedback_p">查看试驾反馈</div>
                  <!-- iconTop.png -->
                  <div class="viewallItem_but_feedback_img">
                    <!-- <img
                    style="width: 100%; height: 100%"
                    v-if="imageApi"
                    :src="
                      isfankui
                        ? imageApi + '/iconBut.png'
                        : imageApi + '/iconTop.png'
                    "
                    alt=""
                  /> -->
                  </div>
                </div>
                <div class="viewallItem_but_con" v-if="isfankui">
                  <div class="viewallItem_but_con_img">
                    <!-- <img
                    style="width: 100%; height: 100%"
                    v-if="imageApi"
                    :src="imageApi + '/jzxd/veryNice_icon.png'"
                    alt=""
                  /> -->
                  </div>
                  <div class="viewallItem_but_con_p">满意</div>
                  <div class="viewallItem_but_con_start">
                    <div class="viewallItem_but_con_startXing">
                      <div class="startXing_p">外观 :</div>
                      <div class="startXing_xing">
                        <statr-xing star="3"></statr-xing>
                      </div>
                    </div>
                    <div class="viewallItem_but_con_startXing">
                      <div class="startXing_p">内饰 :</div>
                      <div class="startXing_xing">
                        <statr-xing star="3"></statr-xing>
                      </div>
                    </div>
                    <div class="viewallItem_but_con_startXing">
                      <div class="startXing_p">性能 :</div>
                      <div class="startXing_xing">
                        <statr-xing star="5"></statr-xing>
                      </div>
                    </div>
                    <div class="viewallItem_but_con_startXing">
                      <div class="startXing_p">舒适度 :</div>
                      <div class="startXing_xing">
                        <statr-xing star="4"></statr-xing>
                      </div>
                    </div>
                    <div class="viewallItem_but_con_startXing">
                      <div class="startXing_p">实用性 :</div>
                      <div class="startXing_xing">
                        <statr-xing star="1"></statr-xing>
                      </div>
                    </div>
                  </div>
                  <div class="viewallItem_but_con_tit">
                    试驾反馈:试驾反馈信息试驾反馈信息试驾反馈信息试驾反馈信息试驾反馈信息试驾反馈信息试驾反馈信息试
                  </div>
                </div>
              </template>
              <template v-if="!isfj">
                <div class="viewallItem_but_nofee">
                  <span class="viewallItem_but_nofee_span">
                    拒绝驾驶理由:
                  </span>
                  抱歉当前时间试驾预约是约满，请另行预约抱歉当前时间试驾预约是约满，请另行预约抱歉当前时间试驾预约是约满，请另行预约抱歉当前时间试驾预约是约满，请另行预约抱歉当前时间试驾预约是约满，请另行预约抱歉当前时间试驾预约是约满，请另行预约抱歉当前时间试驾预约是约满，请另行预约
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="viewallItem">
          <div
            class="viewallItem_top"
            :style="{ height: tabsIndex != 2 ? '226rpx' : '80rpx' }"
          >
            <div class="viewallItem_top_l_t viewallItem_top_l_tb">
              <div class="viewallItem_top_l">
                <div class="viewallItem_top_l_img">
                  <!-- <img src="" alt="" /> -->
                </div>
                <div class="viewallItem_top_l_tit">
                  <div class="viewallItem_top_l_titp">
                    颤三<span class="level_icon" :style="colorObj[4]">{{
                      levelval[4]
                    }}</span>
                  </div>
                  <div>13280504044</div>
                </div>
              </div>
              <div class="viewallItem_top_r">
                <!-- <img
                v-if="imageApi"
                :src="imageApi + '/iconviewPhone.png'"
                alt=""
              /> -->
              </div>
            </div>
            <div
              class="viewallItem_top_l_b viewallItem_top_l_tb"
              v-if="tabsIndex != 2"
            >
              <div class="viewallItem_top_l_b_tit">距离预约时间还有:</div>
              <div class="viewallItem_top_l_b_time">
                0天
                <span class="viewallItem_top_l_b_timesty">00</span> :
                <span class="viewallItem_top_l_b_timesty">00</span> :
                <span class="viewallItem_top_l_b_timesty">00</span>
              </div>
              <div class="viewallItem_top_l_b_sh">
                {{ tabsIndex ? "结束试驾" : "审核" }}
              </div>
            </div>
          </div>
          <div class="viewallItem_but">
            <div class="viewallItem_but_top">
              <div class="viewallItem_but_img">
                <!-- <img src="" alt=""> -->
              </div>
              <div class="viewallItem_but_tit">
                <div class="viewallItem_but_tit1">
                  <div class="viewallItem_but_tit11">预约时间:</div>
                  <div class="viewallItem_but_tit12">2020-12-14 13:30:00</div>
                </div>
                <div class="viewallItem_but_tit2">
                  奥迪A6 2020款 1.8T 自动 豪华型
                </div>
                <div class="viewallItem_but_tit3">
                  <div class="viewallItem_but_tit31">指导价格:</div>
                  <div class="viewallItem_but_tit32">29.66~32.99万</div>
                </div>
              </div>
            </div>
            <div class="feedback" v-if="tabsIndex == 2">
              <template v-if="isfj">
                <div class="viewallItem_but_feedback" @click="isfankuiFun">
                  <div class="viewallItem_but_feedback_p">查看试驾反馈</div>
                  <!-- iconTop.png -->
                  <div class="viewallItem_but_feedback_img">
                    <!-- <img
                    style="width: 100%; height: 100%"
                    v-if="imageApi"
                    :src="
                      isfankui
                        ? imageApi + '/iconBut.png'
                        : imageApi + '/iconTop.png'
                    "
                    alt=""
                  /> -->
                  </div>
                </div>
                <div class="viewallItem_but_con" v-if="isfankui">
                  <div class="viewallItem_but_con_img">
                    <!-- <img
                    style="width: 100%; height: 100%"
                    v-if="imageApi"
                    :src="imageApi + '/jzxd/veryNice_icon.png'"
                    alt=""
                  /> -->
                  </div>
                  <div class="viewallItem_but_con_p">满意</div>
                  <div class="viewallItem_but_con_start">
                    <div class="viewallItem_but_con_startXing">
                      <div class="startXing_p">外观 :</div>
                      <div class="startXing_xing">
                        <statr-xing star="3"></statr-xing>
                      </div>
                    </div>
                    <div class="viewallItem_but_con_startXing">
                      <div class="startXing_p">内饰 :</div>
                      <div class="startXing_xing">
                        <statr-xing star="3"></statr-xing>
                      </div>
                    </div>
                    <div class="viewallItem_but_con_startXing">
                      <div class="startXing_p">性能 :</div>
                      <div class="startXing_xing">
                        <statr-xing star="5"></statr-xing>
                      </div>
                    </div>
                    <div class="viewallItem_but_con_startXing">
                      <div class="startXing_p">舒适度 :</div>
                      <div class="startXing_xing">
                        <statr-xing star="4"></statr-xing>
                      </div>
                    </div>
                    <div class="viewallItem_but_con_startXing">
                      <div class="startXing_p">实用性 :</div>
                      <div class="startXing_xing">
                        <statr-xing star="1"></statr-xing>
                      </div>
                    </div>
                  </div>
                  <div class="viewallItem_but_con_tit">
                    试驾反馈:试驾反馈信息试驾反馈信息试驾反馈信息试驾反馈信息试驾反馈信息试驾反馈信息试驾反馈信息试
                  </div>
                </div>
              </template>
              <template v-if="!isfj">
                <div class="viewallItem_but_nofee">
                  <span class="viewallItem_but_nofee_span">
                    拒绝驾驶理由:
                  </span>
                  抱歉当前时间试驾预约是约满，请另行预约抱歉当前时间试驾预约是约满，请另行预约抱歉当前时间试驾预约是约满，请另行预约抱歉当前时间试驾预约是约满，请另行预约抱歉当前时间试驾预约是约满，请另行预约抱歉当前时间试驾预约是约满，请另行预约抱歉当前时间试驾预约是约满，请另行预约
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="viewallItem">
          <div
            class="viewallItem_top"
            :style="{ height: tabsIndex != 2 ? '226rpx' : '80rpx' }"
          >
            <div class="viewallItem_top_l_t viewallItem_top_l_tb">
              <div class="viewallItem_top_l">
                <div class="viewallItem_top_l_img">
                  <!-- <img src="" alt="" /> -->
                </div>
                <div class="viewallItem_top_l_tit">
                  <div class="viewallItem_top_l_titp">
                    颤三<span class="level_icon" :style="colorObj[4]">{{
                      levelval[4]
                    }}</span>
                  </div>
                  <div>13280504044</div>
                </div>
              </div>
              <div class="viewallItem_top_r">
                <!-- <img
                v-if="imageApi"
                :src="imageApi + '/iconviewPhone.png'"
                alt=""
              /> -->
              </div>
            </div>
            <div
              class="viewallItem_top_l_b viewallItem_top_l_tb"
              v-if="tabsIndex != 2"
            >
              <div class="viewallItem_top_l_b_tit">距离预约时间还有:</div>
              <div class="viewallItem_top_l_b_time">
                0天
                <span class="viewallItem_top_l_b_timesty">00</span> :
                <span class="viewallItem_top_l_b_timesty">00</span> :
                <span class="viewallItem_top_l_b_timesty">00</span>
              </div>
              <div class="viewallItem_top_l_b_sh">
                {{ tabsIndex ? "结束试驾" : "审核" }}
              </div>
            </div>
          </div>
          <div class="viewallItem_but">
            <div class="viewallItem_but_top">
              <div class="viewallItem_but_img">
                <!-- <img src="" alt=""> -->
              </div>
              <div class="viewallItem_but_tit">
                <div class="viewallItem_but_tit1">
                  <div class="viewallItem_but_tit11">预约时间:</div>
                  <div class="viewallItem_but_tit12">2020-12-14 13:30:00</div>
                </div>
                <div class="viewallItem_but_tit2">
                  奥迪A6 2020款 1.8T 自动 豪华型
                </div>
                <div class="viewallItem_but_tit3">
                  <div class="viewallItem_but_tit31">指导价格:</div>
                  <div class="viewallItem_but_tit32">29.66~32.99万</div>
                </div>
              </div>
            </div>
            <div class="feedback" v-if="tabsIndex == 2">
              <template v-if="isfj">
                <div class="viewallItem_but_feedback" @click="isfankuiFun">
                  <div class="viewallItem_but_feedback_p">查看试驾反馈</div>
                  <!-- iconTop.png -->
                  <div class="viewallItem_but_feedback_img">
                    <!-- <img
                    style="width: 100%; height: 100%"
                    v-if="imageApi"
                    :src="
                      isfankui
                        ? imageApi + '/iconBut.png'
                        : imageApi + '/iconTop.png'
                    "
                    alt=""
                  /> -->
                  </div>
                </div>
                <div class="viewallItem_but_con" v-if="isfankui">
                  <div class="viewallItem_but_con_img">
                    <!-- <img
                    style="width: 100%; height: 100%"
                    v-if="imageApi"
                    :src="imageApi + '/jzxd/veryNice_icon.png'"
                    alt=""
                  /> -->
                  </div>
                  <div class="viewallItem_but_con_p">满意</div>
                  <div class="viewallItem_but_con_start">
                    <div class="viewallItem_but_con_startXing">
                      <div class="startXing_p">外观 :</div>
                      <div class="startXing_xing">
                        <statr-xing star="3"></statr-xing>
                      </div>
                    </div>
                    <div class="viewallItem_but_con_startXing">
                      <div class="startXing_p">内饰 :</div>
                      <div class="startXing_xing">
                        <statr-xing star="3"></statr-xing>
                      </div>
                    </div>
                    <div class="viewallItem_but_con_startXing">
                      <div class="startXing_p">性能 :</div>
                      <div class="startXing_xing">
                        <statr-xing star="5"></statr-xing>
                      </div>
                    </div>
                    <div class="viewallItem_but_con_startXing">
                      <div class="startXing_p">舒适度 :</div>
                      <div class="startXing_xing">
                        <statr-xing star="4"></statr-xing>
                      </div>
                    </div>
                    <div class="viewallItem_but_con_startXing">
                      <div class="startXing_p">实用性 :</div>
                      <div class="startXing_xing">
                        <statr-xing star="1"></statr-xing>
                      </div>
                    </div>
                  </div>
                  <div class="viewallItem_but_con_tit">
                    试驾反馈:试驾反馈信息试驾反馈信息试驾反馈信息试驾反馈信息试驾反馈信息试驾反馈信息试驾反馈信息试
                  </div>
                </div>
              </template>
              <template v-if="!isfj">
                <div class="viewallItem_but_nofee">
                  <span class="viewallItem_but_nofee_span">
                    拒绝驾驶理由:
                  </span>
                  抱歉当前时间试驾预约是约满，请另行预约抱歉当前时间试驾预约是约满，请另行预约抱歉当前时间试驾预约是约满，请另行预约抱歉当前时间试驾预约是约满，请另行预约抱歉当前时间试驾预约是约满，请另行预约抱歉当前时间试驾预约是约满，请另行预约抱歉当前时间试驾预约是约满，请另行预约
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="viewallItem">
          <div
            class="viewallItem_top"
            :style="{ height: tabsIndex != 2 ? '226rpx' : '80rpx' }"
          >
            <div class="viewallItem_top_l_t viewallItem_top_l_tb">
              <div class="viewallItem_top_l">
                <div class="viewallItem_top_l_img">
                  <!-- <img src="" alt="" /> -->
                </div>
                <div class="viewallItem_top_l_tit">
                  <div class="viewallItem_top_l_titp">
                    颤三<span class="level_icon" :style="colorObj[4]">{{
                      levelval[4]
                    }}</span>
                  </div>
                  <div>13280504044</div>
                </div>
              </div>
              <div class="viewallItem_top_r">
                <!-- <img
                v-if="imageApi"
                :src="imageApi + '/iconviewPhone.png'"
                alt=""
              /> -->
              </div>
            </div>
            <div
              class="viewallItem_top_l_b viewallItem_top_l_tb"
              v-if="tabsIndex != 2"
            >
              <div class="viewallItem_top_l_b_tit">距离预约时间还有:</div>
              <div class="viewallItem_top_l_b_time">
                0天
                <span class="viewallItem_top_l_b_timesty">00</span> :
                <span class="viewallItem_top_l_b_timesty">00</span> :
                <span class="viewallItem_top_l_b_timesty">00</span>
              </div>
              <div class="viewallItem_top_l_b_sh">
                {{ tabsIndex ? "结束试驾" : "审核" }}
              </div>
            </div>
          </div>
          <div class="viewallItem_but">
            <div class="viewallItem_but_top">
              <div class="viewallItem_but_img">
                <!-- <img src="" alt=""> -->
              </div>
              <div class="viewallItem_but_tit">
                <div class="viewallItem_but_tit1">
                  <div class="viewallItem_but_tit11">预约时间:</div>
                  <div class="viewallItem_but_tit12">2020-12-14 13:30:00</div>
                </div>
                <div class="viewallItem_but_tit2">
                  奥迪A6 2020款 1.8T 自动 豪华型
                </div>
                <div class="viewallItem_but_tit3">
                  <div class="viewallItem_but_tit31">指导价格:</div>
                  <div class="viewallItem_but_tit32">29.66~32.99万</div>
                </div>
              </div>
            </div>
            <div class="feedback" v-if="tabsIndex == 2">
              <template v-if="isfj">
                <div class="viewallItem_but_feedback" @click="isfankuiFun">
                  <div class="viewallItem_but_feedback_p">查看试驾反馈</div>
                  <!-- iconTop.png -->
                  <div class="viewallItem_but_feedback_img">
                    <!-- <img
                    style="width: 100%; height: 100%"
                    v-if="imageApi"
                    :src="
                      isfankui
                        ? imageApi + '/iconBut.png'
                        : imageApi + '/iconTop.png'
                    "
                    alt=""
                  /> -->
                  </div>
                </div>
                <div class="viewallItem_but_con" v-if="isfankui">
                  <div class="viewallItem_but_con_img">
                    <!-- <img
                    style="width: 100%; height: 100%"
                    v-if="imageApi"
                    :src="imageApi + '/jzxd/veryNice_icon.png'"
                    alt=""
                  /> -->
                  </div>
                  <div class="viewallItem_but_con_p">满意</div>
                  <div class="viewallItem_but_con_start">
                    <div class="viewallItem_but_con_startXing">
                      <div class="startXing_p">外观 :</div>
                      <div class="startXing_xing">
                        <statr-xing star="3"></statr-xing>
                      </div>
                    </div>
                    <div class="viewallItem_but_con_startXing">
                      <div class="startXing_p">内饰 :</div>
                      <div class="startXing_xing">
                        <statr-xing star="3"></statr-xing>
                      </div>
                    </div>
                    <div class="viewallItem_but_con_startXing">
                      <div class="startXing_p">性能 :</div>
                      <div class="startXing_xing">
                        <statr-xing star="5"></statr-xing>
                      </div>
                    </div>
                    <div class="viewallItem_but_con_startXing">
                      <div class="startXing_p">舒适度 :</div>
                      <div class="startXing_xing">
                        <statr-xing star="4"></statr-xing>
                      </div>
                    </div>
                    <div class="viewallItem_but_con_startXing">
                      <div class="startXing_p">实用性 :</div>
                      <div class="startXing_xing">
                        <statr-xing star="1"></statr-xing>
                      </div>
                    </div>
                  </div>
                  <div class="viewallItem_but_con_tit">
                    试驾反馈:试驾反馈信息试驾反馈信息试驾反馈信息试驾反馈信息试驾反馈信息试驾反馈信息试驾反馈信息试
                  </div>
                </div>
              </template>
              <template v-if="!isfj">
                <div class="viewallItem_but_nofee">
                  <span class="viewallItem_but_nofee_span">
                    拒绝驾驶理由:
                  </span>
                  抱歉当前时间试驾预约是约满，请另行预约抱歉当前时间试驾预约是约满，请另行预约抱歉当前时间试驾预约是约满，请另行预约抱歉当前时间试驾预约是约满，请另行预约抱歉当前时间试驾预约是约满，请另行预约抱歉当前时间试驾预约是约满，请另行预约抱歉当前时间试驾预约是约满，请另行预约
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 弹出框组件 -->
    <show-modal
      v-if="isShow"
      :tabsIndex="tabsIndex"
      :chengMode.sync="isShow"
    ></show-modal>
  </div>
</template>

<script>
import { imageApi } from "../../../http/url";
import countTime from "./js/showTime.js";
import statrXing from "./components/statrXing.vue";
import showModal from "./components/showModal.vue";

export default {
  props: {
    dataListArr: {
      type: Object,
    },
  },
  components: { statrXing,showModal },
  data() {
    return {
      imageApi,
      isShow:false,
      tabs: [
        {
          title: "待审核",
          type: 1,
          isShow: true,
          tips: 0,
        },
        {
          title: "待试驾",
          type: 2,
          isShow: false,
          tips: 1,
        },
        {
          title: "已结束",
          type: 3,
          isShow: false,
          tips: 2,
        },
      ],
      startXings: [
        {
          id: 1,
          title: "外观",
        },
        { id: 2, title: "内饰" },
        { id: 3, title: "性能" },
        { id: 4, title: "舒适度" },
        { id: 5, title: "实用性" },
      ],
      tabsIndex: 0,
      dataList: [],
      colorObj: {
        2: "background:#FFA600",
        3: "background:#FFE131",
        4: "background:#B0C939",
        1: "background:#FF5253",
      },
      levelval: {
        1: "H",
        2: "A",
        3: "B",
        4: "C",
      },
      isfankui: false,
      isfj: true, //模拟拒绝和反馈有无
    };
  },
  watch: {
    dataListArr(ne) {
      this.dataList = ne;
      console.log(ne);
    },
  },
  methods: {
    //tab切换
    avtTabsFun(item, index) {
      // console.log(item,index);
      console.log(index);
      this.tabsIndex = index;
      this.$emit("avtTabsFun", index + 1);
      if (index + 1 === item.type) {
        console.log("点击了");
        this.tabs = this.tabs.map((v, i) => {
          if (v.type != index + 1) {
            v.isShow = false;
          } else {
            v.isShow = true;
          }
          return v;
        });
      }
      //   this.AjaxFun(item);
    },
    //点击审核或者结束试驾
    viewallItemClick(tabsIndex,item){
      console.log(tabsIndex);
      this.isShow=!this.isShow
    },

    //反馈的隐藏显示
    isfankuiFun(){
      this.isfankui=!this.isfankui
    },
    //数据请求
    AjaxFun(item) {
      let request = wx.request({
        url: "http://localhost:9999/api.rapidTaskmgr",
        data: {},
        header: { "content-type": "application/json" },
        method: "GET",
        dataType: "json",
        responseType: "text",
        success: (result) => {
          console.log(result);
        },
        fail: () => {},
        complete: () => {},
      });

      if (item) {
        console.log(item.title);
      } else {
        console.log("全部任务");
      }
    },
    //时间计算
    // times= "2021-08-09"
    TimeNum(times) {
      setInterval(
        (t) => {
          let x = countTime(t);
          console.log(x, "2");
        },
        1000,
        times
      );
    },
  },
  onLoad() {
    console.log("onLoad");

    // this.AjaxFun();
  },
  onShow() {
    console.log("onShow");
  },
};
</script>

<style lang="scss" scoped>
.allpendcom {
  height: 100%;
  display: flex;
  flex: 12;
  flex-direction: column;
  padding: 40rpx;
  position: relative;
  .allpendcomBox {
    display: flex;
    width: 100%;
    height: 72rpx;
    align-items: center;
    position: relative;
    .tabs {
      text-align: center;
      line-height: 76rpx;
      color: #9a9a9a;
      font-size: 32rpx;
      position: relative;
      margin-right: 70rpx;
      .line {
        width: 100rpx;
        height: 6rpx;
        position: absolute;
        bottom: -3rpx;
        display: block;
        border-radius: 4rpx;
        background: #555555;
      }
      .tipsDiv {
        width: 28rpx;
        height: 28rpx;
        line-height: 25rpx;
        text-align: center;
        background: #ff5253;
        border-radius: 50%;
        position: absolute;
        top: 12px;
        right: -16px;
        .tips {
          width: 12rpx;
          height: 24rpx;
          font-size: 24rpx !important;
          color: #ffffff;
          font-weight: 400;
          right: 9rpx;
          position: absolute;
        }
      }
    }
    .tabs.atv {
      color: #262626;
      font-size: 32rpx;
      font-family: "Source Han Sans CN";
      font-weight: 600;
    }
  }
  .linerow {
    position: absolute;
    width: 100%;
    height: 2rpx;
    background: #f7f7fa;
    left: 0;
    top: 117rpx;
    opacity: 1;
  }
  .allpendcomList {
    flex: 1;
    .viewallItem {
      // height: 426rpx;
      min-height: 426rpx;
      margin-top: 40rpx;
      .viewallItem_top {
        height: 226rpx;
        background: #f2f1f6;
        opacity: 1;
        border-radius: 16rpx 16rpx 0 0;
        display: flex;
        flex-direction: column;
        padding: 20rpx;
        .viewallItem_top_l_tb {
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .viewallItem_top_l_t {
          .viewallItem_top_l {
            display: flex;
            .viewallItem_top_l_img {
              width: 96rpx;
              height: 96rpx;
              border-radius: 50rpx;
              background: #dd4433;
              > img {
                width: 100%;
                height: 100%;
                border-radius: 50rpx;
              }
            }
            .viewallItem_top_l_tit {
              margin-left: 24rpx;
              .viewallItem_top_l_titp {
                position: relative;
              }
            }
          }
          .viewallItem_top_r {
            width: 64rpx;
            height: 64rpx;
            border-radius: 50%;
            > img {
              width: 100%;
              height: 100%;
            }
          }
        }
        .viewallItem_top_l_b {
          .viewallItem_top_l_b_tit {
            font-size: 24rpx;
            font-family: Source Han Sans CN;
            font-weight: 400;
            line-height: 11px;
            color: #9a9a9a;
            opacity: 1;
          }
          .viewallItem_top_l_b_time {
            color: #bb0a30;
            font-size: 22rpx;
          }
          .viewallItem_top_l_b_timesty {
            width: 30rpx;
            height: 32rpx;
            line-height: 32rpx;
            text-align: center;
            background: #bb0a30;
            border-radius: 4rpx;
            color: #ffffff;
            display: inline-block;
          }
          .viewallItem_top_l_b_sh {
            width: 110rpx;
            height: 40rpx;
            line-height: 40rpx;
            text-align: center;
            color: #ffffff;
            background: #38394f;
            opacity: 1;
            border-radius: 15px;
            font-size: 24rpx;
          }
        }
        .level_icon {
          display: inline-block;
          width: 30rpx;
          height: 30rpx;
          color: #fff;
          background: #ff5253;
          font-size: 24rpx;
          border-radius: 8rpx;
          text-align: center;
          line-height: 30rpx;
          font-weight: 500;
          margin-left: 18rpx;
          position: absolute;
          top: 8rpx;
        }
      }
      .viewallItem_but {
        min-height: 180rpx;
        background: #ffffff;
        border: 2rpx solid #f2f1f6;
        opacity: 1;
        border-radius: 0px 0px 16rpx 16rpx;

        .viewallItem_but_top {
          display: flex;
          justify-content: space-around;
          align-items: center;
          margin-top: 22rpx;
          margin-bottom: 30rpx;
          .viewallItem_but_img {
            width: 160rpx;
            height: 120rpx;
            background: #dd4433;
            > img {
              width: 100%;
              height: 100%;
            }
          }
          .viewallItem_but_tit {
            .viewallItem_but_tit1 {
              display: flex;
              font-size: 22rpx;
              color: #1a1a1a;
              margin-bottom: 14rpx;
              .viewallItem_but_tit11 {
                flex: 1;
              }
              .viewallItem_but_tit12 {
                flex: 3;
              }
            }
            .viewallItem_but_tit2 {
              font-size: 26rpx;
              color: #1a1a1a;
              margin-bottom: 14rpx;
            }
            .viewallItem_but_tit3 {
              display: flex;

              font-size: 22rpx;

              color: #9a9a9a;
              .viewallItem_but_tit31 {
                flex: 1;
              }
              .viewallItem_but_tit32 {
                flex: 3;
              }
            }
          }
        }

        .viewallItem_but_feedback {
          min-height: 68rpx;
          border-top: 2rpx solid #f7f7fa;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #bb0a30;
          font-size: 22rpx;
          .viewallItem_but_feedback_img {
            width: 26rpx;
            height: 16rpx;
            margin-left: 16rpx;
            margin-top: -11rpx;
          }
        }
        .viewallItem_but_con {
          height: 600rpx;
          padding: 20rpx 40rpx 40rpx 40rpx;
          flex-direction: column;
          .viewallItem_but_con_img {
            width: 66rpx;
            height: 66rpx;
            margin: 0 auto;
          }
          .viewallItem_but_con_p {
            margin-top: 8rpx;
            text-align: center;
            font-size: 24rpx;
            color: #ff5e16;
          }
          .viewallItem_but_con_start {
            .viewallItem_but_con_startXing {
              display: flex;
              font-size: 24rpx;
              height: 80rpx;
              line-height: 80rpx;
              color: #767676;
              .startXing_p {
                flex: 1;
                text-align: center;
                line-height: 80rpx;
              }
              .startXing_xing {
                flex: 4;
                display: flex;
                justify-content: center;
                align-items: center;
              }
            }
          }
          .viewallItem_but_con_tit {
            height: 80rpx;
            font-size: 24rpx;
            color: #b3b3b3;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            margin-top: 30rpx;
          }
        }
        .viewallItem_but_nofee {
          height: 70rpx;
          border-top: 2rpx solid #f7f7fa;
          font-size: 22rpx;
          line-height: 70rpx;
          padding-left: 26rpx;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          line-clamp: 1;
          -webkit-box-orient: vertical;
          .viewallItem_but_nofee_span {
            color: #1a1a1a;
          }
        }
      }
    }
  }
}
</style>