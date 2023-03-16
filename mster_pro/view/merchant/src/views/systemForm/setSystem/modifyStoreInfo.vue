<template>
  <div class="information">
    <h2>商户基本信息</h2>
    <div class="business-msg" v-if="merModel">
      <div class="lab-title">基本信息</div>
      <div class="user-msg">
        <div class="basic-information">
          <div>商户名称：{{merData.mer_name}}</div>
          <div>商户负责人手机号：{{merData.mer_phone}}</div>
        </div>
        <div class="basic-information" v-if="merData.merchantCategory.category_name">
          <div>商户分类：{{merData.merchantCategory.category_name || ''}}</div>
          <div>商户类别：{{merData.is_trader?'自营':'非自营'}}</div>
        </div>
        <div class="basic-information">
          <div>商户负责人姓名：{{merData.real_name}}</div>
          <div>商户入驻时间：{{merData.create_time}}</div>
        </div>
        <div class="basic-information">
          <div>
            是否开启商户：
            <el-switch v-model="merData.mer_state" :active-value="1" :inactive-value="0"></el-switch>
            <span class="trip">开启，店铺即可展示在移动端</span>
          </div>
        </div>
      </div>
      <div class="form-data">
        <el-form
          :model="merData"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="店铺Banner(710*200px)" label-width="170px" prop="mer_banner">
            <div class="upLoadPicBox" @click="modalPicTap('1')" title="750*750px">
              <div v-if="merData.mer_banner" class="pictrue">
                <img :src="merData.mer_banner" />
              </div>
              <div v-else class="upLoad">
                <i class="el-icon-camera cameraIconfont" />
              </div>
            </div>
          </el-form-item>
          <el-form-item label="店铺头像(120*120px)" label-width="170px" prop="mer_avatar">
            <div class="upLoadPicBox" @click="modalPicTap('2')" title="750*750px">
              <div v-if="merData.mer_avatar" class="pictrue">
                <img :src="merData.mer_avatar" />
              </div>
              <div v-else class="upLoad">
                <i class="el-icon-camera cameraIconfont" />
              </div>
            </div>
          </el-form-item>
          <el-form-item label="店铺街banner(710*134px)" label-width="170px">
            <div class="tip-form">
              <div class="upLoadPicBox" @click="modalPicTap('3')" title="750*750px">
                <div v-if="merData.mini_banner" class="pictrue">
                  <img :src="merData.mini_banner" />
                </div>
                <div v-else class="upLoad">
                  <i class="el-icon-camera cameraIconfont" />
                </div>
              </div>
              <span>注:此图上传后显示在店铺街位置，如果未上传默认展示店铺Banner图</span>
            </div>
          </el-form-item>
          <el-form-item label="商户简介" prop="mer_info" label-width="170px">
            <el-input type="textarea" v-model="merData.mer_info" placeholder="文字简介，200字以内"></el-input>
          </el-form-item>
          <el-form-item label="商户关键字" prop="mer_keyword" label-width="170px">
            <div class="tip-form">
              <el-input v-model="merData.mer_keyword" placeholder="手机/电脑/数码相机"></el-input>
              <span>设置后用户在搜索该关键字时，可搜索到本店铺</span>
            </div>
          </el-form-item>
          <el-form-item label="客服电话" prop="service_phone" label-width="170px">
            <el-input v-model="merData.service_phone"></el-input>
          </el-form-item>
          <el-form-item label="商户地址" prop="mer_address" label-width="170px">
            <el-input
              v-model="merData.mer_address"
              enter-button="查找位置"
              style="width: 100%;"
              placeholder="请输入商户地址（地址中请包含城市名称，否则会影响搜索精度）"
            >
              <el-button slot="append" type="primary" @click="onSearch">查找位置</el-button>
            </el-input>
          </el-form-item>
          <Maps
            class="map-sty"
            v-if="mapKey"
            ref="mapChild"
            :mapKey="mapKey"
            :lat="Number(merData.lat || 34.34127)"
            :lon="Number(merData.long || 108.93984)"
            :address="merData.mer_address"
            @getCoordinates="getCoordinates"
          ></Maps>
          <el-form-item></el-form-item>
        </el-form>
      </div>
      <div class="lab-title">功能信息</div>
      <div class="user-msg">
        <div
          class="basic-information"
        >商户手续费：{{Number(merData.commission_rate) > 0 ? parseFloat(merData.commission_rate) : parseFloat(merData.merchantCategory.commission_rate*100)}}%</div>
        <div class="basic-information">添加商品：{{merData.is_audit?'需平台审核':'平台免审核'}}</div>
        <div class="basic-information">开启直播间：{{merData.is_bro_room?'需平台审核':'平台免审核'}}</div>
        <div class="basic-information">添加直播商品：{{merData.is_bro_goods?'需平台审核':'平台免审核'}}</div>
        <div class="basic-information">平台首页推荐商户：{{merData.is_best?'是':'否'}}</div>
      </div>
      <div class="submit-button">
        <el-button type="primary" :loading="submitLoading" @click="submitForm('ruleForm')">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { storeUpdateApi, storeGetInfoApi } from "@/api/setting";
