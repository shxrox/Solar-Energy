const GoalsAndNeeds = () => {
  const goals = [
    "Maximize solar energy savings.",
    "Detect and resolve issues early.",
    "Track daily, weekly, and monthly output.",
    "Get notified of anomalies instantly.",
  ];

  const needs = [
    "A simple dashboard for real-time monitoring.",
    "Instant alerts for system anomalies.",
    "Easy access to historical performance data.",
    "Clear, actionable insights for better energy management.",
  ];

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left section */}
      <div className="m-2 flex flex-1 flex-col justify-center bg-gradient-to-br p-6 md:p-8 lg:p-12">
        <div className="mx-auto max-w-lg space-y-8 md:space-y-12">
          {/* Goals */}
          <div>
            <h2 className="mb-4 text-2xl font-bold md:mb-6 md:text-3xl">
              Goals:
            </h2>
            <div className="space-y-3 md:space-y-4">
              {goals.map((goal, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-right"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                  <span className="text-base leading-relaxed md:text-lg">
                    {goal}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Needs */}
          <div>
            <h2 className="mb-4 text-2xl font-bold md:mb-6 md:text-3xl">
              Needs:
            </h2>
            <div className="space-y-3 md:space-y-4">
              {needs.map((need, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-right"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                  <span className="text-base leading-relaxed md:text-lg">
                    {need}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Profile Card */}
          <div className="flex flex-col gap-3 rounded-xl bg-white p-4 text-gray-900 shadow-lg sm:flex-row sm:items-center sm:gap-4">
            <div className="mx-auto h-12 w-12 overflow-hidden rounded-full bg-gray-300 sm:mx-0">
              <img
                src="https://fastly.picsum.photos/id/166/200/200.jpg?hmac=lghN9aMZHsvaZQVmJW3_fCu5ArnsnX8kJwM87m9K9dY"
                alt="Profile of Alex P."
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col items-center gap-1 sm:flex-row sm:gap-2">
                <span className="font-medium">Alex P.</span>
                <span className="text-sm text-gray-500">42 y.o.</span>
              </div>
            </div>
            <div className="flex items-center gap-x-4 text-center text-sm sm:text-right">
              <span className="text-gray-500">Homeowner</span>
              <span className="font-semibold">Solar User</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right section */}
      <div className="relative m-2 flex-1">
        <div className="relative h-64 md:h-80 lg:h-full">
          <img
            className="h-full w-full rounded-2xl object-cover"
            src="https://fed-4-frontend.netlify.app/assets/solar-construction-DLKEjVnj.webp"
            alt="Solar panel installation"
          />
          <div className="absolute top-4 left-4 md:top-8 md:left-8">
            <div className="flex items-center gap-2 rounded-lg bg-blue-500 px-3 py-2 text-white shadow-lg md:gap-3 md:px-4 md:py-3">
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
                className="lucide lucide-user"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span className="text-sm font-medium md:text-base">
                User Profile
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalsAndNeeds;
