<template>
  <apexchart
    type="bar"
    height="350"
    :options="chartOptions"
    :series="series"
  ></apexchart>
</template>
<script>
// เรียกใช้ Dashboard Api
import { DashboardApi } from "src/api/DashboardApi";

export default {
  name: "MyChart",
  data() {
    return {
      series: [
        {
          name: "User Registration",
          data: [], // เราจะใส่ข้อมูล count ที่ได้จาก API ตรงนี้
        },
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: "bar",
        },
        plotOptions: {
          bar: {
            borderRadius: 5,
            dataLabels: {
              position: "top", // top, center, bottom
            },
            style: {
              colors: ["#506fb5"],
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + "";
          },
          offsetY: -20,
          style: {
            fontSize: "12px",
            colors: ["#506fb5"],
          },
        },

        xaxis: {
          categories: [],
          position: "top",
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          crosshairs: {
            fill: {
              type: "gradient",
              gradient: {
                colorFrom: "#D8E3F0",
                colorTo: "#BED1E6",
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              },
            },
          },
          tooltip: {
            enabled: true,
          },
        },
        yaxis: {
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val) {
              return val + "";
            },
          },
        },

        title: {
          text: "",
          floating: true,
          offsetY: 330,
          align: "center",
          style: {
            color: "grey",
          },
        },
      },
    };
  },
  mounted() {
    this.fetchDatacountUserSignUpAllMonth();
  },
  methods: {
    async fetchDatacountUserSignUpAllMonth() {
      const { countUserSignUp } = DashboardApi();
      const response = await countUserSignUp();
      console.log("countUserSignUp", response);
      if (response && response.dataList) {
        const countData = response.dataList.count;
        this.series[0].data = countData;
        const weekData = response.dataList.week.map((item) => "Week " + item);
        this.chartOptions.xaxis.categories = weekData;
        this.chartOptions.title.text =
          "User Registration (" +
          response.dataList.month +
          "/" +
          response.dataList.year +
          ")";
      }
    },
  },
};
</script>
<style></style>
