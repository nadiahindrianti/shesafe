import CardJournal from "../components/Journal/CardJournal";
import { useEffect, useCallback, useState } from "react";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function MyJournal() {
  // const API_BASE_URL = "http://localhost:4000"
  const [journals, setJournals] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState("desc");

  // Function to fetch journals with pagination and sorting
  const fetchJournals = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/journal/`, {
        withCredentials: true,
        params: { page, perPage: 5, sort },
      });
      setJournals(response.data.data); // Update the journals array
      setTotalPages(response.data.totalPages); // Update the total number of pages
    } catch (error) {
      console.error("Failed to fetch journals", error);
    }
  }, [page, sort]);

  // Fetch data tiap kali `page` / sort berubah
  useEffect(() => {
    fetchJournals();
  }, [fetchJournals]);

  // Handle next page
  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  // Handle previous page
  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  // Handle sort order change
  const handleSortChange = (event) => {
    setSort(event.target.value); // Update sort order
    setPage(1); // Reset ke first page tiap kali sorting berubah
  };

  return (
    <>
      <div className={`flex flex-col gap-8`}>
        <div className={`flex justify-between items-center px-5 mt-10`}>
          <h4 className={`text-black text-lg font-bold`}>My Jurnal</h4>
          <select
            className={`bg-[#BA324F] rounded-[10px] text-white px-4 py-2`}
            value={sort}
            onChange={handleSortChange}>
            <option value="desc">Terbaru</option>
            <option value="asc">Terlama</option>
          </select>
        </div>

        <div className={`flex flex-col gap-3 items-center px-5`}>
          {journals.map((journal) => (
            <CardJournal key={journal._id} journal={journal} />
          ))}
        </div>

        {/* Pagination controls */}
        <div className="flex justify-center gap-4 mt-1 mb-20">
          <button
            className="bg-gray-200 px-3 py-1 rounded"
            disabled={page === 1}
            onClick={handlePreviousPage}>
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            className="bg-gray-200 px-3 py-1 rounded"
            disabled={page === totalPages}
            onClick={handleNextPage}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default MyJournal;
