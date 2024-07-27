import React from "react";
import styles from "../style";
import Button from "../components/Button";

const Hero = () => {
  return (
    <section className={`w-full min-h-screen py-4`}>
      <div className="flex flex-col">
        <div className="card card-side bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Masukkan kode </h2>
            <form action="">
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered input-info w-full max-w-xs"
              />
            </form>
            <div className="card-actions">
              <Button content="Masuk" styles={`bg-primary`} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col py-6">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-10"
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clipRule="evenodd"
              color="gold"
            />
          </svg>
          <span>Favorite</span>
        </div>
        <div className={`${styles.flexCenter}`}>
          <div className="card card-compact bg-base-100 w-96 shadow-xl">
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Ilmu Pengetahuan Alam</h2>
            </div>
          </div>
          <div className="card card-compact bg-base-100 w-96 shadow-xl">
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Ilmu Pengetahuan Alam</h2>
            </div>
          </div>
          <div className="card card-compact bg-base-100 w-96 shadow-xl">
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Ilmu Pengetahuan Alam</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
