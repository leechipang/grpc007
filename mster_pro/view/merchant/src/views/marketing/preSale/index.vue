<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form size="small" label-width="120px">
            <el-form-item label="状态：" style="display: block;">
              <el-radio-group
                v-model="tableFrom.product_status"
                type="button"
                class="mr20"
                size="small"
                @change="getList(1)"
                clearable
              >
                <el-radio-button
                  v-for="(item,i) in fromList.fromTxt"
                  :key="i"
                  :label="item.val"
                >{{ item.text }}</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="预售活动状态：">
              <el-select
                v-model="tableFrom.type"
                placeholder="请选择"
                class="filter-item selWidth mr20"
                clearable
                @change="getList(1)"
              >
                <el-option
                  v-for="item in preSaleStatusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="关键字搜索：">
              <el-input v-model="tableFrom.keyword" placeholder="请输入预售商品名称/ID" class="selWidth">
                <el-button slot="append" icon="el-icon-search" @click="getList(1)" />
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <el-tabs v-model="tableFrom.presell_type" @tab-click="getList(1)">
          <el-tab-pane v-for="(item,index) in headeNum" :key="index" :name="item.presell_type.toString()" :label="item.title +'('+item.count +')' " />
        </el-tabs>

        <router-link :to=" { path:`${roterPre}` + '/marketing/presell/create' } ">
          <el-button size="small" type="primary">
            <i class="add">+</i> 添加预售商品
          </el-button>
        </router-link>
      </div>
      <el-table v-loading="listLoading" :data="tableData.data" style="width: 100%" size="mini">
        <el-table-column prop="product_presell_id" label="ID" min-width="50" />
        <el-table-column label="商品图" min-width="80">
          <template slot-scope="scope">
            <div class="demo-image__preview">
              <el-image :src="scope.row.product.image" :preview-src-list="[scope.row.product.image]" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="store_name" label="商品名称" min-width="120" />
        <el-table-column prop="price" label="预售价" min-width="90" />
        <el-table-column label="预售活动状态" min-width="90">
          <template slot-scope="scope">
            <span>{{ scope.row.presell_status === 0 ? '未开始' :  scope.row.presell_status === 1 ? '正在进行' : '已结束' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="预售活动日期" min-width="160">
          <template slot-scope="scope">
            <div>开始日期：{{ scope.row.start_time && scope.row.start_time ? scope.row.start_time.slice(0,10) : "" }}</div>
            <div>结束日期：{{ scope.row.end_time && scope.row.end_time ? scope.row.end_time.slice(0,10) : "" }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="tableFrom.presell_type === '1'" label="成功/参与人次"  min-width="90" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.tattend_one && scope.row.tattend_one.pay }} / {{ scope.row.tattend_one && scope.row.tattend_one.all }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="tableFrom.presell_type === '2'" :label="'第一阶段 | 成功/参与人次'" :render-header="renderheader" min-width="90" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.tattend_one && scope.row.tattend_one.pay }} / {{ scope.row.tattend_one && scope.row.tattend_one.all }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="tableFrom.presell_type === '2'" :label="'第二阶段 | 成功/参与人次'" :render-header="renderheader" min-width="90" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.tattend_two && scope.row.tattend_two.pay }} / {{ scope.row.tattend_two && scope.row.tattend_two.all }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="seles" label="已售商品数" min-width="90" />
        <el-table-column prop="stock_count" label="限量" min-width="90" />
        <el-table-column prop="stock" label="限量剩余" min-width="90" />
        <el-table-column prop="status" label="显示状态" min-width="80">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.is_show"
              :active-value="1"
              :inactive-value="0"
              active-text="显示"
              inactive-text="隐藏"
              @change="onchangeIsShow(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="审核状态" min-width="130">
          <template slot-scope="scope">
            <span>{{ scope.row.product_status === 0 ? "待审核" : scope.row.product_status === 1 ? "审核通过" : "审核失败"}}</span>
            <span v-if="scope.row.product_status === -1 || scope.row.product_status === -2" style="font-size: 12px;">
              <br />
              原因：{{ scope.row.refusal }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="150" fixed="right">
          <template slot-scope="scope">
            <router-link
              v-if="scope.row.presell_status === 0"
              :to="{path: roterPre + '/marketing/presell/create/' + scope.row.product_presell_id}"
            >
              <el-button type="text" size="small" class="mr10">编辑</el-button>
            </router-link>
            <el-button type="text" size="small" class="mr10" @click="goDetail(scope.row.product_presell_id)">查看详情</el-button>
            <el-button v-if="scope.row.product.presell_status !== 1" type="text" size="small" class="mr10" @click="handleDelete(scope.row.product_presell_id,scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          :page-sizes="[20, 40, 60, 80]"
          :page-size="tableFrom.limit"
          :current-page="tableFrom.page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.total"
          @size-change="handleSizeChange"
          @current-change="pageChange"
        />
      </div>
    </el-card>
    <el-dialog title="预售商品详情" center :visible.sync="dialogVisible" width="700px" v-if="dialogVisible">
      <div v-loading="loading" style="margin-top: 5px;">
        <div class="box-container">
          <div class="title">基本信息</div>
          <div class="acea-row">
            <div class="list sp"><label class="name">商品ID：</label>{{ formValidate.product_id }}</div>
            <div class="list sp"><label class="name">商品名称：</label><span>{{ formValidate.store_name }}</span></div>
            <div class="list sp100 image">
              <label class="name">商品图：</label>
              <img
                style="max-width: 150px; height: 80px;"
                :src="formValidate.image"
              />
            </div>
            <div class="list sp100">
              <label class="name">商品信息</label>
              <!-- 单规格表格-->
              <div v-if="formValidate.spec_type === 0">
                <el-table :data="OneattrValue" border class="tabNumWidth" size="mini">
                  <el-table-column align="center" label="预售价格" min-width="80">
                    <template slot-scope="scope">
                      <span>{{ scope.row['presell_price'] }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column v-if="formValidate.presell_type === 2" align="center" label="预售定金" min-width="80">
                    <template slot-scope="scope">
                      <span>{{ scope.row['down_price'] }}</span>
                    </template>
                  </el-table-column>
                <el-table-column align="center" label="已售商品数量" min-width="80">
                   <template slot-scope="scope">
                      <span>{{ scope.row['sales'] }}</span>
                    </template>
                 </el-table-column>
                </el-table>
              </div>
              <!-- 多规格表格-->
              <div
                v-if="formValidate.spec_type === 1"
                class="labeltop"
                label="规格列表："
              >
                <el-table
                  :data="ManyAttrValue"
                  height="260"
                  tooltip-effect="dark"
                  :row-key="(row) => { return row.id }"
                >
                  <template v-if="manyTabDate">
                    <el-table-column v-for="(item,iii) in manyTabDate" :key="iii" align="center" :label="manyTabTit[iii].title" min-width="80">
                      <template slot-scope="scope">
                        <span class="priceBox" v-text="scope.row[iii]" />
                      </template>
                    </el-table-column>
                  </template>
                  <el-table-column align="center" label="预售价格" min-width="80">
                    <template slot-scope="scope">
                      <span>{{ scope.row['presell_price'] }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column v-if="formValidate.presell_type === 2" align="center" label="预售定金" min-width="80">
                      <template slot-scope="scope">
                        <span>{{ scope.row['down_price'] }}</span>
                      </template>
                  </el-table-column>
                  <el-table-column  align="center" label="已售商品数量" min-width="80">
                    <template slot-scope="scope">
                      <span>{{ scope.row['sales'] }}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
          <div class="title" style="margin-top: 20px;">预售商品活动信息</div>
          <div class="acea-row">
            <div class="list sp100"><label class="name">预售简介：</label>{{ formValidate.store_info }}</div>
            <div class="list sp100"><label class="name">预售活动日期：</label>{{ formValidate.start_time + '-' + formValidate.end_time }}</div>
            <div v-if="formValidate.presell_type === 2" class="list sp100"><label class="name">尾款支付日期：</label>{{ formValidate.final_start_time + '-' + formValidate.final_end_time }}</div>
            <div class="list sp"><label class="name">审核状态：</label>{{ formValidate.product_status === 1 ? '审核通过' : formValidate.product_status === 0 ? '未审核' : '审核未通过' }}</div>
            <div v-if="formValidate.presell_type === 1"  class="list sp"><label class="name">预售成功/参与人次：</label>{{ (formValidate.tattend_one && formValidate.tattend_one.pay) + '/' + (formValidate.tattend_one && formValidate.tattend_one.all) }}</div>
            <div class="list sp"><label class="name">限量：</label>{{ formValidate.stock_count }}</div>
            <div class="list sp"><label class="name">限量剩余：</label>{{ formValidate.stock }}</div>
            <div class="list sp"><label class="name">限购件数：</label>{{ formValidate.pay_count }}（0为不限制购买数量）</div>
            <div v-if="formValidate.presell_type === 2"  class="list sp"><label class="name">第一阶段(定金支付)成功/参与人次：</label>{{ (formValidate.tattend_one && formValidate.tattend_one.pay) + '/' + (formValidate.tattend_one && formValidate.tattend_one.all) }}</div>
            <div v-if="formValidate.presell_type === 2"  class="list sp"><label class="name">第二阶段(尾款支付)成功/参与人次：</label>{{ (formValidate.tattend_two && formValidate.tattend_two.pay) + '/' + (formValidate.tattend_two && formValidate.tattend_two.all) }}</div>
            <div v-if="formValidate.presell_type === 2" class="list sp"><label class="name">发货时间：</label>{{ "支付尾款后"+formValidate.delivery_day+"天内" }}</div>
            <div v-if="formValidate.presell_type === 1" class="list sp"><label class="name">发货时间：</label>{{ formValidate.delivery_type === 1 ? "支付成功后"+formValidate.delivery_day+"天内" : "预售结束后"+formValidate.delivery_day+"天内" }}</div>
            <div class="list sp"><label class="name">预售活动状态：</label>{{ formValidate.presell_status === 0 ? '未开始' : formValidate.presell_status === 1 ? '正在进行' : '已结束' }}</div>
            <div class="list sp"><label class="name">显示状态：</label>{{ formValidate.is_show === 1 ? "显示" : "隐藏" }}</div>
            <div class="list sp"><label class="name">创建时间：</label>{{ formValidate.create_time }}</div>
          </div>

        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  preSaleProListApi,
  preSellDeleteApi,
  presellStatusApi,
  preSaleProDetailApi
} from "@/api/product";
import { roterPre } from "@/settings";
import {orderDeleteApi} from "@/api/order";
const defaultObj = {
  product_id: "",
  image: "",
  slider_image: [],
  store_name: "",
  store_info: "",
  start_day: "",
  end_day: "",
  start_time: "",
  end_time: "",
  is_open_recommend: 1,
  is_open_state: 1,
  is_show: 1,
  presell_type: 1,
  keyword: "",
  brand_id: "", // 品牌id
  cate_id: "", // 平台分类id
  mer_cate_id: [], // 商户分类id
  unit_name: "",
  integral: 0,
  sort: 0,
  is_good: 0,
  temp_id: "",
  preSale_date: "",
  finalPayment_date: "",
  delivery_type: 1,
  delivery_day: 10,
  create_time: '',
  attrValue: [
    {
      image: "",
      price: null,
      down_price: null,
      presell_price: null,
      cost: null,
      ot_price: null,
      old_stock: null,
      stock: null,
      bar_code: "",
      weight: null,
      volume: null,
    },
  ],
  attr: [],
  extension_type: 0,
  content: "",
  spec_type: 0,
  // give_coupon_ids: [],
  is_gift_bag: 0,
  tattend_two: {},
  tattend_one: {}
  // couponData: [],
};

export default {
  name: "ProductList",
  data() {
    return {
      headeNum: [
        {
          count: 0,
          presell_type: 1,
          title: "全款预售"
        },
        {
          count: 0,
          presell_type: 2,
          title: "定金预售"
        }
      ],
      props: {
        emitPath: false,
      },
      roterPre: roterPre,
      listLoading: true,
      tableData: {
        data: [],
        total: 0,
      },
      preSaleStatusList: [
        { label: "未开始", value: 0 },
        { label: "正在进行", value: 1 },
        { label: "已结束", value: 2 },
      ],
      fromList: {
        custom: true,
        fromTxt: [
          { text: '全部', val: '' },
          { text: '待审核', val: '0' },
          { text: '已审核', val: '1' },
          { text: '审核失败', val: '-1' }
        ]
      },
      tableFrom: {
        page: 1,
        limit: 20,
        keyword: "",
        product_status: "",
        type: '',
        presell_type: '1'
      },
      modals: false,
      dialogVisible: false,
      loading: true,
      manyTabTit: {},
      manyTabDate: {},
      formValidate: Object.assign({}, defaultObj),
      OneattrValue: [Object.assign({}, defaultObj.attrValue[0])], // 单规格
      ManyAttrValue: [Object.assign({}, defaultObj.attrValue[0])], // 多规格
      attrInfo: {},
    };
  },
  mounted() {
    this.getList('');
  },
  methods: {
    // 表头换行
    renderheader(h, { column, $index }) {
      return h('span', {}, [
        h('span', {}, column.label.split('|')[0]),
        h('br'),
        h('span', {}, column.label.split('|')[1])
      ]);
    },
    watCh(val) {
      const tmp = {};
      const tmpTab = {};
      this.formValidate.attr.forEach((o, i) => {
        tmp["value" + i] = { title: o.value };
        tmpTab["value" + i] = "";
      });
      this.ManyAttrValue.forEach((val, index) => {
        const key = Object.values(val.detail).sort().join("/");
        if (this.attrInfo[key]) this.ManyAttrValue[index] = this.attrInfo[key];
      });
      this.attrInfo = {};
      this.ManyAttrValue.forEach((val) => {
        this.attrInfo[Object.values(val.detail).sort().join("/")] = val;
      });
      this.manyTabTit = tmp;
      this.manyTabDate = tmpTab;
      // this.formThead = Object.assign({}, this.formThead, tmp);
      // console.log(this.formThead)
    },
  // 查看详情
    goDetail(id){
      this.dialogVisible = true;
      this.loading = true;
      this.formValidate = {}
      preSaleProDetailApi(id).then(async (res) => {
        this.loading = false;
        let info = res.data;
        this.formValidate = {
          product_id: info.product.product_id,
          image: info.product.image,
          slider_image: info.product.slider_image,
          store_name: info.store_name,
          store_info: info.store_info,
          presell_type: info.presell_type ? info.presell_type : 1,
          delivery_type: info.delivery_type ? info.delivery_type : 1,
          delivery_day: info.delivery_day ? info.delivery_day : 10,
          start_time: info.start_time
            ? info.start_time
            : "",
          end_time: info.end_time
            ? info.end_time
            : "",
          final_start_time: info.final_start_time
            ? info.final_start_time
            : "",
          final_end_time: info.final_end_time
            ? info.final_end_time
            : "",
          brand_id: info.product.brand_id, // 品牌id
          cate_id: info.cate_id ? info.cate_id : '', // 平台分类id
          mer_cate_id: info.mer_cate_id, // 商户分类id
          unit_name: info.product.unit_name,
          sort: info.product.sort,
          is_good: info.product.is_good,
          temp_id: info.product.temp_id,
          is_show: info.is_show,
          attr: info.product.attr,
          extension_type: info.extension_type,
          content: info.content,
          spec_type: info.product.spec_type,
          is_gift_bag: info.product.is_gift_bag,
          tattend_two: info.tattend_two,
          tattend_one: info.tattend_one,
          create_time: info.create_time,
          presell_status: info.presell_status,
          product_status: info.product_status,
          pay_count: info.pay_count,
          stock: info.stock,
          stock_count: info.stock_count
        };
        if (this.formValidate.spec_type === 0) {
          this.OneattrValue = info.product.attrValue;
          this.OneattrValue[0].down_price = this.OneattrValue[0].presellSku ? this.OneattrValue[0].presellSku.down_price : 0;
          this.OneattrValue[0].presell_price = this.OneattrValue[0].presellSku ? this.OneattrValue[0].presellSku.presell_price : 0;
          this.OneattrValue[0].sales = this.OneattrValue[0].presellSku ? this.OneattrValue[0].presellSku.seles : 0;
        } else {
          this.ManyAttrValue = []
          info.product.attrValue.forEach((val,i) => {
            // this.attrInfo[Object.values(val.detail).sort().join("/")] = val;
            if(val.presellSku){
              this.$set(val,'down_price',val.presellSku.down_price)
              this.$set(val,'presell_price',val.presellSku.presell_price)
              this.$set(val,'sales',val.presellSku.seles)
              this.ManyAttrValue.push(val)
            }
          });
          this.watCh(this.formValidate.attr)
        }
        console.log(this.ManyAttrValue);
        this.fullscreenLoading = false;
        this.formValidate.preSale_date = [
          info.start_time,
          info.end_time,
        ];
        this.formValidate.finalPayment_date = [
          info.final_start_time,
          info.final_end_time,
        ];

      })
        .catch((res) => {
          this.fullscreenLoading = false;
          this.$message.error(res.message);
        })
    },
    // 列表
    getList(num) {
      this.listLoading = true;
      this.tableFrom.page = num ? num : this.tableFrom.page;
      preSaleProListApi(this.tableFrom)
        .then((res) => {
          this.tableData.data = res.data.list;
          this.tableData.total = res.data.count;
          this.headeNum[0]['count'] = res.data.stat.all;
          this.headeNum[1]['count'] = res.data.stat.down;
          console.log(this.headeNum);
          this.listLoading = false;
        })
        .catch((res) => {
          this.listLoading = false;
          this.$message.error(res.message);
        });
    },
    pageChange(page) {
      this.tableFrom.page = page;
      this.getList('');
    },
    handleSizeChange(val) {
      this.tableFrom.limit = val;
      this.getList('');
    },
    // 删除
    handleDelete(id, idx) {
      this.$modalSure().then(() => {
        preSellDeleteApi(id)
          .then(({
                   message
                 }) => {
            this.$message.success(message);
            this.tableData.data.splice(idx, 1);
          })
          .catch(({
                    message
                  }) => {
            this.$message.error(message);
          });
      });
    },
    onchangeIsShow(row) {
      presellStatusApi(row.product_presell_id, row.is_show)
        .then(({ message }) => {
          this.$message.success(message);
          this.getList('');
        })
        .catch(({ message }) => {
          this.$message.error(message);
        });
    },
  },
};
</script>

<style scoped lang="scss">
/deep/ .el-dialog__title{
  font-weight: bold;
}
.el-table .cell{
  white-space: pre-line;
}
.add {
  font-style: normal;
  position: relative;
  top: -1.2px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand1 {
  /deep/ label {
    width: 77px !important;
    color: #99a9bf;
  }
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 33.33%;
}
.selWidth {
  width: 350px !important;
}
.seachTiele {
  line-height: 35px;
}
.title{
  margin-bottom: 16px;
  color: #17233d;
  font-size: 14px;
  font-weight: bold;
  padding-bottom: 2px;
  border-bottom: 1px solid #dfe6ec;
}
.scollhide::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
.box-container {
  overflow: hidden;
}
.box-container .list {
  float: left;
  line-height: 40px;
}
.box-container .sp {
  width: 50%;
}
.box-container .sp3 {
  width: 33.3333%;
}
.box-container .sp100 {
  width: 100%;
}
.box-container .list .name {
  display: inline-block;
  color: #606266;

}
.box-container .list .blue {
  color: #1890ff;
}
.box-container .list.image {
  margin: 20px 0;
  position: relative;
}
.box-container .list.image img {
  position: absolute;
  top: -20px;
}
.labeltop{
  max-height: 280px;
  overflow-y: auto;
}
</style>
