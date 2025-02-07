import { useEffect, useState } from "react";


export default function Setup() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
      
            const response = await fetch("https://app.axis.africa/api/setup", {
                method: "GET",
                headers: {
                  "Authorization": `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">App Setup</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map((item) => (
          <div key={item.id} className="bg-white shadow-md rounded-lg p-4">
            <img src={item.logo} alt={item.name} className="h-16 w-16 mx-auto" />
            <h2 className="text-lg font-semibold text-center mt-2">{item.name}</h2>
            <p className="text-gray-600 text-center">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
