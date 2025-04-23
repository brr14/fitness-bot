export default function Footer() {
    return <>
        <footer className="w-full bg-[#2D336B] text-white py-4 text-center font-semibold">
            <p className="text-sm">
                © {new Date().getFullYear()} Sensory Dashboard | All Rights Reserved
            </p>
        </footer>

    </>
}