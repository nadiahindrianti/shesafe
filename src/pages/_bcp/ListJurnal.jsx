import React, { useState } from 'react';
import BottomNav from "../components/NavBottom"
import "@fortawesome/fontawesome-free/css/all.min.css";

const mockData = [
  {
    id: 1,
    tanggal: '15 Agustus 2024',
    status: 'Draft',
    judul: 'Bertahan dari Pelecehan di Tempat Kerja',
    deskripsi: 'Saya mengalami pelecehan...',
    draft: false,
  },
  {
    id: 2,
    tanggal: '15 Agustus 2024',
    status: 'Draft',
    judul: 'Perjuangan Melawan Pernikahan Paksa',
    deskripsi: 'Saya sudah bertahun-tahun...',
    draft: true,
  },
];

function ListJurnal() {
  const [data] = useState(mockData);

  const handleEdit = () => alert('Anda yakin akan edit jurnal ini');
  const handleDelete = () => alert('Anda yakin akan hapus jurnal ini');

  return (
    <div className="flex flex-col min-h-screen bg-pink-100 items-center">
      <div className="flex flex-col w-full max-w-[480px] flex-grow bg-white shadow-lg rounded-lg p-4 mx-auto">
        <ul className="flex w-full mb-4">
          <li className="flex-1 text-center">
            <button className="w-full py-2 text-white bg-[#04395e] rounded-b-lg font-semibold">My Jurnal</button>
          </li>
          <li className="flex-1 text-center">
          <button className="w-full py-2 text-gray-600 bg-white rounded-b-lg font-semibold" style={{ border: '1px solid rgba(4, 57, 94, 1)' }}>Pengajuan Kasus</button>
          </li>
        </ul>

        <h2 className="text-gray-900 font-bold mb-4">My Jurnal</h2>


        <div className="flex-grow overflow-auto">
          {data.map((item) => (
            <div key={item.id} className="bg-white border rounded-lg shadow-sm mb-4">
              <div className="flex items-center items-center px-4 py-2">
                <span className="text-sm text-gray-700 bg-gray-200 px-2 py-1 rounded mr-2">{item.tanggal}</span>
                <span className={`${item.draft ? 'text-red-600 bg-red-100' : 'text-pink-600 bg-pink-100'} text-sm font-semibold px-2 py-1 rounded`}>
                  {item.draft ? 'Draft' : item.status}
                </span>
              </div>

              <div className="px-4 py-3">
                <h4 className="font-semibold text-gray-900 text-lg">{item.judul}</h4>
                <p className="text-gray-600 text-sm mt-2">{item.deskripsi}</p>
              </div>

              <div style={{ backgroundColor: 'rgba(245, 245, 245, 1)' }} className="flex justify-between px-4 py-2 border-t  rounded-b-lg">
                <button onClick={handleEdit} className="flex items-center text-blue-600 hover:text-blue-700  px-3 py-1 rounded border border-blue-600">
                  <i className="fas fa-edit mr-2"></i> Edit
                </button>
                <button onClick={handleDelete} className="flex items-center text-red-600 hover:text-red-700   px-3 py-1 rounded border border-red-600">
                  <i className="fas fa-trash-alt mr-2"></i> Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

export default ListJurnal;
