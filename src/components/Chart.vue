<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Line } from "vue-chartjs";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Prop, Mixins, Watch } from "vue-property-decorator";
import { parseDay } from "../utils/mixins";

@Component
export default class Chart extends Mixins(Line) {
  @Prop()
  labels!: string[];
  @Prop()
  chartdata!: any;
  @Watch("chartdata")
  onPropertyChanged() {
    this.$data._chart.destroy();
    this.reRenderChart();
  }

  mounted() {
    this.reRenderChart();
  }

  reRenderChart() {
    this.renderChart(
      {
        labels: this.labels,
        datasets: [
          {
            fill: false,
            borderColor: "#ec174f",
            backgroundColor: "#ec174f",
            pointBorderWidth: 5,
            lineTension: 0,
            pointHoverRadius: 10,
            datalabels: {
              color: "#ec174f",
              align: "top",
              padding: {
                bottom: 10
              },
              display: (context: any) => !context.active,
              font: {
                size: "15",
                weight: "400"
              },
              formatter: (value: number) => {
                const rNum = Math.round(value / 1000);
                if (rNum === 0) return value + "м.";
                else return rNum + "км.";
              }
            },
            data: this.chartdata
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          enabled: false,
          custom: (tooltipModel: any) => {
            let tooltipEl = document.getElementById("chartjs-tooltip");

            if (!tooltipEl) {
              tooltipEl = document.createElement("div");
              tooltipEl.id = "chartjs-tooltip";
              tooltipEl.innerHTML = "<div></div>";
              document.body.appendChild(tooltipEl);
            }

            if (tooltipModel.opacity === 0) {
              tooltipEl.style.opacity = "0";
              return;
            }

            tooltipEl.classList.add("chart__point__tooltip");

            tooltipEl.classList.remove("above", "below", "no-transform");
            if (tooltipModel.yAlign) {
              tooltipEl.classList.add(tooltipModel.yAlign);
            } else {
              tooltipEl.classList.add("no-transform");
            }

            function getBody(bodyItem: any) {
              return bodyItem.lines;
            }

            if (tooltipModel.body) {
              const titleLines = tooltipModel.title || [];
              const bodyLines = tooltipModel.body.map(getBody);

              let innerHtml = "";

              titleLines.forEach((title: string) => {
                innerHtml += `<p class="chart__point__tooltip__day">${title}</p>`;
              });

              bodyLines.forEach((body: number, i: number) => {
                const colors = tooltipModel.labelColors[i];
                let span = `<span class="chart__point__tooltip__distance">${body}м.</span>`;
                innerHtml += span;
              });

              let tableRoot = tooltipEl.querySelector("div");
              if (tableRoot) tableRoot.innerHTML = innerHtml;
            }

            const position = this.$data._chart.canvas.getBoundingClientRect();

            const bottomMargin = 50;

            tooltipEl.style.opacity = "1";
            tooltipEl.style.left =
              position.left + window.pageXOffset + tooltipModel.caretX + "px";
            tooltipEl.style.top =
              position.top +
              window.pageYOffset +
              tooltipModel.caretY -
              tooltipModel.height -
              bottomMargin +
              "px";
          }
        },
        plugins: [ChartDataLabels]
      }
    );
  }
}
</script>

<style lang="sass">
$day_text_color: #9b9c9f
.chart
  &__point
    &__tooltip
      position: absolute
      display: flex
      flex-direction: column
      background-color: white
      font-size: 1rem;
      font-style: normal
      pointer-events: none
      padding: 10px
      border-radius: 5px
      box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2)
      &__day
        font-size: .8rem
        margin: 0
        text-transform: capitalize
        color: $day_text_color
      &__distance
        text-align: center
        font-size: 2rem
</style>