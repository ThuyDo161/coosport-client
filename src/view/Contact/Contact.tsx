import React from "react";
import {
  Ba_Trieu,
  Chua_Boc,
  Tran_Dai_Nghia,
} from "../../assets/fake-data/store";
import Grid from "../../components/Grid/Grid";
import Helmet from "../../components/Helmet/Helmet";
import "./contact.scss";

export default function Contact() {
  return (
    <Helmet title="Hệ thống các cửa hàng hiện nay">
      <div className="container text-center">
        <Grid col={1}>
          {/* <div class="m-auto"> */}
          <div className="main-heading col-12 text-center">
            <h3>Hệ thống cửa hàng</h3>
          </div>
          <div className="col-12">
            {/* Tab content */}
            <div className="tab-content">
              <div className="tab-pane active">
                <Grid col={2} mdCol={2} gap={20} smCol={1}>
                  <img
                    className="img-store col-md-6 col-12"
                    src={Ba_Trieu}
                    alt=""
                  />
                  <div className="store-location-details">
                    <div className="name-store d-flex align-items-center">
                      <i className="bx bx-home-alt"></i>
                      Tuấn Vũ Order Bà Triệu
                    </div>
                    <div className="store-location d-flex align-items-center">
                      <i className="bx bx-location-plus"></i>
                      81 Bà Triệu, Hai Bà Trưng
                    </div>
                    <div className="store-tel d-flex align-items-center">
                      <i className="bx bx-phone-call"></i>
                      0968317253
                    </div>
                    <div className="store-time d-flex align-items-center">
                      <i className="bx bx-time-five"></i>
                      9h - 22h
                    </div>
                    <div className="store-map">
                      <iframe
                        title="Google Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59582.461376054256!2d105.74907541260619!3d21.036533426339165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135aba257897c07%3A0x92bf9bdd0bcec4bc!H-TShop%20Shop!5e0!3m2!1svi!2s!4v1631028012406!5m2!1svi!2s"
                        width={600}
                        height={450}
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                      />
                    </div>
                  </div>
                </Grid>
                <Grid col={2} mdCol={2} gap={20} smCol={1}>
                  <img
                    className="img-store col-md-6 col-12"
                    src={Tran_Dai_Nghia}
                    alt=""
                  />
                  <div className="store-location-details d-flex flex-column align-items-baseline justify-content-between col-md-6 col-12">
                    <div className="name-store d-flex align-items-center">
                      <i className="bx bx-home-alt"></i>
                      Tuấn Vũ Order Trần Đại Nghĩa
                    </div>
                    <div className="store-location d-flex align-items-center">
                      <i className="bx bx-location-plus"></i>
                      60 Trần Đại Nghĩa, Hai Bà Trưng
                    </div>
                    <div className="store-tel d-flex align-items-center">
                      <i className="bx bx-phone-call"></i>
                      0971913545
                    </div>
                    <div className="store-time d-flex align-items-center">
                      <i className="bx bx-time-five"></i>
                      9h - 22h
                    </div>
                    <div className="store-map">
                      <iframe
                        title="Google Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59582.461376054256!2d105.74907541260619!3d21.036533426339165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135aba257897c07%3A0x92bf9bdd0bcec4bc!H-TShop%20Shop!5e0!3m2!1svi!2s!4v1631028012406!5m2!1svi!2s"
                        width={600}
                        height={450}
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                      />
                    </div>
                  </div>
                </Grid>
                <Grid col={2} mdCol={2} gap={20} smCol={1}>
                  <img
                    className="img-store col-md-6 col-12"
                    src={Chua_Boc}
                    alt=""
                  />
                  <div className="store-location-details d-flex flex-column align-items-baseline justify-content-between col-md-6 col-12">
                    <div className="name-store d-flex align-items-center">
                      <i className="bx bx-home-alt"></i>
                      Tuấn Vũ Order Chùa Bộc
                    </div>
                    <div className="store-location d-flex align-items-center">
                      <i className="bx bx-location-plus"></i>
                      241 Chùa Bộc, Đống Đa
                    </div>
                    <div className="store-tel d-flex align-items-center">
                      <i className="bx bx-phone-call"></i>
                      0904536337
                    </div>
                    <div className="store-time d-flex align-items-center">
                      <i className="bx bx-time-five"></i>
                      9h - 22h
                    </div>
                    <div className="store-map">
                      <iframe
                        title="Google Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59582.461376054256!2d105.74907541260619!3d21.036533426339165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135aba257897c07%3A0x92bf9bdd0bcec4bc!H-TShop%20Shop!5e0!3m2!1svi!2s!4v1631028012406!5m2!1svi!2s"
                        width={600}
                        height={450}
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                      />
                    </div>
                  </div>
                </Grid>
              </div>
            </div>
          </div>
        </Grid>
        {/* </div> */}
      </div>
    </Helmet>
  );
}
