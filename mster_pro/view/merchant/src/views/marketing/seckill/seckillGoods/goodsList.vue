<template>
  <el-dialog v-if="dialogVisible" title="商品信息" :visible.sync="dialogVisible" width="1200px">
    <div class="divBox">
      <div class="header clearfix">
        <div class="filter-container">
          <div class="demo-input-suffix acea-row">
            <span class="seachTiele">商品分类：</span>
            <el-select
              v-model="tableFrom.mer_cate_id"
              placeholder="请选择"
              class="filter-item selWidth mr20"
              clearable
              @change="getList()"
            >
              <el-option
                v-for="item in merCateList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <span class="seachTiele">商品搜索：</span>
            <el-input
              v-model="tableFrom.keyword"
              placeholder="请输入商品名称，关键字，产品编号"
              class="selWidth"
              clearable
            >
              <el-button slot="append" icon="el-icon-search" @click="getList" />
            </el-input>
          </div>
        </div>
      </div>
      <el-table v-loading="listLoading" :data="tableData.data" style="width: 100%" size="mini">
        <el-table-column width="55">
          <template slot-scope="scope">
            <el-radio
              v-model="templateRadio"
              :label="scope.row.product_id"
              @change.native="getTemplateRow(scope.row)"
            >&nbsp</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="product_id" label="ID" min-width="50" />
        <el-table-column label="商品图" min-width="80">
          <template slot-scope="scope">
            <div class="demo-image__preview">
              <el-image
                style="width: 36px; height: 36px"
                :src="scope.row.image"
                :preview-src-list="[scope.row.image]"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="store_name" label="商品名称" min-width="200" />
      </el-table>
      <div class="block mb20">
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
    </div>
  </el-dialog>
</template>

<script>
import { productLstApi, categorySelectApi } from "@/api/product";
import { roterPre } from "@/settings";
export default {
  name: "GoodsList",
  data() {
    return {
      dialogVisible: false,
      templateRadio: 0,
      merCateList: [],
      roterPre: roterPre,
      listLoading: true,
      tableData: {
        data: [],
        total: 0,
      },
      tableFrom: {
        page: 1,
        limit: 20,
        cate_id: "",
        store_name: "",
        keyword: "",
        is_gift_bag: 0,
        status: 1
      },
      multipleSelection: {},
      checked: [],
    };
  },
  mounted() {
    this.getList();
    this.getCategorySelect();
    window.addEventListener("unload", (e) => this.unloadHandler(e));
  },
  methods: {
    getTemplateRow(row) {
      this.multipleSelection = { src: row.image, id: row.product_id };
      this.dialogVisible = false;
      this.$emit("getProduct", this.multipleSelection);
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
    // 列表
    getList() {
      this.listLoading = true;
      productLstApi(this.tableFrom)
        .then((res) => {
          this.tableData.data = res.data.list;
          this.tableData.total = res.data.count;
          // this.checked =
          //   window.form_create_helper.get(this.$route.query.field) || [];
          // this.tableData.data.forEach((item) => {
          //   this.checked.forEach((element) => {
          //     if (Number(item.product_id) === Number(element.id)) {
          //       this.$nextTick(() => {
          //         this.$refs.multipleTable.toggleRowSelection(item, true);
          //       });
          //     }
          //   });
          // });
          this.listLoading = false;
        })
        .catch((res) => {
          this.listLoading = false;
          this.$message.error(res.message);
        });
    },
    pageChange(page) {
      this.tableFrom.page = page;
      this.getList();
    },
    handleSizeChange(val) {
      this.tableFrom.limit = val;
      this.getList();
    },
  },
};
</script>

<style scoped lang="scss">
.selWidth {
  width: 360px !important;
}
.seachTiele {
  line-height: 35px;
}
.fr {
  float: right;
}
</style>
