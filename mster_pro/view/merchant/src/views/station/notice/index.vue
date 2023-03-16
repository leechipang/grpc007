<template>
  <div class="divBox">
    <el-card class="box-card">
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="small"
        @expand-change="handleRead"
        :row-key="getRowKeys"
        :expand-row-keys="expands"
      >
        <el-table-column label="序号" min-width="50">
          <template scope="scope">
            <span>{{ scope.$index+(tableFrom.page - 1) * tableFrom.limit + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="消息名称"
          min-width="150"
        >
          <template scope="scope">
            <span class="circle" :class="scope.row.is_read === 0 ? 'red' : 'gray'"></span>
            <span :class="scope.row.is_read === 0 ? 'unread' : 'read'">{{ scope.row.notice ? scope.row.notice.notice_title : '' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="日期"
          min-width="180"
        >
          <template scope="scope">
            <span :class="scope.row.is_read === 0 ? 'unread' : 'read'">{{ scope.row.notice ? scope.row.notice.create_time : '' }}</span>
          </template>
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item>
                <span style="color: #333;">{{ (props.row.notice && props.row.notice.notice_content) ? props.row.notice.notice_content : ''}}</span>
              </el-form-item>
            </el-form>
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
import { stationNewsList, stationNoticeRead } from '@/api/system'
import { roterPre } from '@/settings'
export default {
  name: 'SystemLog',
  data() {
    return {
      props: {
        emitPath: false
      },
      listLoading: true,
      tableData: {
        data: [],
        total: 0
      },
      dialogVisible: false,
      categoryList: [],
      merCateList: [],
      merSelect: [],
      fullscreenLoading: false,
      roterPre: roterPre,
      tableFrom: {
        page: 1,
        limit: 20,
        category_id: '',
        store_name: '',
        type: '',
        mer_id: '',
        keyword: '',
        is_trader: '',
      },
      // 要展开的行，数值的元素是row的key值
      expands: [],
      idx: 0

    }
  },
  mounted() {
    this.getList('');
  },
  methods: {
    // 获取row的key值
    getRowKeys(row) {
      return row.notice_log_id;
    },
    // 列表
    getList(num) {
      let that = this
      that.listLoading = true
      that.tableFrom.page = num ? num : that.tableFrom.page;
      stationNewsList(that.tableFrom).then(res => {
        that.tableData.data = res.data.list
        that.tableData.total = res.data.count
        that.listLoading = false
        if(that.$route.params.id){
          that.handleRead({notice_log_id: that.$route.params.id,is_read: 0})
          that.tableData.data.forEach((item,index)  => {
            if (item.notice_log_id == that.$route.params.id) {
              that.idx = index
              console.log(that.idx)
              that.expands.push(that.tableData.data[that.idx].notice_log_id);
            }
          })
        }
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
      this.getList(1)

    },
    handleRead(data){
      if(data.is_read === 0){
        stationNoticeRead(data.notice_log_id).then(res => {
          this.listLoading = false
          data.is_read = 1
          if(this.$route.params.id && this.tableFrom.page === 1){
            this.tableData.data[this.idx].is_read = 1
          }
          // this.$refs.headerNotice.getList("");
        }).catch(res => {
          this.listLoading = false
          this.$message.error(res.message)
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.filter-container .filter-item{
  margin-bottom: 0;
}
/deep/ .el-input--medium .el-input__inner{
  line-height: 32px;
  height: 32px;
}
/deep/ .demo-table-expand .el-form-item{
  width: 100%;
}
/deep/ .el-table__expanded-cell,/deep/ .el-table__expanded-cell:hover{
  background-color: #f4f5f9!important;
}
.read{
  color: #999;
}
.circle{
  display: inline-block;
  height: 8px;
  width: 8px;
  border-radius: 100%;
  box-shadow: 0 0 0 1px #fff;
}
.red{
  background: #ed4014;
}
.gray{
  background: #c5c8ce;
}
/deep/ .el-table th:nth-child(2){
  padding-left: 15px;
}
</style>
