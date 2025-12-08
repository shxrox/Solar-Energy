const Solution = () => {
  return (
    <div className="flex mx-4 min-h-screen flex-col lg:flex-row">
      <div className="flex-1 relative rounded-3xl overflow-hidden">
        <img
          src="https://fed-4-frontend.netlify.app/assets/wind-turbine-2-i2cMFNlb.png"
          alt="Wind Turbine"
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8">
          <div className="flex flex-col items-center rounded-2xl bg-blue-500 p-4 text-white sm:p-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-triangle"
            >
              <path d="M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            </svg>
            <span className="text-lg font-bold sm:text-xl">Aelora</span>
          </div>
        </div>
      </div>

      {/* Right side - Content */}
      <div className="flex-1 m-2 flex flex-col justify-center rounded-2xl bg-gradient-to-br from-blue-400 to-blue-500 p-6 text-white sm:p-8 lg:p-12">
        <div className="max-w-lg">
          <div className="mb-6 flex items-center gap-3 lg:mb-8">
            <div className="flex items-center gap-2 rounded-lg bg-lime-400 px-3 py-1.5 text-black sm:px-4 sm:py-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-zap"
              >
                <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
              </svg>
              <span className="text-sm font-medium sm:text-base">Solution</span>
            </div>
          </div>

          <h2 className="mb-8 text-2xl font-bold leading-tight sm:text-3xl lg:mb-12 lg:text-4xl">
            The Solar Home Dashboard empowers you to monitor your solar panels,
            receive instant alerts for anomalies, and optimize your energy usage
            for maximum savings and peace of mind.
          </h2>

          <div className="space-y-3 sm:space-y-4">
            {[
              "Real-time energy tracking",
              "Anomaly alerts",
              "Historical performance reports",
              "Remote diagnostics & support",
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ff0000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-right"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
                <span className="text-base text-gray-700 sm:text-lg">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solution;
