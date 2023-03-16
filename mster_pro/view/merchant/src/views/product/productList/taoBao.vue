<template>
  <div class="Box">
    <el-dialog
      v-if="modals"
      :visible.sync="modals"
      width="70%"
      title="复制淘宝、天猫、拼多多、京东、苏宁"
      custom-class="dialog-scustom"
    >
      <el-card>
        生成的商品默认是没有上架的，请手动上架商品！
        <span style="color: rgb(237, 64, 20);">商品复制次数剩余：{{ count }}次</span>
      </el-card>
      <el-form
        ref="formValidate"
        class="formValidate mt20"
        :model="formValidate"
        :rules="ruleInline"
        label-width="120px"
        label-position="right"
        @submit.native.prevent
      >
        <el-form-item label label-for>
          <el-radio-group v-model="artFrom.type">
            <el-radio label="taobao">淘宝</el-radio>
            <el-radio label="tmall">天猫</el-radio>
            <el-radio label="jd">京东</el-radio>
            <el-radio label="pdd">拼多多</el-radio>
            <el-radio label="suning">苏宁</el-radio>
            <el-radio label="1688">1688</el-radio>
          </el-radio-group>
          <el-button size="small" type="primary" style="margin-left: 15px;" @click="openRecords">查看商品复制记录</el-button>
        </el-form-item>
        <el-form-item label="链接地址：">
          <el-input v-model="soure_link" search placeholder="请输入链接地址" class="numPut" />
          <el-button :loading="loading"  size="small" type="primary" @click="add">确定</el-button>
        </el-form-item>
        <div>
          <div v-if="isData">
            <el-form-item label="商品名称：" prop="store_name">
              <el-input v-model="formValidate.store_name" placeholder="请输入商品名称" />
            </el-form-item>
            <el-form-item label="商品简介：" prop="store_info" label-for="store_info">
              <el-input
                v-model="formValidate.store_info"
                type="textarea"
                :rows="3"
                placeholder="请输入商品简介"
              />
            </el-form-item>
            <el-form-item label="平台商品分类：" prop="cate_id">
              <el-cascader
                class="selWidth"
                v-model="formValidate.cate_id"
                :options="categoryList"
                clearable
              />
            </el-form-item>

            <el-form-item label="商户商品分类：" prop="mer_cate_id">
              <el-cascader
                v-model="formValidate.mer_cate_id"
                class="selWidth"
                :options="merCateList"
                :props="propsMer"
                clearable
              />
            </el-form-item>
            <el-form-item label="品牌选择：" prop="brand_id">
              <el-select
                v-model="formValidate.brand_id"
                filterable
                placeholder="请选择"
                class="selWidth"
              >
                <el-option
                  v-for="item in BrandList"
                  :key="item.brand_id"
                  :label="item.brand_name"
                  :value="item.brand_id"
                />
              </el-select>
            </el-form-item>
            <el-form-item v-bind="grid" label="商品关键字：" prop="keyword" label-for="keyword">
              <el-input v-model="formValidate.keyword" placeholder="请输入商品关键字" />
            </el-form-item>
            <el-form-item label="单位：" prop="unit_name" label-for="unit_name">
              <el-input v-model="formValidate.unit_name" placeholder="请输入单位" />
            </el-form-item>
            <el-form-item v-bind="grid" label="运费模板：" prop="temp_id">
              <el-select v-model="formValidate.temp_id" clearable>
                <el-option
                  v-for="item in shippingList"
                  :key="item.shipping_template_id"
                  :label="item.name"
                  :value="item.shipping_template_id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="商品图：">
              <div class="pictrueBox">
                <div class="pictrue" v-if="formValidate.image">
                  <img v-lazy="formValidate.image" />
                </div>
              </div>
            </el-form-item>
            <el-form-item label="商品轮播图：">
              <div class="acea-row">
                <div
                  class="lunBox mr15"
                  v-for="(item,index) in formValidate.slider_image"
                  :key="index"
                  draggable="true"
                  @dragstart="handleDragStart($event, item)"
                  @dragover.prevent="handleDragOver($event, item)"
                  @dragenter="handleDragEnter($event, item)"
                  @dragend="handleDragEnd($event, item)"
                >
                  <div class="pictrue">
                    <img v-lazy="item" />
                  </div>
                  <div class="buttonGroup">
                    <el-button class="small-btn" @click.native="checked(item,index)">主图</el-button>
                    <el-button class="small-btn" @click.native="handleRemove(index)">移除</el-button>
                  </div>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="批量设置：" class="labeltop" v-if="formValidate.spec_type === 1 && ManyAttrValue.length > 1">
              <el-table :data="oneFormBatch">
                <el-table-column label="图片" min-width="150" align="center">
                  <template slot-scope="scope">
                    <div
                      class="acea-row row-middle row-center-wrapper"
                      @click="modalPicTap('1','dan','pi')"
                    >
                      <div v-if="oneFormBatch[0].image" class="pictrue pictrueTab">
                        <img v-lazy="oneFormBatch[0].image" />
                      </div>
                      <div v-else class="upLoad pictrueTab acea-row row-center-wrapper">
                        <i class="el-icon-camera cameraIconfont" />
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="售价" min-width="150" align="center">
                  <template slot-scope="scope">
                    <el-input type="number" v-model="oneFormBatch[0].price" min="0" class="priceBox" />
                  </template>
                </el-table-column>
                <el-table-column label="成本价" min-width="150" align="center">
                  <template slot-scope="scope">
                    <el-input type="number" v-model="oneFormBatch[0].cost" min="0" class="priceBox" />
                  </template>
                </el-table-column>
                <el-table-column label="原价" min-width="150" align="center">
                  <template slot-scope="scope">
                    <el-input type="number" v-model="oneFormBatch[0].ot_price" min="0" class="priceBox" />
                  </template>
                </el-table-column>
                <el-table-column label="库存" min-width="150" align="center">
                  <template slot-scope="scope">
                    <el-input v-model.number="oneFormBatch[0].stock" class="priceBox" />
                  </template>
                </el-table-column>
                <el-table-column label="商品编号" min-width="150" align="center">
                  <template slot-scope="scope">
                    <el-input v-model="oneFormBatch[0].bar_code" />
                  </template>
                </el-table-column>
                <el-table-column label="重量(KG)" min-width="150" align="center">
                  <template slot-scope="scope">
                    <el-input type="number" v-model="oneFormBatch[0].weight" min="0" class="priceBox" />
                  </template>
                </el-table-column>
                <el-table-column label="体积(m²)" min-width="150" align="center">
                  <template slot-scope="scope">
                    <el-input type="number" v-model="oneFormBatch[0].volume" min="0" class="priceBox" />
                  </template>
                </el-table-column>
                <el-table-column label="操作" min-width="150" align="center">
                  <template slot-scope="scope">
                    <a href="javascript: void(0);" class="ela-btn" @click="batchAdd">添加</a>
                    <a href="javascript: void(0);" class="ela-btn" @click="batchDel">清空</a>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
            <el-form-item v-if="formValidate.spec_type === 0" class="labeltop" label="规格列表：">
              <el-table :data="OneattrValue" border class="tabNumWidth" size="mini">
                <el-table-column align="center" label="图片" min-width="80">
                  <template slot-scope="scope">
                    <div class="upLoadPicBox" @click="modalPicTap('1', 'dan', scope.$index)">
                      <div v-if="scope.row.image" class="pictrue tabPic"><img :src="scope.row.image"></div>
                      <div v-else class="upLoad tabPic">
                        <i class="el-icon-camera cameraIconfont" />
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column v-for="(item,iii) in attrValue" :key="iii" :label="formThead[iii].title" align="center" min-width="120">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row[iii]" :type="formThead[iii].title==='商品编号'?'text':'number'" :min="0" class="priceBox" />
                  </template>
                </el-table-column>
                <template v-if="formValidate.extension_type === 1">
                  <el-table-column align="center" label="一级返佣(元)" min-width="120">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.extension_one" type="number" :min="0" class="priceBox" />
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="二级返佣(元)" min-width="120">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.extension_two" type="number" :min="0" class="priceBox" />
                    </template>
                  </el-table-column>
                </template>
              </el-table>
            </el-form-item>
            <!-- 多规格表格-->
            <el-form-item v-if="formValidate.spec_type === 1" class="labeltop" label="规格列表：">
              <el-table :data="ManyAttrValue" border class="tabNumWidth" size="mini">
                <template v-if="manyTabDate">
                  <el-table-column v-for="(item,iii) in manyTabDate" :key="iii" align="center" :label="manyTabTit[iii].title" min-width="80">
                    <template slot-scope="scope">
                      <span class="priceBox" v-text="scope.row[iii]" />
                    </template>
                  </el-table-column>
                </template>
                <el-table-column align="center" label="图片" min-width="80">
                  <template slot-scope="scope">
                    <div class="upLoadPicBox" @click="modalPicTap('2','duo',scope.$index)" title="750*750px">
                      <div v-if="scope.row.image" class="pictrue tabPic"><img :src="scope.row.image"></div>
                      <div v-else class="upLoad tabPic">
                        <i class="el-icon-camera cameraIconfont" />
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column v-for="(item,iii) in attrValue" :key="iii" :label="formThead[iii].title" align="center" min-width="120">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row[iii]" :type="formThead[iii].title==='商品编号'?'text':'number'" class="priceBox" />
                  </template>
                </el-table-column>
                <template v-if="formValidate.extension_type === 1">
                  <el-table-column align="center" label="一级返佣(元)" min-width="120">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.extension_one" type="number" :min="0" class="priceBox" />
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="二级返佣(元)" min-width="120">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.extension_two" type="number" :min="0" class="priceBox" />
                    </template>
                  </el-table-column>
                </template>
                <el-table-column key="3" align="center" label="操作" min-width="80">
                  <template slot-scope="scope">
                    <el-button type="text" class="submission" @click="delAttrTable(scope.$index)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
            <el-form-item label="商品详情：">
              <!--<vue-ueditor-wrap
                v-model="formValidate.content"
                @beforeInit="addCustomDialog"
                :config="myConfig"
                style="width: 100%;"
              ></vue-ueditor-wrap>-->
              <ueditorFrom v-model="formValidate.content" :content="formValidate.content"/>
            </el-form-item>
            <el-form-item>
              <el-button :loading="loading1" type="primary" class="submission" @click="handleSubmit('formValidate')">提交</el-button>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </el-dialog>
    <!--商品复制记录-->
    <copy-record ref="copyRecord"></copy-record>
  </div>
