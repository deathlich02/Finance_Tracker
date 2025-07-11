// components/TableSection.jsx
export default function TableSection({ headers = [], data = [], renderRow }) {
    return (
      <div className="rounded-lg border border-zinc-800 overflow-hidden">
        <table className="w-full text-left text-sm text-white">
          <thead className="bg-zinc-800 text-gray-300">
            <tr>
              {headers.map((h, i) => (
                <th key={i} className="px-4 py-2 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-700">
            {data.length === 0 ? (
              <tr>
                <td colSpan={headers.length} className="text-center py-4 text-gray-400">
                  No entries found.
                </td>
              </tr>
            ) : (
              data.map((item, idx) => renderRow(item, idx))
            )}
          </tbody>
        </table>
      </div>
    );
  }
  