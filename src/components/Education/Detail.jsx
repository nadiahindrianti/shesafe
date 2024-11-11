function Detail({ module }) {
  return (
    <>
      <div className={`mt-10 flex flex-col gap-8`}>
        <div className={`flex flex-col gap-2 items-left`}>
          {/* Menampilkan Judul Modul */}
          <h5 className={`text-black text-lg font-bold`}>{module.title}</h5>
          {/* Menampilkan Tanggal dan Waktu Modul */}
          {/* <p className={`text-light text-[#858585]`}>
            {new Date(module.created).toLocaleDateString()} |{" "}
            {module.created.split("T")[1].split(".")[0]} WIB
          </p> */}
        </div>

        {/* Menampilkan Deskripsi Modul */}
        <div className={`mt-5`}>
          <p
            className="text-black text-sm"
            dangerouslySetInnerHTML={{ __html: module.description }}></p>
        </div>

        {/* Menampilkan File (jika ada) */}
        {module.file && (
          <div className="mt-5">
            <img
              src={module.file}
              alt={module.title}
              className="w-full object-cover rounded-md"
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Detail;