</template>

<script>
import {
  crawlFromApi,
  categoryListApi,
  shippingListApi,
  productCopyApi,
  categorySelectApi,
  categoryBrandListApi,
  productCopyCountApi,
} from "@/api/product";
import VueUeditorWrap from "vue-ueditor-wrap";
import ueditorFrom from "@/components/ueditorFrom";
import UploadIndex from "@/components/uploadPicture/index.vue";
import copyRecord from "./copyRecord";
import goodsList from "@/views/marketing/seckill/seckillGoods/goodsList";
const defaultObj = {
  store_name: "",
  cate_id: "",
  temp_id: "",
  keyword: "",
  unit_name: "",
  store_info: "",
  image: "",
  slider_image: [],
  content: "",
  ficti: 0,
  give_integral: 0,
  is_show: 0,
  price: 0,
  cost: 0,
  ot_price: 0,
  stock: 0,
  soure_link: "",
  description_images: "",
  postage: 0,
  attrs: [],
  items: [],
  spec_type: 0,
  is_copoy: 1,
  attrValue:[{
    image: '',
    price: 0,
    cost: 0,
    ot_price: 0,
    stock: 0,
    bar_code: '',
    weight: 0,
    volume: 0
  }]
}
const objTitle = {
  price: {
    title: '售价'
  },
  cost: {
    title: '成本价'
  },
  ot_price: {
    title: '原价'
  },
  stock: {
    title: '库存'
  },
  bar_code: {
    title: '商品编号'
  },
  weight: {
    title: '重量（KG）'
  },
  volume: {
    title: '体积(m³)'
  }
}
export default {
  name: "copyTaoBao",
  data() {
    return {
      modals: false,
      loading: false,
      loading1: false,
      OneattrValue: [Object.assign({}, defaultObj.attrValue[0])], // 单规格
      ManyAttrValue: [Object.assign({}, defaultObj.attrValue[0])], // 多规格
      /*oneFormBatch: [
        {
          image: "",
          price: 0,
          cost: 0,
          ot_price: 0,
          stock: 0,
          bar_code: "",
          weight: 0,
          volume: 0,
        },
      ],*/
      columnsBatch: [
        {
          title: "图片",
          slot: "image",
          align: "center",
          minWidth: 80,
        },
        {
          title: "售价",
          slot: "price",
          align: "center",
          minWidth: 95,
        },
        {
          title: "成本价",
          slot: "cost",
          align: "center",
          minWidth: 95,
        },
        {
          title: "原价",
          slot: "ot_price",
          align: "center",
          minWidth: 95,
        },
        {
          title: "库存",
          slot: "stock",
          align: "center",
          minWidth: 95,
        },
        {
          title: "商品编号",
          slot: "bar_code",
          align: "center",
          minWidth: 120,
        },
        {
          title: "重量（KG）",
          slot: "weight",
          align: "center",
          minWidth: 95,
        },
        {
          title: "体积(m³)",
          slot: "volume",
          align: "center",
          minWidth: 95,
        }
      ],
      manyTabDate: {},
      count: 0,
      modal_loading: false,
      images: "",
      soure_link: "",
      modalPic: false,
      isChoice: "",
      gridPic: {
        xl: 6,
        lg: 8,
        md: 12,
        sm: 12,
        xs: 12,
      },
      gridBtn: {
        xl: 4,
        lg: 8,
        md: 8,
        sm: 8,
        xs: 8,
      },
      columns: [],
      categoryList: [], // 平台
      merCateList: [], //商户
      BrandList: [], //品牌
      propsMer: { emitPath: false, multiple: true },
      tableFrom: {
        mer_cate_id: "",
        cate_id: "",
        keyword: "",
        type: "1",
        is_gift_bag: "",
      },
      ruleInline: {
        cate_id: [
          { required: true, message: "请选择商品分类", trigger: "change" },
        ],
        mer_cate_id: [
          {
            required: true,
            message: "请选择商户分类",
            trigger: "change",
            type: "array",
            min: "1",
          },
        ],
        temp_id: [
          {
            required: true,
            message: "请选择运费模板",
            trigger: "change",
            type: "number",
          },
        ],
        brand_id: [
          { required: true, message: "请选择品牌", trigger: "change" },
        ],
        store_info: [
          { required: true, message: "请输入商品简介", trigger: "blur" },
        ],
      },
      grid: {
        xl: 8,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24,
      },
      grid2: {
        xl: 12,
        lg: 12,
        md: 12,
        sm: 24,
        xs: 24,
      },
      myConfig: {
        autoHeightEnabled: false, // 编辑器不自动被内容撑高
        initialFrameHeight: 500, // 初始容器高度
        initialFrameWidth: "100%", // 初始容器宽度
        UEDITOR_HOME_URL: "/UEditor/",
        serverUrl: "",
      },
      formThead: Object.assign({}, objTitle),
      formValidate: Object.assign({}, defaultObj),
      items: [
        {
          image: "",
          price: 0,
          cost: 0,
          ot_price: 0,
          stock: 0,
          bar_code: "",
          weight: 0,
          volume: 0,
        },
      ],
      shippingList: [],
      isData: false,
      artFrom: {
        type: "taobao",
        url: "",
      },
      tableIndex: 0,
      labelPosition: "right",
      labelWidth: "120",
      isMore: "",
      taoBaoStatus: {},
      attrInfo: {},
    };
  },
  components: { ueditorFrom, VueUeditorWrap, UploadIndex, copyRecord },
  computed: {
    attrValue() {
      const obj = Object.assign({}, defaultObj.attrValue[0])
      delete obj.image
      return obj
    },
    oneFormBatch() {
      const obj = [Object.assign({}, defaultObj.attrValue[0])]
      delete obj[0].bar_code
      return obj
    }
  },
  watch: {},
  created() {
    this.goodsCategory();
    this.getCategorySelect();
    this.getBrandListApi();
  },
  mounted() {
    this.productGetTemplate();
    this.getCopyCount();
  },
  methods: {
    //获取剩余复制次数
    getCopyCount() {
      productCopyCountApi().then((res) => {
        this.count = res.data.count;
      });
    },
    // 查看复制记录
    openRecords() {
      this.$refs.copyRecord.getRecord();
    },
    batchDel() {
      this.oneFormBatch = [
        {
          image: "",
          price: 0,
          cost: 0,
          ot_price: 0,
          stock: 0,
          bar_code: "",
          weight: 0,
          volume: 0,
        },
      ];
    },
    batchAdd() {
      for (const val of this.ManyAttrValue) {
        this.$set(val, 'image', this.oneFormBatch[0].image)
        this.$set(val, 'price', this.oneFormBatch[0].price)
        this.$set(val, 'cost', this.oneFormBatch[0].cost)
        this.$set(val, 'ot_price', this.oneFormBatch[0].ot_price)
        this.$set(val, 'stock', this.oneFormBatch[0].stock)
        this.$set(val, 'bar_code', this.oneFormBatch[0].bar_code)
        this.$set(val, 'weight', this.oneFormBatch[0].weight)
        this.$set(val, 'volume', this.oneFormBatch[0].volume)
        this.$set(val, 'extension_one', this.oneFormBatch[0].extension_one)
        this.$set(val, 'extension_two', this.oneFormBatch[0].extension_two)
      }
    },
    // 删除表格中的属性
    delAttrTable(index) {
      this.ManyAttrValue.splice(index, 1);
    },
    // 获取运费模板；
    productGetTemplate() {
      shippingListApi().then((res) => {
        this.shippingList = res.data;
      });
    },
    // 删除图片
    handleRemove(i) {
      this.formValidate.slider_image.splice(i, 1);
    },
    // 选择主图
    checked(item, index) {
      this.formValidate.image = item;
    },
    // 商品分类；
    goodsCategory() {
      categoryListApi()
        .then((res) => {
          this.categoryList = res.data;
        })
        .catch((res) => {
          this.$message.error(res.message);
        });
    },
    // 商户分类；
    getCategorySelect() {
      categorySelectApi()
        .then((res) => {
          this.merCateList = res.data;
        })
        .catch((res) => {
          this.$message.error(res.message);
        });
    },
    // 品牌筛选；
    getBrandListApi() {
      categoryBrandListApi()
        .then((res) => {
          this.BrandList = res.data;
        })
        .catch((res) => {
          this.$message.error(res.message);
        });
    },
    watCh(val) {
      const tmp = {}
      const tmpTab = {}
      this.formValidate.attr.forEach((o, i) => {
        tmp['value' + i] = { title: o.value }
        tmpTab['value' + i] = ''
      })
      this.ManyAttrValue = this.attrFormat(val)
      console.log(this.ManyAttrValue)
      this.ManyAttrValue.forEach((val, index) => {
        const key = Object.values(val.detail).sort().join('/')
        if (this.attrInfo[key]) this.ManyAttrValue[index] = this.attrInfo[key]
      })
      this.attrInfo = {}
      this.ManyAttrValue.forEach((val) => {
        if(val.detail !== 'undefined' && val.detail !== null){
          this.attrInfo[Object.values(val.detail).sort().join('/')] = val
        }
      })
      this.manyTabTit = tmp
      this.manyTabDate = tmpTab
      this.formThead = Object.assign({}, this.formThead, tmp)
    },
    attrFormat(arr) {
      let data = []
      const res = []
      return format(arr)
      function format(arr) {
        if (arr.length > 1) {
          arr.forEach((v, i) => {
            if (i === 0) data = arr[i]['detail']
            const tmp = []
            data.forEach(function(vv) {
              arr[i + 1] && arr[i + 1]['detail'] && arr[i + 1]['detail'].forEach(g => {
                const rep2 = (i !== 0 ? '' : arr[i]['value'] + '_$_') + vv + '-$-' + arr[i + 1]['value'] + '_$_' + g
                tmp.push(rep2)
                if (i === (arr.length - 2)) {
                  const rep4 = {
                    image: '',
                    price: 0,
                    cost: 0,
                    ot_price: 0,
                    stock: 0,
                    bar_code: '',
                    weight: 0,
                    volume: 0,
                    brokerage: 0,
                    brokerage_two: 0
                  }
                  rep2.split('-$-').forEach((h, k) => {
                    const rep3 = h.split('_$_')
                    if (!rep4['detail']) rep4['detail'] = {}
                    rep4['detail'][rep3[0]] = rep3.length > 1 ? rep3[1] : ''
                  })
                  Object.values(rep4.detail).forEach((v, i) => {
                    rep4['value' + i] = v
                  })
                  res.push(rep4)
                }
              })
            })
            data = tmp.length ? tmp : []
          })
        } else {
          const dataArr = []
          arr.forEach((v, k) => {
            v['detail'].forEach((vv, kk) => {
              dataArr[kk] = v['value'] + '_' + vv
              res[kk] = {
                image: '',
                price: 0,
                cost: 0,
                ot_price: 0,
                stock: 0,
                bar_code: '',
                weight: 0,
                volume: 0,
                brokerage: 0,
                brokerage_two: 0,
                detail: { [v['value']]: vv }
              }
              Object.values(res[kk].detail).forEach((v, i) => {
                res[kk]['value' + i] = v
              })
            })
          })
          data.push(dataArr.join('$&'))
        }
        console.log(res);
        return res
      }
    },
    // 生成表单
    add() {
      if (this.soure_link) {
        var reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
        if (!reg.test(this.soure_link)) {
          return this.$Message.warning("请输入以http开头的地址！");
        }
        this.artFrom.url = this.soure_link;
        this.loading = true;
        crawlFromApi(this.artFrom)
          .then((res) => {
            let info = res.data.info;
            this.columns = info.info && info.info.header || this.columnsBatch;
            this.formValidate = info;
            this.taoBaoStatus = info.info ? info.info : '';
            this.formValidate.content = info.description || ''
            this.formValidate.is_show = 0
            this.formValidate.soure_link = this.soure_link;
            this.formValidate.attr = info.info && info.info.attr || []
            this.formValidate.attrValue = info.info && info.info.value || [{
              image: '',
              price: 0,
              cost: 0,
              ot_price: 0,
              stock: 0,
              bar_code: '',
              weight: 0,
              volume: 0
            }];
            this.formValidate.spec_type = info.spec_type;
            if(this.formValidate.spec_type === 0){
              this.OneattrValue = info.info && info.info.value || [{
                image: this.formValidate.image,
                price: 0,
                cost: 0,
                ot_price: 0,
                stock: 0,
                bar_code: '',
                weight: 0,
                volume: 0
              }];
            }else{
              this.ManyAttrValue = info.info && info.info.value || [{
                image: '',
                price: 0,
                cost: 0,
                ot_price: 0,
                stock: 0,
                bar_code: '',
                weight: 0,
                volume: 0
              }];
              // this.ManyAttrValue.forEach((val) => {
              //   if(val.detail !== 'undefined' && val.detail !== null){
              //     this.attrInfo[Object.values(val.detail).sort().join('/')] = val
              //   }
              // })
              console.log(this.ManyAttrValue);
              this.watCh(this.formValidate.attr)
            }
            if (this.formValidate.image) {
              this.oneFormBatch[0].image = this.formValidate.image;
            }
            this.isData = true;
            this.loading = false;
          })
          .catch((res) => {
            this.$message.error(res.message);
            this.loading = false;
          });
      } else {
        this.$message.warning("请输入链接地址！");
      }
    },
    // 提交
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.modal_loading = true;
          this.formValidate.cate_id = this.formValidate.cate_id.pop();
          if(this.formValidate.spec_type === 1){
            this.formValidate.attrValue=this.ManyAttrValue
          }else{
            this.formValidate.attrValue=this.OneattrValue
            this.formValidate.attr = []
          }
          this.formValidate.is_copoy = 1;
          // this.formValidate.attrValue = this.items
          this.loading1 = true;
          productCopyApi(this.formValidate)
            .then((res) => {
              this.$message.success("商品默认为不上架状态请手动上架商品!");
              this.loading1 = false;
              setTimeout(() => {
                this.modal_loading = false;
              }, 500);
              setTimeout(() => {
                this.modals = false;
              }, 600);
              this.$emit('getSuccess')
            })
            .catch((res) => {
              this.modal_loading = false;
              this.$message.error(res.message);
              this.loading1 = false;
            });
        } else {
          if (!this.formValidate.cate_id) {
            this.$message.warning("请填写商品分类！");
          }
        }
      });
    },
    // 点击商品图
    modalPicTap(tit, num, index) {
      this.tableIndex = index;
      const _this = this;
      this.$modalUpload(function (img) {
        console.log(_this.formValidate.attr[_this.tableIndex]);
        if (tit === "1") {
          if(index === 'pi'){
            _this.oneFormBatch[0].image = img[0];
          }else{
            _this.OneattrValue[0].image = img[0];
          }
        }
        if (tit === "2") {
          _this.ManyAttrValue[_this.tableIndex].image = img[0];
        }
        _this.modalPic = false;
        // _this.formValidate.image = img[0];
        // _this.OneattrValue[0].image = img[0];
      }, tit);
    },
    // 获取单张图片信息
    getPic(pc) {
      this.callback(pc);
      this.formValidate.attr[this.tableIndex].pic = pc.att_dir;
      this.modalPic = false;
    },
    handleDragStart(e, item) {
      this.dragging = item;
    },
    handleDragEnd(e, item) {
      this.dragging = null;
    },
    // 首先把div变成可以放置的元素，即重写dragenter/dragover
    handleDragOver(e) {
      // e.dataTransfer.dropEffect="move";//在dragenter中针对放置目标来设置!
      e.dataTransfer.dropEffect = "move";
    },
    handleDragEnter(e, item) {
      // 为需要移动的元素设置dragstart事件
      e.dataTransfer.effectAllowed = "move";
      if (item === this.dragging) {
        return;
      }
      const newItems = [...this.formValidate.slider_image];
      const src = newItems.indexOf(this.dragging);
      const dst = newItems.indexOf(item);
      newItems.splice(dst, 0, ...newItems.splice(src, 1));
      this.formValidate.slider_image = newItems;
    },
    // 添加自定义弹窗
    addCustomDialog(editorId) {
      window.UE.registerUI(
        "test-dialog",
        function (editor, uiName) {
          let dialog = new window.UE.ui.Dialog({
            iframeUrl: "/admin/widget.images/index.html?fodder=dialog",
            editor: editor,
            name: uiName,
            title: "上传图片",
            cssRules: "width:1200px;height:500px;padding:20px;",
          });
          this.dialog = dialog;
          var btn = new window.UE.ui.Button({
            name: "dialog-button",
            title: "上传图片",
            cssRules: `background-image: url(../../../assets/images/icons.png);background-position: -726px -77px;`,
            onclick: function () {
              dialog.render();
              dialog.open();
            },
          });
          return btn;
        },
      );
    },
  },
};
</script>

<style scoped lang="scss">
/deep/.el-cascader {
  display: block;
}
.dialog-scustom {
  width: 1200px;
  height: 600px;
}
.ela-btn {
  color: #2d8cf0;
}
.Box .ivu-radio-wrapper {
  margin-right: 25px;
}

.Box .numPut {
  width: 80% !important;
}

.lunBox {
  /* width 80px */
  display: flex;
  flex-direction: column;
  border: 1px solid #0bb20c;
}

.pictrueBox {
  display: inline-block;
}

.pictrue {
  width: 50px;
  height: 50px;
  border: 1px dotted rgba(0, 0, 0, 0.1);
  display: inline-block;
  position: relative;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
}
.pictrueTab {
  width: 40px !important;
  height: 40px !important;
}
.upLoad {
  width: 40px;
  height: 40px;
  border: 1px dotted rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.02);
  cursor: pointer;
}
.ft {
  color: red;
}
.buttonGroup {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.buttonGroup .small-btn {
  position: relative;
  float: left;
  height: 24px;
  padding: 0 7px;
  font-size: 14px;
  border-radius: 3px;
}
.buttonGroup .small-btn:first-child {
  margin-left: 0;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
}
</style>
