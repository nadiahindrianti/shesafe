import { useEffect, useState } from "react";
import CardCases from "../../components/Journal/CardCases";

function MyCases () {
    const [selectedDate, setSelectedDate] = useState("Pilih Tanggal");
  
    const handleDateChange = (event) => {
      const date = new Date(event.target.value);
      const formattedDate = date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
      setSelectedDate(formattedDate || "Pilih Tanggal");
    };
  
    
  
    return (<>
    <div className={`flex flex-col gap-8 `}>
        <div className={`flex justify-between items-center px-5 mt-10`}>
          <h4 className={`text-black text-lg font-bold`}>My Jurnal</h4>
          <div className="relative">
            <input
              type="date"
              className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
              onChange={handleDateChange}
            />
            <button className="bg-pink-600 text-white px-4 py-2 rounded inline-flex items-center">
              <span>{selectedDate}</span>
              <i className="fas fa-calendar-alt ml-2"></i>
            </button>
          </div>
        </div>

        <div className={`flex flex-col gap-2 items-center px-5`}>
            <CardCases />
        </div>
      </div>
    </>)
}

export default MyCases