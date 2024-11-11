function DetailJournal() {
  return (
    <>
      <div className="detailjurnal-section container min-vh-100 wrapper-mobile">
        <div className="header py-5 d-flex align-items-center justify-content-center">
          <a href="#" className="button-back col-1" onClick="window.history.go(-1)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none">
              <path
                d="M19.044 4.668L8.68001 15.3C8.49798 15.4868 8.3961 15.7372 8.3961 15.998C8.3961 16.2588 8.49798 16.5093 8.68001 16.696L19.044 27.332C19.1288 27.4191 19.2302 27.4883 19.3422 27.5356C19.4541 27.5828 19.5745 27.6072 19.696 27.6072C19.8176 27.6072 19.9379 27.5828 20.0499 27.5356C20.1618 27.4883 20.2632 27.4191 20.348 27.332C20.5225 27.1534 20.6201 26.9137 20.6201 26.664C20.6201 26.4143 20.5225 26.1746 20.348 25.996L10.602 15.998L20.348 6.002C20.5219 5.82351 20.6192 5.58418 20.6192 5.335C20.6192 5.08583 20.5219 4.8465 20.348 4.668C20.2632 4.58092 20.1618 4.5117 20.0499 4.46444C19.9379 4.41717 19.8176 4.39282 19.696 4.39282C19.5745 4.39282 19.4541 4.41717 19.3422 4.46444C19.2302 4.5117 19.1288 4.58092 19.044 4.668Z"
                fill="#BA324F"
              />
            </svg>
          </a>
          <h1 className="align-items-center col-11" style="text-align: center">
            Detail Jurnal
          </h1>
        </div>
        <div className="row align-items-center">
          {/* ini buat component detail jurnalnya */}
        </div>
      </div>
    </>
  );
}

export default DetailJournal;
