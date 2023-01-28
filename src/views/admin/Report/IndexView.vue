<script setup>
import { downloadReport, reports } from "@/api/survey";
import { useTemplateStore } from "@/stores/template";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import moment from "moment";
import { computed, nextTick, onMounted, reactive, ref } from "vue";
import { Bar, Pie } from "vue-chartjs";
import FlatPickr from "vue-flatpickr-component";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
);
ChartJS.register(ChartDataLabels);

const chartListComponent = ref(true);

const templateStore = useTemplateStore();

const chartOptions = computed(() => [
  { id: "take_photo_of_chiller", title: "Take Photo of Chiller", type: "pie" },
  {
    id: "chiller_is_placed_in_the_agreed_spot",
    title: "Chiller is Placed in the Agreed Splot",
    type: "pie",
  },
  { id: "chiller_condition", title: "Chiller Condition", type: "pie" },
  {
    id: "chiller_maintenance",
    title: "Chiller Maintenance (Quarterly)",
    type: "pie",
  },
  {
    id: "check_chiller_branding",
    title: "Check Chiller Branding (if any)",
    type: "pie",
  },
  { id: "keep_chiller_clean", title: "Keep Chiller Clean", type: "pie" },
  {
    id: "on_shelf_availability",
    title: "On Shelf Availability",
    type: "grouped_bar",
  },
  { id: "planogram", title: "Planogram", type: "pie" },
  { id: "share_of_space", title: "Secure Share of Space", type: "pie" },
  {
    id: "daily_inventory",
    title: "Daily Inventory Update (Stock)",
    type: "bar",
  },
]);

const chartOptionsPercentage = computed(() => ({
  pie: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        color: "#fff",
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map((data) => {
            sum += data;
          });
          let percentage = ((value * 100) / sum).toFixed(2) + "%";
          return percentage;
        },
      },
    },
  },
  bar: {
    indexAxis: "y",
    plugins: {
      datalabels: {
        color: "#fff",
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map((data) => {
            sum += data;
          });
          let percentage = ((value * 100) / sum).toFixed(2) + "%";
          return percentage;
        },
      },
    },
  },
  grouped_bar: {
    indexAxis: "y",
    plugins: {
      datalabels: {
        color: "#fff",
        formatter: (value, ctx) => {
          const chart = state.charts.find(
            (ch) => ch.id == "on_shelf_availability"
          );
          const dataset =
            ctx.dataset.label == "On Shelf"
              ? chart.data.data_true
              : chart.data.data_false;

          const data = dataset.find(set => set.label === ctx.chart.data.labels[ctx.dataIndex]);
          return data ? data.value : '';
        },
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  },
}));

const chartOptionsNumber = computed(() => ({
  pie: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: { color: "#fff" },
    },
  },
  bar: {
    indexAxis: "y",
    plugins: {
      datalabels: { color: "#fff" },
    },
  },
  grouped_bar: {
    indexAxis: "y",
    plugins: {
      datalabels: {
        color: "#fff",
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels[ctx.dataIndex] != "TOTAL") return value;
          const chart = state.charts.find(
            (ch) => ch.id == "on_shelf_availability"
          );
          if (!chart) return value;
          const dataset =
            ctx.dataset.label == "On Shelf"
              ? chart.data.data_true
              : chart.data.data_false;
          const data = dataset[dataset.length - 1].origin;
          return data;
        },
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  },
}));

const state = reactive({
  selectedCharts: chartOptions.value.map((chart) => chart.id),
  selectedChartOption: "percentage",
  charts: [],
  dateRange: `${moment()
    .subtract(7, "days")
    .format("YYYY-MM-DD")} s/d ${moment().format("YYYY-MM-DD")}`,
});

const displayDateRange = computed(() => {
  const dates = state.dateRange.split(" s/d ");
  const start_date = moment(dates[0]).format("DD-MM-YYYY");
  const end_date = moment(dates[1]).format("DD-MM-YYYY");
  return `${start_date} s/d ${end_date}`;
});

async function getReports(isFirstTime = false) {
  const loader = isFirstTime ? "pageLoader" : "headerLoader";
  templateStore[loader]({ mode: "on" });
  const dates = state.dateRange.split(" s/d ");
  const { data: chartValues } = await reports({
    start_date: moment(dates[0]).format("YYYY-MM-DD"),
    end_date: moment(dates[1]).format("YYYY-MM-DD"),
  });
  state.charts = state.selectedCharts.map((chart) => {
    const chartOption = chartOptions.value.find(
      (chartOption) => chartOption.id == chart
    );
    const data = chartValues[chart];
    let props = {};

    if (chart == "on_shelf_availability") {
      const items = data.data_true.length - 1;
      data.data_true = data.data_true.map((d) => {
        return d.label == "TOTAL"
          ? { ...d, origin: d.total, total: Math.round(d.total / items) }
          : d;
      });
      data.data_false = data.data_false.map((d) => {
        return d.label == "TOTAL"
          ? { ...d, origin: d.total, total: Math.round(d.total / items) }
          : d;
      });
    }
    if (chart == "chiller_condition") {
      props = {
        labels: data.map((d) => d.label),
        datasets: [
          {
            data: data.map((d) => d.total),
            backgroundColor: ["#41B883", "#E46651", "#023436"],
            label: chartOption.title,
          },
        ],
      };
    } else if (chart == "on_shelf_availability") {
      props = {
        labels: data.data_true.map((d) => d.label),
        datasets: [
          {
            data: data.data_true.map((d) => d.total),
            backgroundColor: ["#41B883"],
            label: "On Shelf",
          },
          {
            data: data.data_false.map((d) => d.total),
            backgroundColor: ["#E46651"],
            label: "Off Shelf",
          },
        ],
      };
    } else {
      props = {
        labels: data.map((d) => d.label),
        datasets: [
          {
            data: data.map((d) => d.total),
            backgroundColor: [
              "#E46651",
              "#41B883",
              "#023436",
              "#ffd639",
              "#007CBE",
            ],
            label: chartOption.title,
          },
        ],
      };
    }
    return { ...chartOption, data, props };
  });
  templateStore[loader]({ mode: "off" });
}

