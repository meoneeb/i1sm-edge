export default function ResultCount({ filteredItems }) {
  return <p className="text-gray-600">Total Units: {filteredItems.length}</p>;
}
