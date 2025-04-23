import Header from "../components/Header";

export default function progress() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-[#6482AD] absolute overflow-auto">
      <Header />
      <div className="pt-32 pb-16 px-4 lg:px-20">
        <h1 className="text-4xl lg:text-5xl font-bold text-[#F5EDED] mb-8 text-center">Your Progress</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="bg-[#F5EDED] rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-[#2D336B] mb-2">Weight</h2>
            <p className="text-3xl font-bold text-[#7FA1C3]">75.5 kg</p>
            <p className="text-sm text-gray-600">Goal: 64 kg</p>
            <div className="mt-4 w-full h-3 bg-[#E2DAD6] rounded-full">
              <div className="h-3 bg-[#7FA1C3] rounded-full" style={{ width: "50%" }}></div>
            </div>
          </div>

          
          <div className="bg-[#F5EDED] rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-[#2D336B] mb-2">Steps Today</h2>
            <p className="text-3xl font-bold text-[#7FA1C3]">10,234</p>
            <p className="text-sm text-gray-600">Goal: 15,000</p>
            <div className="mt-4 w-full h-3 bg-[#E2DAD6] rounded-full">
              <div className="h-3 bg-[#7FA1C3] rounded-full" style={{ width: "68%" }}></div>
            </div>
          </div>

          
          <div className="bg-[#F5EDED] rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-[#2D336B] mb-2">Weekly Goal</h2>
            <ul className="text-[#2D336B] list-disc pl-5 space-y-1 text-base">
              <li>Lose 1 kg</li>
              <li>Walk 70,000 steps</li>
              <li>Workout 5 days</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

