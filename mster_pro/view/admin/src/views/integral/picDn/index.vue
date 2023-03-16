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
            <el-form-item label="状态：" class="mr10">
              <el-select v-model="tableFrom.status" clearable  placeholder="请选择状态" class="selWidth" @change="getList(1)">
                <el-option label="启用" value="1"/>
                <el-option label="禁用" value="0"/>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <el-button size="small" type="primary" @click="onAdd">添加图片</el-button>
      </div>
      <el-table v-loading="listLoading" :data="tableData.data" style="width: 100%" size="mini">
        <el-table-column prop="id" label="ID" min-width="50"/>
        <el-table-column label="新品图片" min-width="80" prop="pic">
          <template slot-scope="scope">
            <div class="demo-image__preview">
              <el-image
                style="width: 36px; height: 36px"
                :src="scope.row.pic"
                :preview-src-list="[scope.row.pic]"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="是否显示"
          min-width="100"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              active-text="启用"
              inactive-text="禁用 "
              @change="onchangeIsShow(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="添加时间" min-width="150" prop="create_time"/>
        <el-table-column label="操作" min-width="150" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="onEdit(scope.row.id)">编辑</el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.row.id, scope.$index)">删除</el-button>
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
  </div>
</template>

<script>
  import {
    picDnListApi,
    picDnCreateApi,
    picDnUpdateApi,
    picDnDeleteApi,
    picDnStatusApi,
  } from "@/api/picDn";
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
          status: "",
          date: "",
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
        picDnListApi(this.tableFrom)
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
      // 添加
      onAdd() {
        this.$modalForm(picDnCreateApi()).then(() => this.getList());
      },
      // 编辑
      onEdit(id) {
        this.$modalForm(picDnUpdateApi(id)).then(() => this.getList())
      },
      // 删除
      handleDelete(id, idx) {
        this.$modalSure().then(() => {
          picDnDeleteApi(id).then(({message}) => {
            this.$message.success(message)
            this.getList()
          }).catch(({message}) => {
            this.$message.error(message)
          })
        })
      },
      //是否显示
      onchangeIsShow(row) {
        picDnStatusApi(row.id, row.status).then(({message}) => {
          this.$message.success(message)
        }).catch(({message}) => {
          this.$message.error(message)
        })
      },
    },
  };
</script>
<style scoped lang="scss">
  .selWidth {
    width: 300px !important;
  }
</style>
