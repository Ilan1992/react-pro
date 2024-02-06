const GoogleMap = ({ city }) => {
  const embedUrl = `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${encodeURIComponent(
    city
  )}&t=&z=14&ie=UTF8&iwloc=B&output=embed`;

  return (
    <div style={{ width: "100%" }}>
      <iframe
        title="map google"
        width="100%"
        height="450"
        src={embedUrl}
      ></iframe>
    </div>
  );
};

export default GoogleMap;
