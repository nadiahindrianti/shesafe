import foto from "../../assets/images/fp1.png";

function Commentar({ commentar, delCom }) {
  const formattedDate = new Date(commentar.created).toLocaleDateString(
    "id-ID",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );
  const formattedTime = new Date(commentar.created).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <>
      <div className={`mt-5 bg-[#f5f5f5] rounded-[10px] px-4 py-3`}>
        <div className={`flex flex-row gap-8  items-center justify-start `}>
          {!commentar.createdBy.avatar ? (
            <img src={foto} className={`rounded w-[40px] object-cover`} />
          ) : (
            <img
              className={`rounded-full w-[40px] h-[40px] object-cover`}
              src={commentar.createdBy.avatar}
            />
          )}
          <div className={`flex flex-col gap-1`}>
            <h6 className={`text-[#BA324F] font-bold text-md`}>
              {commentar.createdBy.fullName}
            </h6>
            <p className={`text-[#8c8c8c] font-light`}>
              {formattedDate} | {formattedTime}
            </p>
          </div>
        </div>
        <p className={`text-black text-sm font-light mt-3`}>
          {commentar.description}
        </p>
        <div className="flex justify-between">
          <div></div>
          <div></div>

          <div>{delCom}</div>
        </div>
      </div>
    </>
  );
}

export default Commentar;
