import { useEffect, useState } from "react";

const mockData = [
    {
      id: 1,
      tanggal: '15 Agustus 2024',
      status: 'Menunggu Persetujuan',
      judul: 'Bertahan dari Pelecehan di Tempat Kerja',
      deskripsi: 'Saya mengalami pelecehan...',
      draft: false,
    },
    {
      id: 2,
      tanggal: '15 Agustus 2024',
      status: 'Menunggu Persetujuan',
      judul: 'Perjuangan Melawan Pernikahan Paksa',
      deskripsi: 'Saya sudah bertahun-tahun...',
      draft: true,
    },
  ];

function CardCases ()

{
    const [data, setData] = useState(mockData);
    const [filteredData, setFilteredData] = useState(mockData);
  
 

  
    const filterByDate = (date) => {
      const filtered = data.filter(item => item.tanggal === date);
      setFilteredData(filtered);
    };
  
    const handleEdit = () => alert('Anda yakin akan edit pengajuan kasus ini');
    const handleDelete = () => alert('Anda yakin akan hapus pengajuan kasus ini');
    return (<>
    <div>
    {filteredData.map((item) => (
          <div key={item.id} className="bg-white border rounded-lg shadow-sm mb-4">
            <div className="flex items-center items-center px-4 py-2">
                <span className="text-sm text-gray-700 bg-gray-200 px-2 py-1 rounded mr-2">{item.tanggal}</span>
                <span className={`${item.draft ? 'text-red-600 bg-red-100' : 'text-pink-600 bg-pink-100'} text-sm font-semibold px-2 py-1 rounded`}>
                  {item.draft ? 'Draft' : item.status}
                </span>
              </div>
            <div className="px-4 py-2">
              <h4 className="font-semibold text-gray-800">{item.judul}</h4>
              <p className="text-gray-600 mt-2">{item.deskripsi}</p>
            </div>


            <div style={{ backgroundColor: 'rgba(245, 245, 245, 1)' }} className="flex justify-between p-4"> 
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
    </>)
}

export default CardCases