async function handleDownloadClick() {
  const dates = state.dateRange.split(" s/d ");
  const res = await downloadReport({
    start_date: moment(dates[0]).format("YYYY-MM-DD"),
    end_date: moment(dates[1]).format("YYYY-MM-DD"),
  });

  window.open(res.data.file_url, "_blank");
}

function handleFilter() {
  getReports(false);
}

const handleChartOptionChange = async (type) => {
  state.selectedChartOption = type;
  chartListComponent.value = false;
  await nextTick();
  chartListComponent.value = true;
};
// Attach ESCAPE key event listener
onMounted(async () => {
  getReports(true);
});
</script>

<style lang="scss">
// Flatpickr + Custom overrides
@import "flatpickr/dist/flatpickr.css";
@import "@/assets/scss/vendor/flatpickr";
</style>

<template>
  <BasePageHeading title="Report" :subtitle="`🗓️  ${displayDateRange}`">
    <template #extra>
      <button
        type="button"
        class="btn btn-success text-white"
        @click="handleDownloadClick"
      >
        <i class="fa fa-download opacity-50 me-1"></i>
        Download Report
      </button>
      <button
        type="button"
        class="btn btn-alt-info ms-2"
        v-click-ripple
        data-bs-toggle="modal"
        data-bs-target="#modal-block-normal"
      >
        <i class="fa fa-filter opacity-50 me-1"></i>
        Filter
      </button>
    </template>
  </BasePageHeading>

  <div class="content">
    <div v-if="chartListComponent" class="row items-push">
      <div class="col-12 col-md-6" v-for="chart in state.charts" :key="chart">
        <BaseBlock :title="chart.title" class="h-100 mb-0 pb-3">
          <Pie
            v-if="chart.type == 'pie'"
            :data="chart.props"
            :options="
              state.selectedChartOption == 'percentage'
                ? chartOptionsPercentage[chart.type]
                : chartOptionsNumber[chart.type]
            "
          />
          <Bar
            v-else
            :data="chart.props"
            :options="
              state.selectedChartOption == 'percentage'
                ? chartOptionsPercentage[chart.type]
                : chartOptionsNumber[chart.type]
            "
          />
        </BaseBlock>
      </div>
    </div>

    <!-- floating chart toggles -->
    <div class="d-flex align-items-center justify-content-center" style="position: sticky; bottom: 2%;">
      <div
        class="btn-group shadow p-1 mb-5 bg-white rounded"
        role="group"
        aria-label="Horizontal Primary"
      >
        <button
          type="button"
          :class="
            state.selectedChartOption == 'percentage'
              ? 'btn btn-alt-primary'
              : 'btn btn-alt-primary-outline'
          "
          @click="handleChartOptionChange('percentage')"
        >
          % Persen
        </button>
        <button
          type="button"
          :class="
            state.selectedChartOption == 'number'
              ? 'btn btn-alt-primary'
              : 'btn btn-light'
          "
          @click="handleChartOptionChange('number')"
        >
          # Angka
        </button>
      </div>
    </div>
  </div>

  <div
    class="modal modal-lg"
    id="modal-block-normal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modal-block-normal"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <BaseBlock title="Filter Report Data" transparent class="mb-0">
          <template #options>
            <button
              type="button"
              class="btn-block-option"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i class="fa fa-fw fa-times"></i>
            </button>
          </template>

          <template #content>
            <div class="block-content fs-sm">
              <h5 class="mb-2">Tanggal</h5>
              <FlatPickr
                id="example-flatpickr-range"
                class="form-control"
                placeholder="Pilih rentang tanggal"
                v-model="state.dateRange"
                :config="{
                  mode: 'range',
                  maxDate: 'today',
                  altInput: true,
                  altFormat: 'd-m-Y',
                  locale: { rangeSeparator: ' s/d ' },
                }"
              />
              <h5 class="mt-4 mb-2">Chart</h5>
              <div class="row items-push">
                <div
                  class="col-6"
                  v-for="chart in chartOptions"
                  :key="chart.id"
                >
                  <div class="form-check form-block">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="state.selectedCharts"
                      :id="chart.id"
                      :value="chart.id"
                    />
                    <label class="form-check-label" :for="chart.id">{{
                      chart.title
                    }}</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="block-content block-content-full text-end bg-body">
              <button
                type="button"
                class="btn btn-alt-secondary me-1"
                data-bs-dismiss="modal"
              >
                Tutup
              </button>
              <button
                type="button"
                class="btn btn-success text-white"
                data-bs-dismiss="modal"
                @click="handleFilter"
              >
                Terapkan Filter
              </button>
            </div>
          </template>
        </BaseBlock>
      </div>
    </div>
  </div>
</template>