import { getBaseInfo, merchantUpdate } from "@/api/user.js";
import Maps from "@/components/map/map.vue";
export default {
  name: "Information",
  components: { Maps },
  data() {
    var checkPhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入客服电话"));
      } else {
        let regPone = null;
        let mobile = /^1(3|4|5|6|7|8|9)\d{9}$/; //最新16手机正则
        let tel = /^(0[0-9]{2,3}\-)([2-9][0-9]{4,7})+(\-[0-9]{1,4})?$/; //座机
        if (value.charAt(0) == 0) {
          // charAt查找第一个字符方法，用来判断输入的是座机还是手机号
          regPone = tel;
        } else {
          regPone = mobile;
        }
        if (!regPone.test(value)) {
          return callback(new Error("请填写客服电话(座机格式'区号-座机号码')"));
        }
        callback();
      }
    };
    return {
      merModel: false,
      merData: {}, //默认数据
      mapKey: "", //地图key
      address: "",
      submitLoading: false, //提交loading
      rules: {
        mer_banner: [{ required: true, message: "请上传店铺banner" }],
        mer_avatar: [{ required: true, message: "请上传店铺头像" }],
        mer_info: [
          { required: true, message: "请输入商户简介", trigger: "blur" },
          {
            min: 3,
            max: 200,
            message: "长度在 3 到 200 个字符",
            trigger: "blur"
          }
        ],
        mer_keyword: [
          { required: false, message: "请输入商户关键字", trigger: "blur" }
        ],
        service_phone: [
          { required: true, validator: checkPhone, trigger: "blur" }
        ],
        mer_address: [
          { required: true, message: "请输入商户地址", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getMapInfo();
    this.getInfo();
  },
  methods: {
    // 地图信息获取
    getCoordinates(data) {
      // this.merData.mer_address = data.address;
      this.merData.lat = data.location.lat || 34.34127;
      this.merData.long = data.location.lng || 108.93984;
      console.log(data);
    },
    //获取历史信息
    getInfo() {
      this.merModel = false;
      getBaseInfo().then(res => {
        this.merData = res.data;
        this.merModel = true;
      });
    },
    //提交/修改
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let dataKey = Object.keys(this.rules);
          let reqData = {};
          [...dataKey, "mer_state", "long", "lat", "mini_banner"].map(item => {
            reqData[item] = this.merData[item];
          });
          this.submitLoading = true;
          merchantUpdate(reqData)
            .then(res => {
              console.log(res);
              this.submitLoading = false;
              this.$message.success("提交成功");
            })
            .catch(rej => {
              this.submitLoading = false;
              this.$message.error(rej.data.message);
            });
        } else {
          this.$message("请完善信息后再进行提交");
          this.submitLoading = false;
          return false;
        }
      });
    },
    //查找位置
    onSearch() {
      // console.log(this.$refs)
      this.$refs.mapChild.searchKeyword(this.merData.mer_address);
    },
    // 获取 map key
    getMapInfo() {
      let that = this;
      storeGetInfoApi()
        .then(res => {
          console.log(res);
          this.mapKey = res.data.tx_map_key;
        })
        .catch(function(res) {
          that.$message.error(res.message);
        });
    },
    // 上传图片
    modalPicTap(tit, num, i) {
      console.log(tit, num, i);
      const _this = this;
      const attr = [];
      this.$modalUpload(img => {
        console.log(img);
        if (tit === "1" && !num) {
          _this.merData.mer_banner = img[0];
        }
        if (tit === "2" && !num) {
          _this.merData.mer_avatar = img[0];
        }
        if (tit === "3" && !num) {
          _this.merData.mini_banner = img[0];
        }
        console.log(this.merData);
      }, tit);
    }
  }
};
</script>

<style lang='scss' scoped>
.information {
  width: 100%;
  padding: 30px 40px 80px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .business-msg {
    width: 80%;
  }
  h2 {
    text-align: center;
    color: #ffffff;
    background-color: #4784ff;
    padding: 10px 40px;
    border-radius: 25px 0 25px 0;
  }
  .lab-title {
    width: max-content;

    font-size: 18px;
    font-weight: bold;
    color: #ffffff;
    background-color: #4784ff;
    // border-bottom: 2px solid #ccc;
    margin: 10px 10%;
    padding: 10px 20px;
    border-radius: 25px 0 25px 0;
  }
  .user-msg {
    padding: 0 20px;
  }
  .basic-information {
    display: flex;
    justify-content: space-between;
    padding: 10px 10%;
    font-size: 13px;
    font-weight: bold;
    text-rendering: optimizeLegibility;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
      Microsoft YaHei, Arial, sans-serif;
    color: #606266;
    > div {
      width: 350px;
      flex-wrap: nowrap;
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      .trip {
        padding-left: 10px;
        color: #e72222;
      }
    }
  }
  .form-data {
    padding: 30px 10%;
    .map-sty {
      width: 90%;
      text-align: right;
      margin: 0 0 0 10%;
    }
    .pictrue img {
      border-radius: 4px;
      object-fit: cover;
    }
    .tip-form {
      display: flex;
      align-items: center;
      span {
        white-space: nowrap;
        padding-left: 10px;
        color: rgb(168, 159, 159);
      }
    }
  }
  .submit-button {
    display: flex;
    justify-content: center;
    position: fixed;
    bottom: 20px;
    // left: 50%;
    width: 80%;
    padding: 10px 0;
    background-color: rgba(255, 255, 255, 0.7);
  }
}
</style>
