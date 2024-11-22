import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchDetailsMeal } from "../redux/detailsMealSlice";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import ReactPlayer from "react-player";

function DetailMeal() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { detailMeals, isLoading } = useSelector((state) => ({
    detailMeals: state.detailMeals.details.meals?.[0],
    isLoading: state.detailMeals.isLoading,
  }));

  useEffect(() => {
    dispatch(fetchDetailsMeal(id));
  }, [id, dispatch]);

  if (isLoading) return <Loading />;

  const instructions = detailMeals?.strInstructions;
  const videoUrl = detailMeals?.strYoutube;

  return (
    <section className='flex flex-col justify-center'>
      <div className='flex px-40 w-full mb-44 pt-[150px] items-center justify-between'>
        <div className=' w-1/2'>
          <img
            className='object-cover rounded-3xl h-[700px] w-[850px] shadow-2xl'
            src={detailMeals?.strMealThumb}
            alt='Hero Image'
          />
        </div>
        <div className=' w-1/2 px-7'>
          <h1 className='text-5xl mb-5 text-center font-bold text-amber-900'>
            {detailMeals?.strMeal}
          </h1>
          <div className='border-t-2 border-[#9c640c]'>
            <p className=' text-amber-950 mt-3 text-lg'>
              Cuisine :{" "}
              <span className='font-medium'>{detailMeals?.strArea}</span>
            </p>
            <p className='mb-4 text-lg text-amber-950'>
              Tags : {detailMeals?.strTags || "Healty Food"}
            </p>
          </div>

          {/* <p>{detailMeals.strYoutube}</p> */}
          <div className='shadow-2xl p-5 bg-[#fdf5e8] rounded-lg'>
            <h2 className='text-xl mb-2 font-semibold text-[#9c640c]'>
              Ingredient :
            </h2>
            <div>
              {Object.entries(detailMeals || {})
                .filter(
                  ([key, value]) =>
                    (key.startsWith("strIngredient") ||
                      key.startsWith("strMeasure")) &&
                    value?.trim() // Pastikan value tidak kosong atau hanya spasi
                )
                .reduce((acc, [key, value]) => {
                  const index = key.match(/\d+/)?.[0]; // Ambil nomor dari kunci (misalnya "1" dari "strIngredient1")
                  if (!acc[index]) acc[index] = {}; // Buat grup baru jika index belum ada
                  if (key.startsWith("strIngredient") && value.trim()) {
                    // Pastikan ingredient tidak kosong
                    acc[index].ingredient = value;
                  }
                  if (key.startsWith("strMeasure") && value.trim()) {
                    // Pastikan measure tidak kosong
                    acc[index].measure = value;
                  }
                  return acc;
                }, [])
                .filter((item) => item.ingredient || item.measure) // Hanya tampilkan jika ingredient atau measure ada
                .map((item, index) => (
                  <p key={index} className=''>
                    {index + 1}. {item.ingredient || ""}{" "}
                    {item.measure ? ` ${item.measure}` : ""}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>
      <h1 className='text-5xl mb-8 text-center font-bold text-amber-900'>
        How to make it
      </h1>
      <div className='flex px-12 gap-8 items-center justify-center'>
        <div className=' w-1/2'>
          <div className='p-4 rounded-lg shadow-2xl bg-[#fdf5e8] leading-relaxed'>
            <h2 className='text-xl mb-2 font-semibold text-[#9c640c]'>
              Instruction :
            </h2>
            {instructions?.split("\r\n").map((step, index) => (
              <p key={index} className='mb-4'>
                {step}
              </p>
            ))}
          </div>
        </div>
        <div className='aspect-video'>
          <ReactPlayer url={videoUrl} controls />
        </div>
      </div>
    </section>
  );
}

export default DetailMeal;
