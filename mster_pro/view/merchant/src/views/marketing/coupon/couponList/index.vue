<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="filter-container">
          <div class="demo-input-suffix acea-row">
            <span class="seachTiele">状态：</span>
            <el-select v-model="tableFrom.status" placeholder="请选择" class="filter-item selWidth mr20" clearable @change="getList(1)">
              <el-option label="未开启" :value="0" />
              <el-option label="开启" :value="1" />
            </el-select>
            <span class="seachTiele">优惠券名称：</span>
            <el-input v-model="tableFrom.coupon_name" placeholder="请输入优惠券名称" class="selWidth mr20" clearable>
              <el-button slot="append" icon="el-icon-search" @click="getList(1)" />
            </el-input>
            <span class="seachTiele">优惠券类型：</span>
            <el-select v-model="tableFrom.type" placeholder="请选择" class="filter-item selWidth mr20" clearable @change="getList(1)">
              <el-option label="全部" value="" />
              <el-option label="店铺券" :value="0" />
              <el-option label="商品券" :value="1" />
            </el-select>
            <span class="seachTiele">获取方式：</span>
            <el-select v-model="tableFrom.send_type" placeholder="请选择" class="filter-item selWidth mr20" clearable @change="getList(1)">
              <el-option label="全部" value="" />
              <el-option label="手动获取" :value="0" />
              <el-option label="新人" :value="2" />
              <el-option label="买赠" :value="3" />
            </el-select>
          </div>
        </div>
        <router-link :to=" { path:`${roterPre}` + '/marketing/coupon/creatCoupon' } ">
          <el-button size="small" type="primary">添加优惠劵</el-button>
        </router-link>
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="small"
        highlight-current-row
      >
        <el-table-column
          prop="coupon_id"
          label="ID"
          min-width="50"
        />
        <el-table-column
          prop="title"
          label="优惠劵名称"
          min-width="120"
        />
        <el-table-column
          label="优惠劵类型"
          min-width="90"
        >
          <template slot-scope="{ row }">
            <span>{{ row.type | couponTypeFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column
          min-width="200"
          label="领取日期"
        >
          <template slot-scope="{ row }">
            <div v-if="row.start_time">
              {{ row.start_time }} <br/>- {{ row.end_time }}
            </div>
            <span v-else>不限时</span>
          </template>
        </el-table-column>
        <el-table-column
          min-width="200"
          label="使用时间"
        >
          <template slot-scope="{ row }">
            <div v-if="row.use_start_time && row.use_end_time">
              {{ row.use_start_time }} <br/>- {{ row.use_end_time }}
            </div>
            <span v-else>{{ row.coupon_time }}天</span>
          </template>
        </el-table-column>
        <el-table-column
          min-width="100"
          label="发布数量"
        >
          <template slot-scope="{ row }">
            <span v-if="row.is_limited ===0 ">不限量</span>
            <div v-else>
              <span class="fa">发布：{{ row.total_count }}</span>
              <span class="sheng">剩余：{{ row.remain_count }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          min-width="100"
          label="使用数量"
        >
          <template slot-scope="{ row }">
            <div>
              <span>已领取/发放总数：{{ row.send_num }}</span>
              <span class="sheng">已使用总数：{{ row.used_num }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          min-width="100"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              active-text="显示"
              inactive-text="隐藏"
              @click.native="onchangeIsShow(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="150" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="mr10" @click="details(scope.row.coupon_id)">详情</el-button>
            <el-button type="text" size="small" class="mr10" @click="receive(scope.row.coupon_id)">领取/发放记录</el-button>
            <router-link :to=" { path:`${roterPre}` + '/marketing/coupon/creatCoupon/' + scope.row.coupon_id } ">
              <el-button type="text" size="small" class="mr10">复制</el-button>
            </router-link>
            <el-button type="text" size="small" @click="handleDelete(scope.row.coupon_id, scope.$index)">删除</el-button>
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
    <!--优惠券详情-->
    <el-dialog title="优惠券详情" :visible.sync="detailDialog" width="700px" v-if="detailDialog">
      <div>
        <div class="box-container">
          <div class="list sp">
            <label class="name">优惠券名称：</label>
            <span class="info">{{ couponDetail.title }}</span>
          </div>
          <div class="list sp">
            <label class="name">优惠券类型：</label>
            <span class="info">{{ couponDetail.type | couponTypeFilter }}</span>
          </div>
          <div class="list sp">
            <label class="name">优惠券面值：</label>
            <span class="info">{{ couponDetail.coupon_price }}</span>
          </div>
          <div class="list sp">
            <label class="name">使用门槛：</label>
            <span class="info">{{ couponDetail.use_min_price == '0.00' ? "无门槛" : "最低消费"+couponDetail.use_min_price }}</span>
          </div>
          <div class="list sp100">
            <label class="name">使用有效期：</label>
            <span v-if="couponDetail.coupon_time && couponDetail.coupon_type == 0" class="info">{{ couponDetail.coupon_time  }}天</span>
            <span v-else-if="couponDetail.coupon_type == 1" class="info">{{ couponDetail.use_start_time + " - " + couponDetail.use_end_time }}</span>
          </div>
          <div class="list sp100">
            <label class="name">领取时间：</label>
            <span class="info" v-if="couponDetail.is_timeout == 1">{{ couponDetail.start_time }} - {{ couponDetail.end_time }}</span>
            <span v-else class="info" >不限时</span>
          </div>
          <div class="list sp">
            <label class="name">类型：</label>
            <span class="info">{{ couponDetail.send_type | couponUseTypeFilter }}</span>
          </div>
          <div class="list sp">
            <label class="name">是否限量：</label>
            <span class="info">{{ couponDetail.is_limited | filterClose }}</span>
          </div>
          <div class="list sp">
            <label class="name">已发布总数：</label>
            <span class="info">{{ couponDetail.is_limited == 0 ? "不限量" : couponDetail.total_count }}</span>
          </div>
          <div class="list sp">
            <label class="name">剩余总数：</label>
            <span class="info">{{ couponDetail.is_limited == 0 ? "不限量" : couponDetail.remain_count }}</span>
          </div>
          <div class="list sp100">
            <label class="name">已领取/发放总数：</label>
            <span class="info">{{ couponDetail.send_num  }}</span>
            <el-button size="small" type="text" class="ml20" @click="receive(couponDetail.coupon_id)">已领取/发放记录</el-button>
          </div>
          <div class="list sp100">
            <label class="name">已使用总数：</label>
            <span class="info">{{ couponDetail.used_num }}</span>
            <el-button size="small" type="text" class="ml20" @click="usedRecord(couponDetail.coupon_id)">使用记录</el-button>
          </div>
          <div class="list sp">
            <label class="name">排序：</label>
            <span class="info">{{ couponDetail.sort }}</span>
          </div>
          <div class="list sp">
            <label class="name">状态：</label>
            <span class="info">{{ couponDetail.status ? "开启" : "关闭" }}</span>
          </div>
        </div>
      </div>
    </el-dialog>
    <!--领取记录-->
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      min-width="500px"
      :before-close="handleClose"
      class="modalbox"
    >
      <el-table
        v-loading="Loading"
        :data="issueData.data"
        style="width: 100%"
        size="small"
        highlight-current-row
      >
        <el-table-column
          prop="user.nickname"
          label="用户名"
          min-width="120"
        />
        <el-table-column label="用户头像" min-width="80">
          <template slot-scope="scope">
            <div v-if="scope.row.user.avatar" class="demo-image__preview">
              <img
                style="width: 36px; height: 36px"
                :src="scope.row.user.avatar"
              />
            </div>
            <div v-else  class="demo-image__preview">
              <img
                style="width: 36px; height: 36px"
                src="../../../../assets/images/f.png"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :label="receiveTime"
          min-width="180"
        >
          <template slot-scope="scope">
            <span v-if="receiveType === 0">{{scope.row.create_time}}</span>
            <span v-else>{{ scope.row.use_time }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          :page-sizes="[10, 20, 30, 40]"
          :page-size="tableFromIssue.limit"
          :current-page="tableFromIssue.page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="issueData.total"
          @size-change="handleSizeChangeIssue"
          @current-change="pageChangeIssue"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { couponIssueListApi, couponIssueStatusApi, issueApi, couponDeleteApi, couponDetailApi } from '@/api/marketing'
import { roterPre } from '@/settings'
export default {
  name: 'CouponList',
  data() {
    return {
      Loading: false,
      dialogVisible: false,
      detailDialog: false,
      roterPre: roterPre,
      listLoading: true,
      title: "领取/发放记录",
      receiveTime: "领取时间",
      receiveType: 0,
      tableData: {
        data: [],
        total: 0
      },
      tableFrom: {
        page: 1,
        limit: 20,
        status: '',
        coupon_name: '',
        type: '',
        send_type: ''
      },
      tableFromIssue: {
        page: 1,
        limit: 10,
        coupon_id: 0
      },
      issueData: {
        data: [],
        total: 0
      },
      couponDetail: {}
    }
  },
  mounted() {
    this.getList(1)
  },
  methods: {
    // 删除
    handleDelete(id, idx) {
      this.$modalSure().then(() => {
        couponDeleteApi(id).then(({ message }) => {
          this.$message.success(message)
          this.tableData.data.splice(idx, 1)
        }).catch(({ message }) => {
          this.$message.error(message)
        })
      })
    },
    handleClose() {
      this.dialogVisible = false
    },
    // 详情
    details(id){
      this.detailDialog = true;
      couponDetailApi(id).then(res => {
        this.couponDetail = res.data;
      }).catch(({ message }) => {
        this.$message.error(message)
      })
    },
    // 领取记录
    receive(id) {
      this.dialogVisible = true
      this.title="领取/发放记录"
      this.receiveTime="领取时间"
      this.receiveType = 0
      this.tableFromIssue.coupon_id = id
      this.getIssueList('')
    },
    // 使用记录
    usedRecord(id) {
      this.dialogVisible = true
      this.title="使用记录"
      this.receiveTime="使用时间"
      this.receiveType = 1
      this.tableFromIssue.coupon_id = id
      this.getIssueList(1)
    },
    // 列表
    getIssueList(status) {
      this.Loading = true
      this.tableFromIssue.status = status
      issueApi(this.tableFromIssue).then(res => {
        this.issueData.data = res.data.list
        this.issueData.total = res.data.count
        this.Loading = false
      }).catch(res => {
        this.Loading = false
        this.$message.error(res.message)
      })
    },
    pageChangeIssue(page) {
      this.tableFromIssue.page = page
      this.getIssueList('')
    },
    handleSizeChangeIssue(val) {
      this.tableFromIssue.limit = val
      this.getIssueList('')
    },
    // 列表
    getList(num) {
      this.listLoading = true
      this.tableFrom.page = num ? num : this.tableFrom.page
      couponIssueListApi(this.tableFrom).then(res => {
        this.tableData.data = res.data.list
        this.tableData.total = res.data.count
        this.listLoading = false
      }).catch(res => {
        this.listLoading = false
        this.$message.error(res.message)
      })
    },
    pageChange(page) {
      this.tableFrom.page = page
      this.getList('')
    },
    handleSizeChange(val) {
      this.tableFrom.limit = val
      this.getList('')
    },
    // 修改状态
    onchangeIsShow(row) {
      couponIssueStatusApi(row.coupon_id, row.status).then(({ message }) => {
        this.$message.success(message)
        this.getList('')
      }).catch(({ message }) => {
        this.$message.error(message)
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .modalbox{
    /deep/.el-dialog{
      min-width: 550px;
    }
  }
  .selWidth{
    width: 260px !important;
  }
  .seachTiele{
    line-height: 35px;
  }
  .fa{
    color: #0a6aa1;
    display: block;
  }
  .sheng{
    color: #ff0000;
    display: block;
  }
  .ml20{
    margin-left: 20px;
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
    width: 150px;
    text-align: right;
    color: #606266;
  }
  .box-container .list .blue {
    color: #1890ff;
  }
  .box-container .list.image {
    margin-bottom: 40px;
  }
  .box-container .list.image img {
    position: relative;
    top: 40px;
  }
</style>
