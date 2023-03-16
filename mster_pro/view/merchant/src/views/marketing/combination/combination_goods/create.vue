<template>
<div class="divBox">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-steps :active="currentTab" align-center finish-status="success">
                <el-step title="选择拼团商品" />
                <el-step title="填写基础信息" />
                <el-step title="修改商品详情" />
            </el-steps>
        </div>
        <el-form ref="formValidate" v-loading="fullscreenLoading" class="formValidate mt20" :rules="ruleValidate" :model="formValidate" label-width="160px" @submit.native.prevent>
            <div v-show="currentTab === 0" style="overflow: hidden;">
                <el-row :gutter="24">
                    <el-col v-bind="grid2">
                        <el-form-item label="选择商品：" prop="image">
                            <div class="upLoadPicBox" @click="add()">
                                <div v-if="formValidate.image" class="pictrue">
                                    <img :src="formValidate.image" />
                                </div>
                                <div v-else class="upLoad">
                                    <i class="el-icon-camera cameraIconfont" />
                                </div>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            <div v-show="currentTab === 1">
                <el-row :gutter="24">
                    <el-col v-bind="grid2">
                        <el-form-item label="商品主图：" prop="image">
                            <div class="upLoadPicBox" @click="modalPicTap('1')">
                                <div v-if="formValidate.image" class="pictrue">
                                    <img :src="formValidate.image" />
                                </div>
                                <div v-else class="upLoad">
                                    <i class="el-icon-camera cameraIconfont" />
                                </div>
                            </div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="商品轮播图：" prop="slider_image">
                            <div class="acea-row">
                                <div v-for="(item,index) in formValidate.slider_image" :key="index" class="pictrue" draggable="false" @dragstart="handleDragStart($event, item)" @dragover.prevent="handleDragOver($event, item)" @dragenter="handleDragEnter($event, item)" @dragend="handleDragEnd($event, item)">
                                    <img :src="item" />
                                    <i class="el-icon-error btndel" @click="handleRemove(index)" />
                                </div>
                                <div v-if="formValidate.slider_image.length < 10" class="upLoadPicBox" @click="modalPicTap('2')">
                                    <div class="upLoad">
                                        <i class="el-icon-camera cameraIconfont" />
                                    </div>
                                </div>
                            </div>
                        </el-form-item>
                    </el-col>
                    <!-- 商品信息-->
                    <el-col class="sp100">
                        <el-form-item label="拼团名称：" prop="store_name">
                            <el-input v-model="formValidate.store_name" placeholder="请输入商品名称" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col class="sp100">
                        <el-form-item label="拼团简介：" prop="store_info">
                            <el-input v-model="formValidate.store_info" type="textarea" :rows="3" placeholder="请输入秒杀活动简介" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="24">
                        <el-form-item label="拼团时间：" required>
                          <el-date-picker
                            v-model="timeVal"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            align="right"
                            @change="onchangeTime"
                            >
                          </el-date-picker>
                          <span class="item_desc">设置活动开启结束时间，用户可以在设置时间内发起参与拼团</span>  
                        </el-form-item>                                            
                    </el-col> 
                    <el-col :span="24">
                        <el-form-item label="运费模板：" prop="temp_id">
                            <div class="acea-row">
                                <el-select v-model="formValidate.temp_id" placeholder="请选择" class="selWidthd mr20">
                                    <el-option v-for="item in shippingList" :key="item.shipping_template_id" :label="item.name" :value="item.shipping_template_id" />
                                </el-select>
                                <el-button class="mr15" size="small" @click="addTem">添加运费模板</el-button>
                            </div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="拼团时效(单位：小时)：" prop="time">
                            <el-input-number v-model="formValidate.time" :min="1" placeholder="请输入时效" /> 
                            <span class="item_desc">用户发起拼团后开始计时，需在设置时间内邀请到规定好友人数参团，超过时效时间，则系统判定拼团失败，自动发起退款</span> 
                        </el-form-item>                        
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="拼团人数：" prop="buying_count_num">
                            <el-input-number v-model="formValidate.buying_count_num" :min="2" placeholder="请输入人数" @change="calFictiCount"/>
                            <span class="item_desc">单次拼团需要参与的用户数</span>  
                        </el-form-item>
                    </el-col>                  
                    <el-col :span="24">
                        <el-form-item label="活动期间限购件数：" prop="pay_count">
                            <el-input-number v-model="formValidate.pay_count" :min="1" placeholder="请输入数量" />
                            <span class="item_desc">该商品活动期间内，用户可购买的最大数量。例如设置为4，表示本地活动有效期内，每个用户最多可购买4件</span>  
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="单次限购件数：" prop="once_pay_count">
                            <el-input-number v-model="formValidate.once_pay_count" :min="1" :max="formValidate.pay_count" placeholder="请输入数量" />
                            <span class="item_desc">用户参与拼团时，一次购买最大数量限制。例如设置为2，表示每次参与拼团时，用户一次购买数量最大可选择2个</span>  
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="单位：" prop="unit_name">
                            <el-input
                            v-model="formValidate.unit_name"
                            placeholder="请输入单位"
                            style="width: 250px;"
                            />
                        </el-form-item>
                    </el-col>
                 </el-row>
                  <el-row :gutter="24" v-if="combinationData.ficti_status == 1">
                    <el-col :span="6">
                        <el-form-item label="虚拟成团：">
                             <el-switch v-model="formValidate.ficti_status" active-text="开启" inactive-text="关闭"></el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16" v-if="formValidate.ficti_status == 1">
                        <el-form-item label="虚拟成团补齐人数：" prop="ficti_num">
                            <el-input-number v-model="formValidate.ficti_num" :min="0" :max="max_ficti_num" placeholder="请输入数量" /> 
                            <span class="item_desc">拼团时效到时，系统自动补齐的最大拼团人数</span>                         
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="24">
                        <el-form-item label="排序：" prop="sort">
                            <el-input-number v-model="formValidate.sort" :min="0"  placeholder="请输入排序数值" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="显示状态">
                            <el-radio-group v-model="formValidate.is_show">
                                <el-radio :label="0" class="radio">关闭</el-radio>
                                <el-radio :label="1">开启</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
           
                <el-row :gutter="24">
                    <el-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
                        <!-- 单规格表格-->
                        <el-form-item v-if="formValidate.spec_type === 0">
                            <el-table :data="OneattrValue" border class="tabNumWidth" size="mini">
                                <el-table-column align="center" label="图片" min-width="80">
                                    <template slot-scope="scope">
                                        <div class="upLoadPicBox"  @click="modalPicTap('1', 'dan', 'pi')">
                                            <div v-if="formValidate.image" class="pictrue tabPic">
                                                <img :src="scope.row.image" />
                                            </div>
                                            <div v-else class="upLoad tabPic">
                                                <i class="el-icon-camera cameraIconfont" />
                                            </div>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" label="原价" min-width="80">
                                    <template slot-scope="scope">
                                        <span>{{ scope.row['price'] }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" label="拼团价" min-width="80">
                                    <template slot-scope="scope">
                                        <el-input v-model.number="scope.row['active_price']" type="number" class="priceBox" :min="0" :max="scope.row['price']" @blur="limitPrice(scope.row)"/>
                                    </template>
                                </el-table-column>
                                
                                <el-table-column align="center" label="成本价" min-width="80">
                                    <template slot-scope="scope">
                                        <span>{{ scope.row['cost'] }}</span>
                                    </template>
                                </el-table-column>

                                <el-table-column align="center" label="库存" min-width="80">
                                    <template slot-scope="scope">
                                        <span>{{ scope.row['old_stock'] }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" label="限量" min-width="80">
                                    <template slot-scope="scope">
                                        <el-input v-model.number="scope.row['stock']" type="number" class="priceBox" :max="scope.row['old_stock']" :min="0" @change="limitInventory(scope.row)" />
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" label="商品编号" min-width="80">
                                    <template slot-scope="scope">
                                        <span>{{ scope.row['bar_code'] }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" label="重量（KG）" min-width="80">
                                    <template slot-scope="scope">
                                        <span>{{ scope.row['weight'] }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" label="体积（m³）" min-width="80">
                                    <template slot-scope="scope">
                                        <span>{{ scope.row['volume'] }}</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-form-item>
                        <!-- 多规格表格-->
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-form-item v-if="formValidate.spec_type === 1" class="labeltop" label="规格列表：">
                        <el-table ref="multipleSelection" :data="ManyAttrValue" tooltip-effect="dark" :row-key="(row) => { return row.id }" @selection-change="handleSelectionChange">
                            <el-table-column align="center" type="selection" :reserve-selection="true" min-width="50" />
                            <template v-if="manyTabDate">
                                <el-table-column v-for="(item,iii) in manyTabDate" :key="iii" align="center" :label="manyTabTit[iii].title" min-width="80">
                                    <template slot-scope="scope">
                                        <span class="priceBox" v-text="scope.row[iii]" />
                                    </template>
                                </el-table-column>
                            </template>
                            <el-table-column align="center" label="图片" min-width="80">
                                <template slot-scope="scope">
                                    <div class="upLoadPicBox" @click="modalPicTap('1','duo',scope.$index)">
                                        <div v-if="scope.row.image" class="pictrue tabPic">
                                            <img :src="scope.row.image" />
                                        </div>
                                        <div v-else class="upLoad tabPic">
                                            <i class="el-icon-camera cameraIconfont" />
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="原价" min-width="80">
                                <template slot-scope="scope">
                                    <span>{{ scope.row['price'] }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="拼团价" min-width="80">
                                <template slot-scope="scope">
                                    <el-input v-model.number=" scope.row['active_price']" type="number" class="priceBox" :min="0" :max="scope.row['price']" @blur="limitPrice(scope.row)"/>
                                </template>
                            </el-table-column>                            
                            <el-table-column align="center" label="成本价" min-width="80">
                                <template slot-scope="scope">
                                    <span>{{ scope.row['cost'] }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="库存" min-width="80">
                                <template slot-scope="scope">
                                    <span>{{ scope.row['old_stock'] }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="限量" min-width="80">
                                <template slot-scope="scope">
                                    <el-input v-model.number="scope.row['stock']" type="number" class="priceBox" :min="0" :max="scope.row['old_stock']" />
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="商品编号" min-width="80">
                                <template slot-scope="scope">
                                    <span>{{ scope.row['bar_code'] }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="重量（KG）" min-width="80">
                                <template slot-scope="scope">
                                    <span>{{ scope.row['weight'] }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="体积（m³）" min-width="80">
                                <template slot-scope="scope">
                                    <span>{{ scope.row['volume'] }}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                </el-row>
            </div>
            <!-- 商品详情-->
            <el-row v-show="currentTab === 2">
                <el-col :span="24">
                    <el-form-item label="商品详情：">
                        <ueditorFrom v-model="formValidate.content" :content="formValidate.content" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item style="margin-top:30px;">
                <el-button v-show="currentTab>0" type="primary" class="submission" size="small" @click="handleSubmitUp">上一步</el-button>
                <el-button v-show="currentTab == 0" type="primary" class="submission" size="small" @click="handleSubmitNest1('formValidate')">下一步</el-button>
                <el-button v-show="currentTab == 1" type="primary" class="submission" size="small" @click="handleSubmitNest2('formValidate')">下一步</el-button>
                <el-button v-show="currentTab===2" :loading="loading" type="primary" class="submission" size="small" @click="handleSubmit('formValidate')">提交</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <!--选择商品-->
    <goods-list ref="goodsList" @getProduct="getProduct" />
</div>
</template>

<script>
import ueditorFrom from "@/components/ueditorFrom";
import VueUeditorWrap from 'vue-ueditor-wrap';
import goodsList from "../../seckill/seckillGoods/goodsList";
import {
    shippingListApi,
    templateLsitApi,
    productDetailApi,
    categorySelectApi,
    categoryListApi,
    categoryBrandListApi
} from "@/api/product";
import {combinationDataApi,combinationCreateProApi,combinationProDetailApi,combinationProUpdateApi} from "@/api/marketing";
import {
    roterPre
} from "@/settings";
const defaultObj = {
    product_id: "",
    image: "",
    slider_image: [],
    store_name: "",
    store_info: "",
    start_time: "",
    end_time: "",
    time: 1,
    is_show: 1,
    keyword: "",
    brand_id: "", // 品牌id
    cate_id: "", // 平台分类id
    mer_cate_id: [], // 商户分类id
    pay_count: 1,
    unit_name: "",
    sort: 0,
    is_good: 0,
    temp_id: "",
    buying_count_num: 2,
    ficti_status:true,
    ficti_num:1,
    once_pay_count: 1,   
    attrValue: [{
        image: "",
        price: null,
        active_price: null,
        cost: null,
        ot_price: null,
        old_stock: null,
        stock: null,
        bar_code: "",
        weight: null,
        volume: null,
    }, ],
    attr: [],
    extension_type: 0,
    content: "",
    spec_type: 0,
    // give_coupon_ids: [],
    is_gift_bag: 0,
    // couponData: [],
};

const proOptions = [{
    name: "店铺推荐",
    value: "is_good"
}];
export default {
    name: "ProductProductAdd",
    components: {
        ueditorFrom,
        goodsList,
        VueUeditorWrap
    },
    data() {
        return {
            pickerOptions: {
                disabledDate(time) {
                    // return time.getTime() < Date.now();
                  return time.getTime() > Date.now();
                },
            },
            timeVal: "",
            max_ficti_num: 0,
            dialogVisible: false,
            product_id: "",
            multipleSelection: [],
            optionsCate: {
                value: "store_category_id",
                label: "cate_name",
                children: "children",
                emitPath: false,
            },
            roterPre: roterPre,
            selectRule: "",
            checkboxGroup: [],
            recommend: proOptions,
            tabs: [],
            fullscreenLoading: false,
            props: {
                emitPath: false
            },
            propsMer: {
                emitPath: false,
                multiple: true
            },
            active: 0,
            OneattrValue: [Object.assign({}, defaultObj.attrValue[0])], // 单规格
            ManyAttrValue: [Object.assign({}, defaultObj.attrValue[0])], // 多规格
            ruleList: [],
            merCateList: [], // 商户分类筛选
            categoryList: [], // 平台分类筛选
            shippingList: [], // 发货时间
            BrandList: [], // 品牌
            formValidate: Object.assign({}, defaultObj),
            maxStock: "",
            addNum: 0,
            singleSpecification: {},
            multipleSpecifications: [],
            formDynamics: {
                template_name: "",
                template_value: [],
            },
            manyTabTit: {},
            manyTabDate: {},
            grid2: {
                lg: 10,
                md: 12,
                sm: 24,
                xs: 24,
            },
            // 规格数据
            formDynamic: {
                attrsName: "",
                attrsVal: "",
            },
            isBtn: false,
            manyFormValidate: [],
            images: [],
            currentTab: 0,
            isChoice: "",
            combinationData: {
                ficti_status: 0,
                group_buying_rate: ''
            },
            grid: {
                xl: 8,
                lg: 8,
                md: 12,
                sm: 24,
                xs: 24,
            },
            loading: false,
            ruleValidate: {
                store_name: [{required: true,message: "请输入商品名称",trigger: "blur"}],
                timeVal: [{required: true,message: "请选择拼团活动日期",trigger: "blur"}],
                time: [{required: true,message: "请输入拼团时效",trigger: "blur"}],
                buying_count_num: [{required: true,message: "请输入拼团人数",trigger: "blur"}],
                pay_count: [{required: true,message: "请输入限购量",trigger: "blur"}],
                sort: [{required: true,message: "请输入排序数值",trigger: "blur"}],
                once_pay_count: [{ required: true, message: "请输入单人单次限购数量", trigger: "blur"}],
                unit_name: [{ required: true, message: "请输入单位", trigger: "blur" }],
                store_info: [{required: true,message: "请输入拼团活动简介",trigger: "blur"}],
                temp_id: [{required: true,message: "请选择运费模板",trigger: "change"}],
                ficti_num: [{required: true,message: "请输入虚拟成团补齐人数",trigger: "blur"}],
                image: [{required: true,message: "请上传商品图",trigger: "change"}],
                slider_image: [{required: true,message: "请上传商品轮播图",type: "array",trigger: "change"}],
            },
            attrInfo: {},
            keyNum: 0,
            extensionStatus: 0,
            isNew: false
        };
    },
    computed: {
        attrValue() {
            const obj = Object.assign({}, defaultObj.attrValue[0]);
            delete obj.image;
            return obj;
        },
        oneFormBatch() {
            const obj = [Object.assign({}, defaultObj.attrValue[0])];
            delete obj[0].bar_code;
            return obj;
        },
    },
    watch: {
        "formValidate.attr": {
            handler: function (val) {
                if (this.formValidate.spec_type === 1) this.watCh(val);
            },
            immediate: false,
            deep: true,
        },
        "formValidate.buying_count_num": {
            handler: function (newVal,oldVal) {
                if(newVal && this.formValidate.ficti_status == 1){
                    this.max_ficti_num = Math.round((1-this.combinationData.group_buying_rate/100)*this.formValidate.buying_count_num)
                    if(this.isNew && this.formValidate.ficti_num > this.max_ficti_num){
                        this.formValidate.ficti_num = this.max_ficti_num;
                    }
                    
                }              
            },
            immediate: false,
            deep: true,
        },
    },
    created() {
        this.tempRoute = Object.assign({}, this.$route);
        if (this.$route.params.id && this.formValidate.spec_type === 1) {
            this.$watch("formValidate.attr", this.watCh);
        }
    },
    mounted() {
        this.formValidate.slider_image = [];
        this.getCombinationData();
        if (this.$route.params.id) {
            this.setTagsViewTitle();
            this.getInfo(this.$route.params.id);
            this.currentTab = 1;

        } else {
            this.formValidate.attr.map((item) => {
                this.$set(item, "inputVisible", false);
            });
        }
        this.getCategorySelect();
        this.getCategoryList();
        this.getBrandListApi();
        this.getShippingList();   
    },
    methods: {
        getCombinationData(){
            combinationDataApi().then((res) => {
                this.combinationData = res.data
            }).catch((res) => {
                this.$message.error(res.message);
            });
        },
        calFictiCount(){
            this.max_ficti_num = Math.round((1-this.combinationData.group_buying_rate/100)*this.formValidate.buying_count_num)
            this.isNew = true
            if(this.formValidate.ficti_num > this.max_ficti_num){
                this.formValidate.ficti_num = this.max_ficti_num;
            }           
        },
        limitInventory(row){
            if (row.stock - row.old_stock > 0)row.stock = row.old_stock
        },
        limitPrice(row){
            if (row.active_price - row.price > 0)row.active_price = row.price
        },
        add() {
            this.$refs.goodsList.dialogVisible = true;
        },
        getProduct(data) {
            this.formValidate.image = data.src;
            this.product_id = data.id;
            console.log(this.product_id);
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // 具体日期
        onchangeTime(e) {
            this.timeVal = e;
            console.log(this.moment(e[0]).format("YYYY-MM-DD HH:mm:ss"))
            this.formValidate.start_time = e ? this.moment(e[0]).format("YYYY-MM-DD HH:mm:ss") : "";
            this.formValidate.end_time = e ? this.moment(e[1]).format("YYYY-MM-DD HH:mm:ss") : "";
        },
        setTagsViewTitle() {
            const title = "编辑商品";
            const route = Object.assign({}, this.tempRoute, {
                title: `${title}-${this.$route.params.id}`,
            });
            this.$store.dispatch("tagsView/updateVisitedView", route);
        },
        watCh(val) {
            const tmp = {};
            const tmpTab = {};
            this.formValidate.attr.forEach((o, i) => {
                tmp["value" + i] = {
                    title: o.value
                };
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
            console.log(this.manyTabTit)
            console.log(this.manyTabDate)
        },
        // 运费模板
        addTem() {
            const _this = this;
            this.$modalTemplates(0, function () {
                _this.getShippingList();
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
        // 平台分类；
        getCategoryList() {
            categoryListApi()
                .then((res) => {
                    this.categoryList = res.data;
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
        // 获取商品属性模板；
        productGetRule() {
            templateLsitApi().then((res) => {
                this.ruleList = res.data;
            });
        },
        // 运费模板；
        getShippingList() {
            shippingListApi().then((res) => {
                this.shippingList = res.data;
            });
        },

        // 详情
        getInfo(id) {
            this.fullscreenLoading = true;
            this.$route.params.id ? combinationProDetailApi(id).then(async (res) => {
                    let info = res.data;
                    this.formValidate = {
                        product_id: info.product_group_id,
                        image: info.product.image,
                        slider_image: info.product.slider_image,
                        store_name: info.product.store_name,
                        store_info: info.product.store_info,
                        unit_name: info.product.unit_name,
                        time: info.time,
                        buying_count_num: info.buying_count_num,
                        
                        ficti_status: info.ficti_status ? true : false,
                        
                        start_time: info.start_time ?
                            info.start_time : "",
                        end_time: info.end_time ?
                            info.end_time : "",                      
                        brand_id: info.product.brand_id, // 品牌id
                        cate_id: info.cate_id ? info.cate_id : '', // 平台分类id
                        mer_cate_id: info.mer_cate_id, // 商户分类id
                        pay_count: info.pay_count,
                        once_pay_count: info.once_pay_count,
                        sort: info.product.sort,
                        is_good: info.product.is_good,
                        temp_id: info.product.temp_id,
                        is_show: info.is_show,
                        attr: info.product.attr,
                        extension_type: info.extension_type,
                        content: info.product.content.content,
                        spec_type: info.product.spec_type,
                        is_gift_bag: info.product.is_gift_bag,
                        ficti_num: info.ficti_num,
                    };
                    if(this.combinationData.ficti_status === 1)this.max_ficti_num = Math.round((1-this.combinationData.group_buying_rate/100)*info.buying_count_num)
                    if (this.formValidate.spec_type === 0) {
                      this.OneattrValue = info.product.attrValue;
                      this.OneattrValue.forEach((val, i) => {
                        this.attrInfo[Object.values(val.detail).sort().join("/")] = val;
                          this.$set(this.OneattrValue[i], 'active_price', (val._sku ? val._sku.active_price : val.price))
                          this.$set(this.OneattrValue[i], 'stock', (val._sku ? val._sku.stock : val.old_stock))
                      });
                        this.singleSpecification = JSON.parse(
                            JSON.stringify(info.product.attrValue)
                        );
                      this.formValidate.attrValue = this.OneattrValue;
                    } else {
                      let arr = [];
                        this.ManyAttrValue = info.product.attrValue;
                        this.ManyAttrValue.forEach((val, i) => {
                            this.attrInfo[Object.values(val.detail).sort().join("/")] = val;
                            this.$set(this.ManyAttrValue[i], 'active_price', (val._sku ? val._sku.active_price : val.price))
                            this.$set(this.ManyAttrValue[i], 'stock', (val._sku ? val._sku.stock : val.old_stock))
                            if(val._sku) {
                              this.multipleSpecifications = JSON.parse(JSON.stringify(info.product.attrValue));
                              arr.push(val)
                            }
                        });
                      this.multipleSpecifications = JSON.parse(JSON.stringify(arr));
                      this.$nextTick(() => {
                        arr.forEach((row) => {
                          this.$refs.multipleSelection.toggleRowSelection(row, true);
                        });
                      });
                    this.formValidate.attrValue = this.multipleSelection;
                    }
                   
                    console.log(this.ManyAttrValue);
                   this.fullscreenLoading = false;
                   this.timeVal = [
                        new Date(this.formValidate.start_time),
                        new Date(this.formValidate.end_time)
                    ];
                })
                .catch((res) => {
                    this.fullscreenLoading = false;
                    this.$message.error(res.message);
                }) :
                productDetailApi(id)
                .then(async (res) => {
                    let info = res.data;
                    this.formValidate = {
                        product_id: info.product_id,
                        image: info.image,
                        slider_image: info.slider_image,
                        store_name: info.store_name,
                        store_info: info.store_info,
                        unit_name: info.unit_name,
                        time: 1,
                        buying_count_num:2,
                        ficti_status: true,                                             
                        start_time: "",
                        end_time: "",                   
                        brand_id: info.brand_id, // 品牌id
                        cate_id: info.cate_id, // 平台分类id
                        mer_cate_id: info.mer_cate_id, // 商户分类id
                        pay_count: 1,
                        once_pay_count: 1,
                        sort: 0,
                        is_good: info.is_good,
                        temp_id: info.temp_id,
                        is_show: info.is_show,
                        attr: info.attr,
                        extension_type: info.extension_type,
                        content: info.content,
                        spec_type: info.spec_type,
                        is_gift_bag: info.is_gift_bag,
                        ficti_num: this.combinationData.ficti_status === 1 ? Math.round(1-(this.combinationData.group_buying_rate/100)) : "",
                    };
                    if(this.combinationData.ficti_status === 1)this.max_ficti_num = Math.round((1-this.combinationData.group_buying_rate/100)*1)          
                    this.timeVal = [];
                    if (this.formValidate.spec_type === 0) {
                        this.OneattrValue = info.attrValue;
                        this.OneattrValue.forEach((val, i) => {
                          this.$set(this.OneattrValue[i], 'active_price', this.OneattrValue[i].price)
                        });
                        this.singleSpecification = JSON.parse(
                            JSON.stringify(info.attrValue)
                        );
                      this.formValidate.attrValue = this.OneattrValue;
                    } else {
                        this.ManyAttrValue = info.attrValue;
                        this.multipleSpecifications = JSON.parse(JSON.stringify(info.attrValue));
                        this.ManyAttrValue.forEach((val, i) => {
                            this.attrInfo[Object.values(val.detail).sort().join("/")] = val;
                            this.$set(this.ManyAttrValue[i], 'active_price', this.ManyAttrValue[i].price)
                        });
                        this.multipleSelection = info.attrValue;
                        this.$nextTick(() => {
                            info.attrValue.forEach((row) => {
                                this.$refs.multipleSelection.toggleRowSelection(row, true);
                            });
                        });
                    //    this.formValidate.attrValue = this.multipleSelection;
                        // console.log(this.multipleSelection)
                    }
                    if (this.formValidate.is_good === 1)
                        this.checkboxGroup.push("is_good");
                    this.fullscreenLoading = false;
                })
                .catch((res) => {
                    this.fullscreenLoading = false;
                    this.$message.error(res.message);
                });
        },
        handleRemove(i) {
            this.formValidate.slider_image.splice(i, 1);
        },
        // 点击商品图
        modalPicTap(tit, num, i) {
            const _this = this;
            const attr = [];
            this.$modalUpload(function (img) {
                if (tit === "1" && !num) {
                    _this.formValidate.image = img[0];
                    _this.OneattrValue[0].image = img[0];
                }
                if (tit === "2" && !num) {
                    img.map((item) => {
                        attr.push(item.attachment_src);
                        _this.formValidate.slider_image.push(item);
                        if(_this.formValidate.slider_image.length > 10){
                          _this.formValidate.slider_image.length = 10
                        }
                    });
                }
                if (tit === "1" && num === "dan") {
                    _this.OneattrValue[0].image = img[0];
                }
                if (tit === "1" && num === "duo") {
                    _this.ManyAttrValue[i].image = img[0];
                }
                if (tit === "1" && num === "pi") {
                    _this.oneFormBatch[0].image = img[0];
                }
            }, tit);
        },
        handleSubmitUp() {
            if (this.currentTab-- < 0) this.currentTab = 0;
        },
        handleSubmitNest1(name) {
            if (!this.formValidate.image) {
                this.$message.warning("请选择商品！");
                return;
            } else {
                this.currentTab++;
                if (!this.$route.params.id) this.getInfo(this.product_id);
            }
        },
        handleSubmitNest2(name) {
            if (this.formValidate.spec_type === 1) {
                this.formValidate.attrValue = this.multipleSelection;
            } else {
                this.formValidate.attrValue = this.OneattrValue;
            }
            console.log(this.formValidate);
            this.$refs[name].validate((valid) => {
                if (valid) {
                    if (
                        !this.formValidate.store_name ||
                        !this.formValidate.store_info ||
                        !this.formValidate.image ||
                        !this.formValidate.slider_image 
                    ) {
                        this.$message.warning("请填写完整拼团商品信息！");
                        return;
                    }
                    if( !this.formValidate.start_time || !this.formValidate.end_time){
                        this.$message.warning("请选择拼团时间！");
                        return;
                    }
                    if (
                        !this.formValidate.attrValue ||
                        this.formValidate.attrValue.length === 0
                    ) {
                        this.$message.warning("请选择商品规格！");
                        return;
                    }
                    this.currentTab++;
                }
            });
        },
        // 提交
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.fullscreenLoading = true;
                    this.loading = true;
                  console.log(this.formValidate)
                  if(this.$route.params.id){
                    console.log(this.ManyAttrValue)                 
                    combinationProUpdateApi(this.$route.params.id, this.formValidate)
                      .then(async (res) => {
                        this.fullscreenLoading = false;
                        this.$message.success(res.message);
                        this.$router.push({
                          path: this.roterPre + "/marketing/combination/combination_goods",
                        });
                        this.$refs[name].resetFields();
                        this.formValidate.slider_image = [];
                        this.loading = false;
                      })
                      .catch((res) => {
                        this.fullscreenLoading = false;
                        this.loading = false;
                        this.$message.error(res.message);
                      })
                  }else{
                    combinationCreateProApi(this.formValidate)
                      .then(async (res) => {
                        this.fullscreenLoading = false;
                        this.$message.success(res.message);
                        this.$router.push({
                          path: this.roterPre + "/marketing/combination/combination_goods",
                        });
                        this.$refs[name].resetFields();
                        this.formValidate.slider_image = [];
                        this.loading = false;
                      })
                      .catch((res) => {
                        this.fullscreenLoading = false;
                        this.loading = false;
                        this.$message.error(res.message);
                      });
                  }
                } else {
                    if (
                        !this.formValidate.store_name ||
                        !this.formValidate.store_info ||
                        !this.formValidate.image ||
                        !this.formValidate.slider_image
                    ) {
                        this.$message.warning("请填写完整商品信息！");
                    }
                }
            });
        },
        // 表单验证
        validate(prop, status, error) {
            if (status === false) {
                this.$message.warning(error);
            }
        },
        // 移动
        handleDragStart(e, item) {
            this.dragging = item;
        },
        handleDragEnd(e, item) {
            this.dragging = null;
        },
        handleDragOver(e) {
            e.dataTransfer.dropEffect = "move";
        },
        handleDragEnter(e, item) {
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
    },
};
</script>

<style lang="scss" scoped>
.priceBox {
    /deep/input {
        padding-right: 0;
    }
}

.sp100 {
    width: 100%;
}

.proCoupon {
    /deep/.el-form-item__content {
        margin-top: 5px;
    }
}
.item_desc{color: #999; font-size: 12px;}
.tabPic {
    width: 40px !important;
    height: 40px !important;

    img {
        width: 100%;
        height: 100%;
    }
}

.noLeft {
    /deep/.el-form-item__content {
        margin-left: 0 !important;
    }
}

.tabNumWidth {
    /deep/.el-input-number--medium {
        width: 121px !important;
    }

    /deep/.el-input-number__increase {
        width: 20px !important;
        font-size: 12px !important;
    }

    /deep/.el-input-number__decrease {
        width: 20px !important;
        font-size: 12px !important;
    }

    /deep/.el-input-number--medium .el-input__inner {
        padding-left: 25px !important;
        padding-right: 25px !important;
    }

    /deep/ thead {
        line-height: normal !important;
    }

    /deep/ .el-table .cell {
        line-height: normal !important;
    }
}

.selWidth {
    width: 100%;
}

.selWidthd {
    width: 300px;
}

.selWidthd1 {
    width: 200px;
}

.button-new-tag {
    height: 28px;
    line-height: 26px;
    padding-top: 0;
    padding-bottom: 0;
}

.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}

.pictrue {
    width: 60px;
    height: 60px;
    border: 1px dotted rgba(0, 0, 0, 0.1);
    margin-right: 10px;
    position: relative;
    cursor: pointer;

    img {
        width: 100%;
        height: 100%;
    }
}

.btndel {
    position: absolute;
    z-index: 1;
    width: 20px !important;
    height: 20px !important;
    left: 46px;
    top: -4px;
}

.labeltop {
    /deep/.el-form-item__label {
        float: none !important;
        display: inline-block !important;
        margin-left: 120px !important;
        width: auto !important;
    }
}
</style>
