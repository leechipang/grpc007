<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form :inline="true">
            <el-form-item label="时间选择：" class="mr10" style="width: 100%">
              <el-radio-group v-model="tableFrom.date" type="button" class="mr20" size="small" @change="selectChange(tableFrom.date)">
                <el-radio-button v-for="(item,i) in fromList.fromTxt" :key="i":label="item.val">{{ item.text }} </el-radio-button>
              </el-radio-group>
              <el-date-picker v-model="timeVal" value-format="yyyy/MM/dd"  format="yyyy/MM/dd"  size="small"  type="daterange" placement="bottom-end" placeholder="自定义时间" style="width: 260px;" @change="onchangeTime"/>
            </el-form-item>
            <el-form-item label="备注：" class="mr10">
              <el-input v-model="tableFrom.remark"   placeholder="请输入备注内容" class="selWidth"  size="small">
                <el-button slot="append" icon="el-icon-search" size="small" @click="getList(1)"/>
              </el-input>
            </el-form-item>
            <el-form-item label="关键字搜索：" class="mr10">
              <el-input v-model="tableFrom.keyword" placeholder="请输入积分商家姓名或者积分用户名称" class="selWidth" size="small">
                <el-button slot="append" icon="el-icon-search" size="small" @click="getList(1)"/>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <el-table v-loading="listLoading" :data="tableData.data" style="width: 100%" size="mini">
        <el-table-column prop="id" label="ID" min-width="50"/>
        <el-table-column prop="mer_name" label="积分商家名称" min-width="200"/>
        <el-table-column prop="nickname" label="积分用户名称" min-width="200"/>
        <el-table-column prop="use_score" label="积分" sortable min-width="100"/>
        <el-table-column prop="rate_to_us" label="积分比例%" sortable min-width="100"/>
        <el-table-column prop="remark" label="详细内容" sortable min-width="200"/>
        <el-table-column label="创建时间" min-width="150" prop="create_time"/>
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
  </div>
</template>

<script>
  import {
    userScoreLogListApi
  } from "@/api/userScoreLog";
  import {fromList} from "@/libs/constants.js";

  export default {
    name: "merchant",
    data() {
      return {
        fromList: fromList,
        tableData: {
          data: [],
          total: 0,
        },
        listLoading: true,
        tableFrom: {
          page: 1,
          limit: 20,
          date: "",
          remark: "",
          keyword: "",
        },
        timeVal: [],
        props: {},
      };
    },
    mounted() {
      this.getList(1);
    },
    methods: {
      // 选择时间
      selectChange(tab) {
        this.tableFrom.date = tab;
        this.timeVal = [];
        this.tableFrom.page = 1;
        this.getList(1);
      },
      // 具体日期
      onchangeTime(e) {
        this.timeVal = e;
        this.tableFrom.date = this.timeVal ? this.timeVal.join("-") : "";
        this.tableFrom.page = 1;
        this.getList(1);
      },
      // 列表
      getList(num) {
        this.listLoading = true;
        this.tableFrom.page = num ? num : this.tableFrom.page;
        userScoreLogListApi(this.tableFrom)
          .then((res) => {
            this.tableData.data = res.data.list;
            this.tableData.total = res.data.count;
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
    },
  };
</script>

<style scoped lang="scss">
  .selWidth {
    width: 300px !important;
  }
</style>
