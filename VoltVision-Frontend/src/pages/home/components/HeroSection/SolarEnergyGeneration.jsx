const SolarEnergyProduction = () => {
    return (
        <div className="flex min-h-screen flex-col lg:flex-row">
            <div className="flex-1 p-2 sm:p-4">
                <div className="h-64 overflow-hidden rounded-3xl sm:h-80 lg:h-full">
                    <img className="h-full w-full object-cover" src="https://fed-4-frontend.netlify.app/assets/wind-turbine-2-i2cMFNlb.png" alt="" />
                </div>

            </div>
            <div className="flex flex-1 flex-col justify-center p-6 sm:p-8 lg:p-12">
                <div className="mx-auto max-w-lg lg:mx-0">
                    <h2 className="mb-6 text-center text-3xl leading-tight font-bold text-gray-900 sm:mb-8 sm:text-4xl lg:text-left lg:text-5xl">Your Solar Energy Generation</h2>
                    <p className="mb-8 text-center text-base leading-relaxed text-gray-700 sm:mb-12 sm:text-lg lg:text-left">This month, your solar panels generated 
                    <span className="font-semibold text-blue-600"> X kWh </span>
                    of clean energy, helping you save on electricity bills and reduce your carbon footprint. Track your energy production trends and see how much power you contribute back to the grid.</p>
                </div>
                <div className="mx-auto h-40 w-56 overflow-hidden rounded-2xl sm:h-48 sm:w-64 lg:mx-0">
                    <img className="h-full w-full object-cover" src="https://fed-4-frontend.netlify.app/assets/solar-construction-DLKEjVnj.webp" alt="" />
                </div>
            </div>

        </div>
    )
}
export default SolarEnergyProduction;