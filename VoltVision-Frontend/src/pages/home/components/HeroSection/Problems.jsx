const Problems = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white lg:flex-row">
      {/* Left Section */}
      <div className="flex flex-1 flex-col justify-center p-6 sm:p-8 lg:p-12">
        <div className="mx-auto max-w-lg lg:mx-0">
          <div className="mb-6 flex items-center gap-3 sm:mb-8">
            <div className="flex items-center gap-2 rounded-lg bg-red-500 px-3 py-2 text-white sm:px-4">
              {/* Example SVG (fixed attributes) */}
              {/* 
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
                viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                className="lucide lucide-triangle-alert">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
                <path d="M12 9v4" />
                <path d="M12 17h.01" />
              </svg> 
              */}
            </div>
            <span className="text-sm font-medium sm:text-base">Problem</span>
          </div>

          <h2 className="mb-8 text-2xl leading-tight font-bold text-gray-900 sm:mb-12 sm:text-3xl lg:text-4xl">
            Home solar systems can face reduced efficiency and missed savings
            due to panel shading, dirt, unexpected drops in output, or inverter
            issues. Stay ahead with instant anomaly alerts.
          </h2>

          {/* Bullet Points */}
          <div className="space-y-3 sm:space-y-4">
            {[
              "Panel shading or dirt",
              "Unexpected drop in output",
              "Inverter errors",
              "Missed maintenance reminders",
            ].map((text, idx) => (
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
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-1 items-center p-4 sm:p-6 lg:p-4">
        <div className="w-full overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl">
          <img
            src="https://fed-4-frontend.netlify.app/assets/wind-turbine-3-BGYqnrhL.png"
            alt="Wind turbine illustration"
          />
        </div>
      </div>
    </div>
  );
};

export default Problems;
