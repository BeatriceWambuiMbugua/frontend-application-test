"use client";

import useFetchSetup from "@/hooks/useFetchSetUp";

export default function SetupDisplay() {
  const { setupData, loading, error } = useFetchSetup();

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="w-full mx-auto bg-white shadow-md rounded-lg p-6 my-3">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Here Are Some Exciting  Packages for you!
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {setupData?.packages?.map((pkg) => (
          <div
            key={pkg.id}
            className="border rounded-lg p-4 shadow-sm bg-white"
          >
            <h3 className="text-xl font-semibold text-blue-600">{pkg.title}</h3>
            <p className="text-gray-600 mb-2">{pkg.description}</p>
            <p className="text-gray-800 font-medium">Price: KES {pkg.amount}</p>

            {pkg.packageoption.length > 0 && (
              <div className="mt-4">
                <h4 className="text-lg font-semibold">Options:</h4>
                {pkg.packageoption.map((option) => (
                  <div
                    key={option.id}
                    className="mt-3 border-l-4 border-blue-500 pl-3"
                  >
                    <h5 className="text-md font-semibold">
                      {option.buttontitle}
                    </h5>
                    {option.description && (
                      <p className="text-gray-700">{option.description}</p>
                    )}
                    {option.italicdescription && (
                      <p className="text-gray-500 italic">
                        {option.italicdescription}
                      </p>
                    )}

                    {/* Features */}
                    {option.packagefeatures.length > 0 && (
                      <ul className="mt-2 list-disc pl-5">
                        {option.packagefeatures.map((feature) => (
                          <li
                            key={feature.id}
                            className={`${
                              feature.status
                                ? "text-green-600"
                                : "text-gray-400 line-through"
                            }`}
                          >
                            {feature.title}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
