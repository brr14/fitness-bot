import Header from "../components/Header";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Protein", value: 85 },
  { name: "Carbs", value: 120 },
  { name: "Fats", value: 40 },
  { name: "Fiber", value: 25 },
];

const COLORS = ["#2D336B", "#7FA1C3", "#E2DAD6", "#F5EDED"];

export default function MealPlan() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-[#6482AD] absolute overflow-auto">
      <Header />

      <div className="pt-32 pb-16 px-4 lg:px-20">
        <h1 className="text-4xl lg:text-5xl font-bold text-[#F5EDED] mb-10 text-center">
          Your Daily Meal Plan
        </h1>

        {/* Meal Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Breakfast */}
          <div className="bg-[#F5EDED] rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-[#2D336B] mb-2">Breakfast</h2>
            <ul className="text-[#2D336B] list-disc pl-5 space-y-1 text-base">
              <li>2 Pesaratu + Mint Chutney</li>
              <li>1 Boiled Egg</li>
              <li>Black Coffee</li>
            </ul>
            <p className="mt-2 text-sm text-gray-600">
              Approx: 350 kcal | 20g protein | 35g carbs | 10g fats | 5g fiber
            </p>
          </div>

          {/* Lunch */}
          <div className="bg-[#F5EDED] rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-[#2D336B] mb-2">Lunch</h2>
            <ul className="text-[#2D336B] list-disc pl-5 space-y-1 text-base">
              <li>Paneer Bhurji (100g)</li>
              <li>2 Multigrain Rotis</li>
              <li>Salad + Lemon Water</li>
            </ul>
            <p className="mt-2 text-sm text-gray-600">
              Approx: 450 kcal | 35g protein | 50g carbs | 15g fats | 10g fiber
            </p>
          </div>

          {/* Dinner */}
          <div className="bg-[#F5EDED] rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-[#2D336B] mb-2">Dinner</h2>
            <ul className="text-[#2D336B] list-disc pl-5 space-y-1 text-base">
              <li>Grilled Tofu Stir-fry</li>
              <li>1 small cup Quinoa</li>
              <li>Steamed Veggies</li>
            </ul>
            <p className="mt-2 text-sm text-gray-600">
              Approx: 400 kcal | 30g protein | 35g carbs | 15g fats | 10g fiber
            </p>
          </div>
        </div>

        {/* Macronutrient Chart */}
        <div className="mt-16 w-full flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold text-[#F5EDED] mb-6">
            Macronutrient Breakdown
          </h2>
          <div className="w-full lg:w-[500px] h-[300px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
