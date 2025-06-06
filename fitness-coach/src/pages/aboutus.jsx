import Appbar from "../components/Header";

import Footer from "../components/footer";

export default function Aboutus() {
    return (
        <div
  className="flex flex-col min-h-screen w-full absolute overflow-auto"
  style={{
    background: "linear-gradient(to top, #fcb7af, #d8c5f3)",
  }}
>

            <Appbar />
            {/* Main Content */}
            <div className="flex-grow w-full flex flex-col justify-center items-center p-4 lg:p-20 lg:pt-24 lg:pb-52">
                <div className="text-2xl text-amber-50 border-2 p-8">Our interactive fitness chatbot is your personal wellness companion—available 24/7 to guide you on your fitness journey. Designed to provide personalized workout routines, diet recommendations, and daily fitness tips, it tailors suggestions based on your BMI, weight goals, and lifestyle. With a dynamic avatar that lip-syncs to responses, the bot makes your experience engaging, human-like, and easy to follow. Whether you're aiming to lose weight, build muscle, or simply stay active, our bot helps you stay on track—every step of the way.</div>
            </div>
            {/* Footer */}
            <div className="w-full">
                <Footer />
            </div>
        </div>
    );
}