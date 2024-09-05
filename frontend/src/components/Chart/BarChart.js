import {
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController
);

export default function BarChart(datos) {
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
          display: true, // Display grid lines for the y-axis
        },
        ticks: {
          padding: 15,
        },
      },
      x: {
        beginAtZero: true,
        border: { display: true },
        grid: {
          display: false, // Display grid lines for the y-axis
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
      <Bar data={datos.datos} options={options} />
    </div>
  );
}
