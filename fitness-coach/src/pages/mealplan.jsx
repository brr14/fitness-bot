import Header from "../components/Header";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const vegData = [
  { name: "Protein", value: 85 },
  { name: "Carbs", value: 120 },
  { name: "Fats", value: 40 },
  { name: "Fiber", value: 25 },
];

const nonVegData = [
  { name: "Protein", value: 95 },
  { name: "Carbs", value: 110 },
  { name: "Fats", value: 45 },
  { name: "Fiber", value: 20 },
];

const COLORS = ["#2D336B", "#7FA1C3", "#E2DAD6", "#F5EDED"];

export default function MealPlan() {
  return (
    <div
  className="flex flex-col min-h-screen w-full absolute overflow-auto"
  style={{
    background: "linear-gradient(to top, #fcb7af, #d8c5f3)",
  }}
>

      <Header />

      <div className="pt-32 pb-16 px-4 lg:px-20">
        <h1 className="text-4xl lg:text-5xl font-bold text-[#2D336B] mb-12 text-center">
          Your Daily Meal Plan
        </h1>

        {/* Vegetarian Plan */}
        <h2 className="text-2xl font-bold text-[#2D336B] mb-6 text-left">
          Vegetarian Plan
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Veg Breakfast */}
          <div className="bg-[#F5EDED] rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl font-semibold text-[#2D336B] mb-2">Breakfast</h3>
            <ul className="text-[#2D336B] list-disc pl-5 space-y-1 text-base">
              <li>2 Pesaratu + Mint Chutney</li>
              <li>1 Boiled Egg</li>
              <li>Black Coffee</li>
            </ul>
            <p className="mt-2 text-sm text-gray-600">
              Approx: 350 kcal | 20g protein | 35g carbs | 10g fats | 5g fiber
            </p>
          </div>

          {/* Veg Lunch */}
          <div className="bg-[#F5EDED] rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl font-semibold text-[#2D336B] mb-2">Lunch</h3>
            <ul className="text-[#2D336B] list-disc pl-5 space-y-1 text-base">
              <li>Paneer Bhurji (100g)</li>
              <li>2 Multigrain Rotis</li>
              <li>Salad + Lemon Water</li>
            </ul>
            <p className="mt-2 text-sm text-gray-600">
              Approx: 450 kcal | 35g protein | 50g carbs | 15g fats | 10g fiber
            </p>
          </div>

          {/* Veg Dinner */}
          <div className="bg-[#F5EDED] rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl font-semibold text-[#2D336B] mb-2">Dinner</h3>
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

        {/* Vegetarian Macronutrient Chart */}
        <div className="mt-16 w-full flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold text-[#2D336B] mb-6">
            Macronutrient Breakdown (Vegetarian)
          </h2>
          <div className="w-full lg:w-[500px] h-[300px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={vegData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {vegData.map((_, index) => (
                    <Cell
                      key={`veg-cell-${index}`}
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

        {/* Non-Vegetarian Plan */}
        <h2 className="text-2xl font-bold text-[#2D336B] mt-24 mb-6 text-left">
          Non-Vegetarian Plan
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Non-Veg Breakfast */}
          <div className="bg-[#F5EDED] rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl font-semibold text-[#2D336B] mb-2">Breakfast</h3>
            <ul className="text-[#2D336B] list-disc pl-5 space-y-1 text-base">
              <li>3 Egg Whites + 1 Whole Egg</li>
              <li>1 slice Multigrain Bread</li>
              <li>Green Tea</li>
            </ul>
            <p className="mt-2 text-sm text-gray-600">
              Approx: 300 kcal | 25g protein | 20g carbs | 10g fats | 3g fiber
            </p>
          </div>

          {/* Non-Veg Lunch */}
          <div className="bg-[#F5EDED] rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl font-semibold text-[#2D336B] mb-2">Lunch</h3>
            <ul className="text-[#2D336B] list-disc pl-5 space-y-1 text-base">
              <li>Grilled Chicken Breast (100g)</li>
              <li>Brown Rice (1 cup)</li>
              <li>Steamed Broccoli</li>
            </ul>
            <p className="mt-2 text-sm text-gray-600">
              Approx: 500 kcal | 40g protein | 45g carbs | 15g fats | 7g fiber
            </p>
          </div>

          {/* Non-Veg Dinner */}
          <div className="bg-[#F5EDED] rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl font-semibold text-[#2D336B] mb-2">Dinner</h3>
            <ul className="text-[#2D336B] list-disc pl-5 space-y-1 text-base">
              <li>Omelette (2 Eggs + Veggies)</li>
              <li>1 Roti</li>
              <li>Mixed Salad</li>
            </ul>
            <p className="mt-2 text-sm text-gray-600">
              Approx: 400 kcal | 30g protein | 40g carbs | 15g fats | 5g fiber
            </p>
          </div>
        </div>

        {/* Non-Vegetarian Macronutrient Chart */}
        <div className="mt-16 w-full flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold text-[#2D336B] mb-6">
            Macronutrient Breakdown (Non-Vegetarian)
          </h2>
          <div className="w-full lg:w-[500px] h-[300px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={nonVegData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {nonVegData.map((_, index) => (
                    <Cell
                      key={`nonveg-cell-${index}`}
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
