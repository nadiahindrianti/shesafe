import { useEffect, useState } from "react";
import Card from "../components/Community/Card";
import NavBottom from "../components/NavBottom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommunity, resetCommunity } from "../features/communitySlice";
import { fetchCategories } from "../features/categoriesSlice";

function Community() {
  const dispatch = useDispatch();
  const { loading, error, community, pagination } = useSelector(
    (state) => state.communities
  );
  const categories = useSelector((state) => state.categories.category);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [itemsPerPage] = useState(6);

  // Fetch data komunitas dan kategori
  useEffect(() => {
    dispatch(resetCommunity());
    // Fetch komunitas berdasarkan kategori yang dipilih
    dispatch(
      fetchCommunity({
        page: currentPage,
        perPage: itemsPerPage,
        category: selectedCategory,
      })
    );
  }, [dispatch, currentPage, selectedCategory, itemsPerPage]);

  // Fetch kategori
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Handle perubahan kategori
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <div className="bg-white wrapper-mobile">
        <div className="flex justify-between mx-5 pt-10">
          <h2 className="text-black text-xl font-bold">Postingan</h2>
          <select
            className="bg-[#BA324F] rounded-[10px] text-white px-4 py-2"
            value={selectedCategory}
            onChange={handleCategoryChange}>
            <option value="">Pilih Kategori</option>
            {categories && categories.length > 0 ? (
              categories.map((cat) => (
                <option value={cat.name} key={cat._id}>
                  {cat.name}
                </option>
              ))
            ) : (
              <option value="">Tidak ada kategori</option>
            )}
          </select>
        </div>

        <div className="pb-[5rem]">
          {loading ? (
            // Loading state
            <div>
              {new Array(itemsPerPage).fill(null).map((_, index) => (
                <div key={index}>
                  <div className="space-y-4 mx-5 mt-10">
                    <div className="flex gap-4 ">
                      <div className="h-[60px] w-[80px] bg-gray-300 animate-pulse rounded-md"></div>
                      <div className="h-[60px] w-full bg-gray-300 animate-pulse rounded-md"></div>
                    </div>
                    <div className="h-8 bg-gray-300 animate-pulse rounded-md"></div>
                    <div className="h-[200px] bg-gray-300 animate-pulse rounded-md"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : community.length === 0 ? (
            <h1 className="mx-5 my-3">Belum ada kasus yang dibagikan</h1>
          ) : (
            community.map((items) => {
              return <Card data={items} key={items._id} />;
            })
          )}

          {/* Pagination */}
          <div className="flex justify-center items-center mb-5">
            {/* Prev Button */}
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-4 py-2 border bg-[#BA324F] text-white rounded-md disabled:opacity-50">
              Prev
            </button>

            {/* Page info */}
            <span className="mx-3">
              {`Page ${currentPage} of ${
                pagination && pagination.total_pages
                  ? pagination.total_pages
                  : 1
              }`}
            </span>

            {/* Next Button */}
            <button
              disabled={
                currentPage ===
                (pagination && pagination.total_pages
                  ? pagination.total_pages
                  : 1)
              }
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-4 py-2 border bg-[#BA324F] text-white rounded-md disabled:opacity-50">
              Next
            </button>
          </div>
        </div>
      </div>

      <NavBottom />
    </>
  );
}

export default Community;
