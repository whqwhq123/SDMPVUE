<template>
    <div>
        <div class="page-header">
            <div class="page-tit">用户画像</div>
            <div class="user-info-group">
                <div class="user-header" 
                    :style="{backgroundImage: 'url(https://saas-pcmatg.oss-cn-beijing.aliyuncs.com/mpimages/jzxd/shop-invite-user-def-header.png)'}"
                ></div>
                <div class="user-info">
                    <div class="user-name">客户昵称</div>
                    <div class="user-phone">13856474761</div>
                </div>
            </div>
        </div>
        <div class="page-body">
            <div class="user-tgi">
                <div class="user-type">
                    <div class="type-header"
                    :style="{backgroundImage: 'url(https://saas-pcmatg.oss-cn-beijing.aliyuncs.com/mpimages/jzxd/shop-invite-user-def-header.png)'}"
                    ></div>
                    <div class="type-tag">最典型</div>
                    <div class="tgi-num">TGI: 121</div>
                </div>
                <div class="tgi-line">
                    <div class="tgi-long"></div>
                </div>
                <div class="user-tag-group">
                    <div class="user-tag">男生</div>
                    <div class="user-tag">25~29岁</div>
                    <div class="user-tag">喜欢旅行</div>
                    <div class="user-tag">爱买电子产品</div>
                    <div class="user-tag">资讯媒体</div>
                </div>
            </div>

            <div class="user-type-tag-group">
                <div class="user-tag-item">
                    <div class="user-tag-tit">买车用于</div>
                    <div class="user-tag-box">
                        <div class="user-type-tag">上班代步</div>
                    </div>
                </div>

                <div class="user-tag-item">
                    <div class="user-tag-tit">购买关注</div>
                    <div class="user-tag-box">
                        <div class="user-type-tag">空间</div>
                    </div>
                </div>

                <div class="user-tag-item">
                    <div class="user-tag-tit">交易偏好</div>
                    <div class="user-tag-box">
                        <div class="user-type-tag">分期</div>
                    </div>
                </div>

                <div class="user-tag-item">
                    <div class="user-tag-tit">关注竞品</div>
                    <div class="user-tag-box">
                        <div class="car">奔驰 <span class="car-lv">C级</span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.page-header {
    padding: 56rpx 40rpx 46rpx 40rpx;
    background-color: #36384E;
}
.page-tit {
    font-size: 54rpx;
    color: #fff;
    font-weight: bold;
    line-height: 1;
    margin-bottom: 68rpx;
}
.user-info-group{
    display: flex;
}
.user-header{
    width: 88rpx;
    height: 88rpx;
    border-radius: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    margin-right: 30rpx;
}
.user-info{
    color: #fff;
}
.user-name{
    font-size: 30rpx;
    line-height: 1;
    margin-bottom: 14rpx;
}
.user-phone{
    font-size: 48rpx;
    line-height: 1
}

.page-body{
    padding: 64rpx 40rpx 0 40rpx;
}

.user-type{
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-flow: column;
}
.type-header{
    width: 120rpx;
    height: 120rpx;
    border-radius: 100%;
}
.type-tag{
    padding: 2rpx 8rpx 6rpx 8rpx;
    border-radius: 8rpx;
    color: #fff;
    font-size: 24rpx;
    line-height: 1;
    margin-top: -10rpx;
    margin-bottom: 16rpx;
    background-image: linear-gradient(297deg,rgba(187,10,48,1) 0%,rgba(255,104,38,1) 100%);
}
.tgi-num {
    font-size: 28rpx;
    font-weight: bold;
    color: #262626;
    line-height: 1;
    text-align: center;
    margin-bottom: 22rpx;
}
.tgi-line{
    width: 480rpx;
    margin: 0 auto;
    background-color: #eee;
    height: 12rpx;
    border-radius: 12rpx;
    margin-bottom: 34rpx;
}
.tgi-long{
    border-radius: 12rpx;
    background: linear-gradient(297deg,rgba(187,10,48,1) 0%,rgba(255,104,38,1) 100%);
}

.user-tag-group{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    border-bottom: 2rpx solid #f5f5f5;
    padding-bottom: 24rpx;
}
.user-tag{
    flex: none;
    padding: 16rpx 28rpx;
    border-radius: 48rpx;
    font-size: 28rpx;
    color: #262626;
    margin: 22rpx 16rpx;
    border: 2rpx solid #e5e5e5;
}

.user-type-tag-group{
    padding-top: 40rpx;
}

.user-tag-item{
    margin-bottom: 40rpx;
    padding-left: 192rpx;
    position: relative;
}
.user-tag-tit{
    position: absolute;
    left: 20rpx;

    font-size: 28rpx;
    color: #262626;
    line-height: 60rpx;
}
.user-type-tag{
    padding: 16rpx 28rpx 16rpx 24rpx;
    display: inline-block;
    font-size: 28rpx;
    color: #262626;
    border-radius: 60rpx;
    border: 2rpx solid #e5e5e5;
}
.car, .car-lv{
    font-size: 28rpx;
    color: #262626;
    line-height: 58rpx;
}
.car-lv {
    color: #B0C939
}
</style>
