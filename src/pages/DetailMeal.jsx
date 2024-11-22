import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchDetailsMeal } from "../redux/detailsMealSlice";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";

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

  return (
    <section className='flex flex-col justify-center'>
      <div className='flex px-64 w-full pt-[200px] items-center justify-between'>
        <div className=' w-1/2'>
          <img
            className='object-cover rounded-3xl h-[600px] w-[650px] shadow-2xl'
            src={detailMeals?.strMealThumb}
            alt='Hero Image'
          />
        </div>
        <div className=' w-1/2 px-7'>
          <h1 className='text-5xl mb-4 text-center font-bold text-amber-900'>
            {detailMeals?.strMeal}
          </h1>
          <div className='mb-4 flex gap-3'>
            <p className='border-2 border-[#9c640c] text-amber-950 py-1 px-4 w-fit rounded-2xl'>
              {detailMeals?.strTags || "Healty Food"}
            </p>
          </div>
          <div className='shadow-2xl p-5 bg-[#fdf5e8] rounded-3xl'>
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
                    {item.measure ? `= ${item.measure}` : ""}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className='mt-36 px-64'>
        <h1 className='text-5xl mb-4 text-center font-bold text-amber-900'>
          How to make it
        </h1>
        <div className='p-4 leading-relaxed'>
          {instructions?.split("\r\n").map((step, index) => (
            <p key={index} className='mb-4'>
              {step}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DetailMeal;
