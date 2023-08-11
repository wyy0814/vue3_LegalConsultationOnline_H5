<template>
  <div class="user-page">
    <div class="user-page-head">
      <div class="top">
        <van-image
          round
          fit="cover"
          src="https://ts1.cn.mm.bing.net/th/id/R-C.5a0dcebfe6b1d0eed734cd3f22ee189b?rik=vbNJKN5ahwOO4g&riu=http%3a%2f%2fimg1.wywyx.com%2fuploads%2fallimg%2f191221%2f1_12210K550N94.jpg&ehk=fSwIwNlVxCm7mJzn9Q2yz3JKAyzmxKOuq1RnOGUc5Bc%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1"
        />
        <div class="name">
          <p>hello</p>
          <p>
            <van-icon name="edit" />
          </p>
        </div>
      </div>
      <van-row>
        <van-col span="6">
          <p>hello</p>
          <p>收藏</p>
        </van-col>
        <van-col span="6">
          <p>hello</p>
          <p>关注</p>
        </van-col>
        <van-col span="6">
          <p>hello</p>
          <p>积分</p>
        </van-col>
        <van-col span="6">
          <p>hello</p>
          <p>优惠券</p>
        </van-col>
      </van-row>
    </div>
    <div class="user-page-order">
      <div class="head">
        <h3>药品订单</h3>
        <router-link to="/order"
          >全部订单
          <van-icon name="arrow" />
        </router-link>
      </div>
      <van-row>
        <van-col span="6">
          <van-badge>
            <cp-icon name="user-paid" />
          </van-badge>
          <p>待付款</p>
        </van-col>
        <van-col span="6">
          <van-badge>
            <cp-icon name="user-shipped" />
          </van-badge>
          <p>待发货</p>
        </van-col>
        <van-col span="6">
          <van-badge>
            <cp-icon name="user-received" />
          </van-badge>
          <p>待收货</p>
        </van-col>
        <van-col span="6">
          <van-badge>
            <cp-icon name="user-finished" />
          </van-badge>
          <p>已完成</p>
        </van-col>
      </van-row>
    </div>
    <!-- 2. 快捷工具 -->
    <div class="user-page-group">
      <h3>快捷工具</h3>
      <van-cell is-link to="item.path" :border="false">
        <template #icon><cp-icon name="`user-tool-0${i + 1}`" /></template>
      </van-cell>
    </div>
    <!-- 3. 退出登录 -->
    <a class="logout" href="javascript:;">退出登录</a>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.user-page {
  background-color: var(--cp-bg);
  min-height: calc(100vh - 50px);
  padding: 0 15px 65px;

  // 头部
  &-head {
    height: 200px;
    background: linear-gradient(
      180deg,
      rgba(44, 181, 165, 0.46),
      rgba(44, 181, 165, 0)
    );
    margin: 0 -15px;
    padding: 0 15px;

    .top {
      display: flex;
      padding-top: 50px;
      align-items: center;

      .van-image {
        width: 70px;
        height: 70px;
      }

      .name {
        padding-left: 10px;

        p {
          &:first-child {
            font-size: 18px;
            font-weight: 500;
          }

          &:last-child {
            margin-top: 10px;
            color: var(--cp-primary);
            font-size: 16px;
          }
        }
      }
    }

    .van-row {
      margin: 0 -15px;
      padding-top: 15px;

      p {
        text-align: center;

        &:first-child {
          font-size: 18px;
          font-weight: 500;
        }

        &:last-child {
          color: var(--cp-dark);
          font-size: 12px;
          padding-top: 4px;
        }
      }
    }
  }

  // 订单
  &-order {
    background-color: #fff;
    border-radius: 8px;
    margin-bottom: 15px;
    padding-bottom: 15px;

    .head {
      display: flex;
      justify-content: space-between;
      line-height: 50px;
      padding: 0 15px;

      a {
        color: var(--cp-tip);
      }
    }

    .van-col {
      text-align: center;

      .cp-icon {
        font-size: 28px;
      }

      p {
        font-size: 12px;
        padding-top: 4px;
      }
    }
  }

  // 分组
  &-group {
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;

    h3 {
      padding-left: 16px;
      line-height: 44px;
    }

    .van-cell {
      align-items: center;
    }

    .cp-icon {
      font-size: 17px;
      margin-right: 10px;
    }
  }

  .logout {
    display: block;
    margin: 20px auto;
    width: 100px;
    text-align: center;
    color: var(--cp-price);
  }
}
</style>
