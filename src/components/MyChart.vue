<template>
  <apexchart
    type="bar"
    height="350"
    :options="chartOptions"
    :series="series"
  ></apexchart>
</template>

<script>
export default {
  name: "MyChart",
  data() {
    return {
      series: [
        {
          name: "Inflation",
          data: [1, 2, 4.5, 1.7],
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
            return val + "%";
          },
          offsetY: -20,
          style: {
            fontSize: "12px",
            colors: ["#506fb5"],
          },
        },

        xaxis: {
          categories: ["1-9", "10-16", "17-23", "24-30"],
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
              return val + "%";
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
};
</script>

<style></style>
