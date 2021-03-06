import Component from "../Component";
import LineGraph from "./LineGraph";
import PieChart from "./PieChart";
import StickGraph from "./StickGraph";
import Checkboxes from "./CheckBoxes";

import StatisticsPageModel, { CASE } from "../../models/StatisticsPageModel";
import PieChartModel from "../../models/PieChartModel";
import LineGraphModel from "../../models/LineGraphModel";

export default class Statistics extends Component {
  $lineGraph: LineGraph;
  $pieChart: PieChart;
  $stickGraph: StickGraph;
  $checkboxes: Checkboxes;

  constructor() {
    super();

    this.$lineGraph = new LineGraph(800, 600);
    this.$pieChart = new PieChart(800, 600);
    this.$stickGraph = new StickGraph(800, 600);
    this.$checkboxes = new Checkboxes();

    this.view = document.createElement("div");
    this.view.appendChild(this.$checkboxes.view);

    switch (StatisticsPageModel.getCase()) {
      case CASE.LINE: {
        this.view.appendChild(this.$lineGraph.view);
        break;
      }
      case CASE.PIE: {
        this.view.appendChild(this.$pieChart.view);
        this.view.appendChild(this.$stickGraph.view);
        break;
      }
    }

    StatisticsPageModel.subscribe("changeCase", (data: CASE) => {
      switch (data) {
        case CASE.LINE: {
          this.view.removeChild(this.$pieChart.view);
          this.view.removeChild(this.$stickGraph.view);
          this.view.appendChild(this.$lineGraph.view);

          LineGraphModel.customNotify();
          break;
        }
        case CASE.PIE: {
          this.view.removeChild(this.$lineGraph.view);
          this.view.appendChild(this.$pieChart.view);
          this.view.appendChild(this.$stickGraph.view);

          PieChartModel.customNotify();
          break;
        }
      }
    });
  }

  reRender(): void {
    switch (StatisticsPageModel.getCase()) {
      case CASE.LINE: {
        LineGraphModel.customNotify();
        break;
      }
      case CASE.PIE: {
        PieChartModel.customNotify();
        break;
      }
    }
  }
}
