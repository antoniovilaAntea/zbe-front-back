import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, CategoryScale, Legend, Tooltip, Title);

export default function PieChart(datos) {
  const options = {
    plugins: {
      legend: {
        display: true,
      },
    },
    layout: {
      padding: {
        left: 5,
        right: 5,
        top: 10,
        bottom: 5,
      },
      margin: {
        left: 5,
        right: 5,
        top: 5,
        bottom: 5,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        border: { dash: [6, 6], display: true },
        grid: {
          display: true,
        },
        ticks: {
          padding: 15,
        },
      },
      x: {
        beginAtZero: true,
        border: { display: true },
        grid: {
          display: false,
        },
        ticks: {
          padding: 7,
        },
      },
    },
    elements: {
      bar: {
        borderRadius: 40,
        borderWidth: 0.7,
      },
    },
  };

  return (
    <div>
      <Doughnut data={datos.datos} options={options} />
    </div>
  );
}
