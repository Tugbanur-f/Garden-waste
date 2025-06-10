const getSkipDetails = (size) => {
  const details = {
    4: {
      name: "4 Yard Skip",
      capacity: "45+",
      description: "Ideal for small garden or home clearances.",
      image: "./img/skip.jpeg",
    },
    6: {
      name: "6 Yard Skip",
      description: "Great for bathroom/kitchen renovations.",
      image: "./img/skip.jpeg",
    },
    8: {
      name: "8 Yard Skip",
      description: "Perfect for larger construction jobs.",
      image: "./img/skip.jpeg",
    },
    10: {
      name: "10 Yard Skip",
      description: "Heavy duty waste for big jobs.",
      image: "./img/skip.jpeg",
    },
  };

  return (
    details[size] || {
      name: `${size} Yard Skip`,
      description: "No description available.",
    }
  );
};
export default getSkipDetails;
