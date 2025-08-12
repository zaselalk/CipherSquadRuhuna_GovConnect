import React from "react";

interface DetailTableProps {
  TableName: string;
  Colunms: Array<{ title: string }>;
  Data: Array<{ name: string; title: string; email: string }>;
}

const DetailTable: React.FC<DetailTableProps> = ({ TableName, Colunms, Data }) => {
  return (
    <div className="p-6rounded-lg">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">{TableName}</h2>
        <button className="px-4 py-2 bg-[#008FFB] text-white rounded-lg">Add</button>
      </div>
      <table className="w-full border-collapse">
        <thead>

          <tr className="border-b bg-gray-100">
            {Array.isArray(Colunms) ? (
              Colunms.map((colunm, index) => (
                <th key={index} className="p-3 text-left">{colunm.title}</th>
              ))
            ) : (
              <th className="p-3 text-left">{Colunms}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(Data) ? (
            Data.map((user, index) => (
              <tr key={index} className="border-b-gray-200">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.title}</td>
                <td className="p-x3">{user.email}</td>
                <td className="p-3 text-blue-600 cursor-pointer">Edit</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="p-3" colSpan={4}>Invalid data format</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DetailTable;
