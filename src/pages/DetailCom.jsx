import { Icon } from "@iconify/react";
import DetailContent from "../components/Community/DetailContent";
import NavCom from "../components/Community/NavCom";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailCommunity } from "../features/communitySlice";

function DetailCom() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.communities.community);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await dispatch(detailCommunity(id));
        if (result.meta.requestStatus !== "fulfilled") {
          throw new Error("Failed to fetch data");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch, id]);

  // Menampilkan loading atau error jika ada
  // if (error) return <p>{error}</p>;

  return (
    <div className={`bg-white wrapper-mobile`}>
      <div className={`flex pt-10 px-5 items-center justify-between`}>
        <Icon
          onClick={() => navigate(-1)}
          icon="ep:arrow-left-bold"
          width="32"
          height="32"
          style={{ color: "#BA324F" }}
        />
        <p className="text-black text-xl">Detail Cerita</p>
        <div></div>
      </div>

      {loading ? (
        //skeleton loading
        <div className="space-y-4 mx-5 mt-10">
          <div className="flex justify-between gap-4 w-full">
            <div className="h-[60px] w-[80px] bg-gray-300 animate-pulse rounded-md"></div>
            <div className="h-[60px] w-full bg-gray-300 animate-pulse rounded-md"></div>
          </div>
          <div className="flex justify-between gap-4 w-full">
            <div className="h-[20px] w-[100px] bg-gray-300 animate-pulse rounded-md"></div>
            <div className="h-[20px] w-[100px] bg-gray-300 animate-pulse rounded-md"></div>
          </div>
          <div className="h-8 bg-gray-300 animate-pulse rounded-md"></div>
          <div className="h-[200px] bg-gray-300 animate-pulse rounded-md"></div>
          <div className="h-8 bg-gray-300 animate-pulse rounded-md"></div>
          <div className="h-6 bg-gray-300 animate-pulse rounded-md"></div>
        </div>
      ) : (
        <div className={`px-5 mt-10 pb-[6rem]`}>
          {data && data.length > 0 ? (
            data.map((item) => <DetailContent data={item} key={item._id} />)
          ) : (
            <p>No data available.</p>
          )}
        </div>
      )}

      <NavCom casesID={id} />
    </div>
  );
}

export default DetailCom;
