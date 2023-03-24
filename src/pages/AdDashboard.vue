<template>
  <li class="nav-item">
    <span class="nav-link" v-b-toggle="'charts-dropdown'">
      <span class="menu-title">Charts</span>
      <i class="menu-arrow"></i>
      <i class="mdi mdi-chart-bar menu-icon"></i>
    </span>
    <b-collapse accordion="sidebar-accordion" id="charts-dropdown">
      <ul class="nav flex-column sub-menu">
        <li class="nav-item">
          <router-link class="nav-link" to="/charts/chartjs/"
            >Chart js</router-link
          >
        </li>
      </ul>
    </b-collapse>
  </li>
</template>

<script>
export default {};
</script>

<style></style>
