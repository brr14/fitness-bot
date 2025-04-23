import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Card from "../components/card";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen w-full bg-[#E2DAD6] absolute overflow-auto">
            <Header />

            {/* FITNESS BOT INTRODUCTION SECTION */}
            <div className="relative flex-grow grid grid-cols-1 lg:grid-cols-2 mt-12">
                <div className="w-full flex flex-col justify-center items-center">
                    <p className="text-6xl text-[#2D336B] text-center font-bold"></p>
                    <p className="text-xl text-[#2D336B] m-2 text-justify p-4">
                        Meet <strong>Corely</strong> – your AI-powered fitness companion designed to help you stay on track with your health goals. From personalized workout plans to curated diet suggestions, Corely learns your body and goals to recommend what works best for you.
                    </p>
                    <button 
                        onClick={() => navigate("/chatbot")}
                        className="mt-4 bg-[#6482AD] text-white px-6 py-3 rounded-lg hover:bg-[#7FA1C3] font-semibold transition"
                    >
                        Chat With Corely
                    </button>
                </div>
                <div className="w-full flex flex-col justify-center items-center p-4 lg:p-16">
                    <Card>
                        <img src="/corely.jpeg" className="h-[102%] w-[105%] rounded-3xl" alt="Fitness Bot" />
                    </Card>
                </div>
            </div>

            {/* PROGRESS DASHBOARD SECTION */}
            <div className="relative flex-grow grid grid-cols-1 lg:grid-cols-2 mt-4">
                <div className="w-full flex flex-col justify-center items-center p-4 lg:p-16 order-1 lg:order-2">
                    <p className="text-6xl text-[#2D336B] text-center font-bold">TRACK YOUR PROGRESS</p>
                    <p className="text-xl text-[#2D336B] mt-4 text-justify ml-4">
                        Visualize your fitness journey through real-time charts and stats. Monitor your weight, BMI, calorie burn, step count, and more — all in one clean dashboard.
                    </p>
                    <button 
                        onClick={() => navigate("/progress")}
                        className="mt-4 bg-[#6482AD] text-white px-6 py-3 rounded-lg hover:bg-[#7FA1C3] font-semibold transition"
                    >
                        View Progress Dashboard
                    </button>
                </div>
                <div className="w-full flex flex-col justify-center items-center p-4 lg:p-16 order-2 lg:order-1">
                    <Card>
                        <img src="/progress.jpeg" className="h-[102%] w-[105%] rounded-3xl" alt="Progress Dashboard" />
                    </Card>
                </div>
            </div>

            {/* WORKOUT + DIET PLAN SECTION */}
            <div className="relative flex-grow grid grid-cols-1 lg:grid-cols-2 mt-4">
                <div className="w-full flex flex-col justify-center items-center p-4 lg:p-16">
                    <p className="text-6xl text-[#2D336B] text-center font-bold">CUSTOM PLANS</p>
                    <p className="text-xl text-[#2D336B] mt-4 text-justify">
                        Get AI-recommended workout and diet plans based on your fitness goals. Whether you're aiming to lose weight, gain muscle, or just feel more energetic — Corely has a plan for you.
                    </p>
                    <button 
                        onClick={() => navigate("/plans")}
                        className="mt-4 bg-[#6482AD] text-white px-6 py-3 rounded-lg hover:bg-[#7FA1C3] font-semibold transition"
                    >
                        View Your Plans
                    </button>
                </div>
                <div className="w-full flex flex-col justify-center items-center p-4 lg:p-16">
                    <Card>
                        <img src="/meal.jpeg" className="h-[102%] w-[105%] rounded-3xl" alt="Workout and Meal Plans" />
                    </Card>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="w-full bg-[#2D336B] text-white py-4 text-center font-semibold">
                <p className="text-sm">
                    © 2025 Corely Fitness Bot | All Rights Reserved
                </p>
            </footer>
        </div>
    );
}
