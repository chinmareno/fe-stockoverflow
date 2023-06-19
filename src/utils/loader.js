const loader = async () => {
  const res = await fetch(`http://localhost:5432/test`);
  const data = await res.json();
  return data;
};
export default loader;
