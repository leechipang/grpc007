<template>
  <el-card class="box-card">
    <div class="acea-row row-between-wrapper mb20">
      <span class="header-title">用户数据</span>
      <span class="header-time">
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-date mr5" />
            {{ name }}
            <i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(item,i) in fromList.fromTxt"
              :key="i"
              @click.native="setTime(item.val, item.text)"
            >{{ item.text }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
    </div>
    <echarts-from
      :option-data="optionData"
      :styles="style"
      height="100%"
      width="100%"
      v-if="!listLoading"
    />
  </el-card>
</template>

<script>
import { userDataApi } from "@/api/home";
import echartsFrom from "@/components/echarts/index";
export default {
  name: "UserData",
  components: { echartsFrom },
  data() {
    return {
      style: { height: "400px" },
      optionData: {},
      name: "最近30天",
      fromList: {
        title: "选择时间",
        custom: true,
        fromTxt: [
          { text: "最近7天", val: "lately7" },
          { text: "最近30天", val: "lately30" },
          { text: "本月", val: "month" }
        ]
      }
    };
  },
  mounted() {
    this.getList("lately30");
  },
  methods: {
    setTime(val, text) {
      this.name = text;
      this.getList(val);
    },
    getList(val) {
      userDataApi({ date: val })
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            const userData = res.data;
            const visitList = [];
            const newUserList = [];
            const userList = [];
            const timer = [];
            userData.map(item => {
              newUserList.push(item.new);
              userList.push(item.total);
              visitList.push(item.visit);
              timer.push(item.day);
            });
            const seriesData = [
              {
                name: "新用户",
                type: "line",
                stack: "用户量",
                itemStyle: {
                  normal: {
                    color: "#5AD8A6",
                    lineStyle: {
                      color: "#5AD8A6"
                    }
                  }
                },
                data: newUserList,
                smooth: false
              },
              {
                name: "访问用户",
                type: "line",
                stack: "用户量",
                itemStyle: {
                  normal: {
                    color: "#5D7092",
                    lineStyle: {
                      color: "#5D7092"
                    }
                  }
                },
                data: visitList,
                smooth: false
              },
              {
                name: "累计用户",
                type: "line",
                stack: "用户量",
                yAxisIndex: 1,

                itemStyle: {
                  normal: {
                    color: "#5B8FF9",
                    lineStyle: {
                      color: "#5B8FF9"
                    }
                  }
                },
                data: userList,
                smooth: false
              }
            ];
            this.optionData = {
              tooltip: {
                trigger: "axis",
                axisPointer: {
                  type: "cross",
                  label: {
                    backgroundColor: "#6a7985"
                  }
                }
              },
              legend: {
                x: "1px",
                y: "10px",
                data: ["新用户", "访问用户", "累计用户"]
              },
              grid: {
                left: "0%",
                right: "4%",
                bottom: "3%",
                containLabel: true
              },

              axisLine: {
                show: false
              },
              xAxis: [
                {
                  type: "category",
                  boundaryGap: true,
                  axisLine: {
                    show: false
                  },
                  axisTick: {
                    alignWithLabel: true,
                    lineStyle: {
                      color: "#D7DDE4"
                    }
                  },
                  splitLine: {
                    show: false
                  },
                  axisLabel: {
                    interval: 0,
                    rotate: 40,
                    textStyle: {
                      color: "#7F8B9C"
                    }
                  },
                  data: Array.from(new Set(timer))
                }
              ],
              yAxis: [
                {
                  name: "新/访",
                  type: "value",
                  inverse: false,
                  boundaryGap: ["0", "0.1"],
                  // splitLine: {
                  //   show: false
                  // }
                },
                {
                  name: "累计用户",
                  type: "value",
                  // minInterval: 1,
                  max: this.arrayMax(userList) + 20,
                  min: this.arrayMin(userList) - 10,
                  splitLine: {
                    show: false
                  }
                }
              ],
              series: seriesData
            };
            this.listLoading = false;
          }
        })
        .catch(res => {
          this.$message.error(res.message);
        });
    },
    arrayMin(arrs) {
      var min = arrs[0];
      for (var i = 1, ilen = arrs.length; i < ilen; i += 1) {
        if (arrs[i] < min) {
          min = arrs[i];
        }
      }
      return min;
    },
    arrayMax(arrs) {
      var max = arrs[0];
      for (var i = 1, ilen = arrs.length; i < ilen; i++) {
        if (arrs[i] > max) {
          max = arrs[i];
        }
      }
      return max;
    }
  }
};
</script>

<style scoped>
</style>
