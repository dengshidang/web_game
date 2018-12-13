<template>
  <div id="app" :class="{ 'bottom-nemu': nemuView }">
    <router-view/>
    <RBottomMenu/>
  </div>
</template>

<script>
import qs from 'qs'
import { mapState, mapGetters, mapMutations } from 'vuex'
import RBottomMenu from '@/components/RBottomMenu'

export default {
  name: 'App',
  components: {
    RBottomMenu
  },
  data() {
    return {
      shareData: [],
      code: null
    }
  },
  computed: {
    ...mapState([
      'token',
      'appid',
      'apiBaseUrl',
      'nemuView'
    ]),
    ...mapGetters([
      'getLiveUrl'
    ]),
    wxLoginurl() {
      return 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
              this.appid + '&redirect_uri=' + encodeURIComponent(this.getLiveUrl) +
              '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
    },
    key() {
      return this.$route.fullPath
    }
  },
  created() {
    this.init()
  //  this.wxLogin()
   // this.share()
  },
  methods: {
    ...mapMutations([
      'UPDATE_APPID',
      'UPDATE_TOKEN',
      'UPDATE_IS_INIT_OK'
    ]),
    init() {
      // let appid = this.getQueryString('appid')
      const appid = 'wx7b687e12d8340497'
      this.code = this.getQueryString('code')
      this.from = this.getQueryString('from')

      if (!appid) {
        // Todo 这里要处理异常
      }

      this.UPDATE_APPID(appid)
    },
    getQueryString(name) {
      const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      const search = window.location.search.substr(1).match(reg)
      if (search != null) {
        return unescape(search[2])
      } else {
        return null
      }
    },
    wxLogin() {
      if (!this.token || this.token.expire < (new Date().getTime() / 1000)) {
        console.log('time:' + (this.token ? this.token.expire : -1) + '----' + new Date().getTime() / 1000)
        if (this.code) {
          this.axios.get(
            `${this.apiBaseUrl}/auth/authorize`,
            {
              params: {
                code: this.code,
                t: parseInt(new Date().getTime() / 1000),
                state: 1,
                type: this.token ? 1 : 2,
                wechatId: 'foreyewx'
              }
            }
          ).then(res => {
            if (res.data.code === 'SUCCESS') {
              console.log(res.data.result)
              this.UPDATE_TOKEN({
                key: res.data.result,
                expire: parseInt(new Date().getTime() / 1000) + res.data.result.expiresIn
              })
            } else {
              window.location.href = this.wxLoginurl
            }
          })
        } else {
          window.location.href = this.wxLoginurl
        }
      }
    },
    share() {
      this.axios.post(
        `${this.apiBaseUrl}/signature`,
        qs.stringify({
          url: location.href.split('#')[0]
        })
      ).then(res => {
        this.initShare(res.data)
      })
    },
    initShare(data) {
      this.$wechat.config({
        // debug: true,
        appId: 'wx7b687e12d8340497', // data.result.appId,
        timestamp: data.result.timestamp,
        nonceStr: data.result.nonceStr,
        signature: data.result.signature,
        jsApiList: [
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'getLocation'
        ]
      })
      this.$wechat.ready(() => {
        this.UPDATE_IS_INIT_OK(true)
      })
    }
  }
}
</script>

<style lang="scss">
  html, body {
    font-family: "PingFangSC";
    background: #F5F5F5;
  }
  html {
    font-size: 62.5%;
  }
  .bottom-nemu {
    padding-bottom: 47px;
    box-sizing: border-box;
  }

  .icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>

<style lang="less">
  @import '~vux/src/styles/reset.less';
</style>